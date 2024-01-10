const fs = require('fs');
const { ethers } = require('ethers');

// Funzione asincrona per ottenere input dall'utente
async function getUserInput(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}

// Funzione principale per creare e salvare il keystore
async function createAndSaveKeystore() {
  // Ottieni la chiave privata dall'utente
  const privateKey = await getUserInput('Inserisci la chiave privata: ');

  // Ottieni la password dall'utente
  const password = await getUserInput('Inserisci la password: ');

  // Crea un wallet utilizzando la chiave privata
  const wallet = new ethers.Wallet(privateKey);

  // Crea il keystore JSON V3 utilizzando la password
  const keystoreJsonV3 = await wallet.encrypt(password);

  // Salva il keystore JSON V3 su un file (ad esempio, keystore.json)
  fs.writeFileSync('keystore.json', JSON.stringify(keystoreJsonV3, null, 2));
  console.log('Keystore JSON V3 salvato su keystore.json');
}

// Esegui la funzione principale
createAndSaveKeystore();
