import React from 'react'
import { useNavigate } from 'react-router'
import { IoLogOut } from 'react-icons/io5'
import { IoLogIn } from 'react-icons/io5'

export default function LoggedButton ({ loggedIn = false, setState = f => f }) {
  const navigate = useNavigate()
  const log = () => {
    if (loggedIn) {
      setState({})
    }
    navigate('/')
  }
  return (
    <button className='btn' onClick={() => log()}>
      {loggedIn && (
        <div>
          <IoLogOut size={40} />
          <p>Logoute</p>
        </div>
      )}
      {!loggedIn && (
        <div>
          <IoLogIn size={40} />
          <p>Login</p>
        </div>
      )}
    </button>
  )
}
