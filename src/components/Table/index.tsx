import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Table,
    Select,
    Tooltip,
    Divider,
    useTheme,
    TableRow,
    MenuItem,
    Checkbox,
    TableBody,
    TableCell,
    TableHead,
    InputLabel,
    CardHeader,
    FormControl,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
import BulkActions from './BulkActions';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

interface Column {
    label: string;
    field: string;
    type?: string; // Optional type for future use
    width?: number; // Optional width for the column
    render?: (value: any, row: any) => JSX.Element; // New render property
}

interface NavigateActions {
    onClickEdit?: (id: string | number) => void;
    onClickDetails?: (id: string) => void;
    onClickSavePdf?: (id: string) => void;
    onClickDelete?: (id: string) => void;
}

interface CustomTableProps {
    data: any[];
    title: string
    columns: Column[];
    className?: string;
    navigateAction?: NavigateActions
    viewOnly?: boolean
}

interface Filters {
    status?: string;
}

const applyFilters = (
    data: any[],
    filters: Filters
): any[] => {
    return data.filter((item) => {
        let matches = true;

        if (filters.status && (item?.status) !== filters.status) {
            matches = false;
        }

        return matches;
    });
};

const CustomTable: FC<CustomTableProps> = ({ title, data, columns, navigateAction, viewOnly }) => {

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        status: null
    });
    const [selectedRow, setSelectedRow] = useState<string[]>(
        []
    );
    const theme = useTheme();
    const selectedBulkActions = selectedRow.length > 0;


    const statusOptions = [
        {
            id: 'all',
            name: 'All'
        },
        {
            id: 'completed',
            name: 'Completed'
        },
        {
            id: 'pending',
            name: 'Pending'
        },
        {
            id: 'failed',
            name: 'Failed'
        }
    ];

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            status: value
        }));
    };

    const handleSelectAllOrders = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedRow(
            event.target.checked
                ? data.map((item: any) => item.id)
                : []
        );
    };

    const handleSelectOne = (
        event: ChangeEvent<HTMLInputElement>,
        id: string
    ): void => {
        if (!selectedRow.includes(id)) {
            setSelectedRow((prevSelected) => [
                ...prevSelected,
                id
            ]);
        } else {
            setSelectedRow((prevSelected) =>
                prevSelected.filter((id) => id !== id)
            );
        }
    };

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const filteredOrders = applyFilters(data, filters);
    const selectedSomeOrders =
        selectedRow.length > 0 &&
        selectedRow.length < data.length;
    const selectedAllOrders =
        selectedRow.length === data.length;

    return (
        <Card>
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions />
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status || 'all'}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    autoWidth
                                >
                                    {statusOptions.map((statusOption) => (
                                        <MenuItem key={statusOption.id} value={statusOption.id}>
                                            {statusOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    title={title}
                />
            )}
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllOrders}
                                    indeterminate={selectedSomeOrders}
                                    onChange={handleSelectAllOrders}
                                />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.field} style={{ width: column.width }}>
                                    {column.label}
                                </TableCell>
                            ))}
                            {!viewOnly && <TableCell align="right">
                                Actions
                            </TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => {
                            const isOrderSelected = selectedRow.includes(row.id);
                            return (
                                <TableRow hover key={row.id} selected={isOrderSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isOrderSelected}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleSelectOne(event, row.id)
                                            }
                                            value={isOrderSelected}
                                        />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>
                                            {column.render ? column.render(row[column.field], row) : row[column.field]}
                                        </TableCell>
                                    ))}
                                    {!viewOnly && <TableCell align="right">
                                        <Tooltip title="Save PDF" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.warning.lighter
                                                    },
                                                    color: theme.colors.warning.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => navigateAction?.onClickSavePdf(row.id)}
                                            >
                                                <DescriptionTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Details" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.success.lighter
                                                    },
                                                    color: theme.colors.success.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => navigateAction?.onClickDetails(row.id)}
                                            >
                                                <InsightsTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => navigateAction?.onClickEdit(row.id)}
                                            >
                                                <EditTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': { background: theme.colors.error.lighter },
                                                    color: theme.palette.error.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => navigateAction?.onClickDelete(row.id)}
                                            >
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    page={page}
                    component="div"
                    rowsPerPage={limit}
                    count={filteredOrders.length}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                    onRowsPerPageChange={handleLimitChange}
                />
            </Box>
        </Card>
    );
};

CustomTable.propTypes = {
    //@ts-ignore
    columns: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        type: PropTypes.string, // Optional
        width: PropTypes.number, // Optional
    })).isRequired,
    data: PropTypes.array.isRequired
};

CustomTable.defaultProps = {
    columns: [],
    data: []
};

export default CustomTable;
