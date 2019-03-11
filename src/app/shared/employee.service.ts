import {EventEmitter, Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const endpoint = 'http://localhost:8080/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private Status: any;
  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }
  listUpdated = new EventEmitter<boolean>()



  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });
  private transferId: any;

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  getCustomers(): Observable<any> {
    return this.http.get(endpoint + 'customers')
  }

  insertEmployee(input): Observable<any> {
    console.log(input);
    return this.http.post(endpoint + 'customers',
      {
        "id": 32,
        "fullName": input.fullName,
        "email": input.email,
        "mobile": input.mobile,
        "city": input.city,
        "departmentName": "dep 1"
      })
  }

  updateEmployee(customer): Observable<any>  {
    console.log(endpoint + 'customers/' +this.transferId);
    return this.http.put(endpoint + 'customers/' +this.transferId,
      {
        //"id": this.transferId ,
        "fullName": customer.fullName,
        "email": customer.email,
        "mobile": customer.mobile,
        "city": customer.city,
        "departmentName": "dep 1"
      })
  }

  deleteEmployee(id): Observable<any>  {
    console.log("right before delete");
    return this.http.delete(endpoint + 'customers/'+ id)
  }

  populateForm(customer) {

    this.transferId= customer.id;
    console.log(customer)
    this.form.setValue({
      $key: 1,

      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      city: customer.city,
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

}
