import { Togglable } from './Togglable'

export function LoginForm (props) {
  return (
    <Togglable buttonShowLabel='Show Login'>
      <div>
        <form onSubmit={props.handleSubmit}>
          <div>
            <input
              type='text'
              value={props.username}
              name='Username'
              placeholder='Username'
              onChange={props.setUserName}
            />
          </div>
          <div>
            <input
              type='password'
              value={props.password}
              name='Password'
              placeholder='Password'
              onChange={props.setPassword}
            />
          </div>
          <button id='form-login-button'>Login</button>
        </form>
      </div>
    </Togglable>
  )
}
