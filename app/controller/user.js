'use strict';

const BaseController = require('./base.js');

class UserController extends BaseController {
  async register() {
    return this.message('注册成功');
  }
  async login() { return this.message('注册成功'); }
  async info() { return this.message('注册成功'); }
  async verify() { return this.message('注册成功'); }
}

module.exports = UserController;
