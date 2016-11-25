import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { /* testLogin, testLogout*//* , loadStarred*/} from '../actions'
//import { login, logout } from '../actions/authActions'
import { loadUser, patchUser } from '../actions/usersActions'

import User2 from '../components/User2'
import LU from '../components/LoggedUser'
import Repo from '../components/Repo'
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

  componentWillMount() {
    //console.log('CWM')
    //console.log('Cookie:', document.cookie)
    this.loadData()

    //!! this.props.loadUser(this.props.params.slug)
  }

  loadData() {
    //console.log('lD', this.props.params.slug)
    return this.props.loadUser(this.props.params.slug)
  }

  componentWillReceiveProps(nextProps) {
    console.log('CWRP', this.props, nextProps)

    /* if (nextProps.user) {
     *   this.props.history.push('/404?message=user not found')
     * }*/

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
    this.props.patchUser({
      slug: this.props.params.slug,
      name: this.nameInput.value,
      login: this.loginInput.value,
    })
  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  render() {
    if (!this.props.user) {
      if (this.props.userError)
        //console.log('UE1', this.props.userError)
        //console.log('UE2', JSON.stringify(this.props.userError))

        return (<div>Error: {stringifySimple(this.props.userError)}</div>)

      return null
    }

    return (
      <div>
        <p>Logged as: { this.props.loggedUser ? this.props.loggedUser.name : ''} </p>

        {/* <p>User: {this.props.user.name}</p>
        <hr /> */}

        <div>
          Name:
          <input defaultValue={this.props.user.name}
                 ref={(input) => this.nameInput = input} />
        </div>

        <div>
          Login:
          <input defaultValue={this.props.user.login}
                 ref={(input) => this.loginInput = input} />
        </div>

        <div>
          Slug: {this.props.user.slug}
          {/* <input defaultValue={this.props.user.slug}
          readonly={true}
          ref={(input) => this.slugInput = input} /> */}
        </div>

        <div>
          <button onClick={this.saveClicked.bind(this)}>Save</button>
        </div>

        <hr />
        Other stuff:
        <ul>
          <li><Link to={"/login"}>login</Link></li>
        </ul>

      </div>
    )
  }

  render2() {
    const { users, loggedUser } = this.props

    console.log('RENDER', this.props)

    return (
      <div>
        <h3> {this.props.params.login.toLowerCase()} details: </h3>
        <LU ss="mystring" ii={45} />




        {/* <Link to={"/login"}>Login</Link> */}

        <p>Logged as: { loggedUser ? loggedUser.name : ''} </p>

        {/* <button onClick={this.login.bind(this)} >Login</button>
        <button onClick={this.logout.bind(this)} >Logout</button> */}

        <h3>Users:</h3>

        <button onClick={this.createClick.bind(this)} >Create</button>
        <table>
          <tbody>
            { users.map( (user) =>
            <tr key={ user.slug }>
              <td>
                <User2 user={ user } />
              </td>
              <td>
                <Link to={`users/${user.slug}`}>
                <button value="edit" disabled={!loggedUser}>
                  Edit
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
      user: state.users.user,
      userError: state.users.userError,

      //users: state.users.users,
      loggedUser: state.auth.user,
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
