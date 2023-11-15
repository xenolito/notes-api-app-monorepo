import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const { user } = useUser()

  const labelImportance = note.important ? 'make NOT important' : 'make important!'
  const impColor = note.important ? 'red' : 'green'
  return (
    <div className='note'>
      <Link to={`/notes/${note.id}`}>
        <h2 style={{ color: impColor }}>{note.content}</h2>
      </Link>
      <div>{note.id}</div>
      <div>{note.userId}</div>
      <time>{note.date}</time>
      <small>{note.body}</small>
      <br />
      {
        user && <button style={{ marginTop: '1rem' }} onClick={toggleImportance}>{labelImportance}</button>
      }
      <br />
      {
        user &&
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              marginTop: '1rem'
            }} onClick={deleteNote}
          >Borrar Nota
          </button>
      }
    </div>
  )
}

export default Note
