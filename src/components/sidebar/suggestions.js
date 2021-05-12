import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';

export default function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  if (!profiles) {
    return <Skeleton count={5} height={50} className="mt-5" />;
  }

  if (profiles.length === 0) {
    return null;
  }

  return (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string.isRequired,
  following: PropTypes.array.isRequired
};
