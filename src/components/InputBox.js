import React from 'react';
import './InputBox.css';

const InputBox = (props) => {
  return (
    
      <div className="input-box">
        <i className="uil uil-search"></i>
        <input
            value={props.location}
            onChange={event => props.setLocation(event.target.value)}
            onKeyPress={props.searchLocation}
            type="text"
            placeholder="Enter City..."
        />
        <button className="button"  onClick={props.searchLocation}>Add City</button>
      </div>
    
  );
};

export default InputBox;
