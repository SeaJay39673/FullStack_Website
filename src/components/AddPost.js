import { useSessionStorage } from 'react-storage-complete'

export default function AddPost ({ state, addPost = f => f }) {
  const [message, setMessage] = useSessionStorage('PostMessage', '')
  const [image, setImage] = useSessionStorage('PostImage', null)
  const [add, setAdd] = useSessionStorage('PostAdd', false)
  const openPost = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setAdd(true)
  }

  const buildPost = () => {
    if (image !== null || message !== '') {
      addPost({ image: image, message: message })
    }
    clearForm()
  }

  const clearForm = () => {
    setAdd(false)
    setImage(null)
    setMessage('')
  }
  const id = state.account?._id ?? null

  return (
    <div style={{ zIndex: 9999 }} className='banner'>
      {id !== null && (
        <form
          style={{ marginBlock: '10px' }}
          className={`row rounded add ${add ? 'p-3' : ''}`}
          onSubmit={e => {
            e.preventDefault()
            buildPost()
          }}
        >
          {!add && (
            <button
              className='btn btn-success banner'
              onClick={() => openPost()}
            >
              Add Post
            </button>
          )}
          {add && (
            <div>
              <div className='col-lg-2 mx-auto'>
                <h1>Ad</h1>
              </div>
              <div className='p-3'>
                <label className='form-label'>Capiton</label>
                <input
                  className='form-control'
                  type='paragraph'
                  value={message}
                  onInput={e => setMessage(e.target.value)}
                />
              </div>
              <div>
                <input
                  type='file'
                  accept='image/*'
                  className='form-control'
                  onInput={e => setImage(e.target.files[0])}
                />
              </div>
              <table style={{ width: '100%' }}>
                <tr>
                  <th>
                    <button
                      type='submit'
                      style={{ marginTop: '10px' }}
                      className='btn btn-success col'
                    >
                      Sumbit Post
                    </button>
                  </th>
                  <th style={{ textAlign: 'right' }}>
                    <button
                      style={{ marginTop: '10px' }}
                      className='btn btn-success col'
                      onClick={() => {
                        clearForm()
                      }}
                    >
                      Nevermind
                    </button>
                  </th>
                </tr>
              </table>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
