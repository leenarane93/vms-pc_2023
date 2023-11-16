import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Globals } from 'src/app/utils/global';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/facade/services/confirmation-dialog.service';
import { getErrorMsg } from 'src/app/utils/utils';
import { TarrifMaster } from 'src/app/models/admin/TarrifMaster';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { InputRequest } from 'src/app/models/request/inputReq';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: any = [];
  active: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;
  id: number = 0;
  formItems !: FormArray;
  totalAmt !: number;
  selectedRole !: any;
  _request: any = new InputRequest();
  roles: any[] = [];
  constructor(private router: Router,
    private global: Globals,
    private formBuilder: FormBuilder,
    private _facade: UserFacadeService,
    private _common: CommonFacadeService,
    private toast: ToastrService,
    private actRoutes: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService) {
    this.global.CurrentPage = "Add User";
    this.BuildForm();
  }
  ngOnInit(): void {
    this.getRoles();
    
  }
  get f() { return this.form.controls; }
  BuildForm() {
    this.form = this.formBuilder.group({
      userFName: ['', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z]*$")]],
      userLName: ['', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z]*$")]],
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern("[0-9]*$")]],
      emailId: ['', [Validators.required, Validators.email]],
      isActive: [false, [Validators.required]],
    });
  }
  FillForm(data: any) {
    if (data != "") {
      this.global.CurrentPage = "Edit User";
      this.id = data.id;
      if (data.isActive == "Active")
        this.active = true;
      else
        this.active = false;
      this.selectedRole = data.roleId;
      this.totalAmt = data.totalAmount;
      this.form.setValue({
        userFName: data.userFName,
        userLName: data.userLName,
        username: data.username,
        roleId: this.selectedRole,
        password: data.password,
        confirmPassword: data.password,
        mobileNo: data.mobileNo,
        emailId: data.emailId,
        isActive: data.isActive
      })
    }
  }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }

  getRoles() {
    this._request.currentPage = 0;
    this._request.pageSize = 0;
    this._request.startId = 0;
    this._request.searchItem = "";
    this._facade.getRoles(this._request).subscribe(res => {
      if (res != undefined && res != null) {
        this.roles = res.data;
        let data = this._common.getSession("ModelShow");
        this.FillForm(data == null ? "" : JSON.parse(data));
      }
    })
  }

  onSubmit() {
    this.AddUpdateTarrif(0);
  }
  clearForm() {
    this.id = 0;
    this.form.reset();
    this.form.controls["isActive"].setValue(false);
  }
  BackToList() {
    this.router.navigate(['users/user-master']);
  }
  DeleteTarrif() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to remove this User... ?')
      .then((confirmed) => { if (confirmed == true) this.RemoveTarrif() })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  RemoveTarrif() {
    this.AddUpdateTarrif(1);
  }

  AddUpdateTarrif(type?: any) {
    let _trfData = new TarrifMaster();
    if (this.id != 0)
      _trfData.id = this.id;
    _trfData.tarrifCode = this.form.controls.tarrifCode.value;
    _trfData.tarrifType = this.form.controls.tarrifType.value;
    _trfData.uomName = this.form.controls.uomName.value;
    _trfData.amount = this.form.controls.amount.value;
    _trfData.gstPer = this.form.controls.gstPer.value;
    _trfData.totalAmount = this.form.controls.totalAmount.value;
    _trfData.isActive = this.active;
    _trfData.createdBy = this.global.UserCode;
    if (type == 1)
      _trfData.isDeleted = true;
    // if (this.id != 0) {
    //   this._facade.updateTarrif(_trfData).subscribe(r => {
    //     if (r == 0) {
    //       this.toast.error("Error occured while saving data");
    //     } else {
    //       this.toast.success("Updated successfully.");
    //       this.clearForm();
    //     }
    //   })
    // }
    // else {
    //   this._facade.addTarrif(_trfData).subscribe(r => {
    //     if (r == 0) {
    //       this.toast.error("Error occured while saving data");
    //     } else {
    //       this.toast.success("Saved successfully.");
    //       this.clearForm();
    //     }
    //   })
    // }
  }
}
