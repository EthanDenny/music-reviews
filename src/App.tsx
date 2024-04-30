import { useState } from 'react';
import { AlbumData, getAlbumCover } from './helpers.ts';
import AlbumGrid from './AlbumGrid.tsx';
import albums from './albums.json';

const App = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  let [selectedAlbum, setSelectedAlbum]: [AlbumData, Function] = useState(albums[0]);

  const showReview = (mbid: string) => {
    setShowOverlay(true);
    const albumData = albums.find(album => album.mbid === mbid);
    if (albumData) {
      setSelectedAlbum(albumData);
    } else {
      console.error('Could not find album with mbid ' + mbid)
    }
  };

  const hideReview = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <h1>My Thoughts On Albums</h1>
      <AlbumGrid albums={albums} showReview={showReview} />
      {showOverlay && (
        <div id='lightbox' onClick={hideReview}>
          <h2>{selectedAlbum.title}</h2>
          <h2>{selectedAlbum.artist}</h2>
          <img
            src={ getAlbumCover(selectedAlbum) }
            alt={ '"' + selectedAlbum.title + '" by ' + selectedAlbum.artist }
            width='25%'
          />
          <h2>{selectedAlbum.score} / 10</h2>
          <p>{selectedAlbum.review}</p>
        </div>
      )}
    </>
  );
}

export default App
