import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  swipeEdge: {
    position: 'absolute',
    top: -50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    visibility: 'visible',
    right: 0,
    left: 0,
  },
  pullerTab: {
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  },
  emptyCards: {
    height: '15vh',
  },
  drawer: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(0),
    backgroundColor: '#112633'
  },
  control: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
}))

