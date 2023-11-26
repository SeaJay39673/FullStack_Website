import { useSessionStorage } from 'react-storage-complete'
import ApiUrl from '../helpers/ApiUrl'
export default function AddComment ({ state, postId, setRender = f => f }) {
  const [add, setAdd] = useSessionStorage('CommentAdd', false)
  const [comment, setComment] = useSessionStorage('CommentMessage', '')
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
  const AddComment = async () => {
    if (comment !== '') {
      setComment('')
      setAdd(false)
      await fetch(`${ApiUrl}/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: postId,
          user: state.account._id,
          content: comment
        })
      })
      setRender(true)
    }
  }
  return (
    <div className='banner col-10 mx-auto'>
      {state.account.id !== null && (
        <form
          className={`row rounded add ${add ? 'p-3' : ''}`}
          style={{ marginBlock: '10px' }}
          onSubmit={e => {
            e.preventDefault()
            AddComment()
          }}
        >
          {!add && (
            <button className='btn btn-success' onClick={() => setAdd(true)}>
              Add Commetn
            </button>
          )}
          {add && (
            <div>
              <div className='col-lg-2 mx-auto'>
                <h1>Ad</h1>
              </div>
              <div className='p-3'>
                <label className='form-label'>Commetn</label>
                <input
                  type='paragraph'
                  className='form-control'
                  value={comment}
                  onInput={e => setComment(e.target.value)}
                />
              </div>
              <table style={{ width: '100%' }}>
                <tr>
                  <th>
                    <button type='submit' className='btn btn-success'>
                      Sumbit
                    </button>
                  </th>
                  <th style={{ textAlign: 'right' }}>
                    <button
                      className='btn btn-success'
                      onClick={() => {
                        setAdd(false)
                        setComment('')
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
