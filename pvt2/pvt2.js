const { ethers } = require('ethers');

// Chiave privata
const privateKey = '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318';

// Password per cifrare/decifrare la chiave privata
const password = 'test!';

// Creazione del keystore JSON V3
async function createKeystore() {
  const wallet = new ethers.Wallet(privateKey);
  const keystoreJsonV3 = [{"address":"2c7536e3605d9c16a7a3d7b1898e529396a65c23","id":"27447bb4-6528-49c5-a5e6-6728dabc5050","version":3,"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"073d25b5f6ccc75943a10a7d44140470"},"ciphertext":"8c70b63e3cca6cf10a744eae44dc5ddf6cd5c450ad13d144f72c35d41c3dfde6","kdf":"scrypt","kdfparams":{"salt":"583a02df776af7f2047071f504d4ff15a3dbe8b0da4a102525602ed2ce840dc3","n":131072,"dklen":32,"p":1,"r":8},"mac":"64a2bd3d728aac75f087ce0d657fd96716b4768dff4f86f6eed0b62fea677b5a"}}];
  console.log('Keystore JSON V3:', keystoreJsonV3);

  // Decifratura del keystore utilizzando la password
  const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystoreJsonV3, password);
  console.log('Chiave privata decifrata:', decryptedWallet.privateKey);
}

createKeystore();
