import React from 'react';
import PropTypes from 'prop-types';
import './NoMatch.scss';

export default function NoMatch(props) {
  const { location } = props;

  return (
    <div className="NoMatch">
      <div className="NoMatch__message">
        <h1>404</h1>
        <p>page not found</p>
        <p><span>'{location.pathname}'</span> is not available</p>
      </div>
    </div>
  );
}

NoMatch.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
