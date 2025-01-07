export interface Classify {
    id: number;
    tariff_group: string;
    power_limit_max: number;
    power_limit_min: number;
    fixed_charge: string;
    regular_usage_charge: number;
    prepaid: number;
}

export interface Customer {
    id: number | null;
    serial_number: string | null;
    name: string | null;
    address: string | null;
    id_classify: number | null;
    wattage: number | null;
    power_line: string | null;
    tariff: number | null;
    classify: Classify | null;
}