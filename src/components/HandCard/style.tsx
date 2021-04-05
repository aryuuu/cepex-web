import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  container: {
    alignSelf: 'center',
    position: 'relative',
  },
  card: {
    // 'max-width': '100%',
    width: '15%',
    border: 'solid',
    borderRadius: '5%'
  }
}))
