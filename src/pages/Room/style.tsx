import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(3),
    height: theme.spacing(12),
    width: theme.spacing(12)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  confirm: {
    margin: theme.spacing(3, 0, 2)
  },
  profile: {
    margin: theme.spacing(0),
    height: '100vh',
    // background: 'pink'
  },
  table: {
    // background: 'green',
    height: '100%'
  },
  card: {
    // width: '10%',
    border: 'solid',
    borderRadius: '5%',
    // position: 'relative'
  },
  room: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(0)
  },
  chat: {
    // background: 'violet',
    height: '100vh'
  },
  roomCont: {
    padding: theme.spacing(0),
    width: '100%',
    maxWidth: '95%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 100
  },
  control: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));
