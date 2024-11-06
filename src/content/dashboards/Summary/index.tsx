import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography } from '@mui/material';

import Rank from './sub-component/Rank';
import TotalKwh from './sub-component/TotalKwh';

import { useEffect } from 'react';
import { useSummary } from './hooks';
import InfoCard from 'src/components/InfoCard';

function DashboardCrypto() {

  const
    {
      data: {
        totalKwhAllUnit,
        totalKwhAllUnitList,
        summaryPowerEnergyAllUnitList,
        averageVolt,
        averageFreq
      },
      method:
      { fetchTotalKwhAllUnit,
        fetchSummaryPowerEnergyAllUnit,
        fetchAverageVolt,
        fetchAverageFreq
      }
    } = useSummary();

  useEffect(() => {
    fetchTotalKwhAllUnit();
    fetchSummaryPowerEnergyAllUnit();
    fetchAverageVolt();
    fetchAverageFreq();
  }, []);

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
            <TotalKwh
              totalKwh={totalKwhAllUnit}
              totalkwhlist={totalKwhAllUnitList}
              x={totalKwhAllUnitList.map(item => item.serialNum)}
              y={totalKwhAllUnitList.map(item => item.actEn)} />
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Energy</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Active Energy All Unit (kWh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalacten, 0)} previousValue={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalacten, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Apparent Energy All Unit (kWh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalappen, 0)} previousValue={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalappen, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Reactive Energy All Unit (kVARh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalreacten, 0)} previousValue={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalreacten, 0)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Power</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Active Power All Unit (kWh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalactpower, 0)} previousValue={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalactpower, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Apparent Power All Unit (kWh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalapppower, 0)} previousValue={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalapppower, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Reactive Power All Unit (kVARh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalreactpower, 0)} previousValue={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.totalreactpower, 0)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Average</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={6} xs={12}>
                <InfoCard label="Voltage (V) " value={averageVolt} previousValue={averageVolt} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <InfoCard label="Frequency (Hz) " value={averageFreq} previousValue={averageFreq} />
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
