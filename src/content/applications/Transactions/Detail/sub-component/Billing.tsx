import {
    Box,
    Card,
    Grid,
    styled,
    Avatar,
    Button,
    Typography,
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Billing } from './Table/types';
import { formatToIDR } from 'src/util/formatter';

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
);

interface BillingCardProps {
    data: Billing[];
    rate: number
}

function BillingCard({ data, rate }: BillingCardProps) {
    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <Box p={4}>
                        <Typography
                            sx={{
                                pb: 3
                            }}
                            variant="h4"
                        >
                            Billing
                        </Typography>
                        <Box>
                            <Typography variant="h1" gutterBottom>
                                {formatToIDR(data[0]?.active_energy_pos_rate_0 * rate)}
                            </Typography>
                            <Box
                                display="flex"
                                sx={{
                                    py: 4
                                }}
                                alignItems="center"
                            >
                                <AvatarSuccess
                                    sx={{
                                        mr: 2
                                    }}
                                    variant="rounded"
                                >
                                    <TrendingUp fontSize="large" />
                                </AvatarSuccess>
                                <Box>
                                    <Typography variant="h4">+ $3,594.00</Typography>
                                    <Typography variant="subtitle2" noWrap>
                                        this month
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid sm item>
                                <Button fullWidth variant="contained">
                                    See Detail
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}

export default BillingCard;
