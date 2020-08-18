'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');
class UtilsController extends Controller {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise:3,
    });
    console.log('captcha', captcha.text);
    const { ctx } = this;
    ctx.response.type = 'image/svg+xml';
    ctx.session.captcha = captcha.text;
    ctx.body = captcha.data;
  }
}

module.exports = UtilsController;
