import React, { Component, PropTypes } from 'react'

class NotFoundPage extends Component {
  static propTypes = {
    location: PropTypes.object,
  }

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
