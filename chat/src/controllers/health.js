import express from 'express'

const router = express.Router()

router.get('/actuator/health', (req, res) => {
  res.status(200).json({
    status: 'UP'
  })
})

export default router
