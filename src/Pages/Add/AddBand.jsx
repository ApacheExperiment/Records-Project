import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './add.scss';
import arrow from '../../assets/img/Icon/icon-arrow-left.webp';
import pb from '../../pocketbase';

const AddBand = () => {
  const [bandData, setBandData] = useState({
    NameBand: '',
    LogoBand: null,
    StatusBand: '',
    FormedIn: '',
    YearOfActivity: '',
    LocationBand: '',
    CurrentLabel: '',
    genreId: [],
    Links: '',
    Biography: '',
  });

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresList = await pb.collection('Genre').getFullList();
        setGenres(genresList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleBandInputChange = (e) => {
    const { name, value } = e.target;
    setBandData({ ...bandData, [name]: value });
  };

  const handleBandFileChange = (e) => {
    setBandData({ ...bandData, LogoBand: e.target.files[0] });
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

    if (!bandData.LogoBand) {
      setMessage('Veuillez télécharger le logo requis.');
      return;
    }

    try {
      const bandFormData = new FormData();
      bandFormData.append('NameBand', bandData.NameBand);
      bandFormData.append('LogoBand', bandData.LogoBand);
      bandFormData.append('StatusBand', bandData.StatusBand);
      bandFormData.append('FormedIn', bandData.FormedIn);
      bandFormData.append('YearOfActivity', bandData.YearOfActivity);
      bandFormData.append('LocationBand', bandData.LocationBand);
      bandFormData.append('CurrentLabel', bandData.CurrentLabel);
      bandFormData.append('genreId', JSON.stringify(selectedGenres));
      bandFormData.append('Links', bandData.Links);
      bandFormData.append('Biography', bandData.Biography);

      await pb.collection('Band').create(bandFormData);

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

        <h3 className="add-title">Groupe - Artiste</h3>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="LogoBand" className="addLabel">Logo</label>
            {renderFileInputButton('LogoBand', handleBandFileChange, bandData.LogoBand)}
          </div>
          <div className="form-group">
            <label htmlFor="NameBand" className="addLabel">Nom</label>
            <input type="text" id="NameBand" name="NameBand" className="smallInput" placeholder="Darkthrone" value={bandData.NameBand} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="StatusBand" className="addLabel">Status</label>
            <input type="text" id="StatusBand" name="StatusBand" className="smallInput" placeholder="Actif" value={bandData.StatusBand} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="FormedIn" className="addLabel">Formé en</label>
            <input type="text" id="FormedIn" name="FormedIn" className="smallInput" placeholder="1987" value={bandData.FormedIn} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="YearOfActivity" className="addLabel">Années d'activité</label>
            <input type="text" id="YearOfActivity" name="YearOfActivity" className="smallInput" placeholder="1987 à maintenant" value={bandData.YearOfActivity} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="LocationBand" className="addLabel">Localisation</label>
            <input type="text" id="LocationBand" name="LocationBand" className="smallInput" placeholder="Norway, Vinterbro, Ås, Akershus / Trysil, Innlandet" value={bandData.LocationBand} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="CurrentLabel" className="addLabel">Label Actuel</label>
            <input type="text" id="CurrentLabel" name="CurrentLabel" className="smallInput" placeholder="Peaceville Records" value={bandData.CurrentLabel} onChange={handleBandInputChange} required />
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
            <input type="text" id="Links" name="Links" className="smallInput" value={bandData.Links} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="Biography" className="addLabel">Biographie</label>
            <textarea id="Biography" name="Biography" className="addTextarea" value={bandData.Biography} onChange={handleBandInputChange} required></textarea>
          </div>
        </div>

        <button type="submit" className="button">Envoyer</button>
        {message && <p className="messageSubmit">{message}</p>}
      </form>
    </div>
  );
};

export default AddBand;
