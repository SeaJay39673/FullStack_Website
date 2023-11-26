import React from 'react'
import { useNavigate } from 'react-router'

export default function Menu ({ filter, setFilter = f => f }) {
  const navigate = useNavigate()
  return (
    <div className='row p-4'>
      <div className='col-lg-6 mx-auto rounded p-3 contrast'>
        <h1 style={{ textAlign: 'center' }}>Fitler</h1>
        <form className='row'>
          <div className='col'>
            <input
              type='radio'
              checked={filter.status === 'Dates'}
              onChange={() => setFilter({ status: 'Dates' })}
            />
            <label>Daets</label>
          </div>
          <div className='col'>
            <input
              type='radio'
              checked={filter.status === 'Likes'}
              onChange={() => setFilter({ status: 'Likes' })}
            />
            <label>Lieks</label>
          </div>
          <div className='col'>
            <input
              type='radio'
              checked={filter.status === 'Dislikes'}
              onChange={() => setFilter({ status: 'Dislikes' })}
            />
            <label>Dislieks</label>
          </div>
          <div className='col'>
            <input
              type='radio'
              checked={filter.status === 'Comments'}
              onChange={() => setFilter({ status: 'Comments' })}
            />
            <label>Commetns</label>
          </div>
        </form>
      </div>
    </div>
  )
}
