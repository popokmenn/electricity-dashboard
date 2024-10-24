import { Box, Container, Card, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Hero from './login';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Xapiens Teknologi Indonesia</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <img src="/static/images/logo/xapiens.png" alt="Xapiens" width={100} />
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 5 }}>
          <Hero />
        </Card>
      </Container>
      <Grid container justifyContent="center" alignItems="center">
        <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
      </Grid>

    </OverviewWrapper>
  );
}

export default Overview;
