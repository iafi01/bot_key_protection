const fs = require('fs');
const { ethers } = require('ethers');



// Creazione del keystore JSON V3 e salvataggio su file
async function restoreKey() {
  
  const keystoreJsonV3String = fs.readFileSync('keystore.json', 'utf-8');

// Trasforma la stringa JSON in un oggetto JavaScript
  const keystoreJsonV3 = JSON.parse(keystoreJsonV3String);

  // Richiede all'utente di inserire la password per decifrare il keystore
  const userPassword = await getPasswordFromUser();
  
  // Decifratura del keystore utilizzando la password inserita dall'utente
  const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystoreJsonV3, userPassword);
  console.log('Chiave privata decifrata:', decryptedWallet.privateKey);
}

// Funzione per richiedere la password all'utente in modo sicuro
async function getPasswordFromUser() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question('Inserisci la password per decifrare il keystore: ', (password) => {
      readline.close();
      resolve(password);
    });
  });
}

restoreKey();
