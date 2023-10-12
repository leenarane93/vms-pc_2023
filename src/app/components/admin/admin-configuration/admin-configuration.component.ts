import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { getErrorMsg } from 'src/app/utils/utils';

@Component({
  selector: 'app-admin-configuration',
  templateUrl: './admin-configuration.component.html',
  styleUrls: ['./admin-configuration.component.css']
})
export class AdminConfigurationComponent {
    form : any=[];
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

  active = 1;
  model2: string | undefined;
  model3: string | undefined;
  @Input() public user: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
) { }

ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    debugger;
    this.form = this.formBuilder.group({
        apiUrl: ['', Validators.required],
        reportUrl: ['', Validators.required],
        lattitude: ['', [Validators.required,Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$')]],
        longitude: ['', [Validators.required,Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$')]]
    });

  this.title = 'Configuration';
    if (this.id) {
        // edit mode
     //   this.title = 'Edit User';
        this.loading = true;
       
    }
}

// convenience getter for easy access to form fields
get f() { return this.form.controls; }

onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
}

saveConfiguration() {

}

passBack() {
    this.passEntry.emit();
    this.modalService.dismissAll();
  }

  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }
}


