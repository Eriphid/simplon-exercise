import { NativeDateAdapter } from '@angular/material';
import moment from 'moment';

export class AppDateAdapter extends NativeDateAdapter {
    static dateformat = 'YYYY-MM-DD';

    format(date: Date): string {
        return moment(date).format(AppDateAdapter.dateformat);
    }
}
