import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Control, Form, Errors } from 'react-redux-form' //actions

//import { loadUser, loadStarred } from '../actions'
// import User from '../components/User'
// import List from '../components/List'
// import zip from 'lodash/zip'

// const loadData = ({ login, loadUser, loadStarred }) => {
//   loadUser(login, [ 'name' ])
//   loadStarred(login)
// }

class TestPage extends Component {
  static propTypes = {
    // login: PropTypes.string,
    // user: PropTypes.object,
    // starredPagination: PropTypes.object,
    // starredRepos: PropTypes.array.isRequired,
    // starredRepoOwners: PropTypes.array.isRequired,
    // loadUser: PropTypes.func.isRequired,
    // loadStarred: PropTypes.func.isRequired
  }

  // componentWillMount() {
  //   loadData(this.props)
  // }
  // 
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.login !== this.props.login) {
  //     loadData(nextProps)
  //   }
  // }
  // 
  // handleLoadMoreClick = () => {
  //   this.props.loadStarred(this.props.login, true)
  // }
  // 

  // render() {
  //   const { user, login } = this.props
  //   if (!user) {
  //     return <h1><i>Loading {login}{"'s profile..."}</i></h1>
  //   }
  // 
  //   const { starredRepos, starredRepoOwners, starredPagination } = this.props
  //   return (
  //     <div>
  //       <User user={user} />
  //       <hr />
  //       <List renderItem={this.renderRepo}
  //             items={zip(starredRepos, starredRepoOwners)}
  //             onLoadMoreClick={this.handleLoadMoreClick}
  //             loadingLabel={`Loading ${login}'s starred...`}
  //             {...starredPagination} />
  //     </div>
  //   )
  // }

  button0clicked() {
    //const { dispatch } = this.props;
    console.log('button0clicked', arguments)

    /* this.props.dispatch(
     *   actions.change('forms.user.firstName', user.firstName + '!')
     * )*/
  }

  button1clicked() {
    console.log('b1click', this.props.forms.user)
  }

  render() {
    let form = this.props.forms.user
    console.log('RR', form)

    return (
      <div>
        <Form model="forms.user"
              onSubmit={this.button0clicked.bind(this)}>

          <label>First name:</label>
          <Control.text model=".firstName"
                        validators={{
                          required: (val) => val,
                          longEnough: (val) => val && val.length > 3,
                          //isEmail,
                        }}
          />

          <label>Last name:</label>
          <Control.text model=".lastName" />

          <label>email:</label>
          <Control.text type="email" model=".email" />

          <label></label>

          <p>Form.valid: {String(form.$form.valid)}</p>
          <p>firstName.valid: {String(form.firstName.valid)}
            {JSON.stringify(form.firstName.errors)}
          </p>
          <p>lastName.valid: {String(form.lastName.valid)}</p>
          <p>email.valid: {String(form.email.valid)}</p>

          <hr />
          <Errors model="forms.user.firstName"
                  /* messages={{
                  isRequired: 'Please provide an email address.',
                  isEmail: (val) => `${val} is not a valid email.`,
                  longEnough: val => `Not long enough: ${val}`
                  }} */
                  show={true}
          />

          <button onClick={this.button0clicked.bind(this)}>button0</button>

          <button onClick={this.button1clicked.bind(this)}>button1</button>

        </Form>

      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {

  console.log('333', state)
  //const login = ownProps.params.login.toLowerCase()
  
  // const {
  //   pagination: { starredByUser },
  //   entities: { users, repos }
  // } = state
  // 
  // const starredPagination = starredByUser[login] || { ids: [] }
  // const starredRepos = starredPagination.ids.map(id => repos[id])
  // const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    forms: state.forms.forms
    // login,
    // starredRepos,
    // starredRepoOwners,
    // starredPagination,\
    // user: users[login]
  }

}



export default connect(
  mapStateToProps,
  //{
    // loadUser,
    // loadStarred
  //}
)(TestPage)
