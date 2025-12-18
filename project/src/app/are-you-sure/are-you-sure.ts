import { Component } from '@angular/core';

@Component({
  selector: 'app-are-you-sure',
  imports: [],
  templateUrl: './are-you-sure.html',
  styleUrl: './are-you-sure.scss',
})
export class AreYouSure {
  playVideo(): void {
    const iframe = document.getElementById("yt") as HTMLIFrameElement | null;
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }
}
