import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { LoaderService } from 'src/app/facade/services/common/loader.service';
import { PrmGlobal } from 'src/app/models/request/config';
import { getErrorMsg } from 'src/app/utils/utils';

@Component({
  selector: 'app-cm-modal',
  templateUrl: './cm-modal.component.html',
  styleUrls: ['./cm-modal.component.css']
})
export class CmModalComponent {
  form : any=[];
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    _configData:any=[];
    _parameterData : any=[];
  type!: string;
  @Input() public data:any;
  @Input() public pageConfig:any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _adminFacade :AdminFacadeService,
    private _toastr : ToastrService,
    private _cdr:ChangeDetectorRef,
    private _userFacade:UserFacadeService,
    private _loader:LoaderService)
    {}

    get f() { return this.form.controls; }
passBack() {
  //this.passEntry.emit();
  this.modalService.dismissAll();
}

onSubmit() {
  this.submitted = true;


  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }
}
getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
  return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
}
GetUnitData(){
  var _unit = "";
  this._adminFacade.getKeysDataForConfig(_unit).subscribe(res=>{
    this._configData=res;
    console.log(this._configData);
  });
}

UnitChange(){
  var _unit = this.form.controls["prmUnit"].value;
  this.LoadParameter(_unit);
}

LoadParameter(_unit:string){
  this._configData.config_keys.forEach((ele:any) => {
    if(Object.keys(ele)[0] == _unit)
    {
      this._parameterData = ele[_unit];
    }
  });
  this._cdr.detectChanges();
}

saveConfiguration() {
  //Latitude
  var _data = new PrmGlobal();
  _data.id = 0;
  _data.prmkey = this.form.controls["prmKey"].value;
  _data.prmunit = this.form.controls["prmUnit"].value;
  _data.prmvalue = this.form.controls["prmValue"].value;
  _data.prmuserid = this._userFacade.user.username;
  var valid = true;
  this._parameterData.forEach((ele:any) => {
      if(ele.key == _data.prmkey)
      {
          if(ele.type == "coords")
          {
            var re = RegExp("^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$");
            if(!re.test(_data.prmvalue))
            {
              this._toastr.error("Invalid data in "+ele.value);
              valid = false;
            }
          }
          else if(ele.type == "api")
          {
            if(!_data.prmvalue.includes("http") || !_data.prmvalue.includes("//") || !_data.prmvalue.includes(":"))
            {
              this._toastr.error("Invalid data in "+ele.value);
              valid = false;
            }
          }
      }
  });
  if(valid == true) {
    this._loader.showLoader();
  }
  console.log(_data);
}
}
