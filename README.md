# Serverless application with AWS

### Install

Requires Node.js 8+

Install the dependencies and devDependencies.

```sh
$ npm install -g serverless
$ sls dynamodb install # run in api directory
$ npm install # run in api and web directory
```

### Development

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ cd api
$ sls offline server --migrate
```

Second Tab:
```sh
$ cd web
$ npm run dev
```

### Presentation about serverless

http://slides.com/sergeytkalych/deck-7/fullscreen