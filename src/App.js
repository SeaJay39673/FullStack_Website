import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { useSessionStorage } from 'react-storage-complete'

import Login from './components/Login'
import Posts from './components/Posts'
import Comments from './components/Comments'
import Account from './components/Account'
import { set } from 'mongoose'

export default function App () {
  const [state, setState] = useSessionStorage('State', {})
  return (
    <>
      <Routes>
        <Route path='/' element={<Login state={state} setState={setState} />} />
        <Route path='/Posts' element={<Posts state={state} />} />
        <Route path='/Comments' element={<Comments state={state} />} />
        <Route
          path='/Account'
          element={<Account state={state} setState={setState} />}
        />
      </Routes>
    </>
  )
}
