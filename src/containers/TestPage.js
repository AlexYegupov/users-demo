import React, { Component } from 'react'
import { connect } from 'react-redux'
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

  render() {
    return (
        <div>
          this is test
        </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
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
    // login,
    // starredRepos,
    // starredRepoOwners,
    // starredPagination,\
    // user: users[login]
  }

}



export default connect(
  mapStateToProps,
  {
    // loadUser,
    // loadStarred
  }
)(TestPage)
