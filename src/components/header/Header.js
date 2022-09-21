// css classes
import classes from './Header.module.css';
// constants
import HeaderConstants from '../../data/HeaderConstants';


const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>{HeaderConstants.pageHeaderText}</h1>
    </header>
  );
};

export default Header;
