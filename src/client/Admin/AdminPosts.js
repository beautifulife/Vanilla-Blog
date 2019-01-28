import React, { Component, Fragment } from 'react';
import './AdminPosts.scss';

class AdminPosts extends Component {
  handlePageCotrollerClick(ev) {
    const { onPageControlButtonClick } = this.props;

    onPageControlButtonClick(ev.currentTarget.value);
  }

  handleRemoveButtonClick(ev, articleId) {
    const { onRemoveButtonClick } = this.props;

    onRemoveButtonClick(articleId);
  }

  render() {
    const { articleList } = this.props;

    const articleControlList = articleList.map((article) => {
      const localPublishedTime = new Date(article.created_at).toLocaleString();

      return (
        <li key={article.id} className="AdminPost__list__item">
          <span>{article.title}</span>
          <span>{article.by}</span>
          <span>{localPublishedTime}</span>
          <input type="button" value="remove" onClick={ev => this.handleRemoveButtonClick(ev, article.id)} />
        </li>
      );
    });
    
    return (
      <Fragment>
        <ul className="AdminPost__list">
          {articleControlList}
        </ul>
        <div className="AdminPost__controller">
          <input type="button" value="before" onClick={this.handlePageCotrollerClick.bind(this)} />
          <input type="button" value="next" onClick={this.handlePageCotrollerClick.bind(this)} />
        </div>
      </Fragment>
    );
  }
}

export default AdminPosts;
