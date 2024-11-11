/**
 * This class is a javascript version of the typescript class at https://github.com/meld-cp/obsidian-encrypt/blob/main/src/services/CryptoHelper2304.ts
 */
class CryptoHelper2304 {
  constructor(vectorSize, saltSize, iterations) {
    this.vectorSize = vectorSize;
    this.saltSize = saltSize;
    this.iterations = iterations;
  }

  async deriveKey(password, salt) {
    const utf8Encoder = new TextEncoder();
    const buffer = utf8Encoder.encode(password);
    const key = await crypto.subtle.importKey(
			/*format*/ 'raw',
			/*keyData*/ buffer,
			/*algorithm*/ 'PBKDF2',
			/*extractable*/ false,
			/*keyUsages*/['deriveKey']
    );
    const privateKey = await crypto.subtle.deriveKey(
			/*algorithm*/ {
        name: 'PBKDF2',
        hash: 'SHA-512',
        salt,
        iterations: this.iterations,
      },
			/*baseKey*/ key,
			/*derivedKeyAlgorithm*/ {
        name: 'AES-GCM',
        length: 256
      },
			/*extractable*/ false,
			/*keyUsages*/['encrypt', 'decrypt']
    );

    return privateKey;
  }

  async encryptToBytes(text, password) {
    const salt = crypto.getRandomValues(new Uint8Array(this.saltSize));
    const key = await this.deriveKey(password, salt);
    const utf8Encoder = new TextEncoder();
    const textBytes = utf8Encoder.encode(text);
    const vector = crypto.getRandomValues(new Uint8Array(this.vectorSize));

    const encryptedBytes = new Uint8Array(await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: vector },
      key,
      textBytes
    ));

    const result = new Uint8Array(vector.length + salt.length + encryptedBytes.length);
    result.set(vector, 0);
    result.set(salt, vector.length);
    result.set(encryptedBytes, vector.length + salt.length);
    return result;
  }

  async encryptToBase64(text, password) {
    const encryptedBytes = await this.encryptToBytes(text, password);
    return btoa(String.fromCharCode(...encryptedBytes));
  }

  async decryptFromBytes(encryptedBytes, password) {
    try {
      const vector = encryptedBytes.slice(0, this.vectorSize);
      const salt = encryptedBytes.slice(this.vectorSize, this.vectorSize + this.saltSize);
      const encryptedText = encryptedBytes.slice(this.vectorSize + this.saltSize);

      const key = await this.deriveKey(password, salt);

      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: vector },
        key,
        encryptedText
      );

      return new TextDecoder().decode(decrypted);
    } catch (error) {
      return null;
    }
  }

  async decryptFromBase64(base64Encoded, password) {
    try {
      const encryptedBytes = Uint8Array.from(atob(base64Encoded), c => c.charCodeAt(0));
      return await this.decryptFromBytes(encryptedBytes, password);
    } catch {
      return null;
    }
  }
}