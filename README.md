<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS npm Package Starter</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

```bash
npm install @syukurilexs/nestjs-log
```

## Usage
Import `LoggerModule`:

```typescript
imports: [LoggerModule.register()]
```
This module is Global type, just import in module.app.js and can use it anywhere

## Usage to write log to Elasticsearch and Console
To use Elasticsearch for logging you need to install Elasticsearch package

```bash
npm install @elastic/elasticsearch
```

Import `LoggerModule`:

```typescript
imports: [
  LoggerModule.register({
    elasticsearch: { node: 'http://localhost:9200', prefix: 'syukur' },
  }),
],
```

### Options
- node: elastic search url
- prefix: index name (when use it with LoggerService it will append prefix ***log***), 
and also today date, daily bucket)

## Usage for Async method to write log to Elasticsearch and Console
To use Elasticsearch for logging you need to install Elasticsearch package

```bash
npm install @elastic/elasticsearch
```

Import `LoggerModule`:

```typescript
imports: [
  LoggerModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      return {
        elasticsearch: { node: config.get('URL'), prefix: 'syukur' },
      };
    },
    inject: [ConfigService],
  }),
],
```
## Available Services 
### LoggerService
```typescript
constructor(private readonly logger: LoggerService) {}

myMethod() {
  this.logger.log('This is message');
  this.logger.warn('This is warning');
  this.logger.error('This is error','This is tracing' | {key: value});
}
```
### ReportService
```typescript
constructor(private readonly report: ReportService) {}

myMethod() {
  this.report.send({key: value, key2: value2});
}

```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

**Syukur [LinkedIn](https://www.linkedin.com/in/syukurilexs/)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
