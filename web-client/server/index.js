const express = require('express')
const path = require('path')

const app = express()
const router = express.Router()

router.use(express.static(
  path.resolve(__dirname, '..', 'dist', 'web-client')
))

app.use(router)

app.listen(80, () => {
  console.log('Server has been started on port 80')
})
