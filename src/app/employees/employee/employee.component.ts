import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.service.getCustomers();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.get('$key').value)
      if (!this.service.form.get('$key').value)

        this.service.insertEmployee(this.service.form.value).subscribe((data: any) => {
          console.log(data)
          this.service.listUpdated.emit(true)
        });
      else
      this.service.updateEmployee(this.service.form.value).subscribe((data: any) => {
             console.log(data)
             this.service.listUpdated.emit(true)
         });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
