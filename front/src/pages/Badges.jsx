import React, { useEffect, useState } from 'react';
import { useSessionStore } from "../store/session.store";

function Badges() {
  const session = useSessionStore((state) => state.session);
  const [badges, setBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    const token = session.token;
    fetch('http://localhost:3002/api/badges/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBadges(data);
        return fetch('http://localhost:3002/api/badges', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      })
      .then(response => response.json())
      .then(data => setUserBadges(data))
      .catch(error => console.error('Error fetching badges:', error));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Mes badges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className={`border rounded-lg p-4 ${userBadges.some(userBadge => userBadge.id === badge.id) ? '' : 'opacity-50 blur-sm'}`}>
            <img src={`${badge.urlImage}`} alt={badge.name} className="w-full h-32 object-cover rounded-md mb-2" />
            <h2 className="text-xl font-semibold">{badge.name}</h2>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Badges;