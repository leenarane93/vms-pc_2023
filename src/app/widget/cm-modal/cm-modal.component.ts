import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
active = 1;
model2: string | undefined;
model3: string | undefined;

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
      this.modalService.dismissAll();
    }
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
    onSubmit(){

    }
}
