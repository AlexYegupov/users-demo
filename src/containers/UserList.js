import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { /* testLogin, testLogout*//* , loadStarred*/} from '../actions'
import { login, logout } from '../actions/authActions'
import { loadUsers3 as loadUsers, deleteUser } from '../actions/usersActions'

import User2 from '../components/User2'
//import LU from '../components/LoggedUser'
import Repo from '../components/Repo'
// import List from '../components/List'
// import zip from 'lodash/zip'
import { Link } from 'react-router'

//const loadData = ({ login, loadUser, loadStarred }) => {
const loadData = ({ loadUsers }) => {
  console.log('loadData2')
  loadUsers()
  //loadUser(login, [ 'name' ])
  //loadStarred(login)
}

class UserList extends Component {
  static propTypes = {

    // login: PropTypes.string,
    // user: PropTypes.object,
    // starredPagination: PropTypes.object,
    // starredRepos: PropTypes.array,
    // starredRepoOwners: PropTypes.array,
    users: PropTypes.array.isRequired,
    usersError: PropTypes.object,
    loggedUser: PropTypes.object,
    loadUsers: PropTypes.func.isRequired,
    // loadUser: PropTypes.func,
    // loadStarred: PropTypes.func
    login: PropTypes.func,
    logout: PropTypes.func,
    deleteUser: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {error: '', users: []}
  }

  componentWillMount() {
    console.log('CWM')
    //console.log('Cookie:', document.cookie)
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('CWRP', this.props, nextProps)

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
    this.props.deleteUser(slug)
  }

  login = () => {
    this.props.login('allan', '1')
  }

  logout = () => {
    // actually not log out because cannot delete httpOnly cookie
    this.props.logout()
  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  renderError() {
    if (this.props.usersError)
      return <p>Error: {JSON.stringify(this.props.usersError)}</p>
  }

  render() {
    const { users, loggedUser } = this.props
    const readOnly = !loggedUser
    let error = this.state.error
    console.log('RENDER', this.props, error)

    return (
      <div>
        {/* <LU ss="mystring" ii={45} /> */}

        {/* <Link to={"/login"}>Login</Link> */}

        <p>Logged as: { loggedUser ? loggedUser.name : ''} </p>

        <h3>Users:</h3>
        { this.renderError() }

        <Link to={`/users-create`}>
          <button enabled={!readOnly}>Create</button>
        </Link>

        <table>
          <tbody>
            { users.map( (user) =>
              <tr key={ user.slug }>
                <td>
                  <User2 user={ user } />
                </td>
                <td>
                  <Link to={`/users/${user.slug}`}>
                    <button value="edit">
                      { loggedUser ? 'Edit' : 'View' }
                    </button>
                  </Link>
                  <button value="delete" disabled={!loggedUser}
                          onClick={this.deleteClick.bind(this, user.slug)}>
                    Delete
                  </button>
                </td>
              </tr>
              )
            }
          </tbody>
        </table>

        <div>{ error ? `Error: ${error}` : '' }</div>

        <hr />
        Other stuff:
        <ul>
          <li><Link to={"/login"}>login</Link></li>
          {/* <li><button onClick={this.login.bind(this)} >Login</button></li> */}
          <li><Link to={"/users"}>users list</Link></li>
          <li><Link to={"/users-create"}>create user</Link></li>
          <li><Link to={"/users/terry"}>terry user</Link></li>
          <li><Link to={"/users/bob"}>bob user</Link></li>
          <li><button onClick={this.logout.bind(this)} >Logout</button></li>
        </ul>

      </div>
    )


    /* const { user, login } = this.props
     * if (!user) {
     *   return <h1><i>Loading {login}{"'s profile..."}</i></h1>
     * }

     * const { starredRepos, starredRepoOwners, starredPagination } = this.props
     * return (
     *   <div>
     *     asdfadfs
     *     <User user={user} />
     *     <hr />
     *     <List renderItem={this.renderRepo}
     *           items={zip(starredRepos, starredRepoOwners)}
     *           onLoadMoreClick={this.handleLoadMoreClick}
     *           loadingLabel={`Loading ${login}'s starred...`}
     *           {...starredPagination} />
     *   </div>
     * ) */
       }
}

const mapStateToProps = (state, ownProps) => {
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

  //w console.log('mapStateToProps', state, ownProps, state.users.users)
  console.log('mapStateToProps', state, ownProps, state.users)

  // ?? where to put getUsersListError??

  return {
    //w users: state.users.users,
    //users: state.users.response,
    users: state.users.users,
    usersError: state.users.usersError,
    loggedUser: state.auth.loggedUser,
    //deletedUser: state.users.deletedUser
  }
}

export default connect(
  mapStateToProps,
  {
    loadUsers,
    //loadUser,
    //loadStarred
    login,
    logout,
    deleteUser
  }
)(UserList)





