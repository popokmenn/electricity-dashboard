import {
    Card,
    Grid
} from '@mui/material';
import CustomTable from 'src/components/Table';
import { columns } from './column';

function ChartColumn({ unit }) {
    console.log(unit);
    return (
        <Grid
            container
            mt={4}
        >
            <Card
                sx={{
                    overflow: 'visible'
                }}
            >
                <CustomTable data={unit} title={unit?.deviceName}
                    columns={columns} viewOnly />
            </Card>
        </Grid>
    );
}

export default ChartColumn;
