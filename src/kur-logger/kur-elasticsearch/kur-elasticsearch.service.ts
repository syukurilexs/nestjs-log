import { DATE_FORMAT } from './../interface/log-config.interface';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { LogConfig } from '../interface/log-config.interface';

@Injectable()
export class KurElasticsearchService {
  prefix = 'mylog';
  dateReport = DATE_FORMAT.YYYYMMDD;
  dateLog = DATE_FORMAT.YYYYMMDD;
  client: any;

  constructor(@Inject('KUR_OPTIONS') private readonly options: LogConfig) {
    if (options) {
      if (options.elasticsearch) {
        if (options.elasticsearch.prefix) {
          // Part of filename / index
          this.prefix = options.elasticsearch.prefix;
        }

        if (options.elasticsearch.date) {
          if (options.elasticsearch.date.report) {
            this.dateReport = options.elasticsearch.date.report;
          }

          if (options.elasticsearch.date.log) {
            this.dateLog = options.elasticsearch.date.log;
          }
        }

        // Import when option specified
        import('@elastic/elasticsearch').then(
          (x) =>
            (this.client = new x.Client({ node: options.elasticsearch.node }))
        );
      }
    }
  }

  /**
   * Logging message
   * @param message Logging message
   * @param context Context, usually a module name
   */
  async log(message: string, context?: string) {
    await this.logger(message, 'info', context);
  }

  /**
   * Logging warning message
   * @param message Warning message
   * @param context Context, usually a module name
   */
  async warn(message: string, context?: string) {
    await this.logger(message, 'warn', context);
  }

  /**
   * Common logger function
   * @param message Log message
   * @param level Level
   * @param context Context, usually a module name
   */
  private async logger(message: string, level: string, context: string) {
    if (this.client) {
      try {
        await this.client.index({
          index: this.formatFileName('log-' + this.prefix, this.dateLog),
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

  /**
   * For logging to send error
   * @param message Error message
   * @param trace Tracing text
   * @param context Context, usually a module name
   */
  async error(message: string, trace?: string, context?: string) {
    if (this.client) {
      try {
        await this.client.index({
          index: this.formatFileName('log-' + this.prefix, this.dateLog),
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

  /**
   * To send report
   * @param body Input
   * @param prefix Preffix to form filename
   */
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
          index: this.formatFileName(index, this.dateReport),
          body: msg,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  private formatFileName(filename: string, dateFormat: DATE_FORMAT) {
    const d = new Date();
    const date = [
      d.getFullYear(),
      ((x) => (('' + x).length < 2 ? '0' + x : '' + x))(d.getMonth() + 1),
      ((x) => (('' + x).length < 2 ? '0' + x : '' + x))(d.getDate()),
    ];

    if (dateFormat === DATE_FORMAT.YYYY) {
      return (filename += '-' + date[0]);
    } else if (dateFormat === DATE_FORMAT.YYYYMM) {
      return (filename += '-' + date[0] + '.' + date[1]);
    } else {
      return (filename += '-' + date.join('.'));
    }
  }
}
