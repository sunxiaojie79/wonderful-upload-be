'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');
class UtilsController extends Controller {
  async captcha() {
    const captcha = svgCaptcha.create();
    console.log(captcha)
    const { ctx } = this;
    ctx.body = captcha;
  }
}

module.exports = UtilsController;
