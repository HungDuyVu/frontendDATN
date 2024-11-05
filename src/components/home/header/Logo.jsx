import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <h1 className='text-4xl font-bold text-white'>HPL</h1>
      </Link>

    </div>
  )
}

export default Logo