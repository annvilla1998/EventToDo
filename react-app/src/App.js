import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/User/UsersList';
// import User from './components/User/User';
import { Today } from './components/Today'
import { authenticate } from './store/session';
import {SideBar} from './components/SideBar'
import { TaskList } from './components/TaskList/index'
import { Completed } from './components/Completed';
import { LoadingPage } from './components/LoadingPage/LoadingPage';
// import { Events } from './components/Events/index'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <>
        {loading === false ? (
          <BrowserRouter>
            {sessionUser && (
              <>
                <NavBar user={sessionUser} />
              </>
                )}
      
            <div className="out">
            {sessionUser && (
              <SideBar user={sessionUser}>
                </SideBar>
              )}
              <Switch>
                <ProtectedRoute path='/today' exact={true} >
                    <Today/>
                </ProtectedRoute>
                <ProtectedRoute path='/completed' exact={true} >
                    <Completed/>
                </ProtectedRoute>
                <ProtectedRoute path='/events/:id' exact={true} >
                  <TaskList events={sessionUser?.events}/>
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true} >
                </ProtectedRoute>
              </Switch>
            </div>
              <Switch>
                <Route path='/login' exact={true}>
                  <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                  <SignUpForm />
                </Route>
              </Switch>
            </BrowserRouter>
        ) : (
          <LoadingPage/>
        )}
    </>
  );
}

export default App;
