import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import './loadEnvironment.js'
import Posts from './routes/posts.js'
import Account from './routes/account.js'
import Comment from './routes/comments.js'
import cors from 'cors'

import bp from 'body-parser'

import App from '../src/App.js'
import exp from 'constants'

const PORT = process.env.port || 3000
const app = express()

app.use(bp.json({ limit: '100mb' }))
app.use(bp.urlencoded({ extended: true, limit: '100mb' }))

app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }))

app.use('/api/posts', Posts)
app.use('/api/account', Account)
app.use('/api/comments', Comment)

app.use(express.static(path.join(__dirname, '../build')))

app.get('/*', (req, res) => {
  const indexFile = path.join(__dirname, '../build', 'index.html')
  const context = {}
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500)
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    )
  })
})

mongoose.connect(process.env.ATLAS_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
  })
})
