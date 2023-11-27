import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { useSessionStorage } from 'react-storage-complete'

import Login from './components/Login'
import Posts from './components/Posts'
import Comments from './components/Comments'
import Account from './components/Account'
import { set } from 'mongoose'
import Settings from './components/Settings'
import NotFound from './components/404'

export default function App () {
  const [state, setState] = useSessionStorage('State', {})
  return (
    <>
      <Routes>
        <Route path='/' element={<Login state={state} setState={setState} />} />
        <Route
          path='/Posts'
          element={<Posts setState={setState} state={state} />}
        />
        <Route path='/Comments' element={<Comments state={state} />} />
        {(state.account?._id ?? null) !== null && (
          <Route
            path='/Account'
            element={<Account state={state} setState={setState} />}
          />
        )}
        {(state.account?._id ?? null) !== null && (
          <Route
            path='/Settings'
            element={<Settings state={state} setState={setState} />}
          />
        )}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}
