import React from 'react'

export default function Comment ({ comment, setComments = f => f }) {
  return (
    <div style={{ marginBottom: '10px' }} className='contrast rounded p-3'>
      <div className='row'>
        <div className='col-lg-1 p-3'>
          <img
            className='rounded'
            style={{ width: '50px', height: '50px' }}
            src={comment.profile}
            alt=''
          />
        </div>
        <h4
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center'
          }}
          className='col-lg-5'
        >
          {comment.name}
        </h4>
      </div>
      <p>{comment.content}</p>
    </div>
  )
}
