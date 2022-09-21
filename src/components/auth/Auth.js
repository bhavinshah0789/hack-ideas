import { useState, Fragment } from 'react';
// components
import Header from '../header/Header';
// css classes
import classes from './Auth.module.css';
// constants
import AuthConstants from '../../data/AuthConstants';

const Auth = () => {
  const [submitButtonCaption, setSubmitButtonCaption] = useState(AuthConstants.loginText);
  const [formCaption, setFormCaption] = useState(AuthConstants.signupInsteadText);
  const [formMode, setFormMode] = useState(AuthConstants.loginMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailPattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+";
  const passwordPattern = "^[A-Za-z0-9]{6,}$";

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

  return (
    <Fragment>
        <Header />
        <main className={classes.auth}>
          <section>
            <form>
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
