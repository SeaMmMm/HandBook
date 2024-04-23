import 'reflect-metadata'
import router from './router'
import * as express from 'express'

const app = express()

app.use(express.json())

// 接口逻辑
app.get('/user/info', (req, res) => {
  res.status(200).json({
    message: '用户yy',
  })
})

app.post('/user/login', (req, res) => {
  // 登陆逻辑
})

router(app)

app.listen(3000, () => {
  console.log('start listening on http://localhost:3000')
})
