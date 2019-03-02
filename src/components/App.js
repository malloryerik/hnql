import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Header from './Header'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Hangout from './Hangout'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 bg-washed-yellow">
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/hangout" component={Hangout} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;