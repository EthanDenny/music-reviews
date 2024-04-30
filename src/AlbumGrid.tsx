import Album from './Album.tsx';
import './AlbumGrid.css';

const COLUMN_COUNT: number = 8;

function AlbumGrid({ albums, showReview }: {
  albums: AlbumData[],
  showReview: Function
}) {
  return (
    <>
      <div className='album-grid' style={{gridTemplateColumns: 'repeat(' + COLUMN_COUNT + ', 1fr)'}}>
        {albums.map((albumData, index) => {
          let transformOrigin = '';

          if (index < COLUMN_COUNT) {
            transformOrigin += 'top';
          } else if (index >= albums.length - COLUMN_COUNT) {
            transformOrigin += 'bottom';
          } else {
            transformOrigin += ' center';
          }
      
          if (index % COLUMN_COUNT == 0) {
            transformOrigin += ' left';
          } else if (index % COLUMN_COUNT == 7) {
            transformOrigin += ' right';
          } else {
            transformOrigin += ' center';
          }

          return <Album
            key={albumData.mbid}
            data={albumData}
            showReview={() => showReview(albumData.mbid)}
            transformOrigin={transformOrigin}
          />;
        })}
      </div>
    </>
  );
}

export default AlbumGrid
