'use client'
import { decrypt, encrypt } from '@/Services/Encryption';
import { User, UserRole } from '@/Types/common';
import { v4 as uuidv4 } from 'uuid'; // You might need to install this: npm install uuid

const DEVICE_ID_KEY = 'deviceId';
const SALT_KEY = 'salt';
const SECRET_KEY = 'secret';
const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';
const AUTH_USER_ROLE_KEY = 'desiredRole';
const PROGRESS_KEY = 'onboardingProgress';
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
    if (typeof window === "undefined") return { deviceId: "", secret: "", salt: "" };
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
    if (typeof window === "undefined") return { deviceId: "", secret: "", salt: "" };

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
    if (typeof window === "undefined") return ;
    localStorage.setItem(AUTH_TOKEN_KEY, encrypt(token, encryptionKey));
}
export const getAuthToken = () =>{
    if (typeof window === "undefined") return "";
    const storedAuthTokenEncrypted = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedAuthTokenEncrypted) {
        const token = decrypt(storedAuthTokenEncrypted, encryptionKey) as string;
        return token;
    }
    return ""
}
export const storeAuthUser = (user: User) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUTH_USER_KEY, encrypt(JSON.stringify(user), encryptionKey));
};
export const getAuthUser = () => {
    if (typeof window === "undefined") return null;
    const storedUserEncrypted = localStorage.getItem(AUTH_USER_KEY);
    if (storedUserEncrypted) {
        const userstring = decrypt(storedUserEncrypted, encryptionKey) as string;
        try {
        const user = JSON.parse(userstring) as User;
        return user;
        } catch (error) {
        console.error("Failed to parse authUser:", error);
        return null;
        }
    }
    return null;
};

export const storeAuthUserDesiredRole = (userRole: UserRole) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUTH_USER_ROLE_KEY, encrypt(JSON.stringify(userRole), encryptionKey));
};
export const getAuthUserDesiredRole = () => {
    if (typeof window === "undefined") return null;
    const storedUserRoleEncrypted = localStorage.getItem(AUTH_USER_ROLE_KEY);
    if (storedUserRoleEncrypted) {
        const userRolestring = decrypt(storedUserRoleEncrypted, encryptionKey) as string;
        try {
        const userRole = JSON.parse(userRolestring) as UserRole;
        return userRole;
        } catch (error) {
        console.error("Failed to parse authUser:", error);
        return null;
        }
    }
    return null;
};

export const storeProgress = (progress:number) =>{
    const progressString = progress.toString();
    if (typeof window === "undefined") return ;
    localStorage.setItem(PROGRESS_KEY, encrypt(progressString, encryptionKey));
}
export const getProgress = () =>{
    if (typeof window === "undefined") return 1;
    const storedprogressEncrypted = localStorage.getItem(PROGRESS_KEY);

    if (storedprogressEncrypted) {
        const progress = decrypt(storedprogressEncrypted, encryptionKey);
        return parseInt(progress || '1');
    }
    return 1
}

// Function to clear session data
export const clearSessionData = (): void => {
    if (typeof window === "undefined") return ;
    localStorage.removeItem(DEVICE_ID_KEY);
    localStorage.removeItem(SALT_KEY);
    localStorage.removeItem(SECRET_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    
    window.location.href = '/'; // Full page reload on session expiration

};