import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cm-table',
  templateUrl: './cm-table.component.html',
  styleUrls: ['./cm-table.component.css']
})
export class CmTableComponent {

  listOfData: any;
  searchText: string = "";
  @Output() pager = new EventEmitter<number>();
  @Input() headArr: any[] = [];
  @Input() gridArr: any[] = [];
  filteredData: any = [];
  activePage: number = 0;

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber
  }
  Search() {
    debugger;
    if (this.filteredData != undefined && this.filteredData.length > 0) {
      if (this.searchText !== "") {
        let searchValue = this.searchText.toLocaleLowerCase();

        this.gridArr = this.filteredData.filter((contact: any) => {
          return contact.zoneName.toLocaleLowerCase().match(searchValue);
        });

        console.log(this.gridArr);
      }
      else {
        this.gridArr = this.filteredData;
      }
    }
    else {
      this.filteredData = this.gridArr;
      if (this.searchText !== "") {
        let searchValue = this.searchText.toLocaleLowerCase();

        this.gridArr = this.filteredData.filter((contact: any) => {
          return contact.zoneName.toLocaleLowerCase().match(searchValue)
            ;
          // you can keep on adding object properties here   

        });

        console.log(this.gridArr);
      }
      else {
        this.gridArr = this.filteredData;
      }
    }
  }

  pageChange(pager: number) {
    this.pager.emit(pager);
  }

  onPageChange(pageNo:number) {
    this.pageChange(pageNo);
  }
}
