import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = () => {};

  useEffect(() => {
    document.title = 'Login - Instagram Clone';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpeg" alt="Iphone with Instagram Clone" />
      </div>
      <div className="flex flex-col w-2/5">
        <h1 className="flex justify-center w-full">
          <img className="mt-2 w-6/12 mb-4" src="/images/logo.png" alt="Instagram Clone" />
        </h1>
      </div>
    </div>
  );
}
