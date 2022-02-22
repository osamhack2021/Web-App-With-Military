import Axios from "axios";
import React, { useState, useEffect } from 'react';
import {Avatar, Box,
      Paper, Table, TableBody, TableCell, TableContainer, TableHead,
       TablePagination, TableRow} from '@mui/material';
import { Link } from 'react-router-dom';


function processUserRankData(userRankArray) {
  const processedArray = userRankArray.map((user, index) => {
    return { rank: index + 1,
             image: user.image,
             name: user.name,
             score: user.totalTime,
             link: `/users/${user._id}`,
             //change: "up" 
            }
  });
  return processedArray;
}

const columns = [
  { id: 'change', label: '변화', minWidth: 50 },
  { id: 'rank', label: '순위', minWidth: 50,},
  { id: 'name', label: '이름', minWidth: 100, imageRequired: true, align: 'left'},
  { id: 'score',label: '그룹 내 점수', minWidth: 200, align: 'right' },
];

export default function ScoreTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rankList, setRankList] = useState([]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const getUser = (user_id) => {
    return Axios.post("/api/users/profile", { userId: user_id })
  };

  const getUsers = (userIdArray) => {
    const userArray = userIdArray.map((userId, index) =>
      new Promise((resolve, reject) => {
        const userData = getUser(userId);
        resolve(userData);
      })
    );
    Promise.all(userArray).then((users) => {
      const members = users.map((user) => user.data.user);
      setRankList(processUserRankData(members));
      console.log(processUserRankData(members));
    })
  }
  
  useEffect(() => {
    getUsers(rows);
  }, []);
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rankList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          component={Link}
                          to={row.link}
                        >
                          {/*{column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}*/}
                          {column.imageRequired
                            ? <Box sx={{display: 'flex'}}>
                                <Avatar
                                  alt="profile"
                                  src={row.image}
                                />
                                {value}
                              </Box>
                            : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rankList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
  
}
  