import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography } from '@mui/material';

import { useSensorData } from './hooks';
import { units } from '../sub-component/data';
import PageHeader from './sub-component/PageHeader';
import { EnergyData } from './sub-component/Table/types';
import WatchListColumn from './sub-component/WatchListColumn';

import { Unit } from 'src/models/crypto_order';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import InfoCard from 'src/components/InfoCard';

function TransactionsDetail() {
    const {
        data: {
            unitDetail
        },
        method: {
            fetchSensorData,
        }
    } = useSensorData();

    const [unitDetailPrevious, setUnitDetailPrevious] = useState<EnergyData>();
    const [unitDetailCurrent, setUnitDetailCurrent] = useState<EnergyData>();

    const location = useLocation();
    //@ts-ignore
    const id = location.state?.id;
    const dataDetail: Unit = units.find(unit => unit.id === id);

    useEffect(() => {
        fetchSensorData(dataDetail);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSensorData(dataDetail);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setUnitDetailPrevious(unitDetail[unitDetail.length - 2]);
        setUnitDetailCurrent({ ...unitDetail[unitDetail.length - 1], timestamp: new Date().toLocaleString() });
    }, [unitDetail]);

    return (
        <>
            <Helmet>
                <title>kWh Unit Detail</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader serialNumber={unitDetailCurrent?.serialNum || ''} />
            </PageTitleWrapper>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography pb={2} variant="h6">Last Sync: {unitDetailCurrent?.timestamp}</Typography>
                <Typography variant="h4">Current Data</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.volt} previousValue={unitDetailPrevious?.volt} label='Voltage (V)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.current} previousValue={unitDetailPrevious?.current} label='Current (A)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.actEn} previousValue={unitDetailPrevious?.actEn} label='Active Energy (Wh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.reactEn} previousValue={unitDetailPrevious?.reactEn} label='Reactive Energy (VARh)' />
                    </Grid>
                </Grid>
                <Grid container spacing={3} pb={4}>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.actPower} previousValue={unitDetailPrevious?.actPower} label='Active Power (W)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.appPower} previousValue={unitDetailPrevious?.appPower} label='Apparent Power (VA)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.freq} previousValue={unitDetailPrevious?.freq} label='Frequency (Hz)' />
                    </Grid>
                </Grid>
                <Typography variant="h4">History Data</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.actEn}
                            title='Active Energy (Wh)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.actEn).flat()}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.actPower}
                            title='Active Power (W)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.actPower).flat()}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.appPower}
                            title='Apparent Power (VA)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.appPower).flat()}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.reactEn}
                            title='Reactive Energy (VARh)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.reactEn).flat()}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.reactPower}
                            title='Reactive Power (VAR)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.reactPower).flat()}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.freq}
                            title='Frequency (Hz)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.freq).flat()}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.volt}
                            title='Voltage (V)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.volt).flat()}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.current}
                            title='Current (A)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.current).flat()}
                        />
                    </Grid >

                </Grid>
            </Container>
        </>
    );
}

export default TransactionsDetail;
