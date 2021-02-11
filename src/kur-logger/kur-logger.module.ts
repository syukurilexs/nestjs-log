import { LogConfig } from './interface/log-config.interface';
import { DynamicModule, Module, Inject, Provider } from '@nestjs/common';
import { LoggerService } from './kur-logger.service';
import { KurElasticsearchService } from './kur-elasticsearch/kur-elasticsearch.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({})
export class LoggerModule {
  static register(options: LogConfig = {}): DynamicModule {
    const modules = [];
    if (options?.elasticsearch) {
      modules.push(
        ElasticsearchModule.register({ node: options.elasticsearch.node })
      );
    }

    return {
      module: LoggerModule,
      imports: modules,
      providers: [
        LoggerService,
        { provide: 'KUR_OPTIONS', useValue: options },
        {
          provide: KurElasticsearchService,
          useClass: KurElasticsearchService,
        },
      ],
      exports: [LoggerService],
    };
  }
}
