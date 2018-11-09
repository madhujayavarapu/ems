import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatDate(date){
    var newDate = new Date(date);
    var year = newDate.getFullYear();
    var month = ('0'+(newDate.getMonth()+1)).slice(-2);
    var day = newDate.getDate();

    return day+'/'+month+'/'+year;
  }
}
