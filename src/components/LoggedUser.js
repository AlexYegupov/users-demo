import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// const LoggedUser = ({ user }) => {
//   const { login, avatarUrl, name } = user
// 
//   return (
//     <div className="User">
//       <Link to={`/${login}`}>
//         <img src={avatarUrl} alt={login} width="72" height="72" />
//         <h3>
//           {login} {name && <span>({name})</span>}
//         </h3>
//       </Link>
//     </div>
//   )
// }
// 
// LoggedUser.propTypes = {
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//     name: PropTypes.string
//   }).isRequired
// }

/* 
 * // <LU p1="n1" />
 * const LoggedUser = ({ ss, ii }) => {
 * 
 *   function handleClick() {
 *     //store.dispatch({ type: 'INCREMENT' })
 *     //this.props.dispatch
 *     alert('clicked'+this)
 * 
 *   }
 * 
 *   return <div>
 *     aaa {ss} {ii} bbb
 * 
 *     <button onClick={handleClick}>theButton</button>
 * 
 *   </div>
 * }
 * 
 * LoggedUser.propTypes = {
 *   ss: PropTypes.string.isRequired,
 *   ii: PropTypes.number,
 * }
 * */


class LoggedUser extends React.Component {

  static propTypes = {
    loggedUser: PropTypes.shape({
      login: PropTypes.string.isRequired,
      //avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  }


  handleClick() {
    this.props.dispatch({ type: 'TEST' })
    //this.props.dispatch
    //console.log('clicked', this, 111, this.store, 222, this.props.dispatch({, 333, this.props)
    
  }

  render() {

    return <div> LLL </div>
    /* 
     *     if (this.props.loggedUser) {
     *       return <div>
     *         Logged user: {this.props.loggedUser || ''}
     *       </div>
     *     } else {
     *       return <div>
     *         <Link to={"/login"}>Login</Link>
     *       </div>
     *     }
     *     // <button onClick={this.handleClick.bind(this)}>theButton</button>
     * */
  }
}




//export default LoggedUser

export default connect(
  /* (state, ownProps) => {
   *   return {
   *     loggedUser: state.auth.user
   *   }
   * }*/
)(LoggedUser)
