import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  leaderboard: {
    height: '70%',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    alignContent: 'center'
  },
  itemList: {
    height: '100%',
    width: '100%',
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // margin: theme.spacing(3),
    // marginTop: theme.spacing(10)
    // background: 'olive'
  },
  itemOdd: {
    background: 'black',
    height: '8%',
    width: '90%',
    borderRadius: '10px',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // margin: theme.spacing(1),
    padding: theme.spacing(2),
    color: 'white'
  },
  itemEven: {
    background: 'grey',
    height: '8%',
    width: '90%',
    borderRadius: '10px',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // margin: theme.spacing(1),
    padding: theme.spacing(2),
    color: 'white'
  },
}))
