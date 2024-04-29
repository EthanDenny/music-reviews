import Album from './Album.tsx';
import './AlbumGrid.css';

const COLUMN_COUNT: number = 8;

function AlbumGrid({ albums, covers, showReview }: {
  albums: [string, string, string, number][],
  covers: { [mbid: string]: string },
  showReview: Function
}) {
  return (
    <>
      <div className='album-grid' style={{gridTemplateColumns: 'repeat(' + COLUMN_COUNT + ', 1fr)'}}>
        {albums.map(([mbid, artist, title], index) => {
          let transformOrigin = '';

          if (index < COLUMN_COUNT) {
            transformOrigin += 'top'
          } else if (index >= albums.length - COLUMN_COUNT) {
            transformOrigin += 'bottom'
          } else {
            transformOrigin += ' center'
          }
      
          if (index % COLUMN_COUNT == 0) {
            transformOrigin += ' left'
          } else if (index % COLUMN_COUNT == 7) {
            transformOrigin += ' right'
          } else {
            transformOrigin += ' center'
          }

          return <Album
            key={mbid}
            artist={artist}
            title={title}
            coverPath={covers[mbid]}
            showReview={() => showReview(mbid)}
            transformOrigin={transformOrigin}
          />
        })}
      </div>
    </>
  )
}

export default AlbumGrid
