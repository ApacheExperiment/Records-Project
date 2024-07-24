import React, { useState } from 'react';
import '../AddBand/addBand.scss';
import arrow from '../../assets/img/Icon/icon-arrow-left.webp';
import { Link } from 'react-router-dom';
import pb from '../../pocketbase';

const AddLabel = () => {
  const [labelData, setLabelData] = useState({
    NameLabel: '',
    LogoLabel: null,
    StatusLabel: '',
    Creation: '',
    YearOfActivity: '',
    LocationLabel: '',
    Genre: '',
    Links: '',
    Biography: '',
  });

  const [message, setMessage] = useState('');

  const handleBandInputChange = (e) => {
    const { name, value } = e.target;
    setLabelData({ ...labelData, [name]: value });
  };

  const handleBandFileChange = (e) => {
    setLabelData({ ...labelData, LogoLabel: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!labelData.LogoLabel) {
      setMessage('Veuillez télécharger le logo requis.');
      return;
    }

    try {
      const labelFormData = new FormData();
      labelFormData.append('NameLabel', labelData.NameLabel);
      labelFormData.append('LogoLabel', labelData.LogoLabel);
      labelFormData.append('StatusLabel', labelData.StatusLabel);
      labelFormData.append('Creation', labelData.Creation);
      labelFormData.append('YearOfActivity', labelData.YearOfActivity);
      labelFormData.append('LocationLabel', labelData.LocationLabel);
      labelFormData.append('Genre', labelData.Genre);
      labelFormData.append('Links', labelData.Links);
      labelFormData.append('Biography', labelData.Biography);

      await pb.collection('Label').create(labelFormData);

      setMessage('Label téléchargé avec succès!');
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

        <h3 className="add-titles">Label</h3>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="LogoLabel" className="addLabel">Logo</label>
            {renderFileInputButton('LogoLabel', handleBandFileChange, labelData.LogoLabel)}
          </div>
          <div className="form-group">
            <label htmlFor="NameLabel" className="addLabel">Nom</label>
            <input type="text" id="NameLabel" name="NameLabel" className="smallInput" value={labelData.NameBand} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="StatusLabel" className="addLabel">Status</label>
            <input type="text" id="StatusLabel" name="StatusLabel" className="smallInput" value={labelData.StatusBand} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="Creation" className="addLabel">Création</label>
            <input type="text" id="Creation" name="Creation" className="smallInput" value={labelData.Creation} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="YearOfActivity" className="addLabel">Années d'activité</label>
            <input type="text" id="YearOfActivity" name="YearOfActivity" className="smallInput" value={labelData.YearOfActivity} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="LocationBand" className="addLabel">Localisation</label>
            <input type="text" id="LocationLabel" name="LocationLabel" className="smallInput" value={labelData.LocationBand} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="labelGenre" className="addLabel">Genre</label>
            <input type="text" id="Genre" name="Genre" className="smallInput" value={labelData.Genre} onChange={handleBandInputChange} required />
          </div>
          <div className="form-group">
          <label htmlFor="Links" className="addLabel">Liens</label>
          <input type="text" id="Links" name="Links" className="smallInput" value={labelData.Links} onChange={handleBandInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="Biography" className="addLabel">Biographie</label>
            <textarea id="Biography" name="Biography" className="addTextarea" value={labelData.Biography} onChange={handleBandInputChange} required></textarea>
          </div>
        </div>

        <button type="submit" className="button">Envoyer</button>
        {message && <p className="messageSubmit">{message}</p>}
      </form>
    </div>
  );
};

export default AddLabel;