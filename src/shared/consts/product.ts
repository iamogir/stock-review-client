import {FormatObject} from "entities/product";

export const EXPIRING_SOON_DAYS = 3;

export const weightUnits: FormatObject[] = [
    { key: 'kg', value: 'KG'},
    { key: 'g', value: 'G'},
    { key: 'lt', value: 'LT'},
    { key: 'ml', value: 'ML'},
];

export const statusUnits: FormatObject[] = [
    { key: 'true', value: 'In stock'},
    { key: 'false', value: 'Out of stock'},
];