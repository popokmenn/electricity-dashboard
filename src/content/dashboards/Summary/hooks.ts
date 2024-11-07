import { useState } from "react";
import { supabase } from "src/util/supabase-client";
import { EnergyData } from "src/content/applications/Transactions/Detail/sub-component/Table/types";

const useSummary = () => {
    const [totalKwhAllUnit, setTotalKwhAllUnit] = useState<number>(0);
    const [averageVolt, setAverageVolt] = useState<number>(0);
    const [averageVoltPrev, setAverageVoltPrev] = useState<number>(0);
    const [averageFreq, setAverageFreq] = useState<number>(null);
    const [averageFreqPrev, setAverageFreqPrev] = useState<number>(0);
    const [totalKwhAllUnitList, setTotalKwhAllUnitList] = useState<EnergyData[]>([]);
    const [summaryPowerEnergyAllUnitList, setSummaryPowerEnergyAllUnitList] = useState<EnergyData[]>([]);
    const [summaryPowerEnergyAllUnitListPrev, setSummaryPowerEnergyAllUnitListPrev] = useState<EnergyData[]>([]);

    const fetchTotalKwhAllUnit = async () => {
        try {

            const { data: totalKwhResult, error } = await supabase
                .from('v_latestactiveenergy')
                .select('*')


            if (error) {
                console.error('Error fetching fetchTotalKwhAllUnit data:', error.message);
                return;
            }

            if (totalKwhResult) {
                setTotalKwhAllUnitList(totalKwhResult);
                setTotalKwhAllUnit(totalKwhResult.reduce((acc, curr) => acc + curr.actEn, 0));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchSummaryPowerEnergyAllUnit = async () => {
        try {
            const { data: summaryPowerEnergyAllUnitResult, error } = await supabase
                .from('v_sensordatasummary')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (summaryPowerEnergyAllUnitResult) {
                if (summaryPowerEnergyAllUnitList) {
                    setSummaryPowerEnergyAllUnitListPrev(summaryPowerEnergyAllUnitList);
                }

                setSummaryPowerEnergyAllUnitList(summaryPowerEnergyAllUnitResult);
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchAverageVolt = async () => {
        try {

            // if (averageVolt) {
            //     setAverageVoltPrev(averageVolt);
            // }

            const { data: averageVoltResult, error } = await supabase
                .from('v_averagevoltage')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (averageVoltResult) {
                if (averageVolt) {
                    setAverageVoltPrev(averageVolt);
                }
                //@ts-ignore
                setAverageVolt((averageVoltResult.reduce((acc, curr) => acc + curr.averagevoltage, 0) / averageVoltResult.length).toFixed(2));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchAverageFreq = async () => {
        try {

            // if (averageFreq) {
            //     console.log('averageFreq', averageFreq);
            //     setAverageFreqPrev(averageFreq);
            // }

            const { data: averageFreqResult, error } = await supabase
                .from('v_averagefrequency')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (averageFreqResult) {
                if (averageFreq) {
                    setAverageFreqPrev(averageFreq);
                }
                //@ts-ignore
                setAverageFreq((averageFreqResult.reduce((acc, curr) => acc + curr.averagefreq, 0) / averageFreqResult.length).toFixed(2));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const subscribeSensorData = async () => {
        try {
            const sensordata = supabase.channel('custom-insert-channel')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'sensordata' },
                    (payload) => {
                        console.log('Change received!', payload)
                        fetchSummaryPowerEnergyAllUnit();
                        fetchAverageVolt();
                        fetchAverageFreq();
                    }
                )
                .subscribe()

            console.log('sensordata', sensordata);

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    return {
        data: {
            averageVolt,
            averageFreq,
            averageVoltPrev,
            averageFreqPrev,
            totalKwhAllUnit,
            totalKwhAllUnitList,
            summaryPowerEnergyAllUnitList,
            summaryPowerEnergyAllUnitListPrev,
        },
        method:
        {
            fetchAverageVolt,
            fetchAverageFreq,
            subscribeSensorData,
            fetchTotalKwhAllUnit,
            fetchSummaryPowerEnergyAllUnit,
        }
    };
}

export { useSummary };
