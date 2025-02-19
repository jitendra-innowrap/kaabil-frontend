import { decrypt, encrypt } from '@/Services/Encryption';
import { v4 as uuidv4 } from 'uuid'; // You might need to install this: npm install uuid

const DEVICE_ID_KEY = 'deviceId';
const SALT_KEY = 'salt';
const SECRET_KEY = 'secret';
const AUTH_TOKEN_KEY = 'authToken';
const encryptionKey = 'oifyuey3784ryiq'

// Function to generate a unique 16-digit device ID
export const generateDeviceId = (): string => {
    return uuidv4().replace(/-/g, '').substring(0, 16); // Generate UUID and take the first 16 characters
};

// Function to generate a 16-digit salt based on the device ID
const generateSalt = (deviceId: string): string => {
    const salt = uuidv4().replace(/-/g, '').substring(0, 16);
    return salt;
};

// Function to get session data
export const getSessionData = (): { deviceId: string, secret: string, salt: string, } => {
    const storedDeviceIdEncrypted = localStorage.getItem(DEVICE_ID_KEY);
    const storedSaltEncrypted = localStorage.getItem(SALT_KEY);
    const storedSecretEncrypted = localStorage.getItem(SECRET_KEY);

    if (storedDeviceIdEncrypted && storedSaltEncrypted && storedSecretEncrypted) {
        const deviceId = decrypt(storedDeviceIdEncrypted, encryptionKey) as string;
        const salt = decrypt(storedSaltEncrypted, encryptionKey) as string;
        const secret = decrypt(storedSecretEncrypted, encryptionKey) as string;

        return { deviceId, secret, salt };
    }
    return { deviceId: '', secret: '', salt: '' };
};

// Function to initialize session data (generate and store if not present)
export const initializeSession = (deviceId:string , secret:string): { deviceId: string; secret:string, salt: string } => {
    let { salt } = getSessionData();

    if (!deviceId || !salt) {
        salt = generateSalt(deviceId);
        localStorage.setItem(DEVICE_ID_KEY, encrypt(deviceId, encryptionKey));
        localStorage.setItem(SALT_KEY, encrypt(salt, encryptionKey));
        localStorage.setItem(SECRET_KEY, encrypt(secret, encryptionKey));
    }

    return { deviceId, secret, salt };
};

export const storeAuthToken = (token:string) =>{
  localStorage.setItem(AUTH_TOKEN_KEY, encrypt(token, encryptionKey));
}
export const getAuthToken = () =>{
  const storedAuthTokenEncrypted = localStorage.getItem(SECRET_KEY);

    if (storedAuthTokenEncrypted) {
        const token = decrypt(storedAuthTokenEncrypted, encryptionKey) as string;
        return token;
    }
    return ""
}

// Function to clear session data
export const clearSessionData = (): void => {
    localStorage.removeItem(DEVICE_ID_KEY);
    localStorage.removeItem(SALT_KEY);
    localStorage.removeItem(SECRET_KEY);
};