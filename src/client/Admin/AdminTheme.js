import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AdminTheme.scss';

export default class AdminTheme extends Component {
  handleThemeClick(ev, themeName) {
    const { onThemeClick } = this.props;

    onThemeClick(themeName);
  }

  render() {
    const themeList = ['white', 'black', 'SILVER', 'aliceblue', 'ORANGE', 'Aquamarine', 'Gold', 'Tomato', 'FloralWhite', 'RosyBrown'];
    const { selectedTheme } = this.props;

    const renderTheme = themeList.map((themeName) => {
      const themeStyle = { backgroundColor: themeName };
      const themeClassName = themeName === selectedTheme ? 'AdminTheme__list__image active' : 'AdminTheme__list__image';

      return (
        <div key={themeName} className="AdminTheme__list">
          <div className={themeClassName} style={themeStyle} onClick={ev => this.handleThemeClick(ev, themeName)} />
          <div className="AdminTheme__list__title">
            <span>{themeName}</span>
          </div>
        </div>
      );
    });

    return (
      <div className="AdminTheme">
        {renderTheme}
      </div>
    );
  }
}

AdminTheme.propTypes = {
  onThemeClick: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
};
