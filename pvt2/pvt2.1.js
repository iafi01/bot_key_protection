const fs = require('fs');
const { ethers } = require('ethers');

// Chiave privata
const privateKey = '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318';

// Password per cifrare/decifrare la chiave privata
const password = 'test!';

// Creazione del keystore JSON V3 e salvataggio su file
async function createAndSaveKeystore() {
  const wallet = new ethers.Wallet(privateKey);
  const keystoreJsonV3 = await wallet.encrypt(password);

  // Salva il keystore JSON V3 su un file (ad esempio, keystore.json)
  fs.writeFileSync('keystore.json', JSON.stringify(keystoreJsonV3, null, 2));
  console.log('Keystore JSON V3 salvato su keystore.json');

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

createAndSaveKeystore();
