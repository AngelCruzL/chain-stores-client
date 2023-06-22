import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { Store } from '../../../../core/models/Store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapDiv?: ElementRef;
  map?: Map;
  stores!: Store[];
  #mapService = inject(MapService);

  ngOnInit(): void {
    this.#mapService
      .getStores()
      .pipe(filter(stores => !!stores))
      .subscribe(stores => {
        this.stores = stores;
      });
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapDiv?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.2062766378825, 19.440308153587008], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    setTimeout(() => {
      this.stores.forEach(store => {
        this.addMarker(store);
      });
    }, 500);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  addMarker(store: Store): void {
    if (!this.map) return;

    const marker = new Marker()
      .setLngLat([store.longitude, store.latitude])
      .addTo(this.map);

    const popup = new Popup({ offset: 42 }).setHTML(
      `<h4>${store.name}</h4>
      <address>${store.address}</address>
      <p>Tel: ${store.phone}</p>`,
    );
    marker.setPopup(popup);
  }
}
