import React, { useEffect, useState } from 'react';
import pb from '../../pocketbase';
import './profileAdmin.scss';

function ProfileAdmin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await pb.collection('users').getFullList();
                setUsers(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="admin">
            <h2>Admin - Liste des utilisateurs</h2>
            <div className="admin__user-list">
                {users.map((user) => (
                    <div key={user.id} className="admin__user-card">
                        <img 
                            src={`http://127.0.0.1:8090/api/files/${user.collectionId}/${user.id}/${user.avatar}`} 
                            alt={`${user.username} Avatar`} 
                            className="admin__user-avatar"
                        />
                        <div className="admin__user-info">
                            <h3>{user.username}</h3>
                            <p>Email: {user.email}</p>
                            <p>Nom: {user.name}</p>
                            <p>Membre depuis: {new Date(user.created).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileAdmin;
