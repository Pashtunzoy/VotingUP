import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import SetupUser from './components/user/SetupUser';
import MyPolls from './components/user/MyPolls';
import SinglePoll from './components/user/SinglePoll';
import NewPoll from './components/user/NewPoll';
import requireAuth from './components/HOCs/authHOC';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="auth" component={SetupUser} />
    <Route path="/:Id/polls" component={requireAuth(MyPolls)}/>
    <Route path="/:uId/poll/:id" component={SinglePoll}/>
    <Route path="new" component={requireAuth(NewPoll)}/>
  </Route>
);
