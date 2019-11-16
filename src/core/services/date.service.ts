import moment from 'moment';

export class DateService {
    readonly DATE_INVALID_MESSAGE = 'Date has wrong format';
    readonly DATE_DEFAULT_FORMAT = 'DD.MM.YYYY';

    isDateValid(dateString: string): boolean {
        const date = moment(dateString);
        return date.isValid();
    }
    defaultDateFormat(dateString: string): string {
        if (!this.isDateValid(dateString)) {
            return `${this.DATE_INVALID_MESSAGE}: ${dateString}`;
        }

        const date = moment(dateString);
        return date.format(this.DATE_DEFAULT_FORMAT);
    }
}