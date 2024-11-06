export interface EnergyData {
    volt: number;
    current: number;
    actEn: number;
    reactEn: number;
    appEn: number;
    actPower: number;
    reactPower: number;
    appPower: number;
    freq: number;
    timestamp: string;
    serialNum: string;
}
export interface SummaryEnergyData {
    serialNum: string;
    totalacten: number;
    totalreacten: number;
    totalappen: number;
    totalactpower: number;
    totalreactpower: number;
    totalapppower: number;
}