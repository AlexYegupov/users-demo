import React, { Component, PropTypes } from 'react'
//import { Link } from 'react-router'
import { isUserChanged } from  '../utils/userUtil'
import { union } from  '../utils/setUtil'

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
    error: PropTypes.string,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  constructor(props) {
    super(props)
    console.log('UserEdit. constructor. user:', props.user)
    this.state = {
      userForm: this.userToForm(props.user),
      modifiedFields: new Set()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('UserEdit: CWRP', this.props, nextProps)
    // reset form
    if (nextProps.user && isUserChanged(this.props.user, nextProps.user)) {
      this.setState( {
        userForm: this.userToForm(nextProps.user),
        modifiedFields: new Set()
      } )
    }

    if (nextProps.error && !this.state.error) {
      this.setState( {error:nextProps.error} )
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   
  // }

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

    let saveDisabled = (readOnly || this.state.error
                        || !this.state.modifiedFields.size)
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
                 type="password"
                 disabled={readOnly}
                 onChange={this.handleChange.bind(this, 'pwd')}
          />
        </div>

        <div>
          Password again:
          <input value={this.state.userForm.pwd2}
                 type="password"
                 disabled={readOnly}
                 onChange={this.handleChange.bind(this, 'pwd2')}
          />
        </div>

        {/* { this.state.error ? <div>Error: {this.state.error}</div> : '' } */}
        <div>
          <button onClick={this.saveClicked.bind(this)}
                  disabled={saveDisabled}>Save</button>


        </div>
      </div>
    )
  }

  // simplified form error
  getFormError(form) {
    console.log('FF', form)
    if (!form['name']) return 'Empty name'
    if (!form['login']) return 'Empty login'
    if (form['login'].length < 3) return 'Login should be 3+ characters length'
    //if (!form['pwd']) return 'Empty password' (if edit user could be empty)
    if (form['pwd'] !== form['pwd2']) return 'Password mismatch'
  }

  handleChange(attr, event) {
    //console.log(11, JSON.stringify(this.state), attr, event.target.value)
    let userForm = this.state.userForm
    userForm[attr] = event.target.value

    let error = this.getFormError(userForm)
    let modifiedFields = union(this.state.modifiedFields, [attr])

    this.setState( {userForm, error, modifiedFields} )

    if (this.props.onUpdate) this.props.onUpdate(error)  // userForm,
  }


  userToForm(user) {
    return Object.assign({pwd: '', pwd2: ''}, user)
  }

  // form -> user
  getFormUser() {
    let user = {}

    let fields = new Set(this.state.modifiedFields)

    if (this.state.userForm['slug']) fields.add('slug')

    // don't change password if empty value
    if (!this.state.userForm['pwd']) {
      fields.delete('pwd')
    }

    fields.delete('pwd2')

    for (let f of fields) {
      user[f] = this.state.userForm[f]
    }

    return user
  }

  saveClicked() {
    let user = this.getFormUser()
    console.log('saveClicked', user) //this.props.user,this.state.modifiedFields)

    this.props.onSave(user)
  }

}

export default UserEdit
