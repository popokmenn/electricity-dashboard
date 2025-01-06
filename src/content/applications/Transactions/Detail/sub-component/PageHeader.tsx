import { Typography, Button, Grid } from '@mui/material';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
interface Detail {
  building: string;
  deviceId: string;
  deviceName: string;
  id: string;
  unit: string;
}

function PageHeader({ serialNumber, detail }: { serialNumber: string, detail: Detail }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Usage Detail
        </Typography>

        <Grid container gap={10}>
          <Grid item>
            <Typography variant="subtitle2">
              Serial Number: {serialNumber}
            </Typography>

            <Typography variant="subtitle2">
              Unit: {detail.unit}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2">
              Building: {detail.building}
            </Typography>


            <Typography variant="subtitle2">
              Device Name: {detail.deviceName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              Unit: {detail.unit}
            </Typography>


            <Typography variant="subtitle2">
              Device ID: {detail.deviceId}
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
