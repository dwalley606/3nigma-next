export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
  const publicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
  return {
    publicKey: Buffer.from(publicKey).toString('base64'),
    privateKey: Buffer.from(privateKey).toString('base64'),
  };
}

export async function encryptMessage(message: string, publicKey: string) {
  const symmetricKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedMessage = new TextEncoder().encode(message);
  const encryptedMessage = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    symmetricKey,
    encodedMessage
  );

  const publicKeyBuffer = Buffer.from(publicKey, 'base64');
  const importedPublicKey = await window.crypto.subtle.importKey(
    'spki',
    publicKeyBuffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );
  const exportedSymmetricKey = await window.crypto.subtle.exportKey('raw', symmetricKey);
  const encryptedSymmetricKey = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    importedPublicKey,
    exportedSymmetricKey
  );

  return {
    content: Buffer.from(encryptedMessage).toString('base64'),
    contentKey: Buffer.from(encryptedSymmetricKey).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
  };
}

export async function decryptMessage(encryptedMessage: string, encryptedKey: string, iv: string, privateKey: string) {
  const privateKeyBuffer = Buffer.from(privateKey, 'base64');
  const importedPrivateKey = await window.crypto.subtle.importKey(
    'pkcs8',
    privateKeyBuffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['decrypt']
  );

  const encryptedKeyBuffer = Buffer.from(encryptedKey, 'base64');
  const symmetricKeyBuffer = await window.crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    importedPrivateKey,
    encryptedKeyBuffer
  );
  const symmetricKey = await window.crypto.subtle.importKey(
    'raw',
    symmetricKeyBuffer,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const ivBuffer = Buffer.from(iv, 'base64');
  const encryptedMessageBuffer = Buffer.from(encryptedMessage, 'base64');
  const decryptedMessage = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    symmetricKey,
    encryptedMessageBuffer
  );

  return new TextDecoder().decode(decryptedMessage);
}