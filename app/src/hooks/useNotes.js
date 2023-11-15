import { useState, useEffect } from 'react'
import { create as createNote, getAll, update as updateNote, deleteNote } from '../services/notes'

const useNotes = (user) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
        setLoading(false)
      })
  }, [])

  const addNote = (noteToAddToState) => {
    const { token } = user

    createNote(noteToAddToState, { token })
      .then((data) => {
        setNotes([...notes, data])
      })
  }

  const toggleImportance = (noteId) => {
    const noteToUpdate = notes.find((note) => note.id === noteId)
    const noteUpdated = {
      ...noteToUpdate,
      important: !noteToUpdate.important
    }

    return updateNote(noteUpdated)
      .then((data) => {
        setNotes(notes.map((note) => note.id === data.id ? data : note))
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

  return { notes, addNote, toggleImportance, removeNote, loading }
}
export default useNotes
