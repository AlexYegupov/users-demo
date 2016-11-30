import React, { Component, PropTypes } from 'react'
//import { Link } from 'react-router'


class UserEdit extends Component {
  static propTypes = {
    //aa: PropTypes.string
    user: PropTypes.shape({
      slug: PropTypes.string,
      login: PropTypes.string,
      name: PropTypes.string
      //avatarUrl: PropTypes.string.isRequired,
      //aa: PropTypes.string
    }),
    onSave: PropTypes.func
  }

  constructor(props) {
    super(props)
    console.log('UserEdit. user:', props.user)
    this.state = {userForm: props.user}
  }

  render() {
    /* if (!this.props.user) {
     *   if (this.props.userError)
     *     //console.log('UE1', this.props.userError)
     *     //console.log('UE2', JSON.stringify(this.props.userError))

     *     return (<div>Error: {stringifySimple(this.props.userError)}</div>)

     *   return null
     * }*/

    console.log('RENDERING UserEdit')
    //const readOnly = !this.props.loggedUser
    //console.log(2222, this.test)
    return (
      <div>
        <div>
          Name:
          <input value={this.state.userForm.name}
                 /* ref={(input) => this.nameInput = input} */
                 /* readOnly={readOnly} */
                 onChange={this.handleChange.bind(this, 'name')}
            />
        </div>

        <div>
          Login:
          <input value={this.state.userForm.login}
                 /* {this.props.user.login} */
                 /* readOnly={readOnly} */
                 onChange={this.handleChange.bind(this, 'login')}
          />
        </div>

        <div>
          Slug:
          <input value={this.state.userForm.slug}
                 readOnly={this.props.user.slug}  /* cannot modify existing */
                 onChange={this.handleChange.bind(this, 'slug')}
          />
        </div>

        <div>
          <button onClick={this.saveClicked.bind(this)}>Save</button>
          {/* disabled={readOnly}*/}

        </div>
      </div>
    )
  }

  handleChange(attr, event) {
    //console.log(11, JSON.stringify(this.state), attr, event.target.value)
    let userForm = this.state.userForm
    userForm[attr] = event.target.value
    this.setState({userForm})
  }

  saveClicked() {
    //console.log('cdm+', this.loginInput.value)
    //console.log('sC', this.state.userForm)
    this.props.onSave(this.state.userForm)
  }

}

export default UserEdit
