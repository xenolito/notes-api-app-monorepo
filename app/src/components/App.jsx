import { BrowserRouter as Router, Routes, Link, Route, Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import useNotes from '../hooks/useNotes'

import Notes from './Notes'
import NoteDetail from './NoteDetail'
import Login from './Login'
import Users from './Users'
import { Suspense } from 'react'

const Home = () => <h1>Homepage y Olé</h1>

const UsersByName = () => (<h1>Users by Name</h1>)

const App = () => {
  const { notes } = useNotes()
  const { user, setUser } = useUser()

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <Router>
      <Suspense fallback={<span>Loading component...</span>}>
        <div className='container'>
          <header style={{ display: 'flex', gap: '1rem' }}>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            <Link to='/users/byname'>Users by Name</Link>
            <Link to='/notes'>Notes</Link>
            {
          user?.name ? <div><em>logged as {user.name} </em><button onClick={handleLogOut}>Log out</button></div> : <Link to='/login'>Login</Link>
            }

          </header>
          <Routes>
            <Route
              path='/login' element={
            user ? <Navigate replace to='/' /> : <Login setUser={setUser} />
          }
            />
            <Route path='/users' element={<Users />}>
              <Route path='/users/byname' element={<UsersByName />} />
            </Route>
            <Route path='/notes' element={<Notes user={user} />} />
            <Route path='/notes/:noteId' element={<NoteDetail notes={notes} />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  )
}
export default App
