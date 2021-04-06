import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(8),
    width: theme.spacing(8),
    border: 'solid'
    // position: 'absolute'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    position: 'absolute'
  },
  confirm: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarCont: {
    position: 'absolute'
  },
  container: {
    position: 'relative'
  }
}));
