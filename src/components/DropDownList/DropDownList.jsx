import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IconButton } from '..';
import './DropDownList.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: '0.5rem',

  // change background colour if dragging
  background: isDragging ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
  borderBottom: '1px solid',
  borderBottomColor: isDragging ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.3)',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class DropDownList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeItem: PropTypes.func.isRequired,
    reorderItems: PropTypes.func.isRequired,
  };

  removeItem = itemId => () => {
    const { removeItem } = this.props;

    removeItem(itemId);
  };

  onDragEnd = (result) => {
    const { reorderItems, items } = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    reorderItems(reorderedItems);
  };

  renderDroppableItem = (item, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(providedItem, snapshot) => (
        <div
          className={classNames('drop-down__list__item')}
          ref={providedItem.innerRef}
          {...providedItem.draggableProps}
          {...providedItem.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            providedItem.draggableProps.style,
          )}
        >
          {item.content}
          <IconButton
            className={classNames('drop-down__list__item_remove')}
            onClick={this.removeItem(item.id)}
            icon="clear"
            color="secondary"
            size="small"
          />
        </div>
      )}
    </Draggable>
  );

  render() {
    const { items } = this.props;

    return (
      <div className={classNames('drop-down')}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                ref={provided.innerRef}
                className={classNames('drop-down__list')}
              >
                {items.map(this.renderDroppableItem)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
