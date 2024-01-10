const { ethers } = require('ethers');

// Chiave privata
const privateKey = '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318';

// Password per cifrare/decifrare la chiave privata
const password = 'test!';

// Creazione del keystore JSON V3
async function createKeystore() {
  const wallet = new ethers.Wallet(privateKey);
  const keystoreJsonV3 = await wallet.encrypt(password);
  console.log('Keystore JSON V3:', keystoreJsonV3);

  // Decifratura del keystore utilizzando la password
  const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystoreJsonV3, password);
  console.log('Chiave privata decifrata:', decryptedWallet.privateKey);
}

createKeystore();
