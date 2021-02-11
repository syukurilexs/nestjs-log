import { KurElasticsearchService } from './kur-elasticsearch/kur-elasticsearch.service';
import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  context = 'LoggerService';

  constructor(private readonly kurElasticsearchSvc: KurElasticsearchService) {
    super();
  }

  log(message: string) {
    /* your implementation */
    this.kurElasticsearchSvc.log(message,this.context);
    super.log(message);
  }

  error(message: string, trace?: string) {
    /* your implementation */
    this.kurElasticsearchSvc.error(message,trace,this.context);
    super.error(message, trace);
  }

  warn(message: string) {
    /* your implementation */
    this.kurElasticsearchSvc.warn(message,this.context);
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
