import { Inject, Injectable, Optional } from '@nestjs/common';
import { LogConfig } from '../interface/log-config.interface';

@Injectable()
export class KurElasticsearchService {
  prefix = 'mylog';
  type = 'mytype';
  client: any;

  constructor(@Inject('KUR_OPTIONS') private readonly options: LogConfig) {
    if (options) {
      if (options.elasticsearch) {
        if (options.elasticsearch.prefix) {
          this.prefix = options.elasticsearch.prefix;
        }

        if (options.elasticsearch.type) {
          this.type = options.elasticsearch.type;
        }

        import('@elastic/elasticsearch').then(
          (x) =>
            (this.client = new x.Client({ node: options.elasticsearch.node }))
        );
      }
    }
  }

  async log(message: string, context?: string) {
    await this.logger(message, 'info', context);
  }

  async warn(message: string, context?: string) {
    await this.logger(message, 'warn', context);
  }

  async logger(message: string, level: string, context: string) {
    if (this.client) {
      try {
        await this.client.index({
          index: this.formatFileName('log-' + this.prefix),
          type: this.type,
          body: {
            timestamp: new Date(),
            level,
            context,
            message,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async error(message: string, trace?: string, context?: string) {
    if (this.client) {
      try {
        await this.client.index({
          index: this.formatFileName('log-' + this.prefix),
          type: this.type,
          body: {
            timestamp: new Date(),
            level: 'error',
            context,
            message,
            trace,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async send(body: Object, prefix?: string) {
    let msg: { [key: string]: any };
    msg = body;
    msg.timestamp = new Date();

    if (this.client) {
      let index = 'report-';
      if (prefix) {
        index += prefix;
      } else {
        index += this.prefix;
      }

      try {
        await this.client.index({
          index: this.formatFileName(index),
          type: this.type,
          body: msg,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  private formatFileName(filename: string) {
    const d = new Date();
    const date = [
      d.getFullYear(),
      ((x) => (('' + x).length < 2 ? '0' + x : '' + x))(d.getMonth() + 1),
      ((x) => (('' + x).length < 2 ? '0' + x : '' + x))(d.getDate()),
    ];

    return (filename += '-' + date.join('.'));
  }
}
