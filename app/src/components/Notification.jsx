export const Notification = ({ message }) => {
  return (
    message && <div className='error-msg'> Mensaje: {message}</div>
  )
}
