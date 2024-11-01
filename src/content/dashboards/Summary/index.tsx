import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography } from '@mui/material';

import Rank from './sub-component/Rank';
import TotalKwh from './sub-component/TotalKwh';
import WatchList from './sub-component/WatchList';
import { useState } from 'react';
import { useEffect } from 'react';
import { createMqttClient } from 'src/util/mqtt-client';

function DashboardCrypto() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const topic = 'Gedung-1/tamananggrek/uplink/telemetry/modem1/45610294848'; // Replace with your topic

    const client = createMqttClient(topic, (msg) => {
      setMessage(msg);
    });

    // Cleanup on component unmount
    return () => {
      client.end();
    };
  }, []);
  console.log(message);

  return (
    <>
      <Helmet>
        <title>Summary Dashboard</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <TotalKwh />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography variant="h3">Watch List</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={6} xs={12}>
                <WatchList label="Average All Unit " />
              </Grid>
              <Grid item lg={6} xs={12}>
                <WatchList label="Total Power All Unit (kW) " />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography variant="h3">Watch List</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={6} xs={12}>
                <WatchList label="Total Daya All Unit (kWh) " />
              </Grid>
              <Grid item lg={6} xs={12}>
                <WatchList label="Power Factor (%) " />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography pb={2} variant="h3">Highest Usage</Typography>
            <Rank />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography pb={2} variant="h3">Lowest Usage</Typography>
            <Rank />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
