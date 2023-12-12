import CryptoJS from 'crypto-js';

export function getCurrentYear() {
    const now = new Date();
    return now.getFullYear();
}
  

export const shuffleArray = (array) => {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

// Pagination
export const replaceQuotationMarks = (label) => {
    return label.replace(/&raquo;/g, '»').replace(/&laquo;/g, '«');
};

export const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
}

// Decrypt Data
export const decryptData = (data, secretKey) => {
    const thedata = data.replace(/ /g, '+'); // Replace spaces with +
    const decrypted = CryptoJS.AES.decrypt(thedata, secretKey);
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

    // console.log('Decrypted Data:', decryptedData);
    return decryptedData;
}

export function addEllipses(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
}