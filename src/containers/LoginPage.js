import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

// import List from '../components/List'
// import zip from 'lodash/zip'
import { Link } from 'react-router'

//import { push } from 'react-router-redux'

class LoginPage extends Component {
  static propTypes = {
    loggedUser: PropTypes.object,
    loginError: PropTypes.object,

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

  handleLoginClick(e) {
    this.props.login(this.login.value, this.pwd.value)
  }

  renderError() {
    if (this.props.loginError) {
      const errorText = this.props.loginError.message || JSON.stringify(this.props.loginError)

      return <p>Login error: {errorText}</p>
    }
  }

  render() {
    //console.log('RENDER', this.props)

    return (
      <div>
        <h2>Login</h2>
        <p>sample: allan/1</p>

        <table>
          <tbody>
            <tr>
              <td>Login</td>
              <td>
                <input defaultValue="allan" ref={(input) => this.login = input} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input defaultValue="1" type="password" ref={(input) => this.pwd = input} />
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={this.handleLoginClick.bind(this)}>Login</button>

        <div>{ this.renderError() }</div>

        {/* <p>{this.props.loggedUser ? `Logged as: ${this.props.loggedUser.name}`:''}</p> */}

        <div className="otherStuff">
          <ul>
            <li><Link to={"/login"}>login</Link></li>
            <li><Link to={"/users"}>users list</Link></li>
            <li><Link to={"/users-create"}>create user</Link></li>
            <li><Link to={"/users/terry"}>terry user</Link></li>
            <li><Link to={"/users/bob"}>bob user</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
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
    login,
    logout
  }
)(LoginPage)
