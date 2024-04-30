import { MouseEventHandler } from 'react';
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
          src={ data.cover }
          alt={ '"' + data.title + '" by ' + data.artist }
          style={ {transformOrigin: transformOrigin} }
          onClick={ showReview }
        />
      </div>
    </>
  );
}
  
export default Album
