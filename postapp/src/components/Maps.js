import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {FaMapMarker} from 'react-icons/fa'
 
const AnyReactComponent = ({ text }) => <h4><FaMapMarker />{text}</h4>;
function _onClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);}

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDDAREeU6Tc9HU_tKX-kgQgkYJH2V3FwIc' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={_onClick}
        >
          <AnyReactComponent
            lat={25.5941}
            lng={85.1376}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;