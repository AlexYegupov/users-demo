import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { /* testLogin, testLogout*//* , loadStarred*/} from '../actions'
//import { login, logout } from '../actions/authActions'
import { loadUser, patchUser } from '../actions/usersActions'

/* import User2 from '../components/User2'
 * import LU from '../components/LoggedUser'
 * import Repo from '../components/Repo'*/
// import List from '../components/List'
// import zip from 'lodash/zip'
import { Link } from 'react-router'


// simply stringify object
function stringifySimple(obj) {
  if (obj instanceof Error) // http://stackoverflow.com/a/26199752/1948511
    return JSON.stringify(obj, ["message", "arguments", "type", "name"])
  else
    return JSON.stringify(obj)
}

//import { getUserInfo } from '../actions/authActions'

// //const loadData = ({ login, loadUser, loadStarred }) => {
// const loadData = ({ loadUsers }) => {
//   console.log('loadData2')
//   loadUsers()
//   //loadUser(login, [ 'name' ])
//   //loadStarred(login)
// }

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
    loadUser: PropTypes.func.isRequired,
    patchUser: PropTypes.func.isRequired,
    // loadStarred: PropTypes.func
    //login: PropTypes.func,
    //logout: PropTypes.func,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {userForm: {name: '', login: '', slug: ''}}
    // aa
  }

  componentWillMount() {
    console.log('CWM')
    //console.log('Cookie:', document.cookie)
    this.loadData()

    //!! this.props.loadUser(this.props.params.slug)
  }

  loadData() {
    console.log('LOADDATA', this.props.params.slug)
    return this.props.loadUser(this.props.params.slug)
  }

  componentWillReceiveProps(nextProps) {
    console.log('CWRP', this.props, nextProps)

    //if (nextProps.
    //this.state.aa = nextProps.user.login        //aa
    if (nextProps.user) {
      //this.props.history.push('/404?message=user not found')
      /* this.state.userForm.name = nextProps.user.name
       * this.state.userForm.login = nextProps.user.login
       * this.state.userForm.slug = nextProps.user.slug*/
      this.setState({userForm: nextProps.user})
    }

    //? !!
    //loadData(nextProps)
    // if (nextProps.login !== this.props.login) {
    //   loadData(nextProps)
    // }
  }

  handleLoadMoreClick = () => {
    //this.props.loadStarred(this.props.login, true)
  }

  createClick = () => {
    console.log('CREATE', this)
  }

  editClick = (slug) => {
    //this.props.loadStargazers(this.props.fullName, true)
    console.log('EDIT', this, slug)
  }

  deleteClick = (slug) => {
    //this.props.loadStargazers(this.props.fullName, true)
    console.log('DELETE', this, slug)
  }

  saveClicked() {

    //console.log('cdm+', this.loginInput.value)
    console.log('sC', this.state.userForm)

    this.props.patchUser({
      slug: this.props.params.slug,
      name: this.state.userForm.name, //this.nameInput.value,
      login: this.state.userForm.login //this.loginInput.value,
    })
  }


  componentDidMount() {
    //this.loadSubscriptionData(this.props.subscriptionId);
    //console.log('CDM', this.loginInput, window )

    //ReactDOM.findDOMNode(this.loginInput).setAttribute('-attribute', 'some value')


  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  /* shouldComponentUpdate(nextProps, nextState) {

   *   if (!this.props.user) return true

   *   if (nextProps.user.login !== this.props.user.login) return true

  *   return false;
  * }*/

  /* shouldRender() {
   *   console.log('should RENDER', this.props.params.slug != this.props.user.slug)
   *   return this.props.params.slug != this.props.user.slug
   * }*/

  render() {
    if (!this.props.user) {
      if (this.props.userError)
        //console.log('UE1', this.props.userError)
        //console.log('UE2', JSON.stringify(this.props.userError))

        return (<div>Error: {stringifySimple(this.props.userError)}</div>)

      return null
    }

    //if (!this.shouldRender()) return null

    console.log('RENDERING', this.props.user.login)
    const readOnly = !this.props.loggedUser
    return (
      <div>
        <p>Logged as: { this.props.loggedUser ? this.props.loggedUser.name : ''} </p>

        {/* <p>User: {this.props.user.name}</p>
        <hr /> */}

        <div>
          Name:
          <input value={this.state.userForm.name}
                 /* value={this.props.user.name}*/
                 /* ref={(input) => this.nameInput = input} */
                 /* readOnly={readOnly} */
                 onChange={this.handleChange.bind(this, 'name')}
            />
        </div>

        <div>
          Login:
          <input value={this.state.userForm.login}
                 /* value={this.state.aa} */
                 /* {this.props.user.login} */
      /* ref={ (input) => {this.loginInput = input; console.log('cdm set ref') } }*/
                /* readOnly={readOnly} */
                 onChange={this.handleChange.bind(this, 'login')}
          />
        </div>

        <div>
          Slug: {this.props.user.slug}
          {/* <input defaultValue={this.props.user.slug}
          readOnly={readOnly}
          ref={(input) => this.slugInput = input} /> */}
        </div>

        <div>
          <button onClick={this.saveClicked.bind(this)}
                  /* disabled={readOnly} */
                  >Save</button>
        </div>

        <hr />
        Other stuff:
        <ul>
          <li><Link to={"/login"}>login</Link></li>
          <li><Link to={"/users"}>users list</Link></li>
        </ul>

      </div>
    )
  }

  handleChange(name, event) {
    //console.log(11, JSON.stringify(this.state), name, event.target.value)
    let userForm = this.state.userForm
    userForm[name] = event.target.value
    this.setState({userForm: userForm})
  }
}

export default connect(
  (state, ownProps) => {
    // // We need to lower case the login due to the way GitHub's API behaves.
    // // Have a look at ../middleware/api.js for more details.
    // const login = ownProps.params.login.toLowerCase()
    // 
    // const {
    //   pagination: { starredByUser },
    //   entities: { users, repos }
    // } = state
    // 
    // const starredPagination = starredByUser[login] || { ids: [] }
    // const starredRepos = starredPagination.ids.map(id => repos[id])
    // const starredRepoOwners = starredRepos.map(repo => users[repo.owner])
    // 
    // return {
    //   login,
    //   starredRepos,
    //   starredRepoOwners,
    //   starredPagination,
    //   user: users[login]
    // }

    console.log('mapStateToProps', state, ownProps, state.users.users)

    return {
      //aa: state.users.user ? state.users.user.login : '--',
      user: state.users.user,
      userError: state.users.userError,

      //users: state.users.users,
      loggedUser: state.auth.loggedUser,
    }
  },
  {
    //loadUsers,
    loadUser,
    patchUser,
    //loadStarred
    //login,
    //logout
  }
)(UserDetailsPage)
