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
    const { article } = this.props;

    const renderArticle = () => {
      const localPublishedTime = new Date(article.created_at).toLocaleString();
      const commaSeperatedTags = article.tags.join(',');

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
          <hr />
          <div className="Article__footer">
            <div className="Article__footer__tags">{commaSeperatedTags}</div>
            <div className="Article__footer__comments">{article.comments}</div>
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
