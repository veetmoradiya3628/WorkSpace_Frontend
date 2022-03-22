import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user_active_plan, user_upcoming_plan } from 'src/app/app.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public active_plans=Array();
  public upcoming_plans=Array();

  
  constructor(private http:HttpClient,private _router:Router) { 

    const headers = new HttpHeaders();
    headers.set("Access-Control-Allow-Credentials","*");

    this.http.get<any>(user_active_plan,{headers:headers,withCredentials:true,responseType:'json'}).subscribe({
      next: data => {
          // console.log(data)
          if (data['status_code'] == 200) {
              this.active_plans = data['active_plans'];
          } 
          else {
            // Swal.fire(
            //   'Something Went Wrong',
            //   data['message'],
            //   'error'
            // );
          }
      },
      error: error => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });


    this.http.get<any>(user_upcoming_plan,{headers:headers,withCredentials:true,responseType:'json'}).subscribe({
      next: data => {
          console.log(data)
          if (data['status_code'] == 200) {
              this.upcoming_plans = data['upcoming_plans'];
          } 
          else {
            // Swal.fire(
            //   'Something Went Wrong',
            //   data['message'],
            //   'error'
            // );
          }
      },
      error: error => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });

  }

  ngOnInit(): void {
  }

}
