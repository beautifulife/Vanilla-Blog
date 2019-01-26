import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Admin from './Admin';
import ArticleList from './ArticleList';
import Article from './Article';
import NoMatch from './NoMatch';
import TagBar from './TagBar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      articleList: [],
      articleListByTag: [],
      articleListPage: 0,
      sortParameter: 'dsc',
      tagsList: {},
      username: '',
    };

    this.isScrollThrottle = true;

    this.getClickEvent = this.getClickEvent.bind(this);
    this.getScrollEvent = this.getScrollEvent.bind(this);
    this.getSortToggleEvent = this.getSortToggleEvent.bind(this);
    this.getTagClickEvent = this.getTagClickEvent.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.getArticleList(0, []);

    fetch('/api/v1/username')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  getArticle(articleId) {
    fetch(`/api/v1/articles/${articleId}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        getComment(data);
      })
      .catch(err => console.log(err));

    const getComment = (article) => {
      fetch(`/api/v1/articles/${articleId}/comments`)
        .then(res => res.json())
        .then((data) => {
          article.comments = data;

          console.log(data);

          this.setState({
            article,
          });
        })
        .catch(err => console.log(err));
    };
  }

  getArticleList(pageNum, articleList) {
    fetch(`/api/v1/articles?sort=dsc&pageIndex=${pageNum}`)
      .then(res => res.json())
      .then((data) => {
        if (!data.posts.length) {
          this.getTagName(articleList);

          this.setState({
            articleList,
          });

          console.log('data get finished');
          return;
        }

        articleList = articleList.concat(data.posts);
        pageNum += 1;
        this.getArticleList(pageNum, articleList);
      })
      .catch(err => console.log(err));
  }

  getTagName(articleList) {
    const promiseList = [];
    const tagsList = {};

    articleList.forEach((post) => {
      post.tags.forEach((tag) => { tagsList[tag] = 0; });
    });

    Object.keys(tagsList).forEach((tagId) => {
      const promiseItem = fetch(`/api/v1/tags/${tagId}`).then(res => res.json());

      promiseList.push(promiseItem);
    });

    Promise.all(promiseList)
      .then((data) => {
        data.forEach((item) => {
          tagsList[item.id] = item.name;
        });

        this.setState({
          tagsList,
        });
      })
      .catch(err => console.log(err));
  }

  getClickEvent(articleId) {
    this.getArticle(articleId);
  }

  getScrollEvent() {
    if (document.body.offsetHeight - (window.innerHeight + window.scrollY) <= 200 &&
        this.isScrollThrottle) {
      console.log('now scroll add event call!');
      const { articleListPage } = this.state;
      const newPage = articleListPage + 1;

      this.isScrollThrottle = false;

      this.setState({
        articleListPage: newPage,
      });

      setTimeout(() => { this.isScrollThrottle = true; }, 500);
    }
  }

  getSortToggleEvent(sortValue) {
    const { articleList, articleListByTag } = this.state;
    let newSortParameter;

    console.log('now sortToggle event call!');

    if (sortValue === 'the newest') {
      newSortParameter = 'dsc';
    } else {
      newSortParameter = 'asc';
    }

    this.setState({
      articleList: articleList.reverse(),
      articleListByTag: articleListByTag.reverse(),
      articleListPage: 0,
      sortParameter: newSortParameter,
    });
  }

  getTagClickEvent(tagId) {
    const { articleList, sortParameter } = this.state;

    if (sortParameter === 'asc') {
      this.setState({
        articleList: articleList.reverse(),
        sortParameter: 'dsc',
      }, this.makeTagSortedList.bind(this, tagId, articleList));
    } else {
      this.makeTagSortedList(tagId, articleList);
    }
  }

  resetState() {
    this.setState({
      article: {},
      articleList: [],
      articleListByTag: [],
      articleListPage: 0,
      sortParameter: 'dsc',
      tagsList: {},
    }, this.getArticleList.bind(this, 0, []));

    fetch('/api/v1/username')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  makeTagSortedList(tagId, articleList) {
    const targetArticles = [];

    articleList.forEach((article) => {
      article.tags.forEach((tag) => {
        if (tag === Number(tagId)) {
          targetArticles.push(article);
        }
      });
    });

    this.setState({
      articleListByTag: targetArticles,
    });
  }

  render() {
    const { username, articleList, article, tagsList, articleListPage, articleListByTag, sortParameter } = this.state;

    const limitArticleNumbers = (list) => {
      const articleNumbers = (articleListPage + 1) * 10;

      return list.slice(0, articleNumbers);
    };

    return (
      <div className="App">
        <Router>
          <div>
            <Link to="/">
              {username ? <h1 className="App__title"><span onClick={this.resetState}>{`${username.toUpperCase()}`}</span></h1> : <h1 className="App__title">Loading.. please wait!</h1>}
            </Link>
            <Route exact path="/articles" render={props => (<TagBar {...props} tagDictionary={tagsList} onClick={this.getTagClickEvent} />)} />
            <Switch>
              <Redirect exact from="/" to="/articles" />
              <Route
                exact
                path="/articles"
                render={props => (
                  <ArticleList
                    {...props}
                    articleList={articleListByTag.length ? limitArticleNumbers(articleListByTag) : limitArticleNumbers(articleList)}
                    tagDictionary={tagsList}
                    isNewest={sortParameter === 'dsc' || false}
                    onButtonClick={this.getSortToggleEvent}
                    onItemClick={this.getClickEvent}
                    onScroll={this.getScrollEvent}
                  />
                )}
              />
              <Route path="/articles/:article_title" render={props => <Article {...props} article={article} tagDictionary={tagsList} />} />
              <Route path="/admin" render={props => <Admin {...props} />} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
