import React, { useState, useEffect } from 'react';

const formatDots = dots => {
  let s = '';

  for(let i=0;i<dots;i++) {
    s += '.';
  }

  return s;
};

const Loading = ({ delay = 1000, color = 'var(--color-grey)' }) => {
  const [dots, setDots] = useState(0);

  const style = {
    fontSize: '2.5rem',
    textAlign: 'center',
    color
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d+1)%4);
    }, delay);

    return () => clearInterval(interval);
  }, [setDots, delay]);

  return <p style={style}>Loading{formatDots(dots)}</p>
};

export default Loading;