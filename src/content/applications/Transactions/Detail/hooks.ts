import { supabase } from "src/util/supabase-client";
import { EnergyData } from "./sub-component/Table/types";
import { useState } from "react";

const useSensorData = () => {
    const [unitDetail, setUnitDetail] = useState<EnergyData[]>([]);

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

            console.log(unitDetail, dataDetail?.deviceId);
        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    return { data: { unitDetail }, method: { fetchSensorData } };
}

export { useSensorData };
