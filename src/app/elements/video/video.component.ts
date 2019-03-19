import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var video = <HTMLVideoElement>document.getElementById("video-bg");
    //de lo contrario el video no se reproduce automaticamente en google chrome
    video.muted = true;
    video.play();
  }
}
