import { Injectable } from '@nestjs/common';
import { KurElasticsearchService } from './kur-elasticsearch/kur-elasticsearch.service';

@Injectable()
export class ReportService {
  constructor(private readonly kurElasticsearchSvc: KurElasticsearchService) {}

  send(input: Object, prefix?: string) {
    this.kurElasticsearchSvc.send(input, prefix);
  }
}
