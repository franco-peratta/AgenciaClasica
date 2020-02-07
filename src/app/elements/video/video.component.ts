import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [NgbCarouselConfig]
})
export class VideoComponent implements OnInit {

  constructor(private config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    /*var video = <HTMLVideoElement>document.getElementById("video-bg");
    //de lo contrario el video no se reproduce automaticamente en google chrome
    video.muted = true;
    video.play();*/
  }
}
