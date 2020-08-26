'use strict';
const md5 = require('md5');
const BaseController = require('./base.js');

const HashSalt = 'jiadianyanba';
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
    const { email, captcha, nickname, passwd } = ctx.request.body;
    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      if (await this.checkEmail(email)) {
        this.error('邮箱重复');
      } else {
        const res = await ctx.model.User.create({
          email,
          nickname,
          passwd: md5(passwd + HashSalt),
        });
        if (res._id) {
          return this.message('注册成功');
        }
      }
    }
    return this.error('验证码错误');

  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }
  async login() { return this.message('注册成功'); }
  async info() { return this.message('注册成功'); }
  async verify() { return this.message('注册成功'); }
}

module.exports = UserController;
