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
      noise: 3,
    });
    console.log('captcha', captcha.text);
    const { ctx } = this;
    ctx.response.type = 'image/svg+xml';
    ctx.session.captcha = captcha.text;
    ctx.body = captcha.data;
  }

  async sendcode() {
    const { ctx } = this;
    const email = ctx.query.email;
    const code = Math.random().toString().slice(2, 6);
    console.log('邮箱：' + email + '验证码：' + code);
    ctx.session.emmailcode = code;
    const subject = '开课吧验证码';
    const text = '';
    const html = `<h2>小开社区</h2><a href="https://kaikeba.com"><span>${code}</span></a>`;
    const hasSend = await this.service.tools.sendEmail(email, subject, text, html);
    if (hasSend) {
      this.message('发送成功');
    } else {
      this.error('发送失败');
    }
  }
}

module.exports = UtilsController;
