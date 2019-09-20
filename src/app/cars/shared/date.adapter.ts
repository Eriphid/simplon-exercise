import { NativeDateAdapter } from '@angular/material';
import moment from "moment";

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      return moment(date).format("YYYY-MM-DD");
  }
}