
import React from 'react'
import { useSelector, connect } from 'react-redux'

const Notification = ({ notification }) => {
  // const notification = useSelector(({notification})=>notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return notification.trim().length !== 0 && (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification