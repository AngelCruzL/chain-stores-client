import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapDiv?: ElementRef;
  map?: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapDiv?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.2062766378825, 19.440308153587008], // starting position [lng, lat]
      zoom: 16, // starting zoom
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
