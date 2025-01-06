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
            unitDetail,
            billingData,
            periodicProfile,
        },
        method: {
            fetchSensorData,
            fetchBillingData,
            fetchPeriodicProfile,
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
        fetchPeriodicProfile(dataDetail);
        fetchBillingData(dataDetail);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSensorData(dataDetail);
            fetchPeriodicProfile(dataDetail);
            fetchBillingData(dataDetail);
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
                <PageHeader serialNumber={unitDetailCurrent?.serialNum || ''} detail={dataDetail} />
            </PageTitleWrapper>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography pb={2} variant="h6">Last Sync: {unitDetailCurrent?.timestamp}</Typography>

                <Typography variant="h4">Billing Data</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.active_energy_pos_rate_0} previousValue={billingData[1]?.active_energy_pos_rate_0} label='Energi Aktif Ekspor (Wh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.active_energy_neg_rate_0} previousValue={billingData[1]?.active_energy_neg_rate_0} label='Energi Aktif Impor (Wh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.reactive_energy_pos_rate_0} previousValue={billingData[1]?.reactive_energy_pos_rate_0} label='Energi Reaktif Induktif (VARh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.reactive_energy_neg_rate_0} previousValue={billingData[1]?.reactive_energy_neg_rate_0} label='Energi Reaktif Kapasitif (VARh)' />
                    </Grid>
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.apparent_energy_pos_rate_0} previousValue={billingData[1]?.apparent_energy_pos_rate_0} label='Energi Semu Ekspor (Wh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.apparent_energy_neg_rate_0} previousValue={billingData[1]?.apparent_energy_neg_rate_0} label='Energi Semu Impor (Wh)' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.total_power_failures} previousValue={billingData[1]?.total_power_failures} label='Total Power Failures' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard value={billingData[0]?.battery_voltage} previousValue={billingData[1]?.battery_voltage} label='Tegangan Baterai (V)' />
                    </Grid>
                </Grid>

                <Typography variant="h4">Periodic Profile</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.voltage}
                            title='Tegangan (V)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.voltage)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.current}
                            title='Arus (A)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.current)}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.power_factor}
                            title='Faktor Daya (%)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.power_factor)}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_energy_pos}
                            title='Energi Aktif Ekspor (Wh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_energy_pos)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_energy_neg}
                            title='Energi Aktif Impor (Wh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_energy_neg)}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.reactive_energy_pos}
                            title='Energi Reaktif Induktif (VARh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.reactive_energy_pos)}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_power_pos}
                            title='Daya Aktif Ekspor (W)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_power_pos)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_power_neg}
                            title='Daya Aktif Impor (W)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_power_neg)}
                        />
                    </Grid >
                </Grid>
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
                    <Grid item xs={12} md={3}>
                        <InfoCard value={unitDetailCurrent?.PF} previousValue={unitDetailPrevious?.PF} label='Power Factor (%)' />
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
                    <Grid item xs={12} md={4}>
                        <WatchListColumn
                            currentValue={unitDetailCurrent?.current}
                            title='Power Factor (%)'
                            x={unitDetail.map(detail => detail.timestamp).flat()}
                            y={unitDetail.map(detail => detail.PF).flat()}
                        />
                    </Grid >
                </Grid>
            </Container>
        </>
    );
}

export default TransactionsDetail;
