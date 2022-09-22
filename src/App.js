import { Fragment, useEffect} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// components
import Auth from './components/auth/Auth';
import EventPage from './components/event-page/EventPage';
import Header from './components/header/Header';
import AddEvent from './components/add-event/AddEvent';
// store
import { authActions } from './store/auth-store';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // keep the user session active on refreshing the page
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(
        authActions.auth({
          token: token,
          userId: localStorage.getItem('userId'),
          tokenTimer: setTimeout(() => {
            dispatch(authActions.logout());
          }, localStorage.getItem('expiresIn'))
        }
      ));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/login">
            {isAuthenticated && <Redirect to="/events" />}
            {!isAuthenticated && <Auth />}
          </Route>
          <Route path="/events">
            {isAuthenticated && <EventPage />}
            {!isAuthenticated && <Redirect to="/login" />}
          </Route>
          <Route path="/addEvent">
            {isAuthenticated && <AddEvent />}
            {!isAuthenticated && <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/events" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </BrowserRouter>
  </Fragment>
  );
}

export default App;
