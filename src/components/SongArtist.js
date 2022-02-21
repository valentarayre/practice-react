const SongArtist = ({ artists }) => {
  return (
    <section>
      <h3>{artists.strArtist}</h3>
      <img src={artists.strArtistThumb} alt={artists.strArtist} />
      <p>
        {artists.intBornYear} - {artists.intDiedYear || "Presente"}
      </p>
      <p>{artists.strCountry}</p>
      <p>
        {artists.strGenre} - {artists.strStyle}
      </p>
      <a href={`http://${artists.strWebsite}`} target="_blank" rel="noreferrer">
        Sitio Web Oficial
      </a>
      <p>{artists.strBiographyEN}</p>
    </section>
  );
};

export default SongArtist;
