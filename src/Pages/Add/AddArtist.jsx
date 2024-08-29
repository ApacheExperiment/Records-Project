import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './add.scss';
import arrow from '../../assets/img/Icon/icon-arrow-left.webp';
import pb from '../../pocketbase';

const AddArtist = () => {
  const [artistData, setArtistData] = useState({
    NameArtist: '',
    LogoArtist: null,
    StatusArtist: '',
    YearOfCareer: '',
    LocationArtist: '',
    CurrentLabel: '',
    genreId: [],
    Links: '',
    Biography: '',
  });

  const [genres, setGenres] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGenresAndLabels = async () => {
      try {
        const genresList = await pb.collection('Genre').getFullList();
        const labelsList = await pb.collection('Label').getFullList();

        setGenres(genresList);
        setLabels(labelsList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenresAndLabels();
  }, []);

  const handleBandInputChange = (e) => {
    const { name, value } = e.target;
    setArtistData({ ...artistData, [name]: value });
  };

  const handleBandFileChange = (e) => {
    setArtistData({ ...artistData, LogoArtist: e.target.files[0] });
  };

  const handleGenreSelectChange = (e) => {
    const selectedGenreId = e.target.value;
    if (selectedGenreId && !selectedGenres.includes(selectedGenreId)) {
      setSelectedGenres([...selectedGenres, selectedGenreId]);
    }
  };

  const handleGenreRemove = (genreId) => {
    setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artistData.LogoArtist) {
      setMessage('Veuillez télécharger le logo requis.');
      return;
    }

    try {
      const artistFormData = new FormData();
      artistFormData.append('NameArtist', artistData.NameArtist);
      artistFormData.append('LogoArtist', artistData.LogoArtist);
      artistFormData.append('StatusArtist', artistData.StatusArtist);
      artistFormData.append('YearOfCareer', artistData.YearOfCareer);
      artistFormData.append('LocationArtist', artistData.LocationArtist);
      //artistFormData.append('CurrentLabel', artistData.CurrentLabel);
      artistFormData.append('genreId', JSON.stringify(selectedGenres));
      artistFormData.append('Links', artistData.Links);
      artistFormData.append('Biography', artistData.Biography);

      await pb.collection('Artist').create(artistFormData);

      setMessage('Groupe téléchargé avec succès!');
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Erreur lors du téléchargement des fichiers. Veuillez réessayer.');
    }
  };

  const renderFileInputButton = (name, handleChange, file) => {
    const handleButtonClick = () => {
      document.getElementById(name).click();
    };

    return (
      <div className="file-input-container">
        <input
          type="file"
          id={name}
          name={name}
          className="file-input"
          onChange={handleChange}
          required
        />
        <button type="button" className="download-button" onClick={handleButtonClick}>
          {file ? 'Changer' : 'Télécharger'}
        </button>
        {file && (
          <div className="thumbnail-preview">
            <img src={URL.createObjectURL(file)} alt={`${name} preview`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="addBorder">
      <form onSubmit={handleSubmit} className="addForm">
        <Link to="/">
          <img src={arrow} alt="return home" className="arrow" />
        </Link>

        <h3 className="add-title">Artiste</h3>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="LogoArtist" className="addLabel">Logo</label>
            {renderFileInputButton('LogoArtist', handleBandFileChange, artistData.LogoArtist)}
          </div>
          <div className="form-group">
            <label htmlFor="NameArtist" className="addLabel">Nom</label>
            <input type="text" id="NameArtist" name="NameArtist" className="smallInput" placeholder="Fenriz" value={artistData.NameBand} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="StatusArtist" className="addLabel">Status</label>
            <input type="text" id="StatusArtist" name="StatusArtist" className="smallInput" placeholder="Actif" value={artistData.StatusBand} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="YearOfCareer" className="addLabel">Années d'activité</label>
            <input type="text" id="YearOfCareer" name="YearOfActivity" className="smallInput" placeholder="1987 à maintenant" value={artistData.YearOfActivity} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="LocationArtist" className="addLabel">Localisation</label>
            <input type="text" id="LocationArtist" name="LocationArtist" className="smallInput" placeholder="Norway, Vinterbro, Ås, Akershus / Trysil, Innlandet" value={artistData.LocationArtist} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
              <label htmlFor="CurrentLabel" className="addLabel">Label Actuel</label>
              <select
                id="CurrentLabel"
                name="CurrentLabel"
                className="smallInput"
                value={artistData.CurrentLabel}
                onChange={handleBandInputChange}
                required
              >
                <option value="">Sélectionner un label</option>
                {labels.map((label) => (
                  <option key={label.id} value={label.id}>
                    {label.NameLabel}
                  </option>
                ))}
              </select>
            </div>
          <div className="form-group">
            <label htmlFor="genreId" className="addLabel">Genre</label>
            <select id="genreId" name="genreId" className="smallInput" onChange={handleGenreSelectChange} required>
              <option value="">Sélectionner un genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.NameGenre}
                </option>
              ))}
            </select>
            <div className="selected-genres">
              {selectedGenres.map((genreId) => {
                const genre = genres.find((g) => g.id === genreId);
                return (
                  <div key={genreId} className="selected-genre">
                    {genre?.NameGenre}
                    <button type="button" onClick={() => handleGenreRemove(genreId)}>×</button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Links" className="addLabel">Liens</label>
            <input type="text" id="Links" name="Links" className="smallInput" value={artistData.Links} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="Biography" className="addLabel">Biographie</label>
            <textarea id="Biography" name="Biography" className="addTextarea" value={artistData.Biography} onChange={handleBandInputChange} required></textarea>
          </div>
        </div>

        <button type="submit" className="button">Envoyer</button>
        {message && <p className="messageSubmit">{message}</p>}
      </form>
    </div>
  );
};

export default AddArtist;
