import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../models/IEmployee';
import { EmployeeService } from '../services/employee.service';
import { Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: IEmployee[] = [];
  sortedEmployees: IEmployee[] = [];
  displayedColumns: string[] = ['select','id', 'status', 'name', 'userSerial', 'userRole', 'jobTitle', 'phoneNumber', 'actions'];
  selection = new SelectionModel<IEmployee>(true, []);
  dataSource = new MatTableDataSource<IEmployee>(this.employees);


  constructor(private _EmployeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this._EmployeeService.getEmployees().subscribe((data: IEmployee[]) => {
      this.employees = data;
      this.dataSource.data = this.employees; 
      this.sortedEmployees = [...this.employees];
    });
  }
  

  sortData(sort: Sort): void {
    const data = [...this.employees];

    if (!sort.active || sort.direction === '') {
      this.sortedEmployees = data;
      return;
    }

    this.sortedEmployees = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'jobTitle':
          return this.compare(a.jobTitle, b.jobTitle, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'phoneNumber':
          return this.compare(a.phoneNumber, b.phoneNumber, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'userRole':
          return this.compare(a.userRole, b.userRole, isAsc);
        case 'userSerial':
          return this.compare(a.userSerial, b.userSerial, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    if (typeof a === 'string' && typeof b === 'string') {
      a = a.trim().toLowerCase();
      b = b.trim().toLowerCase();
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onFilterChange(filteredEmployees: IEmployee[]): void {
    this.sortedEmployees = filteredEmployees;
    this.employees=filteredEmployees;
    this.dataSource.data = this.sortedEmployees; 
  }
  

  getStatusStyle(status: string): { bgColor: string; textColor: string } {
    const styles: { [key: string]: { bgColor: string; textColor: string } } = {
      'فعال': { bgColor: '#d4edda', textColor: '#28BE89' },   
      'غير فعال': { bgColor: '#f8d7da', textColor: '#E65151' } 
    };

    return styles[status] || { bgColor: '#ffffff', textColor: '#000000' }; // Default style
  }


  //for check box 
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }
  

  checkboxLabel(row?: IEmployee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
}
