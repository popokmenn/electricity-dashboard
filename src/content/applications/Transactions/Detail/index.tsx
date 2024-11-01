import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './sub-component/PageHeader';
import { useLocation } from 'react-router';
import { units } from '../sub-component/data';
import { useState, useEffect } from 'react';
import { createMqttClient } from 'src/util/mqtt-client';
import { Unit } from 'src/models/crypto_order';
import { Container, Grid, Typography } from '@mui/material';
import WatchList from './sub-component/WatchList';
import { EnergyData } from './sub-component/Table/types';

function TransactionsDetail() {
    // const [message, setMessage] = useState<string>('');
    const [unitDetail, setUnitDetail] = useState<EnergyData[]>([]);
    const [unitDetailPrevious, setUnitDetailPrevious] = useState<EnergyData>();
    const [unitDetailCurrent, setUnitDetailCurrent] = useState<EnergyData>();

    const location = useLocation();
    //@ts-ignore
    const id = location.state?.id;
    const dataDetail: Unit = units.find(unit => unit.id === id);

    useEffect(() => {
        const topic = `Gedung-1/tamananggrek/uplink/telemetry/modem1/${dataDetail?.deviceId}`; // Replace with your topic

        const client = createMqttClient(topic, (msg) => {
            setUnitDetail(prevState => [...prevState, { ...JSON.parse(msg), dateTime: new Date().toLocaleString() }]);
        });

        // Cleanup on component unmount
        return () => {
            client.end();
        };
    }, []);

    useEffect(() => {
        setUnitDetailPrevious(unitDetail[unitDetail.length - 2]);
        setUnitDetailCurrent({ ...unitDetail[unitDetail.length - 1], dateTime: new Date().toLocaleString() });
    }, [unitDetail]);

    return (
        <>
            <Helmet>
                <title>kWh Unit Detail</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h6">Last Sync: {unitDetailCurrent?.dateTime}</Typography>

                <Grid container spacing={3} py={2}>

                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.volt} previousValue={unitDetailPrevious?.volt} label='Voltage (V)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.current} previousValue={unitDetailPrevious?.current} label='Current (A)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.actEn} previousValue={unitDetailPrevious?.actEn} label='Active Energy (kWh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.reactEn} previousValue={unitDetailPrevious?.reactEn} label='Reactive Energy (kVARh)' />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.actPower} previousValue={unitDetailPrevious?.actPower} label='Active Power (kW)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.appPower} previousValue={unitDetailPrevious?.appPower} label='Apparent Power (kVA)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <WatchList value={unitDetailCurrent?.freq} previousValue={unitDetailPrevious?.freq} label='Frequency (Hz)' />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default TransactionsDetail;
