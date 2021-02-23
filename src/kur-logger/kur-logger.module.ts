import { KurLogAsyncOption } from './interface/kur-log-async-option';
import { LogConfig } from './interface/log-config.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerService } from './kur-logger.service';
import { KurElasticsearchService } from './kur-elasticsearch/kur-elasticsearch.service';

@Global()
@Module({})
export class LoggerModule {
  static register(options: LogConfig = {}): DynamicModule {
    return {
      module: LoggerModule,
      imports: [],
      providers: [
        LoggerService,
        { provide: 'KUR_OPTIONS', useValue: options },
        KurElasticsearchService,
      ],
      exports: [LoggerService],
    };
  }

  static registerAsync(options: KurLogAsyncOption): DynamicModule {
    return {
      imports: options.imports,
      module: LoggerModule,
      providers: [
        LoggerService,
        KurElasticsearchService,
        {
          provide: 'KUR_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [LoggerService],
    };
  }
}
