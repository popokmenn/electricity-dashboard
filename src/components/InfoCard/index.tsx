import { TrendingDown, TrendingFlat, TrendingUp } from '@mui/icons-material';
import {
    Box,
    Card,
    Avatar,
    styled,
    Typography,
    CardHeader,
} from '@mui/material';
import { useMemo } from 'react';

function InfoCard({ label, value, previousValue }: { label: string, value: number, previousValue: number }) {
    const AvatarSuccess = styled(Avatar)(
        ({ theme }) => `
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
  `
    );

    const avatarStyles = useMemo(() => ({
        backgroundColor: value - previousValue < 0 ? '#FF0000' : value - previousValue > 0 ? '#008000' : '#808080',
        boxShadow: value - previousValue < 0 ? '#FF0000' : value - previousValue > 0 ? '#008000' : '#808080'
    }), [value, previousValue]);

    const icon = useMemo(() => {
        if (value - previousValue < 0) return <TrendingDown fontSize="small" />;
        if (value - previousValue > 0) return <TrendingUp fontSize="small" />;
        return <TrendingFlat fontSize="small" />;
    }, [value, previousValue]);

    const differenceText = useMemo(() => {
        if (isNaN(value) || isNaN(previousValue)) return 'Nan';
        const difference = value - previousValue;
        return difference < 0 ? `- ${Math.abs(difference).toFixed(2)}` : `+ ${difference.toFixed(2)}`;
    }, [value, previousValue]);

    return (
        <Card>
            <CardHeader title={label} />
            <Box p={4} pt={2}>
                <Typography variant="h1" gutterBottom>
                    {value}
                </Typography>
                <Box alignItems="center" display="flex">
                    <AvatarSuccess
                        sx={{
                            mr: 2,
                            width: 30,
                            height: 30,
                            ...avatarStyles
                        }}
                        variant="rounded"
                    >
                        {icon}
                    </AvatarSuccess>
                    <div>
                        <Typography variant="h4">{differenceText}</Typography>
                        <Typography variant="subtitle2" noWrap>
                            Previous Data: {previousValue}
                        </Typography>
                    </div>
                </Box>
            </Box>
        </Card>
    );
}

export default InfoCard;
