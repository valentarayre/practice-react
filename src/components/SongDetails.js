import Message from "./Message";
import SongArtist from "./SongArtist";
import SongLyric from "./SongLyric";

const SongDetails = ({ search, lyric, bio }) => {
  if (!lyric || !bio) return null;

  return (
    <>
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: no existe la cancion "${search.song}"`}
          bgColor={"#dc3545"}
        />
      ) : (
        <SongLyric title={search.song} lyric={lyric.lyrics} />
      )}
      
      {bio.artists ? (
        <SongArtist artists={bio.artists[0]} />
      ) : (
        <Message
          msg={`Error: no existe el interprete "${search.artists}"`}
          bgColor={"#dc3545"}
        />
      )}
    </>
  );
};

export default SongDetails;
