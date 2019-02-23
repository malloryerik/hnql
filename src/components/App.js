import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'

class App extends Component {
  render() {
    return (
      <div className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
        <CreateLink />
        <LinkList />
      </div>

    )
  }
}

export default App;
