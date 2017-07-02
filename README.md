# gulp-crypto-js

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/gulp-crypto-js.svg)](https://greenkeeper.io/)

gulp plugin for crypto-js

## Installation

```bash
npm install gulp-crypto-js --save-dev
```

or if you are using **yarn**

```bash
yarn add gulp-crypto-js --dev
```

## Usage

#### Encrypt
```javascript
const cryptoJs =  require('gulp-crypto-js');
gulp.task('encrypt', function () {
  return gulp
    .src([
      path.join('./src','*.js')
    ])
    .pipe(cryptoJs({algorithm: 'AES', action: 'encrypt', key: 'YOUR_PRIVATE_KEY'}))
    .pipe(gulp.dest('./dist'));
});
```

#### Decrypt
```javascript
const cryptoJs =  require('gulp-crypto-js');
gulp.task('decrypt', function () {
  return gulp
    .src([
      path.join('./src','*.js')
    ])
    .pipe(cryptoJs({algorithm: 'AES', action: 'decrypt', key: 'YOUR_PRIVATE_KEY'}))
    .pipe(gulp.dest('./dist'));
});
```
