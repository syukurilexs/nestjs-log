import { KurElasticsearchService } from './kur-elasticsearch/kur-elasticsearch.service';
import { Injectable, Logger, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  context = 'LoggerService';

  constructor(private readonly kurElasticsearchSvc: KurElasticsearchService) {
    super();
  }

  log(message: string) {
    /* your implementation */
    this.kurElasticsearchSvc.log(message, this.context);
    super.log(message);
  }

  error(message: string, trace?: string | object) {
    /* your implementation */
    let trc: string;

    if (trace instanceof Object) {
      trc = JSON.stringify(trace);
    } else {
      trc = trace;
    }

    this.kurElasticsearchSvc.error(message, trc, this.context);
    super.error(message, trc, this.context);
  }

  warn(message: string) {
    /* your implementation */
    this.kurElasticsearchSvc.warn(message, this.context);
    super.warn(message);
  }

  debug(message: string) {
    /* your implementation */
    super.debug(message);
  }

  verbose(message: string) {
    /* your implementation */
    super.verbose(message);
  }

  setContext(ctx: string) {
    super.setContext(ctx);
  }
}
