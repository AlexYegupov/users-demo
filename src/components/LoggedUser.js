import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import './LoggedUser.css'

class LoggedUser extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      //avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string
    }),
   // add ".isRequired" when https://github.com/facebook/react/pull/7291 will be fixed (to avoid warning when using null value)

    dispatch: PropTypes.func,
  }

  render() {
    let { user } = this.props
    let content = ''

    if (user) {
      content = (
        <div>
          Welcome, {user.name}!
          <button onClick={ () => this.props.dispatch(logout()) } >
            Logout
          </button>
        </div>
      )
    } else {
      content = <Link to={"/login"}><button>Login</button></Link>
    }

    return (<div className="loggedUser">{ content }</div>)
  }
}

//export default LoggedUser

export default connect(
  /* (state, ownProps) => {
   *   return {
   *     loggedUser: state.auth.user
   *   }
   * }*/
)(LoggedUser)
