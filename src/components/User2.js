import React, { PropTypes } from 'react'
import { Link } from 'react-router'

function User2({ user: { slug, name } }) {
  return (
    <span className="user">
      <Link to={`/users/${slug}`}>
        {name}
      </Link>
    </span>
  )
}

User2.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    //avatarUrl: PropTypes.string,
    name: PropTypes.string
  }).isRequired
}

export default User2
