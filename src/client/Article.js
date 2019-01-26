import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './Article.scss';

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { article, tagDictionary } = this.props;

    const renderArticle = () => {
      const localPublishedTime = new Date(article.created_at).toLocaleString();

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

      const articleTags = article.tags.map(tagId => (
        <span key={tagId}>
          {`#${tagDictionary[tagId]}`}
        </span>
      ));

      console.log('renderArticle');

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

export default Article;
