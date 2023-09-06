import { Component } from '@angular/core';
import { LoaderService } from 'src/app/facade/services/common/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {
    console.log(this.loader.isLoading$);
  }
}
