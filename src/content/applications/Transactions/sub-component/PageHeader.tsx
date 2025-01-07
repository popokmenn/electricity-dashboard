import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid display="flex">
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
          onClick={() => setOpen(true)}
        >
          Create unit
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
