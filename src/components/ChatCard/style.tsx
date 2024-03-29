import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  chatList: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3),
    marginTop: theme.spacing(10)
    // background: 'olive'
  },
  balloon: {
    background: '',
    height: '8%',
    width: '90%',
    borderRadius: '10px',
    // margin: theme.spacing(1),
    padding: theme.spacing(2),
    color: 'white'
  }
}))
