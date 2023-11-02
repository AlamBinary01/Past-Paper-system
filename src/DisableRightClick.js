import { useEffect } from 'react';

const DisableRightClick = () => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null;
};

export default DisableRightClick;
