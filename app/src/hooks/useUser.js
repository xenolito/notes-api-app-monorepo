import { useEffect, useState } from 'react'
import { user as localUser } from '../services/userLogged'
import { setToken } from '../services/notes'
// ! custom hook to get user...

const useUser = () => {
  const [user, setUser] = useState(localUser)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON)
      // console.log(localUser)
      setUser(localUser)
      setToken(localUser.token) // set the token for axios config transactions
      // navigate('/')
    }
  }, [])

  return { user, setUser }
}

export default useUser
