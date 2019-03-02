import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ className, clickHandler, disabled, text }) => (
  <button
    type="button"
    className={className ? `button ${className}` : 'button'}
    disabled={disabled}
    onClick={clickHandler}
  >
    {text}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

Button.defaultProps = {
  className: ''
}

export default Button
