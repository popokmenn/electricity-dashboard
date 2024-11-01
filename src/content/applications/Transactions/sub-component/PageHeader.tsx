import { Typography, Button, Grid, Box, Tooltip, IconButton } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid display="flex">
        <Box display="flex" mb={3}>
          <Tooltip arrow placement="top" title="Go back">
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            kWh Unit
          </Typography>
          <Typography variant="subtitle2">
            Detail usage of all units
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create unit
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
