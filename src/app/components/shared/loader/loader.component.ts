import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from 'src/app/facade/services/common/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements AfterViewInit {
  constructor(public loader: LoaderService,
              private _cdr : ChangeDetectorRef) {
    console.log(this.loader.isLoading$);
  }

  ngAfterViewInit(){
    this._cdr.detectChanges();
  }
}
