// Utility functions for Web Crypto API
function arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }
  
  function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }
  
  export async function generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: "SHA-256",
      },
      true, // Extractable
      ["encrypt", "decrypt"]
    );
  
    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  
    return {
      publicKey: arrayBufferToBase64(publicKey),
      privateKey: arrayBufferToBase64(privateKey),
    };
  }
  
  export async function encryptMessage(message: string, publicKeyBase64: string): Promise<string> {
    const publicKey = await crypto.subtle.importKey(
      "spki",
      base64ToArrayBuffer(publicKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"]
    );
    const encoded = new TextEncoder().encode(message);
    const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
    return arrayBufferToBase64(encrypted);
  }
  
  export async function decryptMessage(encryptedBase64: string, privateKeyBase64: string): Promise<string> {
    const privateKey = await crypto.subtle.importKey(
      "pkcs8",
      base64ToArrayBuffer(privateKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["decrypt"]
    );
    const encrypted = base64ToArrayBuffer(encryptedBase64);
    const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encrypted);
    return new TextDecoder().decode(decrypted);
  }