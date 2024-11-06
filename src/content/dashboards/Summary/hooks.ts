import { useState } from "react";
import { supabase } from "src/util/supabase-client";
import { EnergyData } from "src/content/applications/Transactions/Detail/sub-component/Table/types";

const useSummary = () => {
    const [totalKwhAllUnit, setTotalKwhAllUnit] = useState<number>(0);
    const [averageVolt, setAverageVolt] = useState<number>(0);
    const [averageFreq, setAverageFreq] = useState<number>(0);
    const [totalKwhAllUnitList, setTotalKwhAllUnitList] = useState<EnergyData[]>([]);
    const [summaryPowerEnergyAllUnitList, setSummaryPowerEnergyAllUnitList] = useState<EnergyData[]>([]);

    const fetchTotalKwhAllUnit = async () => {
        try {
                        
            const { data: totalKwh, error } = await supabase
                .from('v_latestactiveenergy')
                .select('*')
        

            if (error) {
                console.error('Error fetching fetchTotalKwhAllUnit data:', error.message);
                return;
            }

            if (totalKwh) {
                setTotalKwhAllUnitList(totalKwh);
                setTotalKwhAllUnit(totalKwh.reduce((acc, curr) => acc + curr.actEn, 0));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchSummaryPowerEnergyAllUnit = async () => {
        try {
                        
            const { data: summaryPowerEnergyAllUnit, error } = await supabase
                .from('v_sensordatasummary')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (summaryPowerEnergyAllUnit) {
                setSummaryPowerEnergyAllUnitList(summaryPowerEnergyAllUnit);
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchAverageVolt = async () => {
        try {
                        
            const { data: averageVolt, error } = await supabase
                .from('v_averagevoltage')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (averageVolt) {
                //@ts-ignore
                setAverageVolt((averageVolt.reduce((acc, curr) => acc + curr.averagevoltage, 0) / averageVolt.length).toFixed(2));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchAverageFreq = async () => {
        try {
                        
            const { data: averageFreq, error } = await supabase
                .from('v_averagefrequency')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (averageFreq) {
                //@ts-ignore
                setAverageFreq((averageFreq.reduce((acc, curr) => acc + curr.averagefreq, 0) / averageFreq.length).toFixed(2));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    return { 
        data: {
            averageVolt,
            averageFreq,
            totalKwhAllUnit,
            totalKwhAllUnitList,
            summaryPowerEnergyAllUnitList,
        },
        method: 
        { 
            fetchAverageVolt,
            fetchAverageFreq,
            fetchTotalKwhAllUnit, 
            fetchSummaryPowerEnergyAllUnit, 
        }
    };
}

export { useSummary };
