import { TrendingDown, TrendingUp } from '@mui/icons-material';
import {
  Box,
  Card,
  Avatar,
  styled,
  Typography,
  CardHeader,
} from '@mui/material';

function WatchList({ label, value, previousValue }: { label: string, value: number, previousValue: number }) {
  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
  `
  );
  return (
    <Card>
      <CardHeader title={label} />
      <Box p={4} pt={2}>
        <Typography variant="h1" gutterBottom>
          {value}
        </Typography>
        <Box alignItems="center" display="flex">
          <AvatarSuccess
            sx={{
              mr: 2,
              width: 30,
              height: 30,
              backgroundColor: value - previousValue < 0 ? '#FF0000' : '#008000',
              boxShadow: value - previousValue < 0 ? '#FF0000' : '#008000'
            }}
            variant="rounded"
          >
            {value - previousValue < 0 ? <TrendingDown fontSize="small" /> : <TrendingUp fontSize="small" />}
          </AvatarSuccess>
          <div>
            <Typography variant="h4">{isNaN(value) || isNaN(previousValue) ? 'Nan' : value - previousValue < 0 ? `- ${Math.abs(value - previousValue).toFixed(2)}` : `+ ${(value - previousValue).toFixed(2)}`}</Typography>
            <Typography variant="subtitle2" noWrap>
              Previous Data: {previousValue}
            </Typography>
          </div>
        </Box>
      </Box>
    </Card>
  );
}

export default WatchList;
