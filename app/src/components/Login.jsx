import { useEffect, useState } from 'react'
import { LoginForm } from './LoginForm'
import loginService from '../services/login'
// import { setToken } from '../services/notes'
import { Notification } from './Notification'
import { useNavigate } from 'react-router-dom'
import { user } from '../services/userLogged'

export default function Login ({ setUser }) {
  const navigate = useNavigate()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setUser(user)
  }, [setUser])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      setUser(user)
      // setToken(user.token)
      // setUserName('')
      // setPassword('')
      // console.log(user)

      navigate('/notes')
    } catch (error) {
      setErrorMessage('Invalid user')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // console.error( error )
    }
  }

  return (
    <>
      <h2>{user?.name}</h2>
      <Notification message={errorMessage} />
      <LoginForm
        username={username}
        password={password}
        setUserName={(event) => setUserName(event.target.value)}
        setPassword={(event) => setPassword(event.target.value)}
        handleSubmit={handleLoginSubmit}
      />
    </>
  )
}
