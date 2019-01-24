import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import ArticleList from './ArticleList';
import Article from './Article';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      articleList: [],
      article: {},
      pageIndexParameter: 0,
    };

    this.page = 0;
    this.sort = 'asc';
    this.isAjaxDone = true;

    this.getClickEvent = this.getClickEvent.bind(this);
    this.getScrollEvent = this.getScrollEvent.bind(this);
    this.getSortToggleEvent = this.getSortToggleEvent.bind(this);
  }

  componentDidMount() {
    this.getArticleList();
    // fetch('/api/v1/username')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  getArticleList() {
    const { articleList } = this.state;
    let { pageIndexParameter } = this.state;

    fetch(`/api/v1/articles?limit=10&${this.sort}&pageIndex=${pageIndexParameter}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);

        pageIndexParameter += 1;

        this.setState({
          articleList: [
            ...articleList,
            ...data.posts,
          ],
        });

        if (data.posts.length === 10) {
          this.isAjaxDone = true;
        }
      })
      .catch(err => console.log(err));
  }

  getArticle(articleId) {
    fetch(`/api/v1/articles/${articleId}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);

        this.setState({
          article: data,
        });
      })
      .catch(err => console.log(err));
  }

  getClickEvent(articleId) {
    this.getArticle(articleId);
  }

  getScrollEvent() {
    if (document.body.offsetHeight - (window.innerHeight + window.scrollY) <= 200 &&
        this.isAjaxDone) {
      console.log('now scroll add event call!');
      this.isAjaxDone = false;
      this.setState({
        pageIndexParameter: 0,
      }, this.getArticleList);
      this.getArticleList();
    }
  }

  getSortToggleEvent(sortValue) {
    console.log('now sortToggle event call!');
    if (sortValue === 'the newest') {
      this.sort = 'asc';
      this.getArticleList();
    } else {
      this.sort = 'dsc';
      this.getArticleList();
    }
  }

  render() {
    const { username, articleList, article } = this.state;

    return (
      <div className="App">
        {username ? <h1>{`Hello ${username.toUpperCase()}`}</h1> : <h1>Loading.. please wait!</h1>}
        <Router>
          <div>
            <Header />
            <hr />
            <Switch>
              <Redirect exact from="/" to="/articles" />
              <Route
                exact
                path="/articles"
                render={props => (
                  <ArticleList
                    {...props}
                    articleList={articleList}
                    onButtonClick={this.getSortToggleEvent}
                    onItemClick={this.getClickEvent}
                    onScroll={this.getScrollEvent}
                  />
                )}
              />
              <Route path="/articles/:article_title" render={props => <Article {...props} article={article} />} />
              <Route path="/topics" component={Topics} />
            </Switch>
          </div> 
        </Router>
      </div>
    );
  }
}

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/articles">Articles</Link>
    </li>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
  </ul>
);

const Empty = () => <h1>empty</h1>
const Home = () => <h2>Home</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => {
  console.log(match);

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
};
