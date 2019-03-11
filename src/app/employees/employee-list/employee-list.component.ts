import { EmployeeComponent } from './../employee/employee.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from '../../shared/department.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  private customers: any[] = [];
  constructor(private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) {

    this.service.listUpdated.subscribe(
      (status : true) => this.service.getCustomers().subscribe((data: any) => {
        console.log(data);
        this.customers = data['customers'];
        console.log(this.customers);
        this.listData = new MatTableDataSource(this.customers);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      })
    )
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
        this.service.getCustomers().subscribe((data: any) => {
          console.log(data);
          this.customers = data['customers'];
          console.log(this.customers);
        this.listData = new MatTableDataSource(this.customers);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete(id){
    console.log(id);
    this.service.deleteEmployee(id).subscribe((data: any) => {
      this.service.listUpdated.emit(true)
    });
  }

}
