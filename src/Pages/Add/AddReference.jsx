import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './add.scss';
import arrow from '../../assets/img/Icon/icon-arrow-left.webp';
import pb from '../../pocketbase';

const AddReference = () => {
  const [groups, setGroups] = useState([]);
  const [labels, setLabels] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [referenceData, setReferenceData] = useState({
    Cover: null,
    NameAlbum: '',
    Year: '',
    genreId: [],
    labelId: '',
    Versions: '',
    bandId: '',
    Tracklist: [],
  });
  const [track, setTrack] = useState({
    trackNumber: '',
    trackName: '',
    trackDuration: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bands = await pb.collection('Band').getFullList();
        const labels = await pb.collection('Label').getFullList();
        const genres = await pb.collection('Genre').getFullList();
        setGroups(bands);
        setLabels(labels);
        setGenres(genres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReferenceData({ ...referenceData, [name]: value });
  };

  const handleFileChange = (e) => {
    setReferenceData({ ...referenceData, Cover: e.target.files[0] });
  };

  const handleTrackChange = (e) => {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  };

  const addTrack = () => {
    setReferenceData({
      ...referenceData,
      Tracklist: [...referenceData.Tracklist, track]
    });
    setTrack({
      trackNumber: '',
      trackName: '',
      trackDuration: ''
    });
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

    if (!referenceData.Cover) {
      setMessage('Veuillez télécharger la pochette.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('Cover', referenceData.Cover);
      formData.append('NameAlbum', referenceData.NameAlbum);
      formData.append('Year', referenceData.Year);
      formData.append('genreId', JSON.stringify(selectedGenres));
      formData.append('labelId', referenceData.labelId);
      formData.append('Versions', referenceData.Versions);
      formData.append('bandId', referenceData.bandId);
      formData.append('Tracklist', JSON.stringify(referenceData.Tracklist));

      await pb.collection('Albums').create(formData);

      setMessage('Référence téléchargée avec succès!');
    } catch (error) {
      console.error('Error uploading reference:', error);
      setMessage('Erreur lors du téléchargement de la référence. Veuillez réessayer.');
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

        <h3 className="add-title">Référence</h3>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="Cover" className="addLabel">Pochette</label>
            {renderFileInputButton('Cover', handleFileChange, referenceData.Cover)}
          </div>
          <div className="form-group">
            <label htmlFor="NameAlbum" className="addLabel">Nom</label>
            <input type="text" id="NameAlbum" name="NameAlbum" className="smallInput" placeholder="Album Name" value={referenceData.NameAlbum} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="Year" className="addLabel">Année</label>
            <input type="text" id="Year" name="Year" className="smallInput" placeholder="1999" value={referenceData.Year} onChange={handleInputChange} required />
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
            <label htmlFor="labelId" className="addLabel">Label</label>
            <select id="labelId" name="labelId" className="smallInput" value={referenceData.labelId} onChange={handleInputChange} required>
              <option value="">Sélectionner un label</option>
              {labels.map((label) => (
                <option key={label.id} value={label.id}>
                  {label.NameLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="bandId" className="addLabel">Groupe</label>
            <select id="bandId" name="bandId" className="smallInput" value={referenceData.bandId} onChange={handleInputChange} required>
              <option value="">Sélectionner un groupe</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.NameBand}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Versions" className="addLabel">Versions</label>
            <input type="text" id="Versions" name="Versions" className="smallInput" value={referenceData.Versions} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label className="addLabel">Tracklist</label>
            {referenceData.Tracklist.map((track, index) => (
              <div key={index} className="track">
                {track.trackNumber}. {track.trackName} - {track.trackDuration}
              </div>
            ))}
            <input type="text" name="trackNumber" className="smallInput" placeholder="N°" value={track.trackNumber} onChange={handleTrackChange} />
            <input type="text" name="trackName" className="smallInput" placeholder="Nom" value={track.trackName} onChange={handleTrackChange} />
            <input type="text" name="trackDuration" className="smallInput" placeholder="Durée" value={track.trackDuration} onChange={handleTrackChange} />
            <button type="button" className="download-button" onClick={addTrack}>Ajouter une piste</button>
          </div>
        </div>

        <div className="form-section">
          <button type="submit" className="download-button">Télécharger</button>
          {message && <div className="message">{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default AddReference;