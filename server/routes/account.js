import express from 'express'

import Account from '../schemas/AccountModel.js'
import PostModel from '../schemas/PostModel.js'
import CommentModel from '../schemas/CommentModel.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const target = await Account.findOne({
    username: req.body.username,
    password: req.body.password
  })
  if (!target) {
    res.status(400).json({ error: 'Invalid username or password' })
  } else {
    const { password, ...account } = target._doc
    const result = {
      ...account,
      profile:
        'data:image/png;base64,' +
        Buffer.from(account.profile, 'base64').toString('base64')
    }
    res.status(200).json({ account: result })
  }
})

router.post('/signUp', async (req, res) => {
  try {
    const account = await Account.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    })
    const { password, ...result } = account._doc
    res.status(200).json({ account: result })
  } catch (e) {
    res.status(400).json({ error: 'Username already taken' })
  }
})

router.get('/:_id', async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params._id })
    const response = {
      name: account.name,
      profile:
        'data:image/png;base64,' +
        Buffer.from(account.profile, 'base64').toString('base64')
    }
    res.status(200).json(response)
  } catch (e) {
    res.status(404).json({ error: 'error getting account by id' })
  }
})

export default router
