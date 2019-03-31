'use strict';

const Service = require('egg').Service;
const JWT = require('jsonwebtoken');

class UserService extends Service {
  async register(info) {
    const { ctx } = this;
    const result = {};
    const isUserExist = await ctx.model.User.findOne({
      userName: info.userName,
    });
    if (isUserExist) {
      result.msg = '注册的用户已存在';
    } else {
      const res = await ctx.model.User.register(info);
      result.data = res;
      result.msg = '注册成功';
    }
    return result;
  }

  async login(info) {
    const { ctx } = this;
    const result = {};
    const isUserExist = await ctx.model.User.findOne({
      userName: info.userName,
    });
    if (isUserExist) {
      const data = await ctx.model.User.findOne(signinMsg);
      if (data) {
        const token = JWT.sign({
          userName: result.userName,
        },
        this.config.jwt.secret, {
          expiresIn: 60 * 60 * 24,
        });
        result.data = data;
        result.msg = '登录成功';
        result.token = token;
      } else {
        result.msg = '错误的用户信息';
        result.data = {};
      }
    } else {
      result.msg = '用户不存在';
      result.data = {};
    }

    return result;
  }
}