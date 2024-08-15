import { IFilterEmployee } from './../../models/IFilterEmployee';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/services/Filter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  
})
export class FilterComponent {


  @Output() closeFilter = new EventEmitter<void>();
  @Output() applyFilter = new EventEmitter<any>();  // Event emitter to send filter data to parent

  @Input() isFilterVisible: boolean = false;
  filterForm: FormGroup;

  configFilter: IFilterEmployee = {
    access: [{ alpha3Code: '', name: '' }],
    job: [{ alpha3Code: '', name: '' }],
    condition: [{ alpha3Code: '', name: '' }],
  };

  constructor(private fb: FormBuilder, private _filterService: FilterService,
    private _Router:Router,
        private _ActivatedRoute: ActivatedRoute  ) {
    this.filterForm = this.fb.group({
      job: new FormControl([]),
      condition: new FormControl([]),
      access: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this._filterService.getFilterConfig().subscribe((data:IFilterEmployee)=> {
      this.configFilter = data;
      console.log(this.configFilter)

        // Fetch query parameters
        this._ActivatedRoute.queryParams.subscribe(params => {
          const job = params['job'] ? params['job'].split(',') : [];
          const condition = params['condition'] ? params['condition'].split(',') : [];
          const access = params['access'] ? params['access'].split(',') : [];
  
          // Patch values into form
          this.filterForm.patchValue({
            job: job,
            condition: condition,
            access: access
          });
        });
    }
    )
  }

  cancel() {
    this._Router.navigate(['/employees'])
    this.closeFilter.emit();
  }

  toggleVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  filter():void{
    console.log(this.filterForm.value)
    this.applyFilter.emit(this.filterForm.value);  

  }

}
