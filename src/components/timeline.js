import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

export default function Timeline() {
  const { photos } = usePhotos();
  console.log('photos', photos);

  if (!photos) {
    return (
      <>
        {[...new Array(4)].map((_, index) => (
          <Skeleton key={index} count={1} width={320} height={400} />
        ))}
      </>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return photos.map((content) => <p key={content.docId}>{content.imageSrc}</p>);
}
