let user

const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
// console.log(loggedUserJSON)

if (loggedUserJSON) {
  user = JSON.parse(loggedUserJSON)
  // console.log(user)
} else user = null

export { user }
