import React, { useContext } from 'react';
import DisplayStatus from './DisplayStatus';
import { AuthContext } from './LoginForm';

const AuthMessage = () => {
  const { authStatus } = useContext(AuthContext);
  if (!authStatus) return null;
  
  return <DisplayStatus type={authStatus.type} message={authStatus.message} />;
};

export default AuthMessage;
