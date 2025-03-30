import React from 'react';

const DisplayStatus = ({ type, message }) => {
  const style = {
    padding: '10px',
    border: type === 'success' ? '1px solid green' : '1px solid red',
    color: type === 'success' ? 'green' : 'red',
    marginTop: '10px'
  };

  return <div style={style}>{message}</div>;
};

export default DisplayStatus;
