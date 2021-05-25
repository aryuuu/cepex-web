import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(8),
    width: theme.spacing(8),
    border: 'solid',
  },
  inTurn: {
    borderColor: '#D65824',
  },
  dead: {
    borderColor: 'gray',
  },
  alive: {
    borderColor: '#E9F994'
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
    position: 'absolute',
    color: 'white'
  },
  container: {
    position: 'relative',
    transform: 'translate(-40px, -20px)'
  }
}));
