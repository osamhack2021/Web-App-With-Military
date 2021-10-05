import React from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
} from '@mui/material';

const Rank = () => {
  let rank = 0;
  const users = Array(8)
    .fill()
    .map(() => ({
      // eslint-disable-next-line no-plusplus
      rank: rank++,
      name: '@goodgun',
    }));

  return (
    <Box sx={{ color: '#e6e1e0' }}>
      <Box sx={{ display: 'flex', p: '0.75rem 0' }}>
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '13px',
          }}
          src=""
        />
        <Box
          sx={{
            ml: '0.5rem',
          }}
        >
          <Typography
            align="right"
            style={{
              whiteSpace: 'nowrap',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            사단랭킹
          </Typography>
          <Typography
            align="right"
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            #19
          </Typography>
          <Box>
            <Typography
              align="right"
              style={{
                background:
                  '-webkit-linear-gradient(180deg, rgba(0, 255, 240, 0.64) 0%, rgba(250, 0, 255, 0.64) 100%)',
                webkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              Master
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ width: '50vw' }}>
          <TableContainer component={Paper}>
            <Table size="small">
              {/*  <TableHead></TableHead> */}
              <TableBody>
                {users.map(({ rankNum, name }) => (
                  <TableRow
                    style={{
                      backgroundColor: '#000F04',
                    }}
                    key={rankNum}
                  >
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none',
                        padding: '1px',
                      }}
                      align="right"
                    >
                      #
                      {rankNum + 17}
                    </TableCell>
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none',
                        padding: '1px',
                      }}
                      align="right"
                    >
                      {name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          p: '0.75rem 0',
        }}
      >
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '13px',
          }}
          src=""
        />
        <Box>
          <Typography
            align="right"
            style={{
              whiteSpace: 'nowrap',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            군단랭킹
          </Typography>
          <Typography
            align="right"
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            #223
          </Typography>
          <Box>
            <Typography
              align="right"
              style={{
                background:
                  '-webkit-linear-gradient(175.98deg, rgba(97, 255, 236, 0.8) 3.28%, rgba(255, 255, 255, 0.8) 96.76%)',
                webkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              Diamond
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ width: '50vw' }}>
          <TableContainer component={Paper}>
            <Table size="small">
              {/*  <TableHead></TableHead> */}
              <TableBody>
                {users.map(({ rankNum, name }) => (
                  <TableRow
                    style={{
                      backgroundColor: '#000F04',
                    }}
                    key={rankNum}
                  >
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none',
                        padding: '1px',
                      }}
                      align="right"
                    >
                      #
                      {rankNum + 17}
                    </TableCell>
                    <TableCell
                      style={{
                        color: '#e6e1e0',
                        border: 'none',
                        padding: '1px',
                      }}
                      align="right"
                    >
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

export default Rank;
