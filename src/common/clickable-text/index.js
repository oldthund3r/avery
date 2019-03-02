import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const ClickableText = ({ className, clickHandler, text }) => (
  <span
    className={className ? `clickable-text ${className}` : 'clickable-text'}
    onClick={clickHandler}
    onKeyPress={e => (e.key === 'Enter' ? clickHandler() : false)}
    role="button"
    tabIndex="0"
  >
    {text}
  </span>
)

ClickableText.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  className: PropTypes.string
}

ClickableText.defaultProps = {
  className: ''
}

export default ClickableText
