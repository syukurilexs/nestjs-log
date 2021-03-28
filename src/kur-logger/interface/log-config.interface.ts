export enum DATE_FORMAT {
  YYYY=1, // Use 1 instead of zero because of checking, when 0 being ignored
  YYYYMM,
  YYYYMMDD,
}

export interface LogConfig {
  elasticsearch?: {
    node: string;
    prefix?: string;
    date?: {
      report?: DATE_FORMAT;
      log?: DATE_FORMAT;
    };
  };
}