import React, { Component, PropTypes } from 'react'
//import { Link } from 'react-router'


// TODO: remove duplicate
function isSameUser(user1, user2) {
  return (user1||{}).slug === (user2 ||{}).slug
}

class UserEdit extends Component {
  static propTypes = {
    readOnly: PropTypes.bool,
    user: PropTypes.shape({
      slug: PropTypes.string,
      login: PropTypes.string,
      name: PropTypes.string
       //pwd: PropTypes.string
      //avatarUrl: PropTypes.string.isRequired,
      //aa: PropTypes.string
    }),
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  constructor(props) {
    super(props)
    console.log('UserEdit. user:', props.user)

    // let user = Object.assign({name: '', login: '', pwd: '', pwd2: '', slug: ''}, props.user)
    // this.state = {userForm: user, error: ''}

    this.state = {userForm: this.userToForm(props.user)} //error: ''
  }

  componentWillReceiveProps(nextProps) {
    console.log('UserEdit: CWRP', nextProps)
    // reset form
    if (nextProps.user && !isSameUser(this.props.user, nextProps.user)) {
      this.setState( {userForm: this.userToForm(nextProps.user)} )
    }
  }

  userToForm(user) {
    return Object.assign({pwd: '', pwd2: ''}, user)
  }

  // componentWillUpdate(nextProps, nextState) {
  // 
  //   let error = this.getFormError(this.state.userForm)
  //   //this.setState( {userForm, error} )
  //   if (this.props.onChange) this.props.onChange(userForm, error)
  // 
  // 
  // }

  componentDidUpdate(prevProps, prevState) {
    //console.log('UserEdit: CDU', this.state)
    // if (this.props.onChange) {
    //   this.props.onChange(this.state.userForm, this.state.error)
    // }

  }

  render() {
    /* if (!this.props.user) {
     *   if (this.props.userError)
     *     //console.log('UE1', this.props.userError)
     *     //console.log('UE2', JSON.stringify(this.props.userError))

     *     return (<div>Error: {stringifySimple(this.props.userError)}</div>)

     *   return null
     * }*/

    const readOnly = this.props.readOnly
    console.log('UserEdit: RENDERING', readOnly, this.state)

    return (
      <div>
        <div>
          Name:
          <input value={this.state.userForm.name}
                 /* ref={(input) => this.nameInput = input} */
                 disabled={readOnly}
                 onChange={this.handleChange.bind(this, 'name')}
            />
        </div>

        <div>
          Login:
          <input value={this.state.userForm.login}
                 /* {this.props.user.login} */
                 disabled={readOnly}
                 onChange={this.handleChange.bind(this, 'login')}
          />
        </div>

        <div>
          Password:
          <input value={this.state.userForm.pwd}
                 disabled={readOnly}
                 onChange={this.handleChange.bind(this, 'pwd')}
          />
        </div>

        <div>
          Password again:
          <input value={this.state.userForm.pwd2}
                 disabled={readOnly}
                 onChange={this.handleChange.bind(this, 'pwd2')}
          />
        </div>

        {/* { this.state.error ? <div>Error: {this.state.error}</div> : '' } */}
        <div>
          <button onClick={this.saveClicked.bind(this)}
                  disabled={readOnly || this.state.error}>Save</button>


        </div>
      </div>
    )
  }

  // simplified form error
  getFormError(form) {
    if (!form['name']) return 'Empty name'
    if (!form['login']) return 'Empty login'
    if (form['login'].length < 2) return 'Login should be 2+ characters length'
    //if (!form['pwd']) return 'Empty password' (if edit user could be empty)
    if (form['pwd'] !== form['pwd2']) return 'Password mismatch'
  }

  handleChange(attr, event) {
    //console.log(11, JSON.stringify(this.state), attr, event.target.value)
    let userForm = this.state.userForm
    userForm[attr] = event.target.value

    let error = this.getFormError(userForm)

    this.setState( {userForm, error} )

    if (this.props.onUpdate) this.props.onUpdate(error)  // userForm,
  }

  saveClicked() {
    //console.log('cdm+', this.loginInput.value)
    //console.log('sC', this.state.userForm)

    //let error = this.state.error
    let user = Object.assign({}, this.state.userForm)
    if (!user.pwd) delete user.pwd // don't change password if empty value
    delete user.pwd2

    this.props.onSave(user)     // , error
  }

}

export default UserEdit
