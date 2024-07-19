import React, { useState } from 'react';
import './addBand.scss';
import arrow from '../../assets/img/Icon/icon-arrow-left.webp';
import { Link } from 'react-router-dom';
import pb from '../../pocketbase';

const AddBand = () => {
  const [bandData, setBandData] = useState({
    name: '',
    status: '',
    formedIn: '',
    yearOfActivity: '',
    locationBand: '',
    currentLabel: '',
    genre: '',
    biography: '',
    logoBand: null,
  });

  const [message, setMessage] = useState('');

  const handleBandInputChange = (e) => {
    const { name, value } = e.target;
    setBandData({ ...bandData, [name]: value });
  };

  const handleBandFileChange = (e) => {
    setBandData({ ...bandData, logoBand: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bandData.logoBand) {
      setMessage('Veuillez télécharger le logo requis.');
      return;
    }

    try {
      const bandFormData = new FormData();
      bandFormData.append('NameBand', bandData.name);
      bandFormData.append('LogoBand', bandData.logoBand);
      bandFormData.append('StatusBand', bandData.status);
      bandFormData.append('FormedIn', bandData.formedIn);
      bandFormData.append('YearOfActivity', bandData.yearOfActivity);
      bandFormData.append('LocationBand', bandData.locationBand);
      bandFormData.append('CurrentLabel', bandData.currentLabel);
      bandFormData.append('Genre', bandData.genre);
      bandFormData.append('Links', bandData.links);
      bandFormData.append('Biography', bandData.biography);

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

        <h3 className="add-titles">Groupe - Artiste</h3>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="bandLogo" className="addLabel">Logo</label>
            {renderFileInputButton('logoBand', handleBandFileChange, bandData.logoBand)}
          </div>
          <div className="form-group">
            <label htmlFor="bandName" className="addLabel">Nom</label>
            <input type="text" id="bandName" name="name" className="smallInput" value={bandData.name} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="bandStatus" className="addLabel">Status</label>
            <input type="text" id="bandStatus" name="status" className="smallInput" value={bandData.status} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="bandFormedIn" className="addLabel">Formé en</label>
            <input type="text" id="bandFormedIn" name="formedIn" className="smallInput" value={bandData.formedIn} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="bandYearOfActivity" className="addLabel">Années d'activité</label>
            <input type="text" id="bandYearOfActivity" name="yearOfActivity" className="smallInput" value={bandData.yearOfActivity} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="bandLocationBand" className="addLabel">Localisation</label>
            <input type="text" id="bandLocationBand" name="locationBand" className="smallInput" value={bandData.locationBand} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="bandCurrentLabel" className="addLabel">Label Actuel</label>
            <input type="text" id="bandCurrentLabel" name="currentLabel" className="smallInput" value={bandData.currentLabel} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="bandGenre" className="addLabel">Genre</label>
            <input type="text" id="bandGenre" name="genre" className="smallInput" value={bandData.genre} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
          <label htmlFor="bandLinks" className="addLabel">Liens</label>
          <input type="text" id="bandLink" name="link" className="smallInput" value={bandData.link} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="bandBiography" className="addLabel">Biographie</label>
            <textarea id="bandBiography" name="biography" className="addTextarea" value={bandData.biography} onChange={handleBandInputChange} required></textarea>
          </div>
        </div>

        <button type="submit" className="button">Envoyer</button>
        {message && <p className="messageSubmit">{message}</p>}
      </form>
    </div>
  );
};

export default AddBand;
