import React from 'react';
import './styles/ChildProgressBar.sass';

const ProgressBar = ({ percent = 0 }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">
        تقييم الإنجاز: {percent}%
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 