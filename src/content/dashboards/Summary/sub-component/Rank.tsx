import {
    Box,
    Card,
    List,
    ListItem,
    Typography,
    ListItemText,
} from '@mui/material';
import Text from 'src/components/Text';

function Rank() {
    return (
        <Card>
            <Box p={4} pt={2}>
                <List
                    disablePadding
                    sx={{
                        width: '100%'
                    }}
                >
                    <ListItem disableGutters>
                        <ListItemText
                            primary="Unit A"
                            primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                            secondary="Apartment 101, Floor 5, Building A"
                            secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true
                            }}
                        />
                        <Box>
                            <Typography align="right" variant="h4" noWrap>
                                20%
                            </Typography>
                            <Text color="success">+2.54%</Text>
                        </Box>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary="Unit B"
                            primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                            secondary="Apartment 101, Floor 5, Building B"
                            secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true
                            }}
                        />
                        <Box>
                            <Typography align="right" variant="h4" noWrap>
                                10%
                            </Typography>
                            <Text color="error">-1.22%</Text>
                        </Box>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary="Unit C"
                            primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                            secondary="Apartment 101, Floor 5, Building C"
                            secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true
                            }}
                        />
                        <Box>
                            <Typography align="right" variant="h4" noWrap>
                                40%
                            </Typography>
                            <Text color="success">+10.50%</Text>
                        </Box>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary="Unit D"
                            primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                            secondary="Apartment 101, Floor 5, Building D"
                            secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true
                            }}
                        />
                        <Box>
                            <Typography align="right" variant="h4" noWrap>
                                30%
                            </Typography>
                            <Text color="error">-12.38%</Text>
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Card>
    );
}

export default Rank;
