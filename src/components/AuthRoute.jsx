import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { isAuth } from '../actions/auth'

const AuthRoute = ({children}) => {
    if (isAuth()) {
        return children
      }
      else {
        return <Navigate to='/login' />
      }
}

export default AuthRoute