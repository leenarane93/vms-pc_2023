import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { ZoneMaster } from 'src/app/models/admin/ZoneMaster';
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
  lat : number =0;
  long : number =0;
  active:boolean=false;
  id:number = 0;
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
              private scroller: ViewportScroller,
              private toast : ToastrService,
              private adminFacade : AdminFacadeService){
      this.global.CurrentPage = "Add Zone";
      this.BuildForm();
  }
  get f() { return this.form.controls; }
  BuildForm(){
    let _configData = this.adminFacade.getConfiguration().subscribe(res =>{
      debugger;
      _configData = res;
      var latitude= res.find((x:any)=>x.prmkey == 'lat');
      this.lat = latitude.prmvalue;
      var latitude= res.find((x:any)=>x.prmkey == 'long');
      this.long = latitude.prmvalue;
    })
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
    let _zoneMaster = new ZoneMaster();
    _zoneMaster.id = this.id;
    _zoneMaster.zoneName = this.form.controls.zoneName.value;
    _zoneMaster.description = this.form.controls.description.value;
    _zoneMaster.createdBy = this.global.UserCode;
    _zoneMaster.isActive = this.active;
    if (this.id != 0) {
      this.adminFacade.updateZoneMaster(_zoneMaster).subscribe(r => {
        if (r == 0) {
          this.toast.error("Error occured while updating data");
        } else {
          this.toast.success("Updated successfully.");
          this.clearForm();
        }
      })
    }
    else {
      this.adminFacade.addZoneMaster(_zoneMaster).subscribe(r => {
        if (r == 0) {
          this.toast.error("Error occured while saving data");
        } else {
          this.toast.success("Saved successfully.");
          this.clearForm();
        }
      })
    }
  }
  
  clearForm() {
    this.id = 0;
    this.form.reset();
    this.form.controls["isActive"].setValue(false);
  }
  scrollToBottom(): void {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;        
}


}
