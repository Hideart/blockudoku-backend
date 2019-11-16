export interface IAddCardResult {
    error?: string;
    source?: ICardData;
}

export interface ICardData {
    id: string;
    brand: string;
    last4: string;
    exp_month: number | string;
    exp_year: number | string;
    default: boolean;
}

export interface ICardDataUpdate {
    id?: string;
    brand?: string;
    last4?: string;
    exp_month?: number | string;
    exp_year?: number | string;
    default?: boolean;
}