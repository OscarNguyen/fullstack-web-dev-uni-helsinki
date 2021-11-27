import React from 'react'
import classes from './Notification.module.css'
const Notification = (props) => {
  let type = null
  if (props.type === 'error') {
    type = classes.error
  } else if (props.type === 'success') {
    type = classes.success
  } else {
    type = null
  }
  if (props.type && props.children) {
    return <div className={type}>{props.children}</div>
  }
  return <div></div>
}

export default Notification
