import React from 'react';
import './NoMatch.scss';

function NoMatch() {
  console.log('NoMatch')

  return (
    <div className="NoMatch">
      <div className="NoMatch__message">
        404 not found
      </div>
    </div>
  );
}

export default NoMatch;
