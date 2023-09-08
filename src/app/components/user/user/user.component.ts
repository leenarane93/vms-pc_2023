import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  id?: string;
  form!: FormGroup;
  title!: string;
  loading = false;
  user:any;
  
   //dtOptions: DataTables.Settings = {};
   dtOptions: any = {};
   allVmsList: any = [];
   clickStatus: string = " ";
   nativeElement: any;
   drawCallback:any;

  users?: any[];

  
  openModal() {
    }

    openModal2(id:string) {
         
    }

    ngOnDestroy() {
      //this.modalService.dismissAll(AddEditComponent);
  
    }
}
