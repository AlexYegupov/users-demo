import React, { Component, PropTypes } from 'react'

class NotFoundPage extends Component {
  static propTypes = {
    location: PropTypes.object,
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
  // renderRepo([ repo, owner ]) {
  //   return (
  //     <Repo
  //       repo={repo}
  //       owner={owner}
  //       key={repo.fullName} />
  //   )
  // }

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
    const message = this.props.location.query.message || 'Not found'

    return (
      <div>
        <h3>404</h3>
        { message }
      </div>
    )
  }

}


export default NotFoundPage
