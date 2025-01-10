import moment from "moment";
import { useState } from "react";

import { Customer } from "../types";
import { Billing, EnergyData, PeriodicProfile } from "./types";

import { supabase } from "src/util/supabase-client";
import { translateBinarySequence } from "src/util/alarm-translate";

const useSensorData = () => {
    const [customerData, setCustomerData] = useState<Customer>();
    const [billingData, setBillingData] = useState<Billing[]>([]);
    const [unitDetail, setUnitDetail] = useState<EnergyData[]>([]);
    const [periodicProfile, setPeriodicProfile] = useState<PeriodicProfile[]>([]);
    const [loadingPeriodic, setLoadingPeriodic] = useState<boolean>(false);
    const [loadingBilling, setLoadingBilling] = useState<boolean>(false);
    const [filterPeriodic, setFilterPeriodic] = useState<string>('Daily');
    const [filterDate, setFilterDate] = useState<{startDate: string, endDate: string}>(
        {
            startDate: moment().format('YYYY-MM-DD'), 
            endDate: moment().format('YYYY-MM-DD')
        });

    const fetchSensorData = async (dataDetail) => {
        try {
            let { data: sensordata, error } = await supabase
                .from('sensordata')
                .select('*')
                .eq('serialNum', dataDetail?.serial_number)
                .order('timestamp', { ascending: false })
                .limit(100);

            if (error) {
                console.error('Error fetching sensor data:', error.message);
                return;
            }

            if (sensordata) {
                setUnitDetail(sensordata);
            }
        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };


    const fetchPeriodicProfile = async (dataDetail) => {
        setLoadingPeriodic(true);
        try {
            const { data: periodicProfileResult, error } = await supabase
                .from('periodicprofile')
                .select('*')
                .eq('serial_number', dataDetail?.serial_number)
                .gte('time', new Date(`${filterDate.startDate}T00:00:00`).getTime() / 1000)
                .lte('time', new Date(`${filterDate.endDate}T23:59:59`).getTime() / 1000)
                .order('time', { ascending: true });

            if (error) {
                console.error('Error fetching fetchPeriodicProfile data:', error.message);
                return;
            }

            if (periodicProfileResult) {
                const periodicProfileData = periodicProfileResult.map((item: PeriodicProfile) => ({
                    ...item,
                    timestamp: new Date(item.time * 1000).toLocaleString(),
                    alarm_register_translated: item.alarm_register ? translateBinarySequence(item.alarm_register.toString()) : []
                }));
                setPeriodicProfile(periodicProfileData);
            }
        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        } finally {
            setLoadingPeriodic(false);
        }
    }   

    const fetchBillingData = async (dataDetail) => {
        setLoadingBilling(true);
        try {
            const { data: billingData, error } = await supabase
                .from('billing')
                .select('*')
                .eq('serial_number', dataDetail?.serial_number)
                .order('id', { ascending: false })
                .limit(5);

            if (error) {
                console.error('Error fetching billing data:', error.message);
                return;
            }

            if (billingData) {
                setBillingData(billingData);
            }
        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        } finally {
            setLoadingBilling(false);
        }
    }

    const fetchCustomerById = async (id: string) => {
        const { data, error } = await supabase
            .from('customer')
            .select('*')
            .eq('id', id);

        if (error) {
            console.error('Error fetching customer data:', error.message);
            return;
        }

        if (data) {
            setCustomerData(data[0]);
        }
    }

    return { 
        data: { 
            unitDetail, 
            filterDate,
            billingData, 
            customerData, 
            filterPeriodic,
            periodicProfile, 
            loadingPeriodic,
            loadingBilling,
        }, 
        method: { 
            setFilterDate,
            fetchSensorData, 
            fetchBillingData, 
            fetchCustomerById, 
            setFilterPeriodic,
            fetchPeriodicProfile,
        } 
    };
}

export { useSensorData };
