import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExists } from '../services/firebase';

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = fullName === '' || username === '' || password === '' || emailAddress === '';

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExists(username);
    if (usernameExists) {
      setError(`Username "${username}" already exists`);
      setUsername('');
      return;
    }

    try {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);
      // authentication
      // email && password && username (displayName)
      await createdUserResult.user.updateProfile({
        displayName: username
      });
      // firebase users collection (create a document)
      await firebase.firestore().collection('users').add({
        userId: createdUserResult.user.uid,
        username: username.toLowerCase(),
        fullName,
        emailAddress,
        followers: [],
        following: []
      });
      setError('');
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setUsername('');
      setFullName('');
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Signup - Instagram Clone';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpeg" alt="Iphone with Instagram Clone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img className="mt-2 w-6/12 mb-4" src="/images/logo.png" alt="Instagram Clone" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 mb-2 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 mb-2 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 mb-2 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 mb-2 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
