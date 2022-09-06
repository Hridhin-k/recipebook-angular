import { Component, Input, OnInit } from '@angular/core';

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
  gridvalue: number


  imageIndexOne = 0;
  config: ImageViewerConfig = { customBtns: [{ name: 'print', icon: 'fa fa-print' }, { name: 'link', icon: 'fa fa-link' }] };
  handleEvent(event: CustomImageEvent) {


    switch (event.name) {
      case 'print':

        break;
    }
  }
  changed(event) {
    this.rangevalue = event
    //console.log(this.rangevalue, 'this is from preview component')
  }

  wheel(event) {

    this.gridvalue = event.magnification
    console.log(event, 'image selector events')
  }


}


