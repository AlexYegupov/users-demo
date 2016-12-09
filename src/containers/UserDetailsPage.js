import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { /* testLogin, testLogout*//* , loadStarred*/} from '../actions'
import { logout } from '../actions/authActions'
import { loadUser, patchUser, createUser } from '../actions/usersActions'
import { Link } from 'react-router'
import UserEdit from '../components/UserEdit'

// simply stringify object
function stringifySimple(obj) {
  if (obj instanceof Error) // http://stackoverflow.com/a/26199752/1948511
    return JSON.stringify(obj, ["message", "arguments", "type", "name"])
  else
    return  JSON.stringify(obj)
}


function isSameUser(user1, user2) {
  return (user1||{}).slug === (user2 ||{}).slug
}

class UserDetailsPage extends Component {
  static propTypes = {
    // login: PropTypes.string,
    user: PropTypes.object,
    error: PropTypes.object,  //internal or external error
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
    //this.state = {userForm: {name: '', login: '', slug: ''}}
    //this.state = {isNew: props.location.pathname === '/users-create'}

    //!!
    // // "free to add additional fields to the class manually if you need to store something that is not used for the visual output"
    // // https://facebook.github.io/react/docs/state-and-lifecycle.html
    // this.isNew = props.location.pathname === '/users-create'

    this.state = {error: ''} //shouldUpdateUser: true

    console.log('CONSTRUCTOR', props, this.isNew)
  }

  componentWillMount() {
    console.log('CWM', this.props.location.pathname, this.state, this.props)
    //console.log('Cookie:', document.cookie)

    // // "free to add additional fields to the class manually if you need to store something that is not used for the visual output"
    // // https://facebook.github.io/react/docs/state-and-lifecycle.html
    // this.isNew = this.props.location.pathname === '/users-create'


    // // !! duplicate logic of updating isNew and loadUser
    this.isNew = this.props.location.pathname === '/users-create'

    // !! probably need just set    shouldUpdateUser  state to use
    //     componentWillReceiveProps engine
    if (!this.props.user) {
      this.loadUser(this.props.params.slug)
    }

    //nw this.setState( {aa: 22} )

  }

  // in fact
  //
  // // NOTE: this is kind of hack (behavour shouldn't rely on url. But how distinguish between editing existing and creating new user?
  // isNew() {
  //   return this.props.location.pathname === '/users-create'
  // }

  loadUser(slug=null) {
    //console.log('UU', this.props.location, this.props.params)
    console.log('%cLOAD USER', 'background: yellow; color: black', slug) //this.props.params.slug

    if (slug)
      this.props.dispatch(loadUser(slug))
    else
      this.props.dispatch({type: 'INIT_NEW_USER'})

    // // simple checking create/edit (better way?)
    // if (this.isNew) {
    //   //return this.props.createNewUser()
    //   //console.log('DDD', this.props.dispatch)
    //   //!! return this.props.dispatch(createNewUser)
    //   //return this.props.dispatch(createNewUser())
    //   return this.props.dispatch({type: 'INIT_NEW_USER'})  //~~?? use
    // } else {
    //   //!!return this.props.loadUser(this.props.params.slug)
    //   return this.props.dispatch(loadUser(slug))
    // }


  }




