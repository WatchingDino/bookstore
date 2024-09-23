import React, { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      }}
    >
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <svg className="progress-ring" width="80" height="80">
          <circle
            className="progress-ring__circle"
            stroke="#51438b" 
            strokeWidth="4"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
            style={{
              strokeDasharray: 226,
              strokeDashoffset: 226 - (226 * progress) / 100,
              transition: "stroke-dashoffset 0.5s ease",
            }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#555',
          }}
        >
          {`${Math.round(progress)}%`}
        </div>
      </div>
    </div>
  );
};

export default Loader;
