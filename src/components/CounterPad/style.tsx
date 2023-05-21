import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  arrow: { 
    color: 'white', 
    opacity: '0.3',
    transform: `scale(${2.5})`,
    position: 'absolute' 
  },
  counterPad: {
    width: '50px',
    height: '50px',
    borderRadius: "50%",
    // border: "solid",
    backgroundColor: "#4F7175",
    color: 'white',
    fontSize: '1.8rem'
  }
}));
