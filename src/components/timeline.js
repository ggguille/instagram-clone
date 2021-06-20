import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  if (!photos) {
    return (
      <>
        {[...new Array(4)].map((_, index) => (
          <Skeleton key={index} count={1} width={640} height={500} />
        ))}
      </>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return photos.map((content) => <Post key={content.docId} content={content} />);
}
