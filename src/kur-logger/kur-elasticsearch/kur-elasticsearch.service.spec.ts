import { Test, TestingModule } from '@nestjs/testing';
import { KurElasticsearchService } from './kur-elasticsearch.service';

describe('KurElasticsearchService', () => {
  let service: KurElasticsearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KurElasticsearchService],
    }).compile();

    service = module.get<KurElasticsearchService>(KurElasticsearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
