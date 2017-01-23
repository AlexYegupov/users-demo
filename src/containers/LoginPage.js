import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { /* testLogin, testLogout*//* , loadStarred*/} from '../actions'
import { login, logout } from '../actions/authActions'

//import User2 from '../components/User2'
import Repo from '../components/Repo'
// import List from '../components/List'
// import zip from 'lodash/zip'
import { Link } from 'react-router'

//import { push } from 'react-router-redux'

class LoginPage extends Component {
  static propTypes = {

    // login: PropTypes.string,
    // user: PropTypes.object,
    // starredPagination: PropTypes.object,
    // starredRepos: PropTypes.array,
    // starredRepoOwners: PropTypes.array,
    //users: PropTypes.array.isRequired,
    loggedUser: PropTypes.object,
    loginError: PropTypes.object,

    //loadUsers: PropTypes.func.isRequired,
    // loadUser: PropTypes.func,
    // loadStarred: PropTypes.func
    login: PropTypes.func,
    logout: PropTypes.func,

    history: PropTypes.object,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {login: '', pwd: ''}
    //this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  componentWillMount() {
    //console.log('CWM')
  }

  componentWillReceiveProps(nextProps) {

    console.log('CWRP RO', this.props, nextProps)

    // redirect after login if nextPathname set before
    let nextPathname = (this.props.location.state && this.props.location.state.nextPathname) || '/loginSuccess'

    if (nextProps.loggedUser && nextPathname) {
      //http://stackoverflow.com/a/34863577/1948511
      //https://github.com/mjackson/history
      this.props.history.push({
        pathname: nextPathname,
      })

    }

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

  renderRepo([ repo, owner ]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  handleLoginClick(e) {
    this.props.login(this.login.value, this.pwd.value)
    /*
     *     this.setState({
     *       login: this.login.value,
     *       pwd: this.pwd.value
     *     })
     * */
  }

  renderError() {
    if (this.props.loginError) {
      const errorText = this.props.loginError.message || JSON.stringify(this.props.loginError)

      return <p>Login error: {errorText}</p>
    }
  }

  render() {
    //const { users } = this.props

    console.log('RENDER', this.props)

    return (
      <div>
        <h3>Login</h3>
        <p>sample: allan/1</p>
        <div>
          Login:<input defaultValue="allan" ref={(input) => this.login = input} />
        </div>
        <div>
          Password:  <input defaultValue="1" type="password" ref={(input) => this.pwd = input} />
        </div>
        <div>
          <button onClick={this.handleLoginClick.bind(this)}>Log in</button>
        </div>

        { this.renderError() }
        <p>
          {this.props.loggedUser ? `Logged as: ${this.props.loggedUser.name}`:''}
        </p>

        <hr />
        Some other stuff:
        <ul>
          <li><button onClick={this.props.logout.bind(this)} >Logout</button></li>
          <li><Link to={"/users"}>users list</Link></li>
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

  console.log('mapStateToProps', state, ownProps, state.users.users)

  return {
    //users: state.users.users,
    loggedUser: state.auth.loggedUser,
    loginError: state.auth.loginError,
  }
}

export default connect(
  mapStateToProps,
  {
    //loadUsers,
    //loadUser,
    //loadStarred
    login,
    logout
  }
)(LoginPage)
