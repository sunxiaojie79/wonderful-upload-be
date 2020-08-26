'use strict';

const BaseController = require('./base.js');

const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
};
class UserController extends BaseController {
  async register() {
    const { ctx } = this;
    try {
      ctx.validate(createRule);
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors);
    }
    const { captcha } = ctx.request.body;
    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      return this.message('注册成功');
    }
    return this.error('验证码错误');

  }
  async login() { return this.message('注册成功'); }
  async info() { return this.message('注册成功'); }
  async verify() { return this.message('注册成功'); }
}

module.exports = UserController;
