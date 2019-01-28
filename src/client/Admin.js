import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.scss';
import AdminPosts from './Admin/AdminPosts';
import AdminTheme from './Admin/AdminTheme';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: 'posts',
    };

    this.toggleSelectedMenu = this.toggleSelectedMenu.bind(this);
  }

  componentDidMount() {
    const { onProcess } = this.props;

    onProcess();
  }

  toggleSelectedMenu(ev, menu) {
    const { selectedMenu } = this.state;

    if (selectedMenu !== menu) {
      this.setState({
        selectedMenu: menu,
      });
    }
  }

  render() {
    const { selectedMenu } = this.state;

    const {
      articleList,
      match,
      notAvailablePageDirection,
      onPageControl,
      onRemove,
      onThemeControl,
      selectedTheme,
    } = this.props;

    const renderAccordingToMenu = () => {
      if (match.path === '/admin/posts') {
        return (
          <AdminPosts
            articleList={articleList}
            onPageControlButtonClick={onPageControl}
            onRemoveButtonClick={onRemove}
            notAvailablePageDirection={notAvailablePageDirection}
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
            <Link to="/admin/posts" className={toggleMenuClass('posts')} onClick={ev => this.toggleSelectedMenu(ev, 'posts')}>
              <span>포스트 관리</span>
            </Link>
            <Link
              to="/admin/theme"
              className={toggleMenuClass('theme')}
              onClick={ev => this.toggleSelectedMenu(ev, 'theme')}
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

Admin.propTypes = {
  articleList: PropTypes.instanceOf(Array).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  notAvailablePageDirection: PropTypes.instanceOf(Object).isRequired,
  onPageControl: PropTypes.func.isRequired,
  onProcess: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onThemeControl: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
};
