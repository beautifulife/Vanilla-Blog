import React, { Component } from 'react';
import './TagBar.scss';

class TagBar extends Component {
  handleListClick(tagId, ev) {
    const { onClick } = this.props;

    onClick(tagId);
  }

  render() {
    const { tagDictionary } = this.props;

    const renderTags = () => {
      return Object.keys(tagDictionary).map((tagId, index) => {
        const keyIndex = tagId + index.toString();

        return (
          <li key={keyIndex} className="TagBar__list__item" onClick={this.handleListClick.bind(this, tagId)}>
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

export default TagBar;
