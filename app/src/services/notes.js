import axios from 'axios'
// const apiBaseUrl = 'https://jsonplaceholder.typicode.com/posts'
const apiBaseUrl = '/api/notes'
// const apiBaseUrl = 'https://evening-castle-33015-33fd40ba3c3e.herokuapp.com/api/notes'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  // console.log('Token saved:', token)
}

export const create = (noteToAdd) => {
  // console.log(noteToAdd, token)

  const config = {
    headers: {
      Authorization: token
    }
  }

  return axios.post(apiBaseUrl, noteToAdd, config)
    .then((res) => {
      const { data } = res
      return data
    })
    .catch((e) => {
      console.log(e)
    })
}

export const getAll = () => {
  return axios.get(apiBaseUrl)
    .then((response) => {
      // console.log(response)
      const { data } = response
      return data
    })
}

export const update = (noteToUpdate) => {
  const url = `${apiBaseUrl}/${noteToUpdate.id}`

  const config = {
    headers: {
      Authorization: token
    }
  }

  return axios.put(url, noteToUpdate, config)
    .then((res) => {
      const { data } = res
      return data
    })
    .catch((error) => {
      console.log(error)
    })
}

export const deleteNote = (noteId) => {
  const url = `${apiBaseUrl}/${noteId}`

  const config = {
    headers: {
      Authorization: token
    }
  }

  return axios.delete(url, config)
    .then((response) => {
      const { data } = response
      return data
    })
    .catch((error) => {
      console.log(error)
    })
}
