import React, { useEffect, useState } from 'react';
import './profile.scss';
import pb from '../../pocketbase';
import { useAuth } from '../../Services/AuthContext';

function Profile() {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                try {
                    const userData = await pb.collection('users').authRefresh();
                    setUser(userData.record);
                } catch (error) {
                    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
                }
            }
        };

        fetchUser();
    }, [isAuthenticated]);

    if (!user) {
        return <div>Chargement...</div>;
    }

    const { avatar, username, created, email } = user;

    return (
        <div className="user">
            <div className="user__container">
                <img src={`http://127.0.0.1:8090/api/files/${user.collectionId}/${user.id}/${avatar}`} alt="User Avatar" className="user__avatar"/>
                <div className="user__info">
                    <h2 className="user__name">{username}</h2>
                    <div className="user__about">
                        <h3>A propos</h3>
                        <p>Membre depuis le {new Date(created).toLocaleDateString()}</p>
                        <p>Email: {email}</p>
                    </div>
                </div>
                
            </div>
            <div className="collection">
                <h3>Collection</h3>
                    <h4>Total en collection: 4</h4>
                    <div className="thumbnails">
                        <div className="thumbnail"></div>
                        <div className="thumbnail"></div>
                        <div className="thumbnail"></div>
                        <div className="thumbnail"></div>
                    </div>
            </div>
        </div>
    );
}

export default Profile;

