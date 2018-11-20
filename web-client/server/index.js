const express = require('express')
const path = require('path')

const app = express()
const router = express.Router()

const dist = path.resolve(__dirname, '..', 'dist', 'web-client')

router.use(express.static(dist))

router.get('**', (req, res) => res.sendFile('index.html', { root: dist }))

app.use(router)

app.listen(80, () => {
  console.log('Server has been started on port 80')
})
