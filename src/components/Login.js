import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from 'react-storage-complete'

import ApiUrl from '../helpers/ApiUrl'

export default function Login ({ state, setState = f => f }) {
  const navigate = useNavigate()

  // form fields
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  //
  const [signUp, setSignUp] = useSessionStorage('signUp', false)
  const [valid, setValid] = useSessionStorage('valid', true)
  const [invalidMessage, setInvalidMessage] = useSessionStorage(
    'invalidMessage',
    ''
  )

  const redirect = () => {
    clearFields()
    setSignUp(signUp ? false : true)
    setValid(true)
  }

  const clearFields = () => {
    setUsername('')
    setPassword('')
    setName('')
  }

  const resetPage = () => {
    clearFields()
    setSignUp(false)
    setValid(true)
  }

  const login = async (anonymous = false) => {
    if (anonymous) {
      setState({
        account: {
          id: null
        }
      })
      resetPage()
      return navigate('/Posts')
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name
      })
    }
    clearFields()
    const response = await fetch(
      `${ApiUrl}/api/account/${signUp ? 'signUp' : 'login'}`,
      options
    )
    const data = await response.json()
    if (response.ok) {
      setState(data)
      resetPage()
      navigate('/Posts')
    } else {
      setInvalidMessage(data.error)
      setValid(false)
    }
  }

  return (
    <div className='row p-3'>
      <form
        className='col-lg-6 rounded p-3 mx-auto contrast'
        onSubmit={e => {
          e.preventDefault()
          login()
        }}
      >
        <h1 style={{ textAlign: 'center' }}>{signUp ? 'Sign Up' : 'Login'}</h1>
        {!valid && <p className='text-danger'>{invalidMessage}</p>}
        {signUp && (
          <div>
            <label className='form-lable'>Full Name</label>
            <input
              className='form-control'
              type='name'
              required
              value={name}
              onInput={e => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label className='form-label'>Username</label>
          <input
            className='form-control'
            type='username'
            required
            value={username}
            onInput={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className='form-label'>Password</label>
          <input
            className='form-control'
            type='password'
            required
            value={password}
            onInput={e => setPassword(e.target.value)}
          />
        </div>
        <div className='row p-3'>
          <button type='submit' className='col-lg-6 mx-auto btn btn-success'>
            {signUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
        <table style={{ width: '100%' }}>
          <tr>
            <th>
              <button className='btnLink contrast' onClick={() => redirect()}>
                {signUp ? 'Already have an account?' : "Don't have an account?"}
              </button>
            </th>
            <th style={{ textAlign: 'right' }}>
              <button className='btnLink contrast' onClick={() => login(true)}>
                Browse Anonymously
              </button>
            </th>
          </tr>
        </table>
      </form>
    </div>
  )
}
