const Note = ({ note, toggleImportance, deleteNote }) => {
  const labelImportance = note.important ? 'make NOT important' : 'make important!'
  const impColor = note.important ? 'red' : 'green'
  return (
    <div className="note">
      <h2 style={{ color: impColor }}>{note.content}</h2>
      <div>{note.id}</div>
      <div>{ note.userId }</div>
      <time>{ note.date }</time>
      <small>{note.body}</small>
      <br/>
      <button style={{ marginTop: '1rem' } } onClick={toggleImportance}>{labelImportance}</button>
      <br/>
      <button style={{
        backgroundColor: 'red',
        color: 'white',
        marginTop: '1rem'
      }} onClick={deleteNote}>Borrar Nota</button>
    </div>
  )
}

export default Note
