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

## Usage to writing log to Elasticsearch and Console
Import `LoggerModule`:

```typescript
imports: [
  LoggerModule.register({
    elasticsearch: { node: 'http://localhost:9200', prefix: 'log-syukur' },
  }),
],
```

## Usage for Async method to writing log to Elasticsearch and Console
Import `LoggerModule`:

```typescript
imports: [
  LoggerModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      return {
        elasticsearch: { node: config.get('URL'), prefix: 'log-syukur' },
      };
    },
    inject: [ConfigService],
  }),
],
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

**Syukur**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.