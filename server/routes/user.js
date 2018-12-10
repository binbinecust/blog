const UserModel = require('../models/user');
const router = require('koa-router')();
const bcrypt = require('bcryptjs');

router.post('/api/signup', async (ctx, next) => {
  let { name, email, tel, password } = ctx.request.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  try {
    let result = await UserModel.create({
      name,
      email,
      tel,
      password
    });
    ctx.body = {
      result: {
        data: result
      },
      state: {
        msg: '注册成功啦，恭喜哈'
      }
    };
  } catch (err) {
    if (err.code === 11000) {
      ctx.status = 500;
      ctx.body = {
        result: {
          data: ''
        },
        state: {
          msg: '该用户已存在'
        }
      };
    }
  }
});

router.post('/api/login', async (ctx, next) => {
  const { name, password } = ctx.request.body;
  const user = await UserModel.findOne({ name });
  console.log(user);
  if (user) {
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      ctx.session.user = {
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email
      };
      ctx.body = {
        data: {},
        state: {
          msg: '登录成功'
        }
      };
    }
  } else {
    ctx.status = 500;
    ctx.body = {
      data: {},
      state: {
        msg: '用户名或密码错误'
      }
    };
  }
});

module.exports = router;

// module.exports = {
//   async signup (ctx, next) {
//     const user = {
//       name: 'liuxing',
//       email: 'chn.liuxing@gmail.com',
//       password: '123456'
//     }
//     const result = await UserModel.create(user)
//     ctx.body = result
//   }
// }
