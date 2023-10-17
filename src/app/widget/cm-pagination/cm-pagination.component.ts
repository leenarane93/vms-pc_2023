import { Component, EventEmitter, Input, Output } from '@angular/core';

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
}

@Component({
  selector: 'app-cm-pagination',
  templateUrl: './cm-pagination.component.html',
  styleUrls: ['./cm-pagination.component.css']
})
export class CmPaginationComponent {
  page = 4; 
  @Input() id!: string;
  @Input() maxSize: number = 5;
  @Input()
  private _directionLinks: boolean = true;
  private _autoHide: boolean = false;
  public totalListCount:any=this.maxSize;
  constructor() { }

  ngOnInit() {
  }
  
    get directionLinks(): boolean {
        return this._directionLinks;
    }
    set directionLinks(value: boolean) {
        this._directionLinks = !!value && <any>value !== 'false';
    }
    @Input()
    get autoHide(): boolean {
        return this._autoHide;
    }
    set autoHide(value: boolean) {
        this._autoHide = !!value && <any>value !== 'false';
    }
    @Input() previousLabel: any = 'Previous';
    @Input() nextLabel: string = 'Next';
    @Input() screenReaderPaginationLabel: string = 'Pagination';
    @Input() screenReaderPageLabel: string = 'page';
    @Input() screenReaderCurrentLabel: string = `You're on page`;
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

}
