import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DropDownList, Input, IconButton } from '..';
import { strings } from '../../resources';
import './Sidebar.css';

export default class Sidebar extends Component {
  static propTypes = {
    navigationList: PropTypes.arrayOf(PropTypes.object).isRequired,
    addNavigationList: PropTypes.func.isRequired,
    removeNavigationList: PropTypes.func.isRequired,
    reorderNavigationList: PropTypes.func.isRequired,
    switchSidebar: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      placeInput: '',
    };
  }

  handlePlaceInputClear = () => {
    this.setState({ placeInput: '' });
  };

  handlePlaceInputChange = (event) => {
    this.setState({ placeInput: event.target.value });
  };

  handlePlaceInputSubmit = () => {
    const { addNavigationList, navigationList } = this.props;
    const { placeInput } = this.state;

    if (placeInput) {
      const isPlaceExist = navigationList.findIndex(item => item.id === placeInput);
      if (isPlaceExist === -1) {
        const newPlace = { id: placeInput, content: placeInput };

        addNavigationList(newPlace)
          .then(this.handlePlaceInputClear);
      }
    }
  };

  handleSidebarSwitch = () => {
    const { switchSidebar } = this.props;
    switchSidebar();
  };

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.handlePlaceInputSubmit();
    }
  };

  render() {
    const {
      isSidebarOpen,
      navigationList,
      removeNavigationList,
      reorderNavigationList,
    } = this.props;

    const { placeInput } = this.state;

    return (
      <div
        className={classNames(
          'sidebar',
          {
            sidebar__open: isSidebarOpen,
            sidebar__close: !isSidebarOpen,
          },
        )}
      >
        <IconButton
          className={classNames('sidebar__back-button', {
            'sidebar__back-button__open': isSidebarOpen,
            'sidebar__back-button__close': !isSidebarOpen,
          })}
          onClick={this.handleSidebarSwitch}
          icon="keyboard_arrow_left"
        />
        <Input
          placeholder={strings.sidebar.placeInputPlaceholder}
          label={strings.sidebar.placeInputLabel}
          onChange={this.handlePlaceInputChange}
          value={placeInput}
          onKeyPress={this.handleEnterPress}
        />
        <DropDownList
          items={navigationList}
          removeItem={removeNavigationList}
          reorderItems={reorderNavigationList}
        />
      </div>
    );
  }
}
