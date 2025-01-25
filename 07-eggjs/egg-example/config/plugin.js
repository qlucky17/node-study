'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  bcrypt: { //user存储密码时需要用到hash,用于加密
    enable: true,
    package: 'egg-bcrypt'
  },
  jwt: { //用户鉴权
    enable: true,
    package: 'egg-jwt'
  },
};
