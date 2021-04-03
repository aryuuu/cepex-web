import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  confirm: {
    margin: theme.spacing(3, 0, 2)
  }
}));
