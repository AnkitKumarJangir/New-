import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'AngularMultipleData';
  form :FormGroup;
  form1 :FormGroup;
  title3 :any
  body3 :any;
  Emp :any[];
  add =false
  url = 'https://jsonplaceholder.typicode.com/posts';
  editId: any;
  title2:any;
  body2:any
  item: any;
  constructor(private fb: FormBuilder,private httpservice:HttpClient) {
  }
   
  ngOnInit() {
    this.form = this.fb.group({
      'title': new FormControl(null),
      'body': new FormControl(null)
       

    })
    this.httpservice.get(this.url).subscribe((data : any )=> {
      this.Emp = data 
      console.log(this.Emp);
      
    });
    
  }
  onChange(event){
  
    if(event.target.value != ''){
      this.httpservice.get(`https://jsonplaceholder.typicode.com/posts?userId=${event.target.value}`).subscribe((data:any)=> {
        this.Emp = data
      })
    }else{
      this.httpservice.get(this.url).subscribe((data : any )=> {
        this.Emp = data 
        console.log(this.Emp);
        
      });
      

    }
  }
  
  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
    let  obj ={
      userId : 1,
      ...this.form.value
      }
      this.httpservice.post(`${this.url}`,obj).subscribe(data =>{
        console.log(data);
        this.title3 =''
        this.body3 =''

        this.httpservice.get(this.url).subscribe((data:any)=> {
          this.Emp = data
        })
      })
    } else {
      
      let key = Object.keys(this.form.controls);
      key.filter(data => {
        let control = this.form.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
          
        }
      })
    }
  }
  OnDelete(id:any){
    this.httpservice.delete(`${this.url}/${id}`).subscribe(data=>{
    
      this.httpservice.get(this.url).subscribe((data:any)=> {
        this.Emp = data
      })
      
    })
  
  }
  OnEdit(){
    if(this.form.valid){
      let obj ={
        userId : this.item,
        ...this.form.value

      }
    this.httpservice.put(`${this.url}/${this.editId}`,obj).subscribe(data=>{
     
      this.httpservice.get(this.url).subscribe((data:any)=> {
        this.Emp = data
      })
      
    })
  }  else {
      
    let key = Object.keys(this.form.controls);
    key.filter(data => {
      let control = this.form.controls[data];
      if (control.errors != null) {
        control.markAsTouched();
        
      }
    })
  }
//   fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PUT',
//   body: JSON.stringify({
//     id: 1,
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
  }
  getId(item:any,id:any){
    this.editId = id
    this.item = item.userId

    this.title2 = item.title;
    this.body2 = item.body;

    console.log(this.editId);
    

  }

}
