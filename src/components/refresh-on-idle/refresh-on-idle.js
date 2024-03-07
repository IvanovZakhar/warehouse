import React, { useEffect, useState } from 'react';

function RefreshOnIdle() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIdle(true), 5 * 60 * 1000); // 5 минут в миллисекундах
    };

    const handleMouseMove = () => {
      setIdle(false);
      resetTimeout();
    };

    resetTimeout();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (idle) {
      window.location.reload();
    }
  }, [idle]);

   
}

export default RefreshOnIdle;
