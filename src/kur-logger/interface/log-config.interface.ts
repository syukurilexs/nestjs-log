export interface LogConfig {
  elasticsearch?: {
    node: string;
    prefix?: string;
    type?: string;
  }
}
