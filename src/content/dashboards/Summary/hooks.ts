import { useState } from "react";
import { supabase } from "src/util/supabase-client";
import { EnergyData } from "src/content/applications/Transactions/Detail/sub-component/Table/types";

const useSummary = () => {
    const [totalKwhAllUnit, setTotalKwhAllUnit] = useState<number>(0);
    const [averageVolt, setAverageVolt] = useState<number>(0);
    const [averageVoltPrev, setAverageVoltPrev] = useState<number>(averageVolt);
    const [averageFreq, setAverageFreq] = useState<number>(0);
    const [averageFreqPrev, setAverageFreqPrev] = useState<number>(averageFreq);
    const [totalKwhAllUnitList, setTotalKwhAllUnitList] = useState<EnergyData[]>([]);
    const [summaryPowerEnergyAllUnitList, setSummaryPowerEnergyAllUnitList] = useState<EnergyData[]>([]);
    const [summaryPowerEnergyAllUnitListPrev, setSummaryPowerEnergyAllUnitListPrev] = useState<EnergyData[]>(summaryPowerEnergyAllUnitList);

    let summaryPrev = []
    let avgVoltPrev = []
    let avgFreqPrev = []

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
                if (summaryPrev.length < 2) {
                    summaryPrev.push(summaryPowerEnergyAllUnitResult);
                } else {
                    summaryPrev.shift();
                    summaryPrev.push(summaryPowerEnergyAllUnitResult);
                }
                setSummaryPowerEnergyAllUnitListPrev(summaryPrev[0]);
                setSummaryPowerEnergyAllUnitList(summaryPowerEnergyAllUnitResult);
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchAverageVolt = async () => {
        try {

            const { data: averageVoltResult, error } = await supabase
                .from('v_averagevoltage')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (averageVoltResult) {
                if (avgVoltPrev.length < 2) {
                    avgVoltPrev.push(averageVoltResult);
                } else {
                    avgVoltPrev.shift();
                    avgVoltPrev.push(averageVoltResult);
                }
                //@ts-ignore
                setAverageVoltPrev((avgVoltPrev[0].reduce((acc, curr) => acc + curr.averagevoltage, 0) / averageVoltResult.length).toFixed(2));
                //@ts-ignore
                setAverageVolt((averageVoltResult.reduce((acc, curr) => acc + curr.averagevoltage, 0) / averageVoltResult.length).toFixed(2));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    const fetchAverageFreq = async () => {
        try {

            const { data: averageFreqResult, error } = await supabase
                .from('v_averagefrequency')
                .select('*')

            if (error) {
                console.error('Error fetching fetchSummaryPowerEnergyAllUnit data:', error.message);
                return;
            }

            if (averageFreqResult) {

                if (avgFreqPrev.length < 2) {
                    avgFreqPrev.push(averageFreqResult);
                } else {
                    avgFreqPrev.shift();
                    avgFreqPrev.push(averageFreqResult);
                }
                //@ts-ignore
                setAverageFreqPrev((avgFreqPrev[0].reduce((acc, curr) => acc + curr.averagefreq, 0) / averageFreqResult.length).toFixed(2));
                //@ts-ignore
                setAverageFreq((averageFreqResult.reduce((acc, curr) => acc + curr.averagefreq, 0) / averageFreqResult.length).toFixed(2));
            }

        } catch (error) {
            console.error('Unexpected error fetching sensor data:', error);
        }
    };

    // const subscribeSensorData = async () => {
    //     try {
    //         const sensordata = supabase.channel('custom-insert-channel')
    //             .on(
    //                 'postgres_changes',
    //                 { event: 'INSERT', schema: 'public', table: 'sensordata' },
    //                 (payload) => {
    //                     console.log('Change received!', payload)
    //                     fetchSummaryPowerEnergyAllUnit();
    //                     fetchAverageVolt();
    //                     fetchAverageFreq();
    //                 }
    //             )
    //             .subscribe()

    //         console.log('sensordata', sensordata);

    //     } catch (error) {
    //         console.error('Unexpected error fetching sensor data:', error);
    //     }
    // };

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
            fetchTotalKwhAllUnit,
            fetchSummaryPowerEnergyAllUnit,
        }
    };
}

export { useSummary };
