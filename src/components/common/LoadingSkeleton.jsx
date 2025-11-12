import { Skeleton, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
              </TableCell>
            ))}
            <TableCell>
              <Skeleton variant="text" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
              <TableCell>
                <Skeleton variant="rectangular" height={30} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const CardSkeleton = () => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
      <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={40} width="60%" />
    </Paper>
  );
};

export const DashboardSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="text" height={50} width={300} sx={{ mb: 4 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );
};

export const FormSkeleton = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Skeleton variant="text" height={50} width={200} sx={{ mb: 3 }} />
      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Skeleton variant="text" height={30} width={150} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" height={56} />
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Skeleton variant="rectangular" height={42} width={100} />
        <Skeleton variant="rectangular" height={42} width={100} />
      </Box>
    </Paper>
  );
};
