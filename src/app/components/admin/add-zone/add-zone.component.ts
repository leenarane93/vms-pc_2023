import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/utils/global';
import { getErrorMsg } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent {
  @ViewChild('scroll', { static: true }) scroll: any;
  form : any=[];
  loading = false;
  submitting = false;
  isMap:boolean=false;
//   options = {
//     layers: [
//         tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
//     ],
//     zoom: 8,
//     center: latLng(22.29985,73.19555)
// };
  constructor(private router:Router,
              private global :Globals,
              private formBuilder:FormBuilder,
              private scroller: ViewportScroller){
      this.global.CurrentPage = "Add Zone";
      this.BuildForm();
  }
  get f() { return this.form.controls; }
  BuildForm(){
    this.form = this.formBuilder.group({
      zoneName: ['', Validators.required],
      description: ['', Validators.required],
      isActive: ['', [Validators.required]],
      //longitude: ['', [Validators.required,Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$')]]
  });
  }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }
  BackToList(){
    this.router.navigate(['masters/zone-master']);
  }
  onSubmit(){

  }
  ViewMap(){
    this.isMap = true;
    this.scroller.scrollToAnchor("bottom");
  }
  scrollToBottom(): void {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;        
}


}
