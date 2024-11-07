import { Typography, Button, Grid } from '@mui/material';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

function PageHeader({ serialNumber }: { serialNumber: string }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Usage Detail
        </Typography>
        <Typography variant="subtitle2">
          Serial Number: {serialNumber}
        </Typography>
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
