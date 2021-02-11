import { LogConfig } from './log-config.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface KurLogAsyncOption
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => LogConfig;
  inject: any[];
}