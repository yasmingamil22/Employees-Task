import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/models/IEmployee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() numberOfEmployee: number = 0;
  @Output() filterChange = new EventEmitter<IEmployee[]>();

  isFilterVisible = false;

  

 // searchType: string = '';
  searchValue: string = '';

  employees: IEmployee[] = [];
  filteredEmployees: IEmployee[] = [];

  constructor(private _EmployeeService: EmployeeService,private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.getAllEmployees()
  }


  //for filter com
  filteredData: any = {};  // Store the filtered data
  onFilterApplied(filterData: any): void {
    this.filteredData = filterData;
  
    // Filter the employees based on the selected filters
    this.filteredEmployees = this.employees.filter(employee => {
      return (
        (filterData.job.length === 0 || filterData.job.includes(employee.jobTitle)) &&
        (filterData.condition.length === 0 || filterData.condition.includes(employee.status)) &&
        (filterData.access.length === 0 || filterData.access.includes(employee.userRole))
      );
    });
  
    // Prepare query parameters, only include non-empty filters
    const queryParams: any = {};
  
    if (filterData.job.length > 0) {
      queryParams.job = filterData.job.join(',');
    }
    if (filterData.condition.length > 0) {
      queryParams.condition = filterData.condition.join(',');
    }
    if (filterData.access.length > 0) {
      queryParams.access = filterData.access.join(',');
    }
  
    // Update URL with filter params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', //other params in the URL
    });
  
    this.filterChange.emit(this.filteredEmployees); 
    this.isFilterVisible = false;
  }
  

  getAllEmployees():void{
    this._EmployeeService.getEmployees().subscribe((data: IEmployee[]) => {
      this.employees = data;
      this.filteredEmployees = [...this.employees];
  
      // Initialize filters from URL
      this.route.queryParams.subscribe(params => {
        const job = params['job'] ? params['job'].split(',') : [];
        const condition = params['condition'] ? params['condition'].split(',') : [];
        const access = params['access'] ? params['access'].split(',') : [];
  
        const filterData = { job, condition, access };
        this.onFilterApplied(filterData); 
      });
    });
  }


    onSearch(): void {
      console.log(this.searchValue)
      console.log(this.filteredEmployees)

    const term = this.searchValue.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(term) ||
        employee.phoneNumber.includes(term) ||
        employee.userSerial.includes(term)
    );
    console.log(this.filteredEmployees)
    this.filterChange.emit(this.filteredEmployees); // Emit the filtered data

  }

  resetSearcgInput() {
    this.searchValue= '';
    this.getAllEmployees();
  }
  

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }
  /*
  if there is select option to choice search type 
  onSearch(): void {
    if (this.searchValue.trim() === '') {
      this.filteredEmployees = [...this.employees];
    } else {
      const searchValueLower = this.searchValue.toLowerCase();
      this.filteredEmployees = this.employees.filter(employee =>
        this.filterEmployee(employee, searchValueLower)
      );
    }
    this.filterChange.emit(this.filteredEmployees); // Emit the filtered data
  }

  private filterEmployee(employee: IEmployee, searchValueLower: string): boolean {
    switch (this.searchType) {
      case 'name':
        return employee.name.toLowerCase().includes(searchValueLower);
      case 'userSerial':
        return employee.userSerial.toLowerCase().includes(searchValueLower);
      case 'phoneNumber':
        return employee.phoneNumber.toLowerCase().includes(searchValueLower);
      default:
        return false;
    }
  }
*/


}
