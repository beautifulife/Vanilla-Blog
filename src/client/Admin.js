import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Admin.scss';
import AdminPosts from './Admin/AdminPosts';
import AdminTheme from './Admin/AdminTheme';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: 'posts',
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    const { onProcess } = this.props;

    onProcess();
  }

  handleMenuClick(ev, menu) {
    const { selectedMenu } = this.state;

    if (selectedMenu !== menu) {
      this.setState({
        selectedMenu: menu,
      });
    }
  }

  render() {
    console.log(this.props);

    const { selectedMenu } = this.state;

    const {
      match,
      articleList,
      onPageControl,
      onRemove,
      selectedTheme,
      onThemeControl,
      unAvailablePageDirection,
    } = this.props;

    const renderAccordingToMenu = () => {
      if (match.path === '/admin/posts') {
        return (
          <AdminPosts
            articleList={articleList}
            onPageControlButtonClick={onPageControl}
            onRemoveButtonClick={onRemove}
            unAvailablePageDirection={unAvailablePageDirection}
          />
        );
      }

      if (match.path === '/admin/theme') {
        return <AdminTheme selectedTheme={selectedTheme} onThemeClick={onThemeControl} />;
      }
    };

    const toggleMenuClass = (menu) => {
      if (selectedMenu === menu) {
        return 'Admin__frame__menu__btn active';
      }

      return 'Admin__frame__menu__btn';
    };

    return (
      <div className="Admin">
        <h1 className="Admin__title">Hello Admin!</h1>
        <div className="Admin__frame">
          <div className="Admin__frame__menu">
            <Link to="/admin/posts" className={toggleMenuClass('posts')} onClick={ev => this.handleMenuClick(ev, 'posts')}>
              <span>포스트 관리</span>
            </Link>
            <Link
              to="/admin/theme"
              className={toggleMenuClass('theme')}
              onClick={ev => this.handleMenuClick(ev, 'theme')}
            >
              <span>블로그 테마 관리</span>
            </Link>
          </div>
          <div className="Admin__frame__contents">
            {renderAccordingToMenu()}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
