import * as crypto from 'crypto';
import CryptoJS from 'crypto-js'; // You might need to install this: npm install crypto-js

const crypt = {
    encrypt: (message: string, key: string) => CryptoJS.AES.encrypt(message, key).toString(),
    decrypt: (data: string, key: string) => {
        try {
            const bytes = CryptoJS.AES.decrypt(data, key);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            console.error("Decryption failed", e);
            return null; // Or handle the error as appropriate
        }
    }
};

export const encrypt = (data: string, encryptionKey: string): string => {
    return crypt.encrypt(data, encryptionKey);
};

export const decrypt = (encryptedData: string, encryptionKey: string): string | null => {
    return crypt.decrypt(encryptedData, encryptionKey);
};

// Encryption function
export function encryptAndBase64(str: string, secret_key: string, salt: string): string {
    const iv = Buffer.from(salt, 'utf8'); // Ensure salt is hex and converts to a 16-byte buffer
    
    // Check if IV is of the correct length (16 bytes for AES-128)
    if (iv.length !== 16) {
        throw new Error('Initialization vector must be 16 bytes long');
    }

    const key = Buffer.from(secret_key, 'utf8'); // Secret key should be 16 bytes for AES-128
    if (key.length !== 16) {
        throw new Error('Secret key must be 16 bytes long');
    }

    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(str, 'utf8', 'binary');
    encrypted += cipher.final('binary');

    // Convert the encrypted data to base64
    const encryptedBase64 = Buffer.from(encrypted, 'binary').toString('base64');
    return encryptedBase64;
}

// Decryption function
export function decryptFromBase64(base64Str: string, secret_key: string, salt: string): string {
    const iv = Buffer.from(salt, 'utf8'); // Ensure salt is hex and converts to a 16-byte buffer

    // Check if IV is of the correct length (16 bytes for AES-128)
    if (iv.length !== 16) {
        throw new Error('Initialization vector must be 16 bytes long');
    }

    const key = Buffer.from(secret_key, 'utf8'); // Secret key should be 16 bytes for AES-128
    if (key.length !== 16) {
        throw new Error('Secret key must be 16 bytes long');
    }

    // Convert base64 to binary data
    const encryptedData = Buffer.from(base64Str, 'base64').toString('binary');

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'binary', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Return the original plaintext
}

// Example usage:
const secret_key = 'A1fByiJMZ8N88l2u'; // 16-byte key for AES-128
const salt = 'A1fByiJMZ8N88l2u'; // 16-byte IV (hex encoded)

const jsonObject = {
    'version':'1',
    'timestamp':'1729685105',
    'os':'web',
    'deviceId':'89u7wgjnb3n'
}

const jsonString = JSON.stringify(jsonObject)

export function decryptiontest(){
  const encryptedStr = encryptAndBase64(jsonString, secret_key, salt);
console.log(encryptedStr);
// const encryptedStr = "xRuivZzsVwNIFQcAEIIJef5sORzxNvCcWN6FT+9uxPKwOS0McrrowR2zmWwfL2WISxf61O4C2Tvket8618nYe85ZcYphi2OOpscE5z4xGLs=";
const decryptedStr = decryptFromBase64(encryptedStr,secret_key,salt);
console.log(decryptedStr)
}

