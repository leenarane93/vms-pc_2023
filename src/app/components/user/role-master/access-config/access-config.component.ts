import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { SelectionModel } from '@angular/cdk/collections';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-access-config',
  templateUrl: './access-config.component.html',
  styleUrls: ['./access-config.component.css']
})
export class AccessConfigComponent implements OnInit {

  selectedItems!: any[];
  savedItems!: any[];
  select_all = false;
  data: any[] = [];
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtOptions: any = {};
  constructor(
    private _userFacade: UserFacadeService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.getMenuData();
  }

  onSelectAll(e: any): void {
    for (let i = 0; i < this.data.length; i++) {
      const item = this.data[i];
      item.is_selected = e;
    }
  }
  removeSelectedRows() {
    this.data.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1);

    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  public saveSelectedItem() {
    // this.data = this.data.filter(item => this.selectedItems.
    //   findIndex(value => item.data === value.data) === -1);
    // this.savedItems = [...this.selectedItems.map(item => ({ value: item.data }))];


    this.selectedItems = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].is_selected) {
        this.selectedItems.push(this.data[i]);
      }
    }

    this.data = this.data.filter((el) => !this.selectedItems.includes(el));
    console.log(this.selectedItems);
    console.log(this.data);
  }

  getMenuData() {
    this._userFacade.getMenus().subscribe(res => {
      if (res != null && res.length > 0) {
        this.data = res;
      }
      else {
        this.toastr.error("Something went wrong.", "Error", { positionClass: "toast-bottom-right" });
      }
    })
  }

}
