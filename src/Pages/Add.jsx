import React, { useState } from 'react';
//import './add.scss';
//import sendLetter from "../assets/img/icon/icon-letter-white.webp";
//import arrow from '../assets/img/icon/icon-arrow-left.webp';
import { Link } from 'react-router-dom';
import pb from '../pocketbase';

const Add = () => {   // Composant Add pour ajouter un projet et une vignette

  // États pour stocker les données du projet et de la vignette
  const [projectData, setProjectData] = useState({
    title: '',
    date: '',
    project_home: null,
    linkGitHub: '',
    descriptif: '',
  });

  const [thumbnailData, setThumbnailData] = useState({
    title: '',
    subtitle: '',
    description: '',
    logo1: null,
    logo2: null,
    image: null,
    linkGitHub: '',
    iconGitHub: null,
    iconDetails: null,
  });
  // État pour les messages d'information ou d'erreur
  const [message, setMessage] = useState('');

  // Gestionnaire de changement pour les champs de saisie du projet
  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  // Gestionnaire de changement pour les champs de saisie de la vignette
  const handleThumbnailInputChange = (e) => {
    const { name, value } = e.target;
    setThumbnailData({ ...thumbnailData, [name]: value });
  };

  // Gestionnaire de changement pour les fichiers du projet
  const handleProjectFileChange = (e) => {
    setProjectData({ ...projectData, project_home: e.target.files[0] });
  };

  // Gestionnaire de changement pour les fichiers de la vignette
  const handleThumbnailFileChange = (e) => {
    const { name } = e.target;
    setThumbnailData({ ...thumbnailData, [name]: e.target.files[0] });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectData.project_home || !thumbnailData.logo1 || !thumbnailData.logo2 || !thumbnailData.image) {
      setMessage('Veuillez télécharger toutes les images requises.');
      return;
    }

    try {
      // Créer FormData pour project
      const projectFormData = new FormData();
      projectFormData.append('title', projectData.title);
      projectFormData.append('date', projectData.date);
      projectFormData.append('linkGitHub', projectData.linkGitHub);
      projectFormData.append('descriptif', projectData.descriptif);
      projectFormData.append('project_home', projectData.project_home);

      // Upload project dans PocketBase
      const projectRecord = await pb.collection('Projects').create(projectFormData);

      // Créer FormData pour thumbnail
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('Projects', projectRecord.id); //Permet de lier Projects à Thumbnails dans la BDD
      thumbnailFormData.append('title', thumbnailData.title);
      thumbnailFormData.append('subtitle', thumbnailData.subtitle);
      thumbnailFormData.append('description', thumbnailData.description);
      thumbnailFormData.append('linkGitHub', thumbnailData.linkGitHub);
      thumbnailFormData.append('logo1', thumbnailData.logo1);
      thumbnailFormData.append('logo2', thumbnailData.logo2);
      thumbnailFormData.append('image', thumbnailData.image);

      // Upload thumbnail dans PocketBase
      await pb.collection('Thumbnails').create(thumbnailFormData);

      setMessage('Projet et vignette téléchargés avec succès!');
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Erreur lors du téléchargement des fichiers. Veuillez réessayer.');
    }
  };

  // Fonction pour restituer un bouton de saisie de fichier avec aperçu de l'image
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
          {/*<img src={arrow} alt="return home" width={20} height={20} className="arrow" />*/}
        </Link>
        
        <h3 className="add-titles">Projet</h3>
        <div className="form-group">
          <div className="input-row">
            <div className="form-group">
              <label htmlFor="projectTitle" className="addLabel">Titre</label>
              <input type="text" id="projectTitle" name="title" className="smallInput" value={projectData.title} onChange={handleProjectInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="projectDate" className="addLabel">Date</label>
              <input type="date" id="projectDate" name="date" className="addInputDate" value={projectData.date} onChange={handleProjectInputChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="form-group">
              <label htmlFor="projectHome" className="addLabel">Aperçu projet</label>
              {renderFileInputButton('projectHome', handleProjectFileChange, projectData.project_home)}
            </div>
            <div className="form-group">
              <label htmlFor="projectLinkGitHub" className="addLabel">Lien</label>
              <input type="text" id="projectLinkGitHub" name="linkGitHub" className="linkInput" value={projectData.linkGitHub} onChange={handleProjectInputChange} required />
            </div>
          </div>
          <label htmlFor="projectDescriptif" className="addLabel">Descriptif</label>
          <textarea id="projectDescriptif" name="descriptif" className="addTextarea" value={projectData.descriptif} onChange={handleProjectInputChange} required></textarea>
        </div>

        <h3 className="add-titles">Vignette</h3>
        <div className="form-group">
          <div className="input-row">
              <div className="form-group">
                <label htmlFor="thumbnailTitle" className="addLabel">Titre</label>
                <input type="text" id="thumbnailTitle" name="title" className="smallInput" value={thumbnailData.title} onChange={handleThumbnailInputChange} required />
              </div>
          
            <div className="form-group">
              <label htmlFor="thumbnailSubtitle" className="addLabel">Sous-titre</label>
              <input type="text" id="thumbnailSubtitle" name="subtitle" className="smallInput" value={thumbnailData.subtitle} onChange={handleThumbnailInputChange} required />
            </div>
          </div>
        
        
          <label htmlFor="thumbnailDescription" className="addLabel">Description</label>
          <textarea id="thumbnailDescription" name="description" className="addTextarea" value={thumbnailData.description} onChange={handleThumbnailInputChange} required></textarea>
        
          <div className="input-row">
            <div className="form-group">
              <label htmlFor="thumbnailLogo1" className="addLabel">Logo #1</label>
              {renderFileInputButton('logo1', handleThumbnailFileChange, thumbnailData.logo1)}
            </div>
            <div className="form-group">
              <label htmlFor="thumbnailLogo2" className="addLabel">Logo #2</label>
              {renderFileInputButton('logo2', handleThumbnailFileChange, thumbnailData.logo2)}
            </div>
          
            <div className="form-group">
              <label htmlFor="thumbnailImage" className="addLabel">Aperçu</label>
              {renderFileInputButton('image', handleThumbnailFileChange, thumbnailData.image)}
            </div>
          </div>
          <label htmlFor="thumbnailLinkGitHub" className="addLabel">Lien</label>
          <input type="text" id="thumbnailLinkGitHub" name="linkGitHub" className="linkInput" value={thumbnailData.linkGitHub} onChange={handleThumbnailInputChange} required />
        </div>

        <button type="submit" className="button">
          Envoyer
          {/*<img src={sendLetter} alt="send icon" width={20} height={20} className="iconSend" />*/}
        </button>
        {message && <p className="messageSubmit">{message}</p>}
      </form>
    </div>
  );
};

export default Add;