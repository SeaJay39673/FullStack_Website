import React, { useState } from 'react'

import axios from 'axios'

import { BsArrowLeftSquareFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { IoMdRefresh } from 'react-icons/io'
import ApiUrl from '../helpers/ApiUrl'

export default function Settings ({ state, setState }) {
  const navigate = useNavigate()
  const [bio, setBio] = useState(state.account.bio)
  const [name, setName] = useState(state.account.name)
  const [password, setPassword] = useState('')
  const [profile, setProfile] = useState(state.account.profile)
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const updateProfile = file => {
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfile(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const refresh = () => {
    setBio(state.account.bio)
    setName(state.account.name)
    setPassword('')
    setProfile(state.account.profile)
    setFile(null)
  }

  const updateAccount = async () => {
    const response = await fetch(
      `${ApiUrl}/api/account/update${state.account._id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: bio,
          name: name,
          password: password,
          profile: profile
        })
      }
    )
    if (response.ok) {
      const data = await response.json()
      setState({
        ...{
          ...state,
          account: data
        }
      })
      navigate(-1)
    }
  }

  return (
    <div>
      <table width={'100%'}>
        <tr>
          <th>
            <button className='btn' onClick={() => navigate(-1)}>
              <BsArrowLeftSquareFill size={40} />
              <p>Accoutn</p>
            </button>
          </th>
        </tr>
      </table>
      <div className='row'>
        <div style={{ textAlign: 'center' }} className='col-lg-4 mx-auto'>
          <img className='rounded' width={300} height={300} src={profile} />
          <h1>{name}</h1>
          <p>{bio}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 mx-auto contrast rounded p-3'>
          <h3 style={{ textAlign: 'center' }}>Updat Accoutn</h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              updateAccount()
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <button className='btn'>
                <IoMdRefresh size={40} onClick={() => refresh()} />
                <p>refersh</p>
              </button>
            </div>
            {errorMessage !== '' && (
              <p className='text-danger'>{errorMessage}</p>
            )}
            <div>
              <label className='form-label'>Name</label>
              <input
                className='form-control'
                value={name}
                onInput={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className='form-label'>Bio</label>
              <input
                className='form-control'
                value={bio}
                onInput={e => setBio(e.target.value)}
              />
            </div>
            <div>
              <label className='form-label'>Profile</label>
              <input
                type='file'
                accept='image/*'
                className='form-control'
                onInput={e => updateProfile(e.target.files[0])}
              />
            </div>
            <div>
              <label className='form-label'>Password</label>
              <input
                className='form-control'
                value={password}
                onInput={e => setPassword(e.target.value)}
              />
            </div>
            <div className='row p-3'>
              <button
                type='submit'
                className='btn btn-success col-lg-10 mx-auto'
              >
                Sumbit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
