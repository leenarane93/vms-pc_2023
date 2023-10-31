import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { PartyMaster } from 'src/app/models/admin/PartyMaster';
import { Globals } from 'src/app/utils/global';
import { getErrorMsg } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {
  form: any = [];
  active: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;
  id: number = 0;
  formItems !: FormArray;
  constructor(private router: Router,
    private global: Globals,
    private formBuilder: FormBuilder,
    private _facade: AdminFacadeService,
    private _common: CommonFacadeService,
    private toast: ToastrService,
    private actRoutes: ActivatedRoute) {
    this.global.CurrentPage = "Add Party";
    this.BuildForm();
  }
  ngOnInit(): void {
    this.id = 0;
    let data = this._common.getSession("ModelShow");
    this.FillForm(data == null ? "" : JSON.parse(data));
  }
  get f() { return this.form.controls; }
  BuildForm() {

    // this.form = this.formBuilder.group({
    //   items:this.setFormArray()
    // })
    this.form = this.formBuilder.group({
      partyCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]],
      partyName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      description: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      gstinNumber: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9]*$")]],
      isActive: [false, [Validators.required]],
    });

  }
  FillForm(data: any) {
    if (data != "") {
      this.id = data.id;
      if (data.isActive == "Active")
        this.active = true;
      else
        this.active = false;
      this.form.setValue({
        partyCode: data.partyCode,
        partyName: data.partyName,
        description: data.description,
        contactNumber: data.contactNo,
        address: data.address,
        zipCode: data.zipCode,
        gstinNumber: data.gstinNo,
        isActive: data.isActive
      })
    }
  }
  // setFormArray(): FormArray {
  //     return this.formBuilder.array(
  //       this.form.group({
  //         partyCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]],
  //         partyName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
  //         description: ['', [Validators.required]],
  //         contactNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
  //         address: ['', [Validators.required]],
  //         zipCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
  //         gstinNumber: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9]*$")]],
  //         isActive: [false, [Validators.required]],
  //       })
  //       )
  //   }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }


  onSubmit() {
    let _partyData = new PartyMaster();
    if (this.id != 0)
      _partyData.id = this.id;
    _partyData.partyCode = this.form.controls.partyCode.value;
    _partyData.partyName = this.form.controls.partyName.value;
    _partyData.description = this.form.controls.description.value;
    _partyData.contactNo = this.form.controls.contactNumber.value;
    _partyData.zipCode = this.form.controls.zipCode.value;
    _partyData.address = this.form.controls.address.value;
    _partyData.gstinNo = this.form.controls.gstinNumber.value;
    _partyData.isActive = this.active;
    _partyData.createdBy = this.global.UserCode;
    if(this.id != 0) {
      this._facade.updateParty(_partyData).subscribe(r => {
        if (r == 0) {
          this.toast.error("Error occured while saving data");
        } else {
          this.toast.success("Updated successfully.");
          this.clearForm();
        }
      })
    }
    else {
      this._facade.addParty(_partyData).subscribe(r => {
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
  BackToList() {
    this.router.navigate(['masters/party-master']);
  }
}
