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

router.post('/update:_id', async (req, res) => {
  let account = await Account.findById(req.params._id)
  account.profile = Buffer.from(req.body.profile.split(',')[1], 'base64')
  account.name = req.body.name !== '' ? req.body.name : account.name
  account.bio = req.body.bio
  account.password =
    req.body.password !== '' ? req.body.password : account.password
  const savedAccout = await account.save()
  const { password, ...returnAccount } = savedAccout._doc
  const result = {
    ...returnAccount,
    profile:
      'data:image/png;base64,' +
      Buffer.from(account.profile, 'base64').toString('base64')
  }
  res.status(200).json(result)
})

export default router
