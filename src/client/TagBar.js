import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TagBar.scss';

export default class TagBar extends Component {
  handleTagClick(ev, tagId) {
    const { onClick } = this.props;

    onClick(tagId);
  }

  render() {
    const { tagDictionary } = this.props;

    const renderTags = () => {
      return Object.keys(tagDictionary).map((tagId, index) => {
        const keyIndex = tagId + index.toString();

        return (
          <li key={keyIndex} className="TagBar__list__item" onClick={ev => this.handleTagClick(ev, tagId)}>
            <span>{tagDictionary[tagId]}</span>
          </li>
        );
      });
    };

    return (
      <div className="TagBar">
        <ul className="TagBar__list">
          {renderTags()}
        </ul>
      </div>
    );
  }
}

TagBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  tagDictionary: PropTypes.instanceOf(Object).isRequired,
};
