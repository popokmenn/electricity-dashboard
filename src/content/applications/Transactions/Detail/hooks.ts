import { supabase } from "src/util/supabase-client";
import { Billing, EnergyData, PeriodicProfile } from "./sub-component/Table/types";
import { useState } from "react";

const useSensorData = () => {
    const [unitDetail, setUnitDetail] = useState<EnergyData[]>([]);
    const [periodicProfile, setPeriodicProfile] = useState<PeriodicProfile[]>([]);
    const [billingData, setBillingData] = useState<Billing[]>([]);

    const fetchSensorData = async (dataDetail) => {
        try {
            let { data: sensordata, error } = await supabase
                .from('sensordata')
                .select('*')
                .eq('serialNum', dataDetail?.deviceId)
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
        try {
            const { data: periodicProfileResult, error } = await supabase
                .from('periodicprofile')
                .select('*')
                .eq('serial_number', dataDetail?.deviceId)

            if (error) {
                console.error('Error fetching fetchPeriodicProfile data:', error.message);
                return;
            }

            if (periodicProfileResult) {
                const periodicProfileData = periodicProfileResult.map((item: PeriodicProfile) => ({
                    ...item,
                    timestamp: new Date(item.time * 1000).toLocaleString()
                }));
                setPeriodicProfile(periodicProfileData);
            }
        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    }   

    const fetchBillingData = async (dataDetail) => {
        try {
            const { data: billingData, error } = await supabase
                .from('billing')
                .select('*')
                .eq('serial_number', dataDetail?.deviceId)
                .order('id', { ascending: false })
                .limit(2);

            if (error) {
                console.error('Error fetching billing data:', error.message);
                return;
            }

            if (billingData) {
                setBillingData(billingData);
            }
        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    }

    return { data: { unitDetail, periodicProfile, billingData }, method: { fetchSensorData, fetchPeriodicProfile, fetchBillingData } };
}

export { useSensorData };
