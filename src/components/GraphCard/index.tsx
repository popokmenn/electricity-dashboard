import {
    Card,
    Box,
    Typography,
    Grid,
    useTheme,
    CircularProgress,
} from '@mui/material';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import moment from 'moment';

interface GraphCardProps {
    title: string;
    x: string[];
    y: number[];
    currentValue: number;
    loading: boolean;
}

function GraphCard({ title, x = [], y = [], currentValue = 0, loading = false }: GraphCardProps) {
    const theme = useTheme();

    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            zoom: {
                enabled: false
            }
        },
        fill: {
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        colors: [theme.colors.primary.main],
        dataLabels: {
            enabled: false
        },
        theme: {
            mode: theme.palette.mode
        },
        stroke: {
            show: true,
            colors: [theme.colors.primary.main],
            width: 3
        },
        legend: {
            show: false
        },
        labels: x,
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false,
            tickAmount: 5
        },
        tooltip: {
            x: {
                show: true
            },
            y: {
                title: {
                    formatter: function () {
                        return title + ':';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    const chart2Data = [
        {
            name: title,
            data: y
        }
    ];

    return (
        <Grid
            container
            direction="row"
            // justifyContent="left"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item md={12} xs={12}>
                <Card
                    sx={{
                        overflow: 'visible'
                    }}
                >
                    <Box
                        sx={{
                            p: 3
                        }}
                    >
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Box display="flex" alignItems="center">
                                    <Box>
                                        <Typography variant="h4" noWrap>
                                            {title}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        pt: 3
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            pr: 1,
                                            mb: 1
                                        }}
                                    >
                                        {currentValue ? currentValue : 0}
                                    </Typography>
                                    <Text color={currentValue - y[0] < 0 ? 'error' : 'success'}>
                                        <b>{y[0] ? `${((currentValue - y[0]) / y[0] * 100).toFixed(2)}%` : ' '}</b>
                                    </Text>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    <Label color={currentValue - y[0] > 0 ? 'success' : 'error'}>{currentValue - y[0] > 0 ? '+' : '-'}{Math.abs((currentValue - y[0]) * 90).toFixed(2)}</Label>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            pl: 1
                                        }}
                                    >
                                        {moment().diff(moment(x[0]), 'minute') < 60 ?
                                            `${moment().diff(moment(x[0]), 'minute')} minutes ago` :
                                            `${moment().diff(moment(x[0]), 'hour')} hours and ${moment().diff(moment(x[0]), 'minute') % 60} minutes ago`
                                        }
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                    {!loading && (
                        <Chart
                            options={chartOptions}
                            series={chart2Data}
                            type="area"
                            height={200}
                        />
                    )}
                </Card>
            </Grid>
        </Grid>
    );
}

export default GraphCard;
