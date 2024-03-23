
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Environment](#environment)
    * [Infrastructure](#infrastructure)
    * [Database](#database)
    * [Running the app](#running-the-app)
* [Documentation](#documentation)

<!-- GETTING STARTED -->
## Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Have **node** and **nvm** installed. Use version **18**.
```bash
$ nvm use 18.16.0
```
Install **make** (optional)
```bash
$ apt-get update
```
```bash
$ apt-get install make
```
_or_
```bash
$ apt-get install --reinstall make
```

### Installation

1. Clone repository
```bash
$ git clone git@
```
2. Install dependencies
```bash
$ make deps
```
_or_
```bash
$ npm install
```

### Environment
Create an `.env` file with these variables in the root directory
```
ENV_KEY
NODE_ENV
```

### Infrastructure

```bash
$ make start_infrastructure
```
_or_
```bash
$ npm run docker:env
```

### Database

1. Connect to postrgres with `pgAdmin` through the URL `http://localhost:5050` or your `IDE` and create the databases with names `skeleton-api` and `skeleton-api-test`
2. Run migrations
```bash
$ make migrations
```
_or_
```bash
$ npm run typeorm:migration:run
```
3. Run seeds
```bash
$ make seeds
```
_or_
```bash
$ npm run typeorm:seed:run
```

### Running the app
```bash
$ make start
```
_or_
```bash
$ npm run start:dev
```

<!-- DOCUMENTATION -->
## Documentation
-  [NestJS](https://docs.nestjs.com/)
