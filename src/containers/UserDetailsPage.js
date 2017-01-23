import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { loadUser, patchUser, createUser } from '../actions/usersActions'
import { Link } from 'react-router'
import UserEdit from '../components/UserEdit'
import { isSameUser, isUserChanged } from  '../utils/userUtil'

// simply stringify object
function stringifySimple(obj) {
  if (!obj) return ''

  if (obj.message) return obj.message

  // http://stackoverflow.com/a/26199752/1948511
  if (obj instanceof Error) return JSON.stringify(obj, ["message", "arguments", "type", "name"])

  return JSON.stringify(obj)
}

function isUserCreating(props) {
  return props.location.pathname === '/users-create'
}

class UserDetailsPage extends Component {
  static propTypes = {
    storeUser: PropTypes.object,
    serverError: PropTypes.object,
    loggedUser: PropTypes.object,

    history: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    location: PropTypes.object,
  }

  
  constructor(props) {
    super(props)

    this.state = {
      isCreating: undefined,
      localError: '',
    }

    console.log('CONSTRUCTOR', props)
  }

  componentWillMount() {
    console.log('CWM', this.props.location.pathname, this.state, this.props)
    //console.log('Cookie:', document.cookie)

    this.setState( {isCreating: isUserCreating(this.props)} )

    if (!this.props.storeUser) {
      this.loadUser(this.props.params.slug)
    }

  }

  loadUser(slug=null) {
    console.log('%cLOAD USER LUUU', 'background: yellow', slug)

    if (slug)
      this.props.dispatch(loadUser(slug))
    else
      this.props.dispatch({type: 'INIT_NEW_USER'})

  }

  componentWillUpdate(nextProps, nextState) {
    console.log('CWU', this.props.location.pathname, nextProps, nextState)
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cCWRP', 'background: lightgray', this.props, nextProps, nextProps.location.pathname, (nextProps.storeUser||{}).slug)

    let isCreating = isUserCreating(nextProps)

    this.setState( {isCreating} )

    if (nextProps.serverError && !this.state.localError) {
      console.log('Overwrite Error', nextProps.error)
      //update error state by server value
      this.setState( {localError: stringifySimple(nextProps.serverError)} )
    }

    // fe3
    if (!nextProps.loggedUser && isCreating) {
      // NOTE: redirect to login page if unlogged
      this.props.history.push('/login')
    }

    if (isCreating && nextProps.storeUser && nextProps.storeUser._isCreated) {
      //console.log('UIC')
      this.props.history.push(`/users/${nextProps.storeUser.slug}`)
    }

    // try: initiate loading user
    if ((!nextProps.storeUser && !nextProps.serverError)
        ||(this.props.location.pathname !== nextProps.location.pathname)
       )
    {
      this.loadUser(nextProps.params.slug)
    }

  }

  test() {
    console.log('test', arguments)
  }

  logout = () => {
    // actually not log out because cannot delete httpOnly cookie
    this.props.dispatch(logout())
  }

  saveUser(user) {
    console.log('Saving: ', user, this)

    if (!this.state.localError) {
      if (this.state.isCreating) {
        this.props.dispatch(createUser(user))
      } else {
        this.props.dispatch(patchUser(user))
      }
    }
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps, nextState) {
    let result = false

    // shallow and simple: update when user prop changes
    result = result
      || isUserChanged(this.props.storeUser, nextProps.storeUser)

    // update on login/logout
    result = result || (!isSameUser(this.props.loggedUser, nextProps.loggedUser))

    // ...or update on change error message
    result = result || (nextProps.serverError !== this.props.serverError)
      || (nextState.localError !== this.state.localError)

    if (result) console.log('%cSCU', 'background: lightgreen', result)
    console.log('SCU details:', this.props, nextProps, this.state, nextState, this.props.params.slug, result)

    return result
  }

  onUserEditUpdate(error) {
    console.log('OUEE', error)
    this.setState( {localError: error} )
  }

  render() {
    let error = this.state.localError

    console.log('%cRENDERING user', 'background: cyan', this.props.storeUser, error, this.state)

    return (
      <div>
        <p>Logged as: { this.props.loggedUser ? this.props.loggedUser.name : '' } </p>

        <UserEdit user={this.props.storeUser} onSave={this.saveUser.bind(this)}   onUpdate={this.onUserEditUpdate.bind(this)} readOnly={!this.props.loggedUser}  /* fe3 */
          error={error}
        />

        { error ? <div>Error: {error}</div> : '' }
        <hr />

        Other stuff:
        <ul>
          <li><Link to={"/login"}>login</Link></li>
          <li><Link to={"/users"}>users list</Link></li>
          <li><Link to={"/users-create"}>create user</Link></li>
          <li><Link to={"/users/terry"}>terry user</Link></li>
          <li><Link to={"/users/bob"}>bob user</Link></li>
          <li><button onClick={this.logout.bind(this)} >Logout</button></li>
        </ul>
      </div>
    )
  }

}

export default connect(
  function mapStateToProps(state, ownProps) {

    // consider only user actual for current url
    let u = state.users.user

    let storeUser = null
    if (u) {
      if ((isUserCreating(ownProps) && (u._isNew || u._isCreated))
        || ((ownProps.params||{}).slug === u.slug)) {
          storeUser = u
        }
    }

    console.log('mapStateToProps', state, ownProps, 'storeUser:', storeUser, state.auth)

    return {
      storeUser,
      serverError: state.users.userError,
      loggedUser: state.auth.loggedUser,
    }
  },
)(UserDetailsPage)
