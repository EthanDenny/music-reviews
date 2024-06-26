import { useState, useEffect } from 'react';
import { AlbumData } from './helpers.ts';
import Album from './Album.tsx';
import './AlbumGrid.css';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const AlbumGrid = ({ albums, showReview }: {
  albums: AlbumData[],
  showReview: Function
}) => {
  const dimensions = useWindowDimensions();
  const columnCount = Math.max(Math.floor(dimensions.width / 240), 2);

  return (
    <>
      <div className='album-grid' style={{gridTemplateColumns: 'repeat(' + columnCount + ', 1fr)'}}>
        {albums.map((album, index) => {
          let transformOrigin = '';

          if (index < columnCount) {
            transformOrigin += 'top';
          } else if (index >= albums.length - columnCount) {
            transformOrigin += 'bottom';
          } else {
            transformOrigin += ' center';
          }
      
          if (index % columnCount == 0) {
            transformOrigin += ' left';
          } else if (index % columnCount == columnCount - 1) {
            transformOrigin += ' right';
          } else {
            transformOrigin += ' center';
          }

          return <Album
            key={album.mbid}
            data={album}
            showReview={() => showReview(album.mbid)}
            transformOrigin={transformOrigin}
          />;
        })}
      </div>
    </>
  );
}

export default AlbumGrid
