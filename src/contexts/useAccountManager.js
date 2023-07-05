import React from 'react';
import {getCredentialId} from "../credential-helpers";

// export const AccountHooks = React.createContext();

const useAccountManager = () => {

  // const [account, setAccount] = React.useState(null);



  function loadCurrentUser() {
    return Cookies.get('username') || '';
  }
  function login() {
    // setAccount('JaneDoe');
    saveCurrentUser('JaneDoe')
    // refreshUserArea();
  }

  function logout() {
    resetCurrentUser();
    // clearWalletDisplay();
    clearWalletStorage();
    // refreshUserArea();
  }
  function loadWalletContents() {
    const walletContents = Cookies.get('walletContents');
    if(!walletContents) {
      return null;
    }
    return JSON.parse(atob(walletContents));
  }

  function saveCurrentUser(name) {
    console.log('Setting login cookie.');
    Cookies.set('username', name, {path: '', secure: true, sameSite: 'None'});
  }


  function resetCurrentUser() {
    console.log('Clearing login cookie.');
    // setAccount('')
    Cookies.remove('username', {path: ''});
  }

  function storeInWallet(verifiablePresentation) {
    const walletContents = loadWalletContents() || {};
    const id = getCredentialId(verifiablePresentation);
    walletContents[id] = verifiablePresentation;

    // base64 encode the serialized contents (verifiable presentations)
    const serialized = btoa(JSON.stringify(walletContents));
    Cookies.set('walletContents', serialized, {path: '', secure: true, sameSite: 'None'});
  }

  function clearWalletStorage() {
    Cookies.remove('walletContents', {path: ''});
  }

  return {loadCurrentUser, login, logout, storeInWallet, clearWalletStorage};

}

export default useAccountManager;
