const Button = ({label,handler}) => {
  return (
    <button
        className='button'
        onSubmit={handler}
        >{label}</button>
  )
}

export default Button;