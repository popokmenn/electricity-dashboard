import { TrendingUp } from '@mui/icons-material';
import {
  Box,
  Card,
  Avatar,
  styled,
  Typography,
  CardHeader,
} from '@mui/material';

function WatchList({ label }: { label: string }) {
  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
  );
  return (
    <Card>
      <CardHeader title={label} />
      <Box p={4} pt={2}>
        <Typography variant="h1" gutterBottom>
          {Math.random().toFixed(2)}
        </Typography>
        <Box alignItems="center" display="flex">
          <AvatarSuccess
            sx={{
              mr: 2,
              width: 30,
              height: 30
            }}
            variant="rounded"
          >
            <TrendingUp fontSize="small" />
          </AvatarSuccess>
          <div>
            <Typography variant="h4">+ {Math.random().toFixed(2)}</Typography>
            <Typography variant="subtitle2" noWrap>
              this month
            </Typography>
          </div>
        </Box>
      </Box>
    </Card>
  );
}

export default WatchList;
