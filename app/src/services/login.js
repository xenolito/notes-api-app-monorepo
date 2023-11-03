import axios from 'axios'
const apiBaseUrl = '/api/login'
// const apiBaseUrl = 'https://evening-castle-33015-33fd40ba3c3e.herokuapp.com/api/login'

const login = async (credentials) => {
  const { data } = await axios.post(apiBaseUrl, credentials)
  return data
}

export default { login }
