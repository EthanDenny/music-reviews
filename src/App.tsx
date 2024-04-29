import { useEffect, useState } from 'react';
import AlbumGrid from './AlbumGrid.tsx';

function App() {
  const albums: [string, string, string, number][] = [
    ['66e95974-2592-4ea3-b1f7-27e283f10877', 'Alice in Chains', 'Dirt', 10],
    ['c771f7fc-9e62-4349-a2e3-ceaf7122bf5b', 'Nirvana', 'Nevermind', 9],
    ['eb4f6474-f247-3556-8e6c-6c0b407f656f', 'Soundgarden', 'Badmotorfinger', 9],
  ]

  let [coverPaths, setCoverPaths]: [{ [mbid: string]: string }, Function] = useState({});

  useEffect(() => {
    let coverPaths: { [mbid: string]: string } = {};
    
    albums.map((album) => {
      let mbid = album[0];
      fetch('https://coverartarchive.org/release/' + mbid + '/front/')
        .then((res) => { coverPaths[mbid] = res.url })
        .catch((err) => {
          console.log(err.message);
        });
    });

    setCoverPaths(coverPaths);
  }, []);

  const [showOverlay, setShowOverlay] = useState(false);
  let [reviewData, setReviewData] = useState(['', 'No Artist Found', 'No Title Found', '', 0])

  const showReview = (mbid: string) => {
    setShowOverlay(true);
    const albumData = albums.find(e => e[0] === mbid);
    if (albumData) {
      albumData.push(coverPaths[mbid] || '');
      setReviewData(albumData);
    }
  };

  const hideReview = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <AlbumGrid albums={albums} covers={coverPaths} showReview={showReview} />
      {showOverlay && (
        <div id='lightbox' onClick={hideReview}>
          <h2>{reviewData[2]}</h2>
          <h2>{reviewData[1]}</h2>
          <img
            src={ reviewData[4].toString() }
            alt={ '"' + reviewData[2] + '" by ' + reviewData[1] }
            width='25%'
          />
          <h2>{reviewData[3]} / 10</h2>
        </div>
      )}
    </>
  )
}

export default App
