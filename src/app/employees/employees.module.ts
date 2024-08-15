import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import {MatSelectModule} from '@angular/material/select';
import { NoDataComponent } from './no-data/no-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';

import { MatSidenavModule } from '@angular/material/sidenav'; // Import the MatSidenavModule
import { CustomStyleDirective } from '../directives/CustomStyle.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [
    EmployeesComponent,
    HeaderComponent,
    NoDataComponent,
    FilterComponent,
    CustomStyleDirective
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule
  ]
})
export class EmployeesModule { }
