import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(12),
    width: theme.spacing(12),
    border: 'solid'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: 'white'
  },
  confirm: {
    margin: theme.spacing(3, 0, 2)
  },
  container: {
    height: '100vh',
    backgroundColor: '#112633',
  },
  theContainer: {
    backgroundColor: '#112633'
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  },
  disabledButton: {
    backgroundColor: "#1D3540"
  },
  normalButton: {
    backgroundColor: "#4F7175",
    color: "white"
  }
}));
