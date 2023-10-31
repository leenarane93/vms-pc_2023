import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/utils/global';
import { getErrorMsg } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-vms',
  templateUrl: './add-vms.component.html',
  styleUrls: ['./add-vms.component.css']
})
export class AddVmsComponent {
  form: any = [];
  brightness: any;
  vmsOn: boolean = false;
  active: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;
  constructor(private router: Router,
    private global: Globals,
    private formBuilder: FormBuilder,) {
    this.global.CurrentPage = "Add VMS";
    this.BuildForm();
  }
  get f() { return this.form.controls; }
  BuildForm() {
    this.form = this.formBuilder.group({
      vmsId: ['', Validators.required],
      zoneId: ['', Validators.required],
      serialNo: ['', [Validators.required]],
      description: ['', [Validators.required]],
      installDate: ['', [Validators.required]],
      latitude: ['', [Validators.required, Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$')]],
      longitude: ['', [Validators.required, Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$')]],
      height: ['', [Validators.required]],
      width: ['', [Validators.required]],
      ipAddress: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
      brightnessCtrl: ['', [Validators.required]],
      vmson: [false, [Validators.required]],
    });
  }

  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }


  onSubmit() {

  }
  BackToList() {
    this.router.navigate(['masters/vms-master']);
  }

}
