import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Articles from './Articles';
import Article from './Article';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.articleId = '';

    this.setArticleId = this.setArticleId.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/username')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  setArticleId(articleId) {
    console.log('아티클 설정완료', articleId);

    this.articleId = articleId;
  }

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        {username ? <h1>{`Hello ${username.toUpperCase()}`}</h1> : <h1>Loading.. please wait!</h1>}
        <Router>
          <div>
            <Header />
            <hr />
            <Switch>
              <Redirect exact from="/" to="/articles" />
              <Route exact path="/articles" render={props => <Articles {...props} onClick={this.setArticleId} />} />
              <Route path="/articles/:article_title" render={props => <Article {...props} articleId={this.articleId} />} />
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
