import React from 'react'

import { useEffect } from 'react'
import { useSessionStorage } from 'react-storage-complete'
import { MdAccountCircle } from 'react-icons/md'

import Menu from './Menu.js'
import Post from './Post'
import AddPost from './AddPost.js'
import ApiUrl from '../helpers/ApiUrl.js'
import { useNavigate } from 'react-router'

export default function Posts ({ state, account }) {
  const [posts, setPosts] = useSessionStorage('Posts', [])
  const [filter, setFilter] = useSessionStorage('Filter', { status: 'Dates' })
  const [render, setRender] = useSessionStorage('Render', false)
  const navigate = useNavigate()
  const supplementPosts = async (post, callback) => {
    const response = await fetch(`${ApiUrl}/api/account/${post.user}`)
    if (response.ok) {
      const data = await response.json()
      return {
        ...post,
        ...data
      }
    }
    return post
  }

  const getPosts = async () => {
    const response = await fetch(
      `${ApiUrl}/api/posts/${account ? state.account._id : ''}`
    )
    if (response.ok) {
      const data = await response.json()
      const posts = await Promise.all(data.map((x, i) => supplementPosts(x)))
      switch (filter.status) {
        case 'Likes':
          setPosts(posts.sort((a, b) => b.likes.length - a.likes.length))
          break
        case 'Dislikes':
          setPosts(posts.sort((a, b) => b.dislikes.length - a.dislikes.length))
          break
        case 'Comments':
          setPosts(posts.sort((a, b) => b.comments.length - a.comments.length))
          break
        case 'Dates':
          setPosts(posts.sort((a, b) => new Date(b.date) - new Date(a.date)))
          break
        default:
          setPosts(posts)
      }
    }
  }
  useEffect(() => {
    getPosts()
    return () => {
      setRender(false)
    }
  }, [filter, render])

  const addPost = newPost => {
    let body = {
      user: state.account._id,
      image: null,
      caption: newPost.message
    }
    const uploadPost = async () => {
      await fetch(`${ApiUrl}/api/posts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      setRender(true)
    }
    if (newPost.image?.name ?? null) {
      const reader = new FileReader()
      reader.onloadend = () => {
        body.image = reader.result
        uploadPost()
      }
      reader.readAsDataURL(newPost.image)
    } else {
      uploadPost()
    }
  }

  return (
    <div>
      {!account && (
        <div>
          <table style={{ width: '100%' }}>
            <tr>
              <th style={{ textAlign: 'center' }}></th>
              <th style={{ textAlign: 'right' }}>
                <button className='btn' onClick={() => navigate('/Account')}>
                  <MdAccountCircle size={40} />
                  <p>Accoutn</p>
                </button>
              </th>
            </tr>
          </table>
          <div className='row'>
            <h1 className='col-lg-3 mx-auto m-3'>Lobter Biskueue</h1>
          </div>
        </div>
      )}
      <Menu filter={filter} setFilter={setFilter} />
      <div className='row'>
        <div
          style={{ backgroundColor: 'grey' }}
          className='col-lg-6 mx-auto p-3 rounded'
        >
          <h1 style={{ textAlign: 'center' }}>Post's</h1>
          <AddPost state={state} addPost={addPost} />
          {posts.map((post, i) => (
            <Post key={i} post={post} state={state} setRender={setRender} />
          ))}
        </div>
      </div>
    </div>
  )
}
