import { useState, useEffect } from 'react';

//I am using this customhook to set the navbar in "closed state" when the window size exceed 1024px. Otherwise it will be stay there even if user exceed 1024px.

function useWindowSize(): [number, number] {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export default useWindowSize;
