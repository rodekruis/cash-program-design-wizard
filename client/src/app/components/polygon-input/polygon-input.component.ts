import { AfterViewInit, Component } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Polygon from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { Fill, Stroke, Style } from 'ol/style';
import View from 'ol/View';

@Component({
  selector: 'app-polygon-input',
  templateUrl: './polygon-input.component.html',
  styleUrls: ['./polygon-input.component.scss'],
})
export class PolygonInputComponent implements AfterViewInit {
  public storedPolygons: any;

  vectorLayer: any;
  vectorSource: any;
  map: Map;
  coordinatesPolygon = [
    [
      [15.1234, 48.12345],
      [15.1234, 46.12345],
      [18.1234, 46.12345],
      [18.1234, 48.12345],
      [15.1234, 48.12345],
    ],
  ];

  ngAfterViewInit() {
    const polygonStyle = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.2)',
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 10,
      }),
    });
    this.vectorSource = new VectorSource({ features: [] });
    this.vectorLayer = new Vector({
      source: this.vectorSource,
      style: polygonStyle,
    });
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: [813079.7791264898, 5929220.284081122],
        zoom: 7,
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122, 848966.9639063801,
            5936863.986909639,
          ],
        }),
      ]),
    });
    this.addPolygon();
    this.drawPolygon();
  }

  addPolygon() {
    const geometry = new Polygon(this.coordinatesPolygon).transform(
      'EPSG:4326',
      this.map.getView().getProjection(),
    );
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

  drawPolygon() {
    const value = 'Polygon';
    const draw = new Draw({
      source: this.vectorSource,
      type: value,
    });
    this.map.addInteraction(draw);
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    draw.on('drawend', function (evt) {
      console.log('drawend: ', evt.feature.getGeometry());
      // this.source
      // features
      const format = new GeoJSON({});
      this.storedPolygons = format.writeFeatures([evt.feature]);
    });
  }

  reset() {
    this.vectorSource.clear();
  }
}
