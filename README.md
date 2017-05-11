[![Build Status](https://travis-ci.org/sash-ua/gen_drift_monad-ts_a4.svg?branch=master)](https://travis-ci.org/sash-ua/gen_drift_monad-ts_a4)
[![Dependency Status](https://david-dm.org/sash-ua/gen_drift_monad-ts_a4.svg)](https://david-dm.org/sash-ua/gen_drift_monad-ts_a4t)
[![devDependencies Status](https://david-dm.org/sash-ua/gen_drift_monad-ts_a4/dev-status.svg)](https://david-dm.org/sash-ua/gen_drift_monad-ts_a4?type=dev)

## The simple web application [Modeling Genetic drift (Angular 4 + Redux (monad-ts)), demo]( https://sash-ua.github.io/gen_drift_monad-ts_a4/ ).
 
 The repo is equal to [Modeling Genetic drift  (Angular 4 + Redux (NGRX)), demo]( https://sash-ua.github
 .io/genetic-drift-a4-ngrx-last/ ) the difference is this repo to implement Redux store use State monad from
 library [Monad-ts]( https://github.com/sash-ua/monad-ts ).
 
Angular 4 web-application visualizing Genetic drift in depend of the population's size, increasing or natural population decreasing and some probability processes.

Responsive: Yes.

Used:  Angular4 + monad-ts(State monad) + TypeScript, Angular material, Rollup, D3, HammerJS, SCSS, Gulp, HTML5, CSS3.

Testing: E2E, Unit-testing.

Cross-browser compatibility: tested in Chrome latest.


# Getting Started

## Get the Code

```
git clone https://github.com/sash-ua/gen_drift_monad-ts_a4.git src
cd src\source-code
```
```
npm i
```
<i>or</i>
```
yarn
```

### Just in Time (JiT)

Launches the app

```
npm run start
```
 <i>or</i>
```
 yarn start
```

### E2E + Unit tests.

1. Run tests
```
npm run test:ci:all
```
 <i>or</i>
```
 yarn test:ci:all
```

### Unit tests. Jasmine + Karma

1. Run tests
```
npm run 1.test
```
 <i>or</i>
```
 yarn 1.test
```

2. Gen. coverage and report
```
npm run 2.test
```
 <i>or</i>
```
 yarn 2.test
```

### E2E tests. Protractor

```
npm run test:e2e
```
 <i>or</i>
```
 yarn test:e2e
```

Copyright (c) 2017 Alex Tranchenko.
