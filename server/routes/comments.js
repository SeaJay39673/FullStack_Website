import express from 'express'

import Account from '../schemas/AccountModel'
import Comment from '../schemas/CommentModel'
import Post from '../schemas/PostModel'

const router = express.Router()

router.get('/:_id', async (req, res) => {
  const comments = await Comment.find({ post: req.params._id })
  const supplementComment = async comment => {
    const result = await Account.findById(comment.user)
    const { password, _id, ...account } = result._doc
    return {
      ...comment._doc,
      ...{
        ...account,
        profile:
          'data:image/png;base64,' +
          Buffer.from(account.profile, 'base64').toString('base64')
      }
    }
  }
  const result = await Promise.all(comments.map(x => supplementComment(x)))
  res.status(200).json(result)
})

router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      post: req.body.post,
      user: req.body.user,
      content: req.body.content,
      date: new Date()
    })
    let post = await Post.findById(req.body.post)
    post.comments = [comment._id, ...post.comments]
    const updatedPost = await post.save()
    res.status(200).json(comment)
  } catch (e) {
    console.log(e)
    res.status(400).json({})
  }
})

export default router
