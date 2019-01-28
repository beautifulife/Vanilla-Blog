import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './AdminPosts.scss';

export default class AdminPosts extends Component {
  handlePageCotrollerClick(ev) {
    const { onPageControlButtonClick } = this.props;

    onPageControlButtonClick(ev.currentTarget.value);
  }

  handleRemoveButtonClick(ev, articleId) {
    const { onRemoveButtonClick } = this.props;

    onRemoveButtonClick(articleId);
  }

  render() {
    const { articleList, unAvailablePageDirection } = this.props;

    const articleControlList = articleList.map((article) => {
      const localPublishedTime = new Date(article.created_at).toLocaleString();

      return (
        <tr key={article.id}>
          <td>{article.title}</td>
          <td>{article.by}</td>
          <td>{localPublishedTime}</td>
          <td className="AdminPost__list__remove" onClick={ev => this.handleRemoveButtonClick(ev, article.id)}>remove</td>
        </tr>
      );
    });

    const checkPageInputDisable = (pageDirection) => {
      if (pageDirection === unAvailablePageDirection) {
        return true;
      }

      return false;
    };

    return (
      <Fragment>
        <div className="AdminPost__wrapper">
          <table className="AdminPost__list">
            <thead>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published time</th>
                <th>remove</th>
              </tr>
            </thead>
            <tbody>
              {articleControlList}
            </tbody>
          </table>
        </div>
        <div className="AdminPost__controller">
          <input
            type="button"
            value="previous"
            className={checkPageInputDisable('previous') ? 'disabled' : undefined}
            onClick={this.handlePageCotrollerClick.bind(this)}
            disabled={checkPageInputDisable('previous')}
          />
          <input
            type="button"
            value="next"
            className={checkPageInputDisable('next') ? 'disabled' : undefined}
            onClick={this.handlePageCotrollerClick.bind(this)}
            disabled={checkPageInputDisable('next')}
          />
        </div>
      </Fragment>
    );
  }
}

AdminPosts.propTypes = {
  articleList: PropTypes.instanceOf(Array).isRequired,
  unAvailablePageDirection: PropTypes.string.isRequired,
  onPageControlButtonClick: PropTypes.func.isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
};
