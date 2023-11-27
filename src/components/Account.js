import React from 'react'
import { BsArrowLeftSquareFill, BsGearFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import Posts from './Posts'
import LoggedButton from '../helpers/LoggedButton'

export default function Account ({ state, setState }) {
  const navigate = useNavigate()
  const settings = () => {
    navigate('/Settings')
  }
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tr>
          <th>
            <button className='btn' onClick={() => navigate(-1)}>
              <BsArrowLeftSquareFill size={40} />
              <p>Back</p>
            </button>
          </th>
          <th style={{ textAlign: 'right' }}>
            <button className='btn'>
              <BsGearFill size={40} onClick={() => settings()} />
              <p>Settin's</p>
            </button>
            <LoggedButton
              loggedIn={(state.account?._id ?? null) !== null}
              setState={setState}
            />
          </th>
        </tr>
      </table>
      <div className='row'>
        <div style={{ textAlign: 'center' }} className='col-lg-4 mx-auto'>
          <img
            className='rounded'
            width={300}
            height={300}
            src={state.account.profile}
          />
          <h1>{state.account.name}</h1>
          <p>{state.account.bio}</p>
        </div>
        <Posts state={state} account={true} />
      </div>
    </div>
  )
}
