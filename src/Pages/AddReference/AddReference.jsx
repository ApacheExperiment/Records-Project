import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './addReference.scss';
import arrow from '../../assets/img/Icon/icon-arrow-left.webp';
import pb from '../../pocketbase';

const AddReference = () => {
  const [groups, setGroups] = useState([]);
  const [referenceData, setReferenceData] = useState({
    cover: null,
    name: '',
    year: '',
    genre: '',
    label: '',
    versions: '',
    bandId: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Récupérer la liste des groupes/artistes depuis PocketBase
    const fetchGroups = async () => {
      try {
        const groupsList = await pb.collection('Band').getFullList();
        setGroups(groupsList);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReferenceData({ ...referenceData, [name]: value });
  };

  const handleFileChange = (e) => {
    setReferenceData({ ...referenceData, cover: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!referenceData.cover) {
      setMessage('Veuillez télécharger toutes les images requises.');
      return;
    }

    try {
      const referenceFormData = new FormData();
      referenceFormData.append('Cover', referenceData.cover);
      referenceFormData.append('NameAlbum', referenceData.name);
      referenceFormData.append('bandId', referenceData.bandId); // Utilise l'ID du groupe
      referenceFormData.append('Year', referenceData.year);
      referenceFormData.append('Genre', referenceData.genre);
      referenceFormData.append('Label', referenceData.label);
      referenceFormData.append('Versions', referenceData.versions);

      await pb.collection('Albums').create(referenceFormData);

      setMessage('Référence téléchargée avec succès!');
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

        <h3 className="add-titles">Référence</h3>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="bandId" className="addLabel">Groupe/Artiste</label>
            <select id="bandId" name="bandId" className="smallInput" value={referenceData.bandId} onChange={handleInputChange} required>
              <option value="">Sélectionner un groupe/artiste</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.NameBand}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cover" className="addLabel">Pochette</label>
            {renderFileInputButton('cover', handleFileChange, referenceData.cover)}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="addLabel">Nom</label>
            <input type="text" id="name" name="name" className="smallInput" value={referenceData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="year" className="addLabel">Année</label>
            <input type="text" id="year" name="year" className="smallInput" value={referenceData.year} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="genre" className="addLabel">Genre</label>
            <input type="text" id="genre" name="genre" className="smallInput" value={referenceData.genre} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="label" className="addLabel">Label</label>
            <input type="text" id="label" name="label" className="smallInput" value={referenceData.label} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="versions" className="addLabel">Versions</label>
            <input type="text" id="versions" name="versions" className="smallInput" value={referenceData.versions} onChange={handleInputChange} required />
          </div>
        </div>

        <button type="submit" className="button">Envoyer</button>
        {message && <p className="messageSubmit">{message}</p>}
      </form>
    </div>
  );
};

export default AddReference;
