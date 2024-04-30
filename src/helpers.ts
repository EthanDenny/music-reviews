export type AlbumData = {
  mbid: string
  artist: string
  title: string
  score: number
  review: string
}

export const getAlbumCover = (album: AlbumData) =>
  'https://coverartarchive.org/release/' + album.mbid + '/front/'

export const getFullAlbumName = (album: AlbumData) =>
  '"' + album.title + '" by ' + album.artist
