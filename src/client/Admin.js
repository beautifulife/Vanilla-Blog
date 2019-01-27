import React, { Component } from 'react';
import './Admin.scss';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: 'posts',
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(ev) {
    const { selectedMenu } = this.state;

    // if (selectedMenu === ) {

    // }
  }

  render() {
    const { selectedMenu } = this.state;

    const toggleMenuClass = (menu) => {
      if (selectedMenu === menu) {
        return `Admin__frame__menu__${menu} active`;
      }

      return `Admin__frame__menu__${menu}`;
    };

    return (
      <div className="Admin">
        <h1 className="Admin__title">Hello Admin!</h1>
        <div className="Admin__frame">
          <div className="Admin__frame__menu">
            <input
              className={toggleMenuClass('posts')}
              type="button"
              value="포스트 관리"
              onClick={this.handleMenuClick}
            />
            <input
              className={toggleMenuClass('theme')}
              type="button"
              value="블로그 테마 관리"
              onClick={this.handleMenuClick}
            />
          </div>
          <div className="Admin__frame__contents">
            타입에 따라 출력
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
