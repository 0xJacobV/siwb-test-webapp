import React, {useContext} from 'react';
import {IAuthContext, AuthContext, AuthProvider, TAuthConfig } from "react-oauth2-code-pkce"
import logo from './logo.svg';
import './App.css';

const baseUrl = "https://identity.bitgo-test.com"

const authConfig: TAuthConfig = {
  clientId: 'com.bitgo.testwebapp',
  authorizationEndpoint: `${baseUrl}/realms/bitgo/protocol/openid-connect/auth`,
  tokenEndpoint: `${baseUrl}/realms/bitgo/protocol/openid-connect/token`,
  logoutEndpoint: `${baseUrl}/realms/bitgo/protocol/openid-connect/logout`,
  redirectUri: 'http://localhost:3000/',
  scope: 'openid',
  decodeToken: true,
  autoLogin: false,
}

function LoginInfo(): JSX.Element {
  const { tokenData, token, logOut, error }: IAuthContext = useContext(AuthContext)

  if (error) {
    return (
      <>
        <div style={{ color: 'red' }}>An error occurred during authentication: {error}</div>
      </>
    )
  }

  if(token){
    return (
      <>
        <div className='token-decoded'>
          <h4>Login Information from Access Token (Base64 decoded JWT)</h4>
          <pre>
            {JSON.stringify(tokenData, null, 2)}
          </pre>
        </div>
        <div className='token-encoded'>
          <h4>Access Token (JWT)</h4>
          <pre
            style={{
              margin: '10px',
              padding: '5px',
              border: 'black 2px solid',
              wordBreak: 'break-all',
              whiteSpace: 'break-spaces',
            }}
          >
            {token}
          </pre>
        </div>
      </>
    )
  }
  return <></>
}

function Header(){
  const { token, login, logOut}: IAuthContext = useContext(AuthContext)

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Sign in with BitGo Test Client App
      </p>
      {!token ? (
        <>
          <div>You are not logged in.</div>
          <button className="App-button" onClick={() => login()}>Login</button>
        </>
      ) : (
        <button className="App-button" onClick={() => logOut()}>Logout</button>
      )}

    </header>
  )
}

function App() {
  return (
    <AuthProvider authConfig={authConfig}>
      <div className="App">
        <Header/>
        <LoginInfo/>
      </div>
    </AuthProvider>
  );
}

export default App;
