import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Card } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import CustomTable from 'src/components/Table';
import { units } from './sub-component/data';
import PageHeader from './sub-component/PageHeader';

function ApplicationsTransactions() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>kWh Unit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CustomTable data={units} title="Units"
                navigateAction={{
                  onClickDetails: (id: string) => {
                    navigate(`/management/transactions/detail/${id}`, { state: { id: id } });
                  }
                }}
                columns={[
                  {
                    label: 'Building',
                    field: 'building'
                  },
                  {
                    label: 'Unit',
                    field: 'unit'
                  },
                  {
                    label: 'Device ID',
                    field: 'deviceId'
                  },
                  {
                    label: 'Device Name',
                    field: 'deviceName'
                  }
                ]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
