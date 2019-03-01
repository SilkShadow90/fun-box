import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import {
  addNavigationList,
  removeNavigationList,
  reorderNavigationList,
  selectNavigationList,
} from '../../data/navigation';
import { selectIsSidebarOpen, switchSidebar } from '../../data/app';

const mapStateToProps = state => ({
  navigationList: selectNavigationList(state),
  isSidebarOpen: selectIsSidebarOpen(state),
});

const mapDispatchToProps = {
  addNavigationList,
  removeNavigationList,
  reorderNavigationList,
  switchSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
