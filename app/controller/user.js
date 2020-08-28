'use strict';
const md5 = require('md5');
const BaseController = require('./base.js');
const jwt = require('jsonwebtoken');

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
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误');
    }
    if (await this.checkEmail(email)) {
      return this.error('邮箱重复');
    }
    const res = await ctx.model.User.create({
      email,
      nickname,
      passwd: md5(passwd + HashSalt),
    });
    if (res._id) {
      return this.message('注册成功');
    }
  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }
  async login () {
    const { ctx, app } = this;
    const { email, captcha, passwd } = ctx.request.body;
    console.log('email', email)
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误');
    }
    const user = await this.ctx.model.User.findOne({
      email,
      passwd: md5(passwd + HashSalt)
    });
    if (!user) { 
      return this.error('账号密码错误');
    }
    const token = jwt.sign({
      _id: user._id,
      email,
    }, app.config.jwt.secret, {
      expiresIn: '1h',
    })
    this.success({
      email,
      nickname: user.nickname,
      token,
    })
   }
  async info() { return this.message('注册成功'); }
  async verify() { return this.message('注册成功'); }
}

module.exports = UserController;
