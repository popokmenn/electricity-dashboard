export interface EnergyData {
    volt: number;
    current: number;
    PF: number;
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

export interface PeriodicProfile {
    active_energy_neg: number;
    active_energy_pos: number;
    active_power_neg: number;
    active_power_pos: number;
    alarm_register: number | null;
    current: number;
    entries: any | null;
    entries_size: any | null;
    id: number;
    manufacturer_specific: number;
    power_factor: number;
    reactive_energy_neg: number;
    reactive_energy_pos: number;
    serial_number: string;
    status_register: number;
    time: number;
    voltage: number;
    timestamp: string;
    alarm_register_translated?: string[];
}

export interface Billing {
    active_energy_neg_rate_0: number;
    active_energy_neg_rate_1: number;
    active_energy_neg_rate_2: number;
    active_energy_neg_rate_3: number;
    active_energy_neg_rate_4: number;
    active_energy_neg_rate_5: number;
    active_energy_pos_rate_0: number;
    active_energy_pos_rate_1: number;
    active_energy_pos_rate_2: number;
    active_energy_pos_rate_3: number;
    active_energy_pos_rate_4: number;
    active_energy_pos_rate_5: number;
    apparent_energy_neg_rate_0: number;
    apparent_energy_neg_rate_1: number;
    apparent_energy_neg_rate_2: number;
    apparent_energy_neg_rate_3: number;
    apparent_energy_neg_rate_4: number;
    apparent_energy_neg_rate_5: number;
    apparent_energy_pos_rate_0: number;
    apparent_energy_pos_rate_1: number;
    apparent_energy_pos_rate_2: number;
    apparent_energy_pos_rate_3: number;
    apparent_energy_pos_rate_4: number;
    apparent_energy_pos_rate_5: number;
    apparent_power_pos_max_rate_0: number | null;
    apparent_power_pos_max_rate_0_time: number | null;
    apparent_power_pos_max_rate_1: number | null;
    apparent_power_pos_max_rate_1_time: number | null;
    apparent_power_pos_max_rate_2: number | null;
    apparent_power_pos_max_rate_2_time: number | null;
    apparent_power_pos_max_rate_3: number | null;
    apparent_power_pos_max_rate_3_time: number | null;
    apparent_power_pos_max_rate_4: number | null;
    apparent_power_pos_max_rate_4_time: number | null;
    apparent_power_pos_max_rate_5: number | null;
    apparent_power_pos_max_rate_5_time: number | null;
    battery_voltage: number;
    entries: number;
    entries_size: number;
    event_counter: number;
    id: number;
    manufacturer_specific: number;
    reactive_energy_neg_rate_0: number;
    reactive_energy_neg_rate_1: number;
    reactive_energy_neg_rate_2: number;
    reactive_energy_neg_rate_3: number;
    reactive_energy_neg_rate_4: number;
    reactive_energy_neg_rate_5: number;
    reactive_energy_pos_rate_0: number;
    reactive_energy_pos_rate_1: number;
    reactive_energy_pos_rate_2: number;
    reactive_energy_pos_rate_3: number;
    reactive_energy_pos_rate_4: number;
    reactive_energy_pos_rate_5: number;
    serial_number: string;
    time: number;
    total_power_failures: number;
}