import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './sub-component/PageHeader';
import { useLocation } from 'react-router';
import { units } from '../sub-component/data';
import { useState, useEffect } from 'react';
import { Unit } from 'src/models/crypto_order';
import { Container, Grid, Typography } from '@mui/material';
import WatchList from './sub-component/WatchList';
import { EnergyData } from './sub-component/Table/types';
import WatchListColumn from './sub-component/WatchListColumn';
import { useSensorData } from './hooks';

function TransactionsDetail() {
    const { data: { unitDetail }, method: { fetchSensorData } } = useSensorData();

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
        setUnitDetailPrevious(unitDetail[unitDetail.length - 2]);
        setUnitDetailCurrent({ ...unitDetail[unitDetail.length - 1], timestamp: new Date().toLocaleString() });
    }, [unitDetail]);


    console.log('unitDetailCurrent', unitDetail.map(detail => detail.actEn).flat());

    return (
        <>
            <Helmet>
                <title>kWh Unit Detail</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography pb={2} variant="h6">Last Sync: {unitDetailCurrent?.timestamp}</Typography>
                <Typography variant="h4">Current Data</Typography>
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
                <Grid container spacing={3} pb={4}>
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
                <Typography variant="h4">History Data</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.actEn}
                            title='Active Energy (kWh)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.actEn).flat()}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.actPower}
                            title='Active Power (kW)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.actPower).flat()}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.appPower}
                            title='Apparent Power (kVA)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.appPower).flat()}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.reactEn}
                            title='Reactive Energy (kVARh)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.reactEn).flat()}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.reactPower}
                            title='Reactive Power (kVAR)'
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
