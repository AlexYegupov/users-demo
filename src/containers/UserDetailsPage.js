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
    return JSON.stringify(obj)
}


class UserDetailsPage extends Component {
  static propTypes = {
    // login: PropTypes.string,
    user: PropTypes.object,
    userError: PropTypes.object,
    // starredPagination: PropTypes.object,
    // starredRepos: PropTypes.array,
    // starredRepoOwners: PropTypes.array,
    //users: PropTypes.array.isRequired,
    loggedUser: PropTypes.object,
    //loadUsers: PropTypes.func.isRequired,
    //!!loadUser: PropTypes.func.isRequired,
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
  /* 
   *   constructor(props) {
   *     super(props)
   *     this.state = {userForm: {name: '', login: '', slug: ''}}
   *     // aa
   *   }
   * */
  componentWillMount() {
    console.log('CWM', this.props.location.pathname)
    //console.log('Cookie:', document.cookie)
    this.loadData()
    //!! this.props.loadUser(this.props.params.slug)
  }

  // NOTE: this is kind of hack (behavour shouldn't rely on url. But how distinguish between editing existing and creating new user?
  isNew() {
    return this.props.location.pathname === '/users-create'
  }

  loadData() {
    //console.log('UU', this.props.location, this.props.params)
    console.log('LOADDATA', this.props.params.slug)

    // simple checking create/edit (better way?)
    if (this.isNew()) {
      //return this.props.createNewUser()
      //console.log('DDD', this.props.dispatch)
      //!! return this.props.dispatch(createNewUser)
      //return this.props.dispatch(createNewUser())
      return this.props.dispatch({type: 'INIT_NEW_USER'})  //~~?? use
    } else {
      //!!return this.props.loadUser(this.props.params.slug)
      return this.props.dispatch(loadUser(this.props.params.slug))
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('CWU', this.props.location.pathname, this.isNew())

  }

  componentWillReceiveProps(nextProps) {
    console.log('CWRP', this.props, nextProps, nextProps.location.pathname)

    //
    if (!nextProps.loggedUser) {
      //console.log('SHOULD goto LOGIN', this.props.location.pathname)

      //nw hangs this.props.history.replace(this.props.location.pathname)
      this.props.history.push('/')
      this.props.history.replace(this.props.location.pathname)

      //browserHistory.replace(location)
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

    //loadData(nextProps)
    // if (nextProps.login !== this.props.login) {
    //   loadData(nextProps)
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

  saveUser(user) {
    console.log('Saving: ', user, this)
    if (this.isNew()) {
      this.props.dispatch(createUser(user))
    } else {
      //this.props.patchUser(user)
      this.props.dispatch(patchUser(user))
    }
  }

  componentDidMount() {
    //this.loadSubscriptionData(this.props.subscriptionId);
    //console.log('CDM', this.loginInput, window )

    //ReactDOM.findDOMNode(this.loginInput).setAttribute('-attribute', 'some value')
  }

  /* shouldComponentUpdate(nextProps, nextState) {
   *   if (!this.props.user) return true
   *   if (nextProps.user.login !== this.props.user.login) return true
  *   return false;
  * }*/

  render() {
    if (!this.props.user) {
      if (this.props.userError)
        //console.log('UE1', this.props.userError)
        //console.log('UE2', JSON.stringify(this.props.userError))
    
        return (<div>Error: {stringifySimple(this.props.userError)}</div>)
    
      return null
    }

    console.log('RENDERING UserDetails', this.props.user)
    //const readOnly = !this.props.loggedUser
    return (
      <div>
        <p>Logged as: { this.props.loggedUser ? this.props.loggedUser.name : '' } </p>

        <UserEdit user={this.props.user} onSave={this.saveUser.bind(this)} readOnly={!this.props.loggedUser} />

        <hr />
        Other stuff:
        <ul>
          <li><Link to={"/login"}>login</Link></li>
          <li><Link to={"/users"}>users list</Link></li>
          <li><Link to={"/users-create"}>create user</Link></li>
          <li><Link to={"/users/bob"}>bob user</Link></li>
          <li><button onClick={this.logout.bind(this)} >Logout</button></li>
        </ul>

      </div>
    )
  }

}



export default connect(
  (state, ownProps) => {
    console.log('mapStateToProps', state, ownProps, state.users.user)

    return {
      //aa: state.users.user ? state.users.user.login : '--',
      userIsCreated:state.users.userIsCreated,
      user: state.users.user,
      userError: state.users.userError,
      loggedUser: state.auth.loggedUser,
    }
  },
  //{   use  "props.dispatch" instead inside component
    //loadUser,
    //createNewUser,
    //patchUser,
  //}
)(UserDetailsPage)
