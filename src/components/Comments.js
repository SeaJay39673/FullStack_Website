import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PartialPost from './PartialPost'
import Comment from './Comment'
import AddComment from './AddComment'
import { BsArrowLeftSquareFill } from 'react-icons/bs'
import { useSessionStorage } from 'react-storage-complete'
import ApiUrl from '../helpers/ApiUrl'

export default function Comments ({ state }) {
  const location = useLocation()
  const { post } = location.state
  const [comments, setComments] = useSessionStorage('Comments', [])
  const [render, setRender] = useState(false)
  const navigate = useNavigate()

  const getComments = async () => {
    const response = await fetch(`${ApiUrl}/api/comments/${post._id}`)
    const data = await response.json()
    setComments(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
  }

  useEffect(() => {
    getComments()
    return () => {
      setRender(false)
    }
  }, [render])

  return (
    <div className='row'>
      <div className='col-lg-6 mx-auto p-3'>
        <button className='btn' onClick={() => navigate(-1)}>
          <BsArrowLeftSquareFill size={40} />
        </button>
        <div style={{ marginBottom: '10px' }} className='contrast rounded p-3'>
          <PartialPost post={post} />
        </div>
        <div style={{ backgroundColor: 'grey' }} className='rounded'>
          <h1 style={{ textAlign: 'center' }}>Commetn's</h1>
          <AddComment state={state} postId={post._id} setRender={setRender} />
          {comments.map((comment, i) => (
            <Comment key={i} comment={comment} setComments={setComments} />
          ))}
        </div>
      </div>
    </div>
  )
}