  componentWillUpdate(nextProps, nextState) {
    console.log('CWU', this.props.location.pathname, nextProps, nextState)
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cCWRP', 'background: lightgray', this.props, nextProps, nextProps.location.pathname, (nextProps.user||{}).slug)

    // -> CWM -> here (because CWM will not called on switching urls)
    // // "free to add additional fields to the class manually if you need to store something that is not used for the visual output"
    // // https://facebook.github.io/react/docs/state-and-lifecycle.html
    this.isNew = nextProps.location.pathname === '/users-create'

    if (!nextProps.loggedUser && this.isNew) {
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

    //if (nextProps.
    //this.state.aa = nextProps.user.login        //aa\
    // if (nextProps.user) {
    //   //this.setState({userForm: nextProps.user})
    // }

    if (nextProps.userIsCreated) {
      console.log('UIC')
    }

    // //!! todo: move logic to loadUser
    // // process changing editing/creating user (or ...props.params.slug...?)
    // 
    // let shouldUpdateUser = nextProps.params.slug !== (this.props.user || {}).slug
    // 
    // console.log('SUU', shouldUpdateUser, nextProps.params.slug, this.props.user)
    // this.setState({shouldUpdateUser})


    // try: initiate loading user
    if (!nextProps.user) {
      this.loadUser(nextProps.params.slug)
    }

    // !!
    // if (shouldUpdateUser && this.props.user) {
    //   this.loadUser(nextProps.params.slug)
    // }

    // if (nextProps.params.slug !== this.props.params.slug) {
    // 
    //   this.loadUser(nextProps.params.slug)
    // } else {
    //   //this.props.dispatch({type: 'INIT_NEW_USER'}) // here??
    // }

    // if (this.props.location.pathname !== nextProps.location.pathname) {
    //   this.loadUser(nextProps.params.slug)
    // }

    //loadUser(nextProps)
    // if (nextProps.login !== this.props.login) {
    //   loadUser(nextProps)
    // }
  }

  // handleLoadMoreClick = () => {
  //   //this.props.loadStarred(this.props.login, true)
  // }

  // saveClicked() {
  //   //console.log('cdm+', this.loginInput.value)
  //   console.log('sC', this.state.userForm)
  // 
  //   this.props.patchUser({
  //     slug: this.props.params.slug,
  //     name: this.state.userForm.name, //this.nameInput.value,
  //     login: this.state.userForm.login //this.loginInput.value,
  //   })
  // }

  test() {
    console.log('test', arguments)
  }


  logout = () => {
    // actually not log out because cannot delete httpOnly cookie
    this.props.dispatch(logout())
  }

  saveUser(user, error) {
    console.log('Saving: ', user, this)

    this.setState( {error} )

    if (!error) {
      if (this.isNew) {
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

    // TODO: consider also new

    //let result = Boolean((nextProps.user||{}).slug !== (this.props.user||{}).slug)

    let result = false

    // shallow and simple: update when user prop changes
    result = result
          || (nextProps.user && !isSameUser(nextProps.user, this.props.user))

    // update on login/logout
    result = result || (!isSameUser(nextProps.loggedUser, this.props.loggedUser))

    // w except: (logged) bob -> create
    // let result = nextProps.user && nextProps.user.slug !== (this.props.user||{}).slug

    console.log('%cSCU', 'background: lightgreen', result, this.props, nextProps, this.state, nextState, this.props.params.slug, result)

    return result
  }

  onUserEditChange(user, error) {
    console.log('OUEC', user, error)
    this.setState( {error: error} )
  }

  render() {
    // TODO render error below user
    if (!this.props.user) {
      console.log('%cRENDERING no user', 'background: lightblue')
      if (this.props.error) {
        //console.log('UE1', this.props.error)
        //console.log('UE2', JSON.stringify(this.props.error))
    
        return (<div>Error: {stringifySimple(this.props.error)}</div>)
      } else {
        return <div>Loading...</div>
      }
    
    } else console.log('%cRENDERING user', 'background: blue', this.props.user)

    //const readOnly = !this.props.loggedUser
    return (
      <div>
        <p>Logged as: { this.props.loggedUser ? this.props.loggedUser.name : '' } </p>

        <UserEdit user={this.props.user} onSave={this.saveUser.bind(this)} onChange={this.onUserEditChange.bind(this)} readOnly={!this.props.loggedUser} />

        { this.state.error ? <div>Error: {this.state.error}</div> : '' }
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
      && ((ownProps.location.pathname === '/users-create' && storeUser.isNew)
          || (ownProps.params||{}).slug === storeUser.slug)
    ) ? state.users.user : null

    console.log('mapStateToProps', state, ownProps, (user||{}).slug)

    //shouldUpdateUser = nextProps.params.slug !== (this.props.user || {}).slug
    //state.users.user.slug

    return {
      userIsCreated:state.users.userIsCreated,
      user,
      error: state.users.userError,
      loggedUser: state.auth.loggedUser,
    }
  },
  //{   use  "props.dispatch" instead inside component
    //loadUser,
    //createNewUser,
    //patchUser,
  //}
)(UserDetailsPage)
