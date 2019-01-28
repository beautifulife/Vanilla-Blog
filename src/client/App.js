import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Admin from './Admin';
import Article from './Article';
import ArticleList from './ArticleList';
import NoMatch from './NoMatch';
import TagBar from './TagBar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      article: {},
      articleList: [],
      articleListByTag: [],
      articleListPage: 0,
      selectedTheme: 'white',
      sortParameter: 'dsc',
      tagsList: {},
      notAvailablePageDirection: 'previous',
      username: '',
    };

    this.isDataProcessingDone = true;
    this.changeTheme = this.changeTheme.bind(this);
    this.controlAriticleListPage = this.controlAriticleListPage.bind(this);
    this.controlArticleListPageByScroll = this.controlArticleListPageByScroll.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.toggleSortDirection = this.toggleSortDirection.bind(this);
    this.toggleSortDirectionByTag = this.toggleSortDirectionByTag.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.getArticleList(0, []);

    fetch('/api/v1/username')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  changeTheme(choosedTheme) {
    const { selectedTheme } = this.state;

    if (selectedTheme !== choosedTheme) {
      this.setState({
        selectedTheme: choosedTheme,
      });
    }
  }

  controlAriticleListPage(direction) {
    const { articleList, articleListPage } = this.state;
    const addPageNumber = direction === 'previous' ? -1 : 1;
    const newPage = articleListPage + addPageNumber;

    if (newPage === 0) {
      this.setState({
        notAvailablePageDirection: 'previous',
      });
    } else if (articleList.length / 10 <= newPage + 1) {
      this.setState({
        notAvailablePageDirection: 'next',
      });
    } else {
      this.setState({
        notAvailablePageDirection: '',
      });
    }

    this.setState({
      articleListPage: newPage,
    });
  }

  controlArticleListPageByScroll() {
    if (document.body.offsetHeight - (window.innerHeight + window.scrollY) <= 200 &&
        this.isDataProcessingDone) {
      const { articleListPage } = this.state;
      const newPage = articleListPage + 1;

      this.isDataProcessingDone = false;

      this.setState({
        articleListPage: newPage,
      });

      setTimeout(() => { this.isDataProcessingDone = true; }, 500);
    }
  }

  getArticle(articleId) {
    fetch(`/api/v1/articles/${articleId}`)
      .then(res => res.json())
      .then((data) => {
        getComment(data);
      })
      .catch(err => console.error(err));

    const getComment = (article) => {
      fetch(`/api/v1/articles/${articleId}/comments`)
        .then(res => res.json())
        .then((data) => {
          article.comments = data;

          this.setState({
            article,
          });
        })
        .catch(err => console.error(err));
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

          return;
        }

        articleList = articleList.concat(data.posts);
        pageNum += 1;
        this.getArticleList(pageNum, articleList);
      })
      .catch(err => console.error(err));
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
      .catch(err => console.error(err));
  }

  toggleSortDirection(sortValue) {
    const { articleList, articleListByTag } = this.state;
    let newSortParameter;

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

  toggleSortDirectionByTag(tagId) {
    const { articleList, sortParameter } = this.state;

    if (sortParameter === 'asc') {
      this.setState({
        articleList: articleList.reverse(),
        sortParameter: 'dsc',
      }, this.sortArticleListByTag.bind(this, tagId, articleList));
    } else {
      this.sortArticleListByTag(tagId, articleList);
    }
  }

  removeArticle(articleId) {
    const { articleList } = this.state;
    const newArticleList = articleList.slice();

    for (let i = 0; i < newArticleList.length; i++) {
      if (newArticleList[i].id === articleId) {
        newArticleList.splice(i, 1);
      }
    }

    fetch(`/api/v1/articles/${articleId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then((data) => {
        if (data.result === 'ok') {
          this.setState({
            articleList: newArticleList,
          });
        }
      })
      .catch(err => console.error(err));
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
  }

  sortArticleListByTag(tagId, articleList) {
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
    const {
      article,
      articleList,
      articleListByTag,
      articleListPage,
      selectedTheme,
      sortParameter,
      tagsList,
      username,
      notAvailablePageDirection,
    } = this.state;

    const colorMap = {
      white: 'rgba(0, 0, 0, 0.7)',
      black: 'white',
    };

    const styleByTheme = {
      backgroundColor: selectedTheme,
      color: colorMap[selectedTheme],
      borderColor: colorMap[selectedTheme],
    };

    const limitArticleNumbers = (list) => {
      const articleNumbers = (articleListPage + 1) * 10;

      return list.slice(0, articleNumbers);
    };

    const renderHeader = () => {
      if (username) {
        return (
          <h1 className="App__title">
            <span onClick={this.resetState}>
              {`${username.toUpperCase()}`}
            </span>
          </h1>
        );
      }

      return <h1 className="App__title">Loading.. please wait!</h1>;
    };

    const showArticleByPage = (list) => {
      const articleIndex = articleListPage * 10;

      return list.slice(articleIndex, articleIndex + 10);
    };

    return (
      <div style={styleByTheme} className="App">
        <Router>
          <React.Fragment>
            <Link to="/">
              {renderHeader()}
            </Link>
            <Route
              exact
              path="/articles"
              render={props => (<TagBar {...props} tagDictionary={tagsList} onClick={this.toggleSortDirectionByTag} />)}
            />
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
                    onButtonClick={this.toggleSortDirection}
                    onItemClick={this.getArticle}
                    onScroll={this.controlArticleListPageByScroll}
                  />
                )}
              />
              <Route
                path="/articles/:article_title"
                render={props => <Article {...props} article={article} tagDictionary={tagsList} />}
              />
              <Redirect exact from="/admin" to="/admin/posts" />
              <Route
                exact
                path="/admin/posts"
                render={props => (
                  <Admin
                    {...props}
                    articleList={showArticleByPage(articleList)}
                    onProcess={this.resetState}
                    onPageControl={this.controlAriticleListPage}
                    onRemove={this.removeArticle}
                    notAvailablePageDirection={notAvailablePageDirection}
                  />
                )}
              />
              <Route
                exact
                path="/admin/theme"
                render={props => (
                  <Admin
                    {...props}
                    selectedTheme={selectedTheme}
                    onThemeControl={this.changeTheme}
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
