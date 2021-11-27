import React, { useState } from 'react'
import classes from './Login.module.css'
import PropTypes from 'prop-types'

import userServices from '../../services/user'

const Login = (props) => {
  const [userData, setUserData] = useState({ username: '', password: '' })

  const onChangeHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(userData)
    try {
      const result = await userServices.login(userData)
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('loggedInUser', JSON.stringify(result.data))
      props.onSetUser(result.data)
    } catch (error) {
      console.log(error)
      props.onSetNotification({ type: 'error', text: 'Wrong username or password' })
    }
  }
  return (
    <div className={classes.login}>
      <form onSubmit={onSubmit} action="">
        <h1 className={classes.title}>Login to application</h1>
        <input
          onChange={onChangeHandler}
          name="username"
          value={userData.username}
          type="text"
          placeholder="username"
        />
        <br />
        <input
          onChange={onChangeHandler}
          name="password"
          value={userData.password}
          type="text"
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  onSetUser: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
}

export default Login
