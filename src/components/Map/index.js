import { connect } from 'react-redux';
import Map from './Map';
import { selectIsSidebarOpen } from '../../data/app';
import {
  selectNavigationList,
  selectPlaceMarkRoute,
  setMapCenter,
  setNewPlaceMarkPosition,
} from '../../data/navigation';

const mapStateToProps = state => ({
  isSidebarOpen: selectIsSidebarOpen(state),
  placeMarkList: selectNavigationList(state),
  placeMarkRoute: selectPlaceMarkRoute(state),
});

const mapDispatchToProps = {
  setMapCenter,
  setNewPlaceMarkPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
