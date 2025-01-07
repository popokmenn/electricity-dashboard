import { Typography, Button, Grid, IconButton, Box, Tooltip } from '@mui/material';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { Customer } from '../../types';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router';

function PageHeader({ serialNumber, detail }: { serialNumber: string, detail: Customer }) {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Grid display="flex">
          <Box display="flex" mb={3}>
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                color="primary"
                sx={{ p: 2, mr: 2 }}
                onClick={() => navigate(`/management/transactions`)}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              KWh Unit
            </Typography>
            <Typography variant="subtitle2">
              <strong>Serial Number: </strong>{serialNumber}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Address: </strong>{detail?.address || ''}
            </Typography>
          </Grid>
        </Grid>

      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          color="warning"
          startIcon={<DescriptionTwoToneIcon fontSize="small" />}
        >
          Export to PDF
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
