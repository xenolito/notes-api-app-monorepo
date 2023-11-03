import { useState, useRef } from 'react'
import { Togglable } from './Togglable'

export const NoteForm = ({ addNote, handleLogOut }) => {
  const [newNote, setNewNote] = useState('')

  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newNote || !newNote.length) { return }

    const noteToAddToState = {
      content: newNote,
      // body: new Date().toISOString(),
      // body: newNote,
      userId: 1,
      // important: Math.round(Math.random())
      important: false
    }

    addNote(noteToAddToState)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  // console.log(togglableRef)

  return (
    <Togglable buttonShowLabel='New Note' ref={togglableRef}>
      <h2>Create a New Note</h2>
      <form id='form-manager' onSubmit={handleSubmit}>
        <textarea id='note_content' onChange={handleChange} cols='36' rows='3' value={newNote} />
        <br />
        <button type='submit'>Crear Nota</button>
      </form>
      <button onClick={handleLogOut}>Log Out</button>
    </Togglable>
  )
}
