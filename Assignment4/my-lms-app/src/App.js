import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import CoursesPage from './components/CoursesPage';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default App;
