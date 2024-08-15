import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFilterEmployee } from '../models/IFilterEmployee';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  getFilterConfig(): Observable<IFilterEmployee> {
    const config = {
      job: [
        { name: 'محاسب', alpha3Code: 'ACC' },
        { name: 'مدير', alpha3Code: 'MGR' }
      ],
      condition: [
        { name: 'فعال', alpha3Code: 'ACT' },
        { name: 'غير فعال', alpha3Code: 'INA' }
      ],
      access: [
        { name: 'مدير الهيكل التنظيمي', alpha3Code: 'ADM' },
        { name: 'حامل الكارت', alpha3Code: 'CRT' }
      ]
    };

    return of(config);
  }
}
