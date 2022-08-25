#  Curso de udemy por JFSS

## Comandos cli de nest para crear modulos:
```
nest g mo passenger
```
Crear Controller: 
```
nest g co passenger
```
Crear Servicio:
```
nest g s passenger
```

## Instalar swagger:
```
npm i @nestjs/swagger swagger-ui-express
```
url swagger: http://127.0.0.1:3000/api/docs/

### Agrupar rutas de cada controller: 
@ApiTags('flight')

### Resumen de cada ruta http dentro del controller:
@ApiOperation({summary: 'Create users'})

### mapear cada DTO:
@ApiProperty()

### Buscador:
en el main.ts en la configuración de swagger adicionar 'swaggerOptions' :
```
SwaggerModule.setup('/api/docs', app, documentSwagger,{
    swaggerOptions: {
      filter: true,
    }
  }
)
```

## PROTECCIÓN DE RUTAS CON JWT Y PASSPORT
```
npm i @nestjs/jwt passport-jwt
npm i @nestjs/passport passport passport-local
```
necesitamos una llave secreta para usar jwt: .env:  JWT_SECRET=JWTCl4v3S3cr3t4
duración del toiken:  .env:   EXPIRES_IN=12h
usamos el decorador: 

```

```


## crear modulo auth:
```
 npx nest g mo auth
 npx nest g co auth
 npx nest g s auth
```

## Guards 

## strategies passport:







## Installation

```bash
$ npm install
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

 
## License

Nest is [MIT licensed](LICENSE).
