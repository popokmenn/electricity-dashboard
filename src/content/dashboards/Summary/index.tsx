import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography } from '@mui/material';

import Rank from './sub-component/Rank';

import { useEffect } from 'react';
import { useSummary } from './hooks';
import InfoCard from 'src/components/InfoCard';

function DashboardCrypto() {

  const
    {
      data: {
        averageVoltPrev,
        averageFreqPrev,
        averageVolt,
        averageFreq,
        summaryPowerEnergyAllUnitList,
        summaryPowerEnergyAllUnitListPrev,
      },
      method:
      {
        // fetchAverageVolt,
        // fetchAverageFreq,
        // fetchSummaryPowerEnergyAllUnit,
        subscribeSensorData
      }
    } = useSummary();

  const fetchAPI = () => {
    // fetchAverageVolt();
    // fetchAverageFreq();
    // fetchSummaryPowerEnergyAllUnit();
    subscribeSensorData();
  }

  useEffect(() => {
    fetchAPI();
  }, []);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchAPI();
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Helmet>
        <title>Summary Dashboard</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            {/* <TotalKwh
              totalKwh={totalKwhAllUnit}
              totalkwhlist={totalKwhAllUnitList}
              x={totalKwhAllUnitList.map(item => item.serialNum)}
              y={totalKwhAllUnitList.map(item => item.actEn)} /> */}
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Energy</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Active Energy All Unit (Wh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.actEn, 0)} previousValue={summaryPowerEnergyAllUnitListPrev.reduce((acc, curr) => acc + curr.actEn, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Apparent Energy All Unit (VAh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.appEn, 0)} previousValue={summaryPowerEnergyAllUnitListPrev.reduce((acc, curr) => acc + curr.appEn, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Reactive Energy All Unit (VARh) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.reactEn, 0)} previousValue={summaryPowerEnergyAllUnitListPrev.reduce((acc, curr) => acc + curr.reactEn, 0)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Power</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Active Power All Unit (W) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.actPower, 0)} previousValue={summaryPowerEnergyAllUnitListPrev.reduce((acc, curr) => acc + curr.actPower, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Apparent Power All Unit (VA) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.appPower, 0)} previousValue={summaryPowerEnergyAllUnitListPrev.reduce((acc, curr) => acc + curr.appPower, 0)} />
              </Grid>
              <Grid item lg={4} xs={12}>
                <InfoCard label="Reactive Power All Unit (VAR) " value={summaryPowerEnergyAllUnitList.reduce((acc, curr) => acc + curr.reactPower, 0)} previousValue={summaryPowerEnergyAllUnitListPrev.reduce((acc, curr) => acc + curr.reactPower, 0)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Average</Typography>
            <Grid item pt={2} sx={{ display: 'flex', gap: 4, justifyContent: 'start' }}>
              <Grid item lg={6} xs={12}>
                <InfoCard label="Voltage (V) " value={averageVolt} previousValue={averageVoltPrev} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <InfoCard label="Frequency (Hz) " value={averageFreq} previousValue={averageFreqPrev} />
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
