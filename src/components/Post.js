import React from 'react'
import { GiCrabClaw } from 'react-icons/gi'
import CrabMessage from '../misc/CrabMessage'
import { useNavigate } from 'react-router-dom'
import PartialPost from './PartialPost'
import ApiUrl from '../helpers/ApiUrl'

export default function Post ({ post, state, setRender = f => f }) {
  const navigate = useNavigate()
  const id = state.account?._id ?? null
  const disabled = id === null

  const updatePost = async body => {
    await fetch(`${ApiUrl}/api/posts/update/${post._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    setRender(true)
  }

  const onLike = () => {
    updatePost({
      method: 'Like',
      _id: id
    })
  }

  const onDislike = () => {
    updatePost({
      method: 'Dislike',
      _id: id
    })
  }

  const onComment = () => {
    navigate('/Comments', { state: { post: post } })
  }

  let numLikes = post.likes.length
  let numDislikes = post.dislikes.length
  let numComments = post.comments.length

  return (
    <div style={{ marginBottom: '10px' }} className='contrast rounded p-3'>
      <PartialPost post={post} />
      <div className='row'>
        <div className='col-lg-1'>
          <button className='btn' onClick={() => onLike()} disabled={disabled}>
            {post.likes.includes(id) ? (
              <GiCrabClaw
                className='clawLike'
                size={40}
                style={{ color: '#fb551c' }}
              />
            ) : (
              <GiCrabClaw className='clawLike' size={40} />
            )}
          </button>
          <h6 style={{ textAlign: 'center' }}>
            {numLikes > 1000 ? numLikes / 1000 + 'k' : numLikes}
          </h6>
        </div>
        <div className='col-lg-1'>
          <button
            className='btn'
            onClick={() => onDislike()}
            disabled={disabled}
          >
            {post.dislikes.includes(id) ? (
              <GiCrabClaw
                className='clawDislike'
                size={40}
                style={{ color: '#fb551c' }}
              />
            ) : (
              <GiCrabClaw className='clawDislike' size={40} />
            )}
          </button>
          <h6 style={{ textAlign: 'center' }}>
            {numDislikes > 1000 ? numDislikes / 1000 + 'k' : numDislikes}
          </h6>
        </div>
        <div className='col-lg-1'>
          <button className='btn' onClick={() => onComment()}>
            <CrabMessage size={40} />
          </button>
          <h6 style={{ textAlign: 'center' }}>
            {numComments > 1000 ? numComments / 1000 + 'k' : numComments}
          </h6>
        </div>
      </div>
    </div>
  )
}
