import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonShowLabel = 'default buttonLabel text' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonShowLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <div style={{ marginTop: '2rem' }}>
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonShowLabel: PropTypes.string.isRequired
}

export { Togglable }
