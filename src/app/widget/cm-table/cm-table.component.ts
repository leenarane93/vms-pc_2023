import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cm-table',
  templateUrl: './cm-table.component.html',
  styleUrls: ['./cm-table.component.css']
})
export class CmTableComponent {

  listOfData: any;
  tooltip: string = "";
  searchText: string = "";
  @Output() pager = new EventEmitter<number>();
  @Output() searchWithId = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() recordPerPage = new EventEmitter<number>();
  @Input() headArr: any[] = [];
  @Input() link!: string;
  @Input() fieldName!: string;
  @Input() gridArr: any[] = [];
  @Input() totalRecords!: number;
  @Input() perPage: number = 10;
  @Input() totalPages: number = 1;
  @Input() collectionSize: number = 1;
  filteredData: any = [];
  activePage: number = 0;
  constructor(private router: Router) {

  }
  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber
  }
  Search() {
    debugger;
    this.search.emit(this.searchText);
    // if (this.filteredData != undefined && this.filteredData.length > 0) {
    //   if (this.searchText !== "") {
    //     let searchValue = this.searchText.toLocaleLowerCase();

    //     this.gridArr = this.filteredData.filter((contact: any) => {
    //       return contact.zoneName.toLocaleLowerCase().match(searchValue);
    //     });
    //     console.log(this.gridArr);
    //   }
    //   else {
    //     this.gridArr = this.filteredData;
    //   }
    // }
    // else {
    //   this.filteredData = this.gridArr;
    //   if (this.searchText !== "") {
    //     let searchValue = this.searchText.toLocaleLowerCase();

    //     this.gridArr = this.filteredData.filter((contact: any) => {
    //       return contact.zoneName.toLocaleLowerCase().match(searchValue);
    //       // you can keep on adding object properties here
    //     });

    //     console.log(this.gridArr);
    //   }
    //   else {
    //     this.gridArr = this.filteredData;
    //   }
    // }
  }
  mouseEnter(msg: string) {
    this.tooltip = msg;
  }
  pageChange(pager: number) {
    this.pager.emit(pager);
  }

  onPageChange(pageNo: number) {
    this.pageChange(pageNo);
  }
  onPageRecordsChange(pageNo: number) {
    this.recordPerPage.emit(pageNo);
  }

  ShowForm(item:any) {
    this.searchWithId.emit(item);
    //this.router.navigate([this.link]);
  }
}
