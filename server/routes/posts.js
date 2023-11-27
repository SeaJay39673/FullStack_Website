import express from 'express'
import Post from '../schemas/PostModel.js'

const router = express.Router()

router.get('/:_id', async (req, res) => {
  let posts
  if (req.params._id !== 'null') {
    posts = await Post.find({ user: req.params._id })
  } else {
    posts = await Post.find({})
  }
  const result = posts.map(x =>
    Object({
      ...x._doc,
      image:
        x._doc.image !== null
          ? 'data:image/png;base64,' +
            Buffer.from(x._doc.image, 'base64').toString('base64')
          : null
    })
  )
  res.status(200).json(result)
})

router.post('/', async (req, res) => {
  const post = await Post.create({
    user: req.body.user,
    caption: req.body.caption,
    image: req.body.image
      ? Buffer.from(req.body.image.split(',')[1], 'base64')
      : null,
    date: new Date()
  })
  res.status(200).json(post)
})

router.post('/update/:_id', async (req, res) => {
  const accountId = req.body._id
  let target = await Post.findById(req.params._id)
  switch (req.body.method) {
    case 'Like':
      target.likes = target.likes.includes(accountId)
        ? target.likes.filter(x => x !== accountId)
        : [...target.likes, accountId]
      target.dislikes = target.dislikes.includes(accountId)
        ? target.dislikes.filter(x => x !== accountId)
        : target.dislikes
      break
    case 'Dislike':
      target.dislikes = target.dislikes.includes(accountId)
        ? target.dislikes.filter(x => x !== accountId)
        : [...target.dislikes, accountId]
      target.likes = target.likes.includes(accountId)
        ? target.likes.filter(x => x !== accountId)
        : target.likes
      break
    case 'Comment':
      break
    default:
      res.status(400)
  }
  await target.save()
  res.status(200).json({})
})

export default router
