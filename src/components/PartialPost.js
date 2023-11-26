import React from 'react'

export default function PartialPost ({ post }) {
  return (
    <div>
      <div className='row'>
        <div className='col-lg-2 p-3'>
          <img
            className='rounded'
            style={{ width: '100px', height: '100px' }}
            src={post.profile}
            alt=''
          />
        </div>
        <h2
          className='col-lg-6'
          style={{ marginLeft: 40, display: 'flex', alignItems: 'center' }}
        >
          {post.name}
        </h2>
      </div>
      {post.image !== null && (
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <img
              className='rounded'
              width={600}
              height={400}
              src={post.image}
            />
          </div>
        </div>
      )}
      <p>{post.caption}</p>
    </div>
  )
}
