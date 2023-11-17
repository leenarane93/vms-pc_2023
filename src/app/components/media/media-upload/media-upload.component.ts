import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent implements OnInit {
  active = 1;
  result: string = '';
  myForm!: FormGroup;
  uploadSetId!: any;
  //this is your original recipe name which you had passed from previous page

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.generateUploadSetId();
  }
  tabChange() {
    this.generateUploadSetId();
  }
  generateUploadSetId() {
    var _date = new Date();
    var _dd = _date.getDate().toString();
    var _mm = (_date.getMonth() + 1).toString();
    var _yyyy = _date.getFullYear().toString();
    var _hh = _date.getHours().toString();
    var _min = _date.getMinutes().toString();
    var _ss = _date.getSeconds().toString();
    this.uploadSetId = _dd + _mm + _yyyy + _hh + _min + _ss;
  }

  save(event: any): void {
    var selectedFiles = event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      this.result += selectedFiles[i].name + `  <i class="fa fa-times"></i>`;
      this.result += '<br>----------------------------<br>';
    }
  }
}
