import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './ArticleList.scss';
import subImage from './asset/image/sub_img.png';

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortInputValue: 'the newest',
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.handleSortInputClick = this.handleSortInputClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { isNewest } = this.props;

    if (nextProps.isNewest !== isNewest) {
      if (nextProps.isNewest) {
        this.setState({
          sortInputValue: 'the newest',
        });
      } else {
        this.setState({
          sortInputValue: 'the oldest',
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(ev) {
    const { onScroll } = this.props;

    onScroll();
  }

  handleArticleClick(ev) {
    const { onItemClick } = this.props;

    onItemClick(ev.currentTarget.dataset.id);
  }

  handleSortInputClick(ev) {
    const { sortInputValue } = this.state;
    const { onButtonClick } = this.props;

    let newInputValue;

    if (sortInputValue === 'the oldest') {
      newInputValue = 'the newest';
    } else {
      newInputValue = 'the oldest';
    }

    this.setState({
      sortInputValue: newInputValue,
    });

    onButtonClick(newInputValue);
  }

  render() {
    const { sortInputValue } = this.state;
    const { match, articleList, tagList } = this.props;

    const renderArticle = () => {
      return articleList.map((article, index) => {
        const keyIndex = article.title + (index + Math.random()).toString();
        const imageStyle = { backgroundImage: `url(${article.thumbnail_image_url}), url(${subImage})` };
        const localPublishedTime = new Date(article.created_at).toLocaleString();
        const dashLinkedTitle = article.title.split(' ').join('-');
        const articleTags = article.tags.map(tagId => (
          <span key={tagId}>
            {`#${tagList[tagId]}`}
          </span>
        ));

        return (
          <li key={keyIndex} className="ArticleList__list__item">
            <div className="ArticleList__list__item__image" style={imageStyle} />
            <div className="ArticleList__list__item__text">
              <p className="ArticleList__list__item__text__title" data-id={article.id} onClick={this.handleArticleClick}>
                <Link to={`${match.url}/${dashLinkedTitle}`}>
                  {article.title}
                </Link>
              </p>
              <span className="ArticleList__list__item__text__sub">{article.by}</span>
              <span className="ArticleList__list__item__text__sub">{localPublishedTime}</span>
              <span className="ArticleList__list__item__text__sub">
                {articleTags}
              </span>
              <span className="ArticleList__list__item__text__sub">{article.comments_count} comments</span>
            </div>
          </li>
        );
      });
    };

    return (
      <div className="ArticleList">
        <div className="ArticleList__sort">
          <input
            type="button"
            value={sortInputValue}
            className="ArticleList__sort__btn"
            onClick={this.handleSortInputClick}
          />
        </div>
        <ul className="ArticleList__list">
          {!!articleList.length && renderArticle()}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
