import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './Articles.scss';
import subImage from './asset/image/sub_img.png';

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };

    this.page = 0;
    this.isAjaxDone = true;

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getArticles();
    console.log(this.handleScroll);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getArticles() {
    fetch(`/api/v1/articles?limit=10&pageIndex=${this.page}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        const { articles } = this.state;

        this.page += 1;

        this.setState({
          articles: [
            ...articles,
            ...data.posts,
          ],
        });

        if (data.posts.length === 10) {
          this.isAjaxDone = true;
        }
      });
  }

  handleScroll(ev) {
    console.log(document.body.offsetHeight, window.innerHeight + window.scrollY);
    if (document.body.offsetHeight - (window.innerHeight + window.scrollY) <= 200 &&
        this.isAjaxDone) {
      console.log('now call!');
      this.isAjaxDone = false;
      this.getArticles();
    }
  }

  handleClick(ev) {
    const { onClick } = this.props;

    onClick(ev.currentTarget.dataset.id);
  }

  render() {
    const { articles } = this.state;
    const { match } = this.props;

    console.log(match);

    const renderArticle = () => {
      return articles.map((article, index) => {
        const keyIndex = article.title + (index + Math.random()).toString();
        const imageStyle = { backgroundImage: `url(${article.thumbnail_image_url}), url(${subImage})` };
        const localPublishedTime = new Date(article.created_at).toLocaleString();
        const commaSeperatedTags = article.tags.join(',');
        const dashLinkedTitle = article.title.split(' ').join('-');

        return (
          <li key={keyIndex} className="Articles__list__item">
            <div className="Articles__list__item__image" style={imageStyle} />
            <div className="Articles__list__item__text">
              <p className="Articles__list__item__text__title" data-id={article.id} onClick={this.handleClick}>
                <Link to={`${match.url}/${dashLinkedTitle}`}>
                  {article.title}
                </Link>
              </p>
              <span className="Articles__list__item__text__sub">{article.by}</span>
              <span className="Articles__list__item__text__sub">{localPublishedTime}</span>
              <span className="Articles__list__item__text__sub">{commaSeperatedTags}</span>
              <span className="Articles__list__item__text__sub">{article.comments_count}</span>
            </div>
          </li>
        );
      });
    };

    return (
      <div className="Articles">
        <ul className="Articles__list">
          {renderArticle()}
        </ul>
      </div>
    );
  }
}

export default Articles;
