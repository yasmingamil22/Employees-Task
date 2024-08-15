import { Injectable } from '@angular/core';
import { IEmployee } from '../models/IEmployee';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: IEmployee[] = [
    {
      id: 1,
      status: 'فعال',
      name: 'أحمد محمد علي',
      userSerial: '5467898765',
      userRole: 'حامل الكارت',
      jobTitle: 'محاسب',
      phoneNumber: '+20 125 833 9688'
    },
    {
      id: 2,
      status: 'غير فعال',
      name: 'أحمد محمد أحمد',
      userSerial: '987654321',
      userRole: 'مدير الهيكل التنظيمي',
      jobTitle: 'مدير',
      phoneNumber: '+20 112 345 6789'
    },
    {
      id: 3,
      status: 'فعال',
      name: 'محمد محمد علي',
      userSerial: '5461898765',
      userRole: 'حامل الكارت',
      jobTitle: 'محاسب',
      phoneNumber: '+20 125 833 9681'
    },
    {
      id: 4,
      status: 'غير فعال',
      name: 'أحمد محمد محمد',
      userSerial: '987654321',
      userRole: 'مدير الهيكل التنظيمي',
      jobTitle: 'مدير',
      phoneNumber: '+20 112 315 6789'
    },
    {
      id: 5,
      status: 'فعال',
      name: 'أحمد محمد علي',
      userSerial: '5467898765',
      userRole: 'حامل الكارت',
      jobTitle: 'مهندس',
      phoneNumber: '+20 125 833 9687'
    },
    {
      id: 6,
      status: 'فعال',
      name: 'أحمد محمد محمد',
      userSerial: '987654321',
      userRole: 'مدير الهيكل التنظيمي',
      jobTitle: 'مدير',
      phoneNumber: '+20 112 345 6789'
    },
    {
      id: 7,
      status: 'غير فعال',
      name: 'علي محمد علي',
      userSerial: '5467894765',
      userRole: 'حامل الكارت',
      jobTitle: 'محاسب',
      phoneNumber: '+20 125 823 9687'
    },
    {
      id: 8,
      status: 'فعال',
      name: 'أحمد محمد محمد',
      userSerial: '957654321',
      userRole: 'مدير الهيكل التنظيمي',
      jobTitle: 'مدير',
      phoneNumber: '+20 112 347 6789'
    },



  ];

constructor() { }

getEmployees(): Observable<IEmployee[]> {

  return of(this.employees);
}

}
