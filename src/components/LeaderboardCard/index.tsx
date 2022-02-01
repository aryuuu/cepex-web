import React from 'react';
import {
  Grid,
  GridList,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import { Player } from '../../types';
import { useStyles } from './style';

interface Prop {
  items: Player[]
}

const LeaderboardCard = (properties: Prop) => {
  const { items } = properties;
  const styles = useStyles();
  const renderItem = items.map((item: Player, index: number) => {
    return (
      <TableRow>
        <TableCell align="center">#{index+1}</TableCell>
        <TableCell align="center">{item.name}</TableCell>
        <TableCell align="center">{item.score}</TableCell>
      </TableRow>
      // <Grid
      //   className={index % 2 === 0 ? styles.itemEven : styles.itemOdd}
      //   key={`item-${index}`}
      // >
      //   <b>#{index+1} {item.avatar_url} {item.name} {item.score}</b>
      // </Grid>
    )
  })

  return (
    <Grid
      className={styles.leaderboard}
    >
      <Typography align="center">Leaderboard</Typography>
      {/* <GridList
        className={styles.itemList}
        cols={1}
        cellHeight='auto'
      >
        {renderItem}
      </GridList> */}
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {renderItem}
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}

export default LeaderboardCard;
