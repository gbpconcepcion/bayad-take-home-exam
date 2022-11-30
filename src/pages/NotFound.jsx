import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import {Link} from 'react-router-dom'

//functions as a page for not found pages
export default function NotFound() {
  return (
    <div>
        <FaExclamationTriangle/>
        <h1>404</h1>
        <Link to='/'>
            Go Back
        </Link>
    </div>
  )
}
