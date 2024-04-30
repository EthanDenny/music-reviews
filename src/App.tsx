import { useEffect, useState } from 'react';
import AlbumGrid from './AlbumGrid.tsx';

const App = () => {
  const [albums, setAlbums]: [AlbumData[], Function] = useState([
    {
      mbid: '66e95974-2592-4ea3-b1f7-27e283f10877',
      artist: 'Alice in Chains',
      title: 'Dirt',
      score: 10,
      review: 'Very good',
      cover: ''
    },
    {
      mbid: 'c771f7fc-9e62-4349-a2e3-ceaf7122bf5b',
      artist: 'Nirvana',
      title: 'Nevermind',
      score: 9,
      review: 'Classic',
      cover: ''
    },
    {
      mbid: 'eb4f6474-f247-3556-8e6c-6c0b407f656f',
      artist: 'Soundgarden',
      title: 'Badmotorfinger',
      score: 9,
      review: 'Goes hard',
      cover: ''
    }
  ]);

  useEffect(() => {
    const fetchAlbumCover = async (album: AlbumData) => {
      fetch('https://coverartarchive.org/release/' + album.mbid + '/front/')
        .then(res => {
          setAlbums(albums.map(prevAlbum => {
            if (prevAlbum.mbid === album.mbid) {
              prevAlbum.cover = res.url;
            }
            return prevAlbum;
          }));
        })
        .catch(error => {
          console.error('Error fetching cover:', error);
        });
    };
  
    albums.forEach(album => fetchAlbumCover(album));
  }, []);

  const [showOverlay, setShowOverlay] = useState(false);
  let [reviewData, setReviewData]: [AlbumData, Function] = useState(albums[0]);

  const showReview = (mbid: string) => {
    setShowOverlay(true);
    const albumData = albums.find(album => album.mbid === mbid);
    if (albumData) {
      setReviewData(albumData);
    }
  };

  const hideReview = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <AlbumGrid albums={albums} showReview={showReview} />
      {showOverlay && (
        <div id='lightbox' onClick={hideReview}>
          <h2>{reviewData.title}</h2>
          <h2>{reviewData.artist}</h2>
          <img
            src={ reviewData.cover }
            alt={ '"' + reviewData.title + '" by ' + reviewData.artist }
            width='25%'
          />
          <h2>{reviewData.score} / 10</h2>
          <p>{reviewData.review}</p>
        </div>
      )}
    </>
  );
}

export default App
