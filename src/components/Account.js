import React from 'react'
import { BsArrowLeftSquareFill, BsGearFill } from 'react-icons/bs'
import { BsFillGearFill } from 'react-icons/bs'
import { IoLogOut } from 'react-icons/io5'
import { useNavigate } from 'react-router'
import Posts from './Posts'

export default function Account ({ state, setState }) {
  const navigate = useNavigate()
  const logout = () => {
    setState({})
    navigate('/')
  }
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tr>
          <th>
            <button className='btn' onClick={() => navigate('/Posts')}>
              <BsArrowLeftSquareFill size={40} />
              <p>Post's</p>
            </button>
          </th>
          <th style={{ textAlign: 'right' }}>
            <button className='btn'>
              <BsGearFill size={40} />
              <p>Settin's</p>
            </button>
            <button className='btn' onClick={() => logout()}>
              <IoLogOut size={40} />
              <p>Logoute</p>
            </button>
          </th>
        </tr>
      </table>
      <div className='row'>
        <div style={{ textAlign: 'center' }} className='col-lg-4 mx-auto'>
          <h1>{state.account.name}</h1>
          <img
            className='rounded'
            width={300}
            height={300}
            src={state.account.profile}
          />
          <p>{state.account.bio}</p>
        </div>
        <Posts state={state} account={true} />
      </div>
    </div>
  )
}
