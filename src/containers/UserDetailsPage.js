import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { /* testLogin, testLogout*//* , loadStarred*/} from '../actions'
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


class UserDetailsPage extends Component {
  static propTypes = {
    // login: PropTypes.string,
    user: PropTypes.object,
    serverError: PropTypes.string,
    localError: PropTypes.string,
    // starredPagination: PropTypes.object,
    // starredRepos: PropTypes.array,
    // starredRepoOwners: PropTypes.array,
    //users: PropTypes.array.isRequired,
    //loadUsers: PropTypes.func.isRequired,
    loggedUser: PropTypes.object,
    //createNewUser: PropTypes.func.isRequired,
    //!!patchUser: PropTypes.func.isRequired,
    // loadStarred: PropTypes.func
    //login: PropTypes.func,
    //logout: PropTypes.func,

    history: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    location: PropTypes.object,
  }

  
  constructor(props) {
    super(props)
    //!!
    // // "free to add additional fields to the class manually if you need to store something that is not used for the visual output"
    // // https://facebook.github.io/react/docs/state-and-lifecycle.html
    // this.isCreating = props.location.pathname === '/users-create'

    this.state = {
      isCreating: undefined,
      localError: ''
    }

    console.log('CONSTRUCTOR', props)
  }

  componentWillMount() {
    console.log('CWM', this.props.location.pathname, this.state, this.props)
    //console.log('Cookie:', document.cookie)

    // // !! duplicate logic of updating isCreating and loadUser
    this.setState( {isCreating: this.props.location.pathname === '/users-create'} )

    // !! probably need just set    shouldUpdateUser  state to use
    //     componentWillReceiveProps engine
    if (!this.props.user) {
      this.loadUser(this.props.params.slug)
    }
  }

  loadUser(slug=null) {
    //console.log('UU', this.props.location, this.props.params)
    console.log('%cLOAD USER', 'background: yellow', slug)

    if (slug)
      this.props.dispatch(loadUser(slug))
    else
      this.props.dispatch({type: 'INIT_NEW_USER'})

  }

  componentWillUpdate(nextProps, nextState) {
    console.log('CWU', this.props.location.pathname, nextProps, nextState)
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cCWRP', 'background: lightgray', this.props, nextProps, nextProps.location.pathname, (nextProps.user||{}).slug)

    // -> CWM -> here (because CWM will not called on switching urls)
    // // "free to add additional fields to the class manually if you need to store something that is not used for the visual output"
    // // https://facebook.github.io/react/docs/state-and-lifecycle.html

    let isCreating = nextProps.location.pathname === '/users-create'

    this.setState( {isCreating} )

    // !!9
    //if (nextProps.error && nextProps.error !== this.props.error) {
    if (nextProps.serverError && !this.state.localError) {
      console.log('Overwrite Error', nextProps.error)
      //update error state by server value
      this.setState( {localError: stringifySimple(nextProps.serverError)} )
    }

    if (!nextProps.loggedUser && isCreating) {
      //console.log('SHOULD goto LOGIN', this.props.location.pathname)

      //nw hangs this.props.history.replace(this.props.location.pathname)

      // w bug ugly (problem: cannot refresh current page (to tap react-router to handle events)
      // this.props.history.push('/')
      // this.props.history.replace(this.props.location.pathname)

      // ~~ duplicate redirect logic with routes redirect (how to make better?)
      this.props.history.push('/login')
    }

    // if (nextProps.loggedUser) {
    //   this.props.history.push('/users')
    //   // http://stackoverflow.com/a/34863577/1948511
    // }

    // working but better implement via routes->onEnter requireAuth handler
    // if (!nextProps.loggedUser && nextProps.location.pathname == '/users-create') {
    //   this.props.history.push('/login')
    // }

    if (isCreating && nextProps.user && nextProps.user._isCreated) {  //nextProps.userIsCreated
      console.log('UIC')
      this.props.history.push(`/users/${nextProps.user.slug}`)
    }

    // try: initiate loading user
    if ((!nextProps.user && !nextProps.serverError)
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

    // !!8 this.setState( {error} )

    if (!this.state.localError) {
      //? this.setState( {localError: ''} )

      if (this.state.isCreating) {
        this.props.dispatch(createUser(user))
      } else {
        //this.props.patchUser(user)
        this.props.dispatch(patchUser(user))
      }
    }
  }

  componentDidMount() {
    //this.loadSubscriptionData(this.props.subscriptionId);
    //console.log('CDM', this.loginInput, window )

    //ReactDOM.findDOMNode(this.loginInput).setAttribute('-attribute', 'some value')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (!this.props.user) return true
    // if (nextProps.user.login !== this.props.user.login) return true
    // return false;

    // experimental. Is that ok? BAD
    //let result = this.props.location.pathname !== nextProps.location.pathname
    //let result = true

    //let result = Boolean((nextProps.user||{}).slug !== (this.props.user||{}).slug)

    let result = false

    // shallow and simple: update when user prop changes
    result = result
      || isUserChanged(this.props.user, nextProps.user)
          //|| (nextProps.user && !isSameUser(nextProps.user, this.props.user))

    // update on login/logout
    result = result || (!isSameUser(this.props.loggedUser, nextProps.loggedUser))

    // ...or update on change error message
    // TODO: remove ugly combination nextProps.error && nextState.error
    result = result || (nextProps.serverError !== this.props.serverError)
      || (nextState.localError !== this.state.localError)

    // //...or returned patched user
    // result = result || isUserChanged(this.props.user, nextProps.user)


    // w except: (logged) bob -> create
    // let result = nextProps.user && nextProps.user.slug !== (this.props.user||{}).slug

    if (result) console.log('%cSCU', 'background: lightgreen', result)
    console.log('SCU details:', this.props, nextProps, this.state, nextState, this.props.params.slug, result)

    return result
  }

  onUserEditUpdate(error) {
    console.log('OUEE', error)
    this.setState( {localError: error} )
  }

  render() {
    // display local error OR server error (because server error could lose actuaaaality)
    let error = this.state.localError // || stringifySimple(this.props.error)

    // // TODO render error below user
    // if (!this.props.user && !this.state.isCreating) {
    //   console.log('%cRENDERING no user', 'background: lightblue')
    //   if (error) {
    //     return (<div>Error: {error}</div>)
    //   } else {
    //     return <div>Loading...</div>
    //   }
    // 
    // } else {
    //   console.log('%cRENDERING user', 'background: cyan', this.props.user, error)
    // }

    console.log('%cRENDERING user', 'background: cyan', this.props.user, error)

    //const readOnly = !this.props.loggedUser
    return (
      <div>
        <p>Logged as: { this.props.loggedUser ? this.props.loggedUser.name : '' } </p>

        <UserEdit user={this.props.user} onSave={this.saveUser.bind(this)}   onUpdate={this.onUserEditUpdate.bind(this)} readOnly={!this.props.loggedUser}
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
    let storeUser = state.users.user
    let user = (
      storeUser
      && ((ownProps.location.pathname === '/users-create'
           && (storeUser._isNew || storeUser._isCreated)
          )
          || (ownProps.params||{}).slug === storeUser.slug
         )
    ) ? state.users.user : null

    console.log('mapStateToProps', state, ownProps)

    //shouldUpdateUser = nextProps.params.slug !== (this.props.user || {}).slug

    return {
      //userIsCreated:state.users.userIsCreated,\
      user,
      serverError: state.users.userError,
      loggedUser: state.auth.loggedUser,
    }
  },
  //{   use  "props.dispatch" instead inside component
    //loadUser,
    //createNewUser,
    //patchUser,
  //}
)(UserDetailsPage)
