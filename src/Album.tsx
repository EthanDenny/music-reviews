import { MouseEventHandler } from 'react';
import { AlbumData, getAlbumCover, getFullAlbumName } from './helpers.ts';
import './AlbumGrid.css';

const Album = ({ data, showReview, transformOrigin }: {
  data: AlbumData,
  showReview: MouseEventHandler,
  transformOrigin: string
}) => {
  return (
    <>
      <div className='album'>
        <img
          src={ getAlbumCover(data) }
          alt={ getFullAlbumName(data) }
          style={{ transformOrigin: transformOrigin } }
          onClick={showReview}
        />
      </div>
    </>
  );
}
  
export default Album
