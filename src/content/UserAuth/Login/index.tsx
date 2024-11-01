import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(30)};
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={10} mx="auto">
          <TypographyH1 sx={{ mb: 2 }} variant="h3">
            Welcome
          </TypographyH1>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Username"
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type='password'
            />
            <Button
              component={RouterLink}
              to="/dashboards/summary"
              size="large"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
