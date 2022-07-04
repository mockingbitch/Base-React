import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "./redux";
import NavHeader from './components/NavHeader';
import Home from './containers/Home';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "./hoc/authentication";
// import { path } from "./utils";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="container mt-3">
          <Router history={history}>
            <Switch>
              <Route exact path={["/", "/home"]} component={userIsAuthenticated(Home)} />
              <Route exact path="/login" component={userIsNotAuthenticated(Login)} />
              <Route path="/dashboard" component={userIsAuthenticated(Dashboard)} />

              {/*<Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/user" component={BoardUser} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} /> */}
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
