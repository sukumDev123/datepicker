import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  date :string
  localeString: string = 'th';
  navDate: any;
  weekDaysHeaderArr: Array < string > = [];
  gridArr: Array < any > = [];
  showType : boolean = false
  constructor() {}

  ngOnInit() {
    moment.locale(this.localeString);
    this.navDate = moment();
    this.makeHeader();
    this.makeGrid()
  }

  changeNavMonth(num: number) {
    if (this.canChangeNavMonth(num)) {
      this.navDate.add(num, 'month');
    }
    this.makeGrid()
  }

  canChangeNavMonth(num: number) {
    const clonedDate = moment(this.navDate);
    clonedDate.add(num, 'month');
    const minDate = moment().add(-1, 'month');
    const maxDate = moment().add(1, 'year');

    return clonedDate.isBetween(minDate, maxDate);
  }
  makeHeader() {
    const weekDaysArr: Array < number > = [0, 1, 2, 3, 4, 5, 6];
    weekDaysArr.forEach(day => this.weekDaysHeaderArr.push(moment().weekday(day).format('dddd')));
  }
  makeGrid() {
    this.gridArr = [];

    const firstDayDate = moment(this.navDate).startOf('month');
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(this.navDate).endOf('month');
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = this.navDate.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

    for (let i = 0; i < arrayLength; i++) {
      let obj: any = {};
      if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
        obj.value = 0;
        obj.available = false;
      } else {
        obj.value = i - initialEmptyCells + 1;
        obj.available = this.isAvailable(i - initialEmptyCells + 1);
      }
      this.gridArr.push(obj);
    }
  }

  isAvailable(num: number): boolean {
    if (num === 5) {
      return false;
    } else {
      return true;
    }
  }
  showDate(day  , my : string ) {
    const month = my.split(' ')[0]
    const year = my.split(' ')[1]
    this.date = `${day}/${month}/${year}`
  }

}
