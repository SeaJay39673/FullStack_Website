import React from 'react'
import { useNavigate } from 'react-router'
import { BsArrowLeftSquareFill } from 'react-icons/bs'

export default function NotFound ({}) {
  const navigate = useNavigate()
  return (
    <div>
      <button className='btn' onClick={() => navigate(-1)}>
        <BsArrowLeftSquareFill size={40} />
        <p>Back</p>
      </button>
      <div style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <h2>- Not Found -</h2>
      </div>
    </div>
  )
}
