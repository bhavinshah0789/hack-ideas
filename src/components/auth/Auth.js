import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-store';
// components
import BaseDialog from '../base-dialog/BaseDialog';
import BaseSpinner from '../base-spinner/BaseSpinner';
// css classes
import classes from './Auth.module.css';
// constants
import AuthConstants from '../../data/AuthConstants';

const Auth = () => {
  const [submitButtonCaption, setSubmitButtonCaption] = useState(AuthConstants.loginText);
  const [formCaption, setFormCaption] = useState(AuthConstants.signupInsteadText);
  const [formMode, setFormMode] = useState(AuthConstants.loginMode);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const emailPattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+";
  const passwordPattern = "^[A-Za-z0-9]{6,}$";

  const handleError = () => {
    setError(null);
  }

  const auth = async (payload) => {
    const mode = payload.mode;
    let url = AuthConstants.loginUrl;

    if (mode === AuthConstants.signupMode) {
      url = AuthConstants.signupUrl;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || AuthConstants.customErrorMsg
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('tokenExpiration', expirationDate);

    dispatch(authActions.auth({
      token: responseData.idToken,
      userId: responseData.localId,
      isAuthenticated: true,
      tokenTimer: setTimeout(() => {
        dispatch(authActions.logout());
      }, expiresIn)
    }));
  };

  const updateEmail = (event) => {
    setEmail(event.target.value.trim());
  };

  const updatePassword = (event) => {
    setPassword(event.target.value.trim());
  };

  const updateButtonCaption = () => {
    if (formCaption === AuthConstants.signupInsteadText) {
      setSubmitButtonCaption(AuthConstants.signupText);
      setFormCaption(AuthConstants.loginInstead);
      setFormMode(AuthConstants.signupMode);
    } else {
      setSubmitButtonCaption(AuthConstants.loginText);
      setFormCaption(AuthConstants.signupInsteadText);
      setFormMode(AuthConstants.loginMode);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    
    setIsLoading(true);

    const actionPayload = {
      email: email,
      password: password,
      mode: formMode
    };

    try {
      await auth(actionPayload);
    } catch (err) {
      setError(err.message || AuthConstants.customErrorMsg);
    }

    setIsLoading(false);
  };
  
  return (
      <Fragment>
        <main className={classes.auth}>
          <BaseDialog
            open={!!error}
            title={AuthConstants.dialogErrorTitle}
            desc={error}
            closeDialog={handleError}
          />
          <BaseDialog
            open={isLoading}
            hideActions={true}
            title={AuthConstants.loadingText}
            desc={<BaseSpinner/>}
          />
          <section>
            <form onSubmit={submitForm}>
              <div className={classes.control}>
                <label htmlFor='email'>{AuthConstants.emailText}</label>
                <input
                  type='email'
                  id='email'
                  pattern={emailPattern}
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor='password'>{AuthConstants.passwordText}</label>
                <input
                  type='password'
                  id='password'
                  pattern={passwordPattern}
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className={classes.control}>
                <button mode={formMode} type="submit">{submitButtonCaption}</button>
                <button type="button" onClick={updateButtonCaption}>{formCaption}</button>
              </div>
            </form>
          </section>
        </main>
      </Fragment>
  );
};

export default Auth;
