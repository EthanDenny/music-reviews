import { MouseEventHandler } from 'react';
import './AlbumGrid.css';

function Album({ artist, title, coverPath, showReview, transformOrigin }: {
  artist: string,
  title: string,
  coverPath: string,
  showReview: MouseEventHandler,
  transformOrigin: string
}) {
  return (
    <>
      <div className='album'>
        <img
          src={ coverPath }
          alt={ '"' + title + '" by ' + artist }
          style={ {transformOrigin: transformOrigin} }
          onClick={ showReview }
        />
      </div>
    </>
  )
}
  
export default Album
