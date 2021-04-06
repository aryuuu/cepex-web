import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  container: {
    alignSelf: 'center',
    position: 'relative',
  },
  card: {
    margin: theme.spacing(1),
    width: '40%',
    border: 'solid',
    borderRadius: '5%'
  }
}))
