import { useState, useEffect } from 'react'
import '../style.scss'
import Note from './Note'
import { Notification } from './Notification'
// import { getAllNotes } from "../services/notes/getAllNotes"
// import { createNote } from "../services/notes/createNote"
import { create as createNote, getAll as getAllNotes, update as updateNote, deleteNote, setToken } from '../services/notes'
import loginService from '../services/login'
import { LoginForm } from './LoginForm'
import { NoteForm } from './NoteForm'
// import { Togglable } from './Togglable'

export default function App (props) {
  const [notes, setNotes] = useState([])

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [loading, setLoading] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then((notes) => {
        setNotes(notes)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const addNote = (noteToAddToState) => {
    const { token } = user

    createNote(noteToAddToState, { token })
      .then((data) => {
        setNotes([...notes, data])
      })
  }

  const toggleImportanceOf = (noteId) => {
    const noteToUpdate = notes.find((note) => note.id === noteId)
    const noteUpdated = {
      ...noteToUpdate,
      important: !noteToUpdate.important
    }

    updateNote(noteUpdated)
      .then((data) => {
        setNotes(notes.map((note) => note.id === data.id ? data : note))
      })
      .catch((error) => {
        console.log(error)
      })
    // console.log('new Note', noteUpdated)
  }

  const removeNote = (noteId) => {
    deleteNote(noteId)
      .then((data) => {
        setNotes(notes.filter((note) => note.id !== noteId))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      setUser(user)
      setToken(user.token)
      // setUserName('')
      // setPassword('')

      // console.log(user)
    } catch (error) {
      setErrorMessage('Invalid user')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // console.error( error )
    }
  }

  const handleLogOut = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Aplicación Notas</h1>

      <Notification message={errorMessage} />
      {/* <p>{props.children}</p> */}
      <div>
        {
          user
            ? <NoteForm
                handleLogOut={handleLogOut}
                addNote={addNote}
              />
            : <LoginForm
                username={username}
                password={password}
                setUserName={(event) => setUserName(event.target.value)}
                setPassword={(event) => setPassword(event.target.value)}
                handleSubmit={handleLoginSubmit}
              />
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
