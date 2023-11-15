import { useState } from 'react'
import '../style.scss'
import Note from './Note'
import useNotes from '../hooks/useNotes'
import { NoteForm } from './NoteForm'
import { Link } from 'react-router-dom'

export default function Notes ({ user }) {
  const { notes, addNote, toggleImportance, removeNote, loading } = useNotes(user)
  const [showAll, setShowAll] = useState(true)

  const handleShowAll = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOf = (id) => {
    toggleImportance(id)
      .catch((error) => {
        console.log('la cagamos')
        console.error(error)
      })
  }

  return (
    <div>
      <h1>Aplicación Notas</h1>

      {/* <Notification message={errorMessage} /> */}
      {/* <p>{props.children}</p> */}
      <div>
        {
          user?.name
            ? <NoteForm addNote={addNote} />
            : <Link to='/login'>Add notes</Link>
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <button style={{ backgroundColor: '#0099ff', color: 'white', padding: '.5rem', borderRadius: '5px', minWidth: '100px' }} onClick={handleShowAll}>{showAll ? 'Show important' : 'Show All'}</button>

      </div>
      {
        loading ? 'cargando notas...' : ''
      }
      <div>
        {
            notes
              .filter(note => {
                if (showAll === true) return true
                return note.important === true
              })
              .map(note => <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                deleteNote={() => removeNote(note.id)}
                           />)
          }
      </div>
    </div>

  )
}
