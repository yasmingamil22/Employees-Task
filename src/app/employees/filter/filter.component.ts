import { IFilterEmployee } from './../../models/IFilterEmployee';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/services/Filter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state(
        'open',
        style({
          opacity: 1,
          visibility: 'visible', // Ensures the component is shown when fully visible
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          visibility: 'hidden', // Hides the component after the animation is complete
        })
      ),
      transition('open <=> close', [animate('0.5s ease-in-out')]),
    ]),
  ],
  
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
        private _ActivatedRoute: ActivatedRoute ,
        private elementRef: ElementRef
      ) {
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
  onContainerClick(event: MouseEvent): void {
    this.closeFilter.emit();
  }
  

  /*
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    // Close filter if clicked outside the content div
    const clickedInside = this.elementRef.nativeElement.querySelector('.content').contains(event.target as Node);
    if (!clickedInside) {
      this.closeFilter.emit();
    }
  }
*/
  toggleVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  filter():void{
    console.log(this.filterForm.value)
    this.applyFilter.emit(this.filterForm.value);  

  }
  get animationState() {
    return this.isFilterVisible ? 'open' : 'close';
  }

 

}
