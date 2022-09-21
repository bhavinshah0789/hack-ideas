import { useSelector, useDispatch } from 'react-redux';
// css classes
import classes from './Header.module.css';
// constants
import HeaderConstants from '../../data/HeaderConstants';
// store
import { authActions } from '../../store/auth-store';

const Header = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>{HeaderConstants.pageHeaderText}</h1>
      {isAuthenticated && 
        <nav>
          <ul>
            <li>
              {
                !props.hideAddEventBtn &&
                <button
                  type="button"
                >
                  {HeaderConstants.addEventText}
                </button>
              }
            </li>
            <li>
              <button
                type="button"
                onClick={logout}
              >
                {HeaderConstants.logoutText}
              </button>
            </li>
          </ul>
        </nav>
      }
      
    </header>
  );
};

export default Header;
