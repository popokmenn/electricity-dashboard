import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Card,
  Dialog,
  Button,
  Container,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  MenuItem,
} from '@mui/material';

import { useUnitData } from './hooks';
import { useEffect, useState } from 'react';
import CustomTable from 'src/components/Table';
import PageHeader from './sub-component/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ResponseAlert from 'src/components/Alert/responseAlert';

function ApplicationsTransactions() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    data: {
      isError,
      dataForm,
      isLoading,
      isSuccess,
      classifyData,
      customerData,
    },
    method: {
      setDataForm,
      resetDataForm,
      fetchClassifyData,
      fetchCustomerData,
      saveCustomerData,
    }
  } = useUnitData();

  useEffect(() => {
    fetchClassifyData();
    fetchCustomerData();
  }, []);

  return (
    <>
      <Helmet>
        <title>kWh Unit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader setOpen={setOpen} />
      </PageTitleWrapper>
      <ResponseAlert open={isError.isError} onClose={() => { setOpen(false) }} type="error" message={isError.message} />
      <ResponseAlert open={isSuccess.isSuccess} onClose={() => { setOpen(false) }} type="success" message={isSuccess.message} />
      <Container maxWidth="lg">
        <Dialog open={open} onClose={() => { setOpen(false); resetDataForm(); }}>
          <DialogTitle>
            <Typography variant="h4">{dataForm.id ? 'Edit Unit' : 'Create Unit'}</Typography>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item xs={12} md={6}>
                {/* Hidden field, so google not autofilled */}
                <TextField
                  sx={{ display: 'none' }}
                  hidden
                  required
                  id="outlined-required"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Serial Number"
                  autoComplete='off'
                  value={dataForm.serial_number}
                  onChange={(e) => setDataForm({ ...dataForm, serial_number: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  value={dataForm.name}
                  onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  fullWidth
                  value={dataForm.id_classify}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      id_classify: parseInt(e.target.value),
                      tariff: classifyData.find(item => item.id === parseInt(e.target.value))?.regular_usage_charge
                    })}
                >
                  {classifyData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.tariff_group + ' - ' + item.power_limit_min + 'VA'}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Tariff (Rp)"
                  value={dataForm.tariff}
                  type="number"
                  onChange={(e) => setDataForm({ ...dataForm, tariff: parseInt(e.target.value) })}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Wattage"
                  type="number"
                  value={dataForm.wattage}
                  onChange={(e) => setDataForm({ ...dataForm, wattage: parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Power Line"
                  value={dataForm.power_line}
                  onChange={(e) => setDataForm({ ...dataForm, power_line: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Address"
                  multiline
                  rows={4}
                  fullWidth
                  value={dataForm.address}
                  onChange={(e) => setDataForm({ ...dataForm, address: e.target.value })}
                />
              </Grid>
            </Grid>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: 20 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  resetDataForm();
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                onClick={() => {
                  saveCustomerData();
                  resetDataForm();
                  setOpen(false);
                  fetchCustomerData();
                }}
              >
                {dataForm.id ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CustomTable data={customerData} title="Units"
                navigateAction={{
                  onClickDetails: (id: string) => {
                    navigate(`/management/transactions/detail/${id}`, { state: { id: id } });
                  },
                  onClickEdit(id) {
                    setOpen(true);
                    setDataForm(customerData.find(item => item.id === id));
                  },
                }}
                columns={[
                  {
                    label: 'Serial Number',
                    field: 'serial_number'
                  },
                  {
                    label: 'Name',
                    field: 'name'
                  },
                  {
                    label: 'Classify',
                    field: 'classify',
                    render: (row) => {
                      return row.tariff_group;
                    }
                  },
                  {
                    label: 'Power Limit',
                    field: 'classify',
                    render: (row) => {
                      return `${row?.power_limit_min}VA - ${row?.power_limit_max}VA`;
                    }
                  },
                  {
                    label: 'Address',
                    field: 'address'
                  },

                  // {
                  //   label: 'Building',
                  //   field: 'building'
                  // },
                  // {
                  //   label: 'Unit',
                  //   field: 'unit'
                  // },
                  // {
                  //   label: 'Device ID',
                  //   field: 'deviceId'
                  // },
                  // {
                  //   label: 'Device Name',
                  //   field: 'deviceName'
                  // }
                ]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
