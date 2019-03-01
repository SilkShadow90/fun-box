import React, { Component } from 'react';
import {
  YMaps,
  Map as YMap,
  Placemark,
  Polyline,
} from 'react-yandex-maps';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Map.css';

export default class Map extends Component {
  static propTypes = {
    placeMarkRoute: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    placeMarkList: PropTypes.arrayOf(PropTypes.object).isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setNewPlaceMarkPosition: PropTypes.func.isRequired,
  };

  mapDefaultState = {
    center: [55.75, 37.57],
    zoom: 9,
    controls: ['zoomControl'],
  };

  constructor(props) {
    super(props);

    this.state = {
      mapWidth: '80vw',
      mapReady: false,
      isPolylineVisible: true,
    };
  }

  componentDidMount() {
    if (!this.checkMapInstanceReady()) {
      this.forceUpdate();
    } else {
      this.setMapReady();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSidebarOpen } = this.props;
    const { mapWidth, mapReady } = this.state;
    const mapInstanceReady = this.checkMapInstanceReady();

    if (!mapInstanceReady) {
      setTimeout(() => this.forceUpdate(), 1000);
    }
    if (mapInstanceReady && !mapReady) {
      this.setMapReady();
    }
    if (mapInstanceReady && !prevState.mapReady && mapReady) {
      this.setMapEvents();
    }
    if (mapWidth === '80vw' && !isSidebarOpen) {
      this.setMapWidth(100);
    }

    if (mapWidth === '100vw' && isSidebarOpen) {
      setTimeout(() => {
        this.setMapWidth(80);
      }, 1000);
    }
  }

  setMapReady = () => {
    this.setState({ mapReady: true });
  };

  setMapWidth = (width) => {
    this.setState({ mapWidth: `${width}vw` });
  };

  setMapEvents = () => {
    const { setMapCenter } = this.props;
    this.mapInstance.behaviors.disable('rightMouseButtonMagnifier');
    this.mapInstance.behaviors.disable('routeEditor');
    this.mapInstance.events.add('boundschange', (e) => {
      const newCenter = e.get('newCenter');
      if (newCenter) {
        setMapCenter(newCenter);
      }
    });
  };

  checkMapInstanceReady = () => this.mapInstance;

  switchPolylineVisible = () => {
    this.setState(prevState => ({
      isPolylineVisible: !prevState.isPolylineVisible,
    }));
  };

  placeMarkDragEnd = placeMarkId => (e) => {
    const { setNewPlaceMarkPosition } = this.props;
    const newPosition = e.get('target').geometry.getCoordinates();
    setNewPlaceMarkPosition(newPosition, placeMarkId);
    this.switchPolylineVisible();
  };

  placeMarkAddedEvents = placeMarkId => (placeMark) => {
    if (placeMark && placeMark.events && placeMark.events.types) {
      if (!placeMark.events.types.beforedragstart && !placeMark.events.types.beforeddragend) {
        placeMark.events.add('beforedragstart', this.switchPolylineVisible);
        placeMark.events.add('dragend', this.placeMarkDragEnd(placeMarkId));
      }
    }
  };

  renderPlaceMark = placeMark => (
    <Placemark
      key={placeMark.id}
      instanceRef={this.placeMarkAddedEvents(placeMark.id)}
      modules={['geoObject.addon.balloon']}
      defaultGeometry={placeMark.position}
      properties={{
        balloonContentBody: placeMark.content,
      }}
      options={{
        draggable: true,
        preset: 'islands#blueCircleDotIconWithCaption',
      }}
    />
  );

  renderPolyLine = () => {
    const { placeMarkRoute } = this.props;
    const { isPolylineVisible } = this.state;

    return (
      <Polyline
        geometry={placeMarkRoute}
        options={{
          balloonCloseButton: false,
          strokeColor: '#333333',
          strokeWidth: 4,
          strokeOpacity: 0.5,
          draggable: false,
          preset: 'islands#blueCircleDotIconWithCaption',
          visible: isPolylineVisible,
        }}
      />
    );
  };

  render() {
    const { placeMarkList, placeMarkRoute } = this.props;
    const { mapWidth } = this.state;

    return (
      <YMaps>
        <YMap
          instanceRef={(map) => { this.mapInstance = map; }}
          className={classNames('map')}
          style={{ width: mapWidth }}
          width={mapWidth}
          defaultState={this.mapDefaultState}
          modules={['control.ZoomControl']}
        >
          {placeMarkList && placeMarkList.map(this.renderPlaceMark)}
          {placeMarkRoute && this.renderPolyLine()}
        </YMap>
      </YMaps>
    );
  }
}
