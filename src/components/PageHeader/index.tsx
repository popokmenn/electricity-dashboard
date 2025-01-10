import { Typography, Grid } from '@mui/material';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

function PageHeader({ children, title, subtitle }: PageHeaderProps) {
    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid display="flex">
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {subtitle}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item display="flex" gap={2}>
                {children}
            </Grid>
        </Grid>
    );
}

export default PageHeader;
