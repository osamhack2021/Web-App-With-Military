import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';
import {Table,TableBody,TableCell,
  TableContainer,TableHead,TableRow,Paper,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';


const RankComponent = () => {
  let rank = 0;
  const users = Array(8)
    .fill()
    .map(() => ({
      rank: rank++,
      name: '@xunno',
    }));

  return (
    <Box sx={{
      p: 1,
      }}>
      <Box sx={{
        display: 'flex',
        color: '#e6e1e0'
      }}>
        <Avatar src=""/>
        <Box>
          <Typography variant="h3" align="right">
            사단랭킹</Typography>
          <Typography variant="h2" align="right">#19</Typography>
          <Box>
            <Typography variant="h3" align="right"
            style={{
              background: "-webkit-linear-gradient(180deg, rgba(0, 255, 240, 0.64) 0%, rgba(250, 0, 255, 0.64) 100%)",
              webkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 'bold'
            }}>Master</Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{
            width: "50vw"
          }}>
          <TableContainer 
            component={Paper}
          >
            <Table size="small">
              {/*  <TableHead></TableHead>*/}
              <TableBody>
                {users.map(({ rank, name },  i ) => (
                  <TableRow style={{
                    backgroundColor: '#000F04',
                  }}
                  key={rank}>
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none'
                      }} 
                      align="left">
                      #{rank+17}
                    </TableCell>
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none'
                      }}
                      align="right">
                      {name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        color: '#e6e1e0'
      }}>
        <Avatar src=""/>
        <Box>
          <Typography variant="h3" align="right">
            군단랭킹</Typography>
          <Typography variant="h2" align="right">#223</Typography>
          <Box>
            <Typography variant="h3" align="right"
            style={{
              background: "-webkit-linear-gradient(180deg, #1FFFF2 0%, rgba(112, 255, 246, 0.8) 100%)",
              webkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 'bold'
            }}>Diamond</Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            width: "50vw"
          }}>
          <TableContainer 
            component={Paper}
          >
            <Table size="small">
              {/*  <TableHead></TableHead>*/}
              <TableBody style={{
                
              }}>
                {users.map(({ rank, name },  i ) => (
                  <TableRow style={{
                    backgroundColor: '#000F04',
                  }}
                  key={rank}>
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none'
                      }} 
                      align="left">
                      #{rank+17}
                    </TableCell>
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none'
                      }}
                      align="right">
                      {name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      
    </Box>
    
  );
};

export default RankComponent;