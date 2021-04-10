import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  container: {
    alignSelf: 'center',
    position: 'relative',
    height: '60%'
  },
  card: {
    margin: theme.spacing(1),
    width: '40%',
    border: 'solid',
    borderRadius: '5%',
    position: 'relative'
  },
  choice: {
    background: 'white',
    opacity: '60%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  button: {
    minHeight: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
}))
