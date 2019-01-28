import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Article.scss';

export default class Article extends Component {
  render() {
    const { article, tagDictionary } = this.props;

    const renderArticle = () => {
      const articleTags = article.tags.map(tagId => (
        <span key={tagId}>
          {`#${tagDictionary[tagId]}`}
        </span>
      ));

      const articleComments = article.comments.map((comment) => {
        const localCommentTime = new Date(comment.created_at).toLocaleString();

        return (
          <div key={comment.id}>
            <span>{comment.by}</span>
            <span>{localCommentTime}</span>
            <p>{comment.text}</p>
          </div>
        );
      });

      const localPublishedTime = new Date(article.created_at).toLocaleString();

      return (
        <div className="Article">
          <div className="Article__header">
            <h2 className="Article__header__title">{article.title}</h2>
            <hr />
            <span className="Article__header__author">{article.by}</span>
            <span className="Article__header__date">{localPublishedTime}</span>
          </div>
          <div className="Article__contents">
            <p>{article.body}</p>
          </div>
          <div className="Article__tags">
            {articleTags}
          </div>
          <hr />
          <div className="Article__comments">
            {articleComments}
          </div>
        </div>
      );
    };

    return (
      <Fragment>
        {!!Object.keys(article).length && renderArticle()}
      </Fragment>
    );
  }
}

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  tagDictionary: PropTypes.instanceOf(Object).isRequired,
};
