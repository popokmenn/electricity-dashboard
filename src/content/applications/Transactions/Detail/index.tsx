import moment from 'moment';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Alert, Container, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';

import { Customer } from '../types';
import { useSensorData } from './hooks';
import Billing from './sub-component/Billing';
import PageHeader from './sub-component/PageHeader';

import InfoCard from 'src/components/InfoCard';
import GraphCard from 'src/components/GraphCard';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { filterPeriodic as filterPeriodicEnum } from 'src/util/enum';


function TransactionsDetail() {
    const {
        data: {
            filterDate,
            billingData,
            customerData,
            filterPeriodic,
            loadingBilling,
            periodicProfile,
            loadingPeriodic,
        },
        method: {
            setFilterDate,
            fetchBillingData,
            fetchCustomerById,
            setFilterPeriodic,
            fetchPeriodicProfile,
        }
    } = useSensorData();

    const [dataDetail, setDataDetail] = useState<Customer>();

    const location = useLocation();
    //@ts-ignore
    const id = location.state?.id;

    useEffect(() => {
        fetchCustomerById(id);
    }, []);

    useEffect(() => {
        if (customerData) {
            setDataDetail(customerData);
            if (customerData.serial_number) {
                fetchPeriodicProfile(customerData);
                fetchBillingData(customerData);
            }
        }
    }, [customerData, filterDate]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (customerData?.serial_number) {
                fetchPeriodicProfile(customerData);
                fetchBillingData(customerData);
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Helmet>
                <title>kWh Unit Detail</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader serialNumber={dataDetail?.serial_number || ''} detail={dataDetail} />
            </PageTitleWrapper>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            fullWidth
                            label="Select Period"
                            id="outlined-select-filter"
                            value={filterPeriodic}
                            onChange={(e) => { setFilterPeriodic(e.target.value) }}
                        >
                            {filterPeriodicEnum.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            type='date'
                            label="Select Period"
                            id="outlined-select-filter-date"
                            value={filterDate.startDate}
                            onChange={(e) => {
                                setFilterDate({ startDate: e.target.value, endDate: e.target.value })
                            }}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography
                    pb={2}
                    variant="h6">
                    Last Sync: {moment(periodicProfile[periodicProfile?.length - 1]?.time * 1000).format('DD MMMM YYYY HH:mm')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Billing data={billingData} rate={customerData?.tariff} />
                    </Grid>
                    <Grid item xs={12} md={6} height={'23.5rem'} overflow={'auto'}>
                        {
                            periodicProfile ? periodicProfile[periodicProfile?.length - 1]?.alarm_register_translated?.map((item, index) => (
                                <>
                                    <Alert sx={{ mb: 1 }} key={index} severity="warning">
                                        {item}
                                    </Alert>
                                </>
                            )) : <></>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={3} py={4}></Grid>
                <Typography
                    pb={2}
                    variant="h6">
                    Last Sync: {moment(billingData[0]?.time * 1000).format('DD MMMM YYYY HH:mm')}
                </Typography>
                <Typography variant="h4">Billing Data</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.active_energy_pos_rate_0}
                            previousValue={billingData[1]?.active_energy_pos_rate_0}
                            label='Energi Aktif Ekspor (Wh)'
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.active_energy_neg_rate_0}
                            previousValue={billingData[1]?.active_energy_neg_rate_0}
                            label='Energi Aktif Impor (Wh)'
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.reactive_energy_pos_rate_0}
                            previousValue={billingData[1]?.reactive_energy_pos_rate_0}
                            label='Energi Reaktif Induktif (VARh)'
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.reactive_energy_neg_rate_0}
                            previousValue={billingData[1]?.reactive_energy_neg_rate_0}
                            label='Energi Reaktif Kapasitif (VARh)'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.apparent_energy_pos_rate_0}
                            previousValue={billingData[1]?.apparent_energy_pos_rate_0}
                            label='Energi Semu Ekspor (Wh)'
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.apparent_energy_neg_rate_0}
                            previousValue={billingData[1]?.apparent_energy_neg_rate_0}
                            label='Energi Semu Impor (Wh)'
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.total_power_failures}
                            previousValue={billingData[1]?.total_power_failures}
                            label='Total Power Failures'
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InfoCard
                            loading={loadingBilling}
                            value={billingData[0]?.battery_voltage}
                            previousValue={billingData[1]?.battery_voltage}
                            label='Tegangan Baterai (V)'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} py={4}></Grid>
                <Typography
                    pb={2}
                    variant="h6">
                    Last Sync: {moment(periodicProfile[periodicProfile.length - 1]?.time * 1000).format('DD MMMM YYYY HH:mm')}
                </Typography>
                <Typography variant="h4">Periodic Profile</Typography>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.voltage}
                            title='Tegangan (V)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.voltage)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.current}
                            title='Arus (A)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.current)}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.power_factor}
                            title='Faktor Daya (%)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.power_factor)}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_energy_pos}
                            title='Energi Aktif Ekspor (Wh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_energy_pos)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_energy_neg}
                            title='Energi Aktif Impor (Wh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_energy_neg)}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.reactive_energy_pos}
                            title='Energi Reaktif Induktif (VARh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.reactive_energy_pos)}
                        />
                    </Grid >
                </Grid>
                <Grid container spacing={3} py={2}>
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_power_pos}
                            title='Daya Aktif Ekspor (W)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_power_pos)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.active_power_neg}
                            title='Daya Aktif Impor (W)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.active_power_neg)}
                        />
                    </Grid >
                    <Grid item xs={12} md={4}>
                        <GraphCard
                            loading={loadingPeriodic}
                            currentValue={periodicProfile[periodicProfile.length - 1]?.reactive_energy_neg}
                            title='Energi Reaktif Kapasitif (VARh)'
                            x={periodicProfile.map(profile => profile.timestamp)}
                            y={periodicProfile.map(profile => profile.reactive_energy_neg)}
                        />
                    </Grid >
                </Grid>
            </Container>
        </>
    );
}

export default TransactionsDetail;
