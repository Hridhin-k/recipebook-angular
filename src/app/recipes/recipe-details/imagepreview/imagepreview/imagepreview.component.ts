import { Component, Input, OnInit } from '@angular/core';
//import { NgxImgZoomService } from "ngx-img-zoom";
import { ImageViewerConfig, CustomImageEvent } from 'angular-x-image-viewer';

@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.component.html',
  styleUrls: ['./imagepreview.component.css']
})

export class ImagepreviewComponent {


  @Input() image: any;
  rangevalue: number
  //images: any = ['https://live.staticflickr.com/65535/48588252551_16d7043332_h.jpg']
  myThumbnail: string
  myFullresImage: string



  imageIndexOne = 0;
  config: ImageViewerConfig = { customBtns: [{ name: 'print', icon: 'fa fa-print' }, { name: 'link', icon: 'fa fa-link' }] };




  handleEvent(event: CustomImageEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }
  changed(event) {
    this.rangevalue = event
    console.log(this.rangevalue, 'this is from preview component')
  }


}


