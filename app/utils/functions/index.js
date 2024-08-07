import {API_URL} from '../../config';
import moment from 'moment';

// INFO: all global functions will be added here
export const sum = (a, b) => {
  return a + b;
};
// ** allow only number value
export const NumberValidation = val => {
  let alphaNumericRegex = /^([0-9])*$/;
  return alphaNumericRegex.test(val);
};

export const EmailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
}

export const StringValidation = val => {
  let characterRegex = /^[a-zA-Z\s?.?]*$/;
  return characterRegex.test(val);
};
export const passwordValidation = val => {
  passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
  return passwordPattern.test(val);
};
export const formatCreditCardNumber = input => {
  const numericInput = input.replace(/(.{4})/g, '$1 ');
  let formattedInput = numericInput.replace(numericInput,`**** **** **** ${numericInput.slice(-5)}`);
  return formattedInput;
};
export const invertColor = color => {
  // Assuming color is in the format 'rgba(r, g, b, a)'
  const values = color.match(/\d+/g).map(Number);
  const invertedValues = values.map(v => 255 - v);
  const alpha = values[3] || 1; // Preserve alpha if present
  return `rgba(${invertedValues.join(', ')}, ${alpha})`;
};

export const imageView = img => {
  const originalUrl = API_URL;

  // Remove "/api" from the URL
  const modifiedUrl = originalUrl.replace('/api', '');
  const imgData = modifiedUrl + '/' + img;

  return imgData;
};

export const calculateDiscountedPrice = (originalPrice, percentageDiscount) => {
  const discountAmount = (originalPrice * percentageDiscount) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice;
};

export const calculatePercentage = (part, whole) => {
  return (part / whole) * 100;
};

export const compareExpiryDate = inputDate => {
  // Remove any non-digit characters from the input
  if (inputDate) {
    const cleanedInput = inputDate.replace(/\D/g, '');

    // Ensure the cleaned input has at least 4 digits (MMYY or MM/YYYY)
    if (cleanedInput.length < 4) {
      return false;
    }

    // Extract month and year components
    const month = cleanedInput.slice(0, 2);

    const year = cleanedInput.slice(2);

    // Ensure the month and year are valid
    if (!/^\d{2}$/.test(month) || !/^\d{2,4}$/.test(year)) {
      return false;
    }

    // Get current date
    const currentDate = moment();

    // Create a Moment.js object for the input expiry date
    const expiryDate = moment(`${year}-${month}`, 'YYYY-MM');

    // Compare the expiry date with the current date
    if (expiryDate.isSameOrAfter(currentDate, 'month')) {
      return true;
    } else {
      return false;
    }
    return false;
  }
};
export const validateCVV = cvv => {
  // Assuming CVV should be a 3 or 4-digit number
  if (cvv) {
    return /^\d{3,4}$/.test(cvv);
  }
  return false;
};

export const isValidCreditCardNumber = inputNumber => {
  if (inputNumber) {
    // Remove any non-digit characters from the input
    var cleanedInput = inputNumber.replace(/\D/g, '');

    // Check if the cleaned input is exactly 16 digits long
    if (cleanedInput.length !== 16) {
      return false;
    }

    // Split the cleaned input into groups of four digits
    var groups = cleanedInput.match(/.{1,4}/g) || [];

    // Check if there are four groups
    if (groups.length !== 4) {
      return false;
    }

    // Check if each group consists of exactly four digits
    if (!groups.every(group => /^\d{4}$/.test(group))) {
      return false;
    }

    // If all checks pass, the input is considered valid
    return true;
  }
  return false;
};

export const validateZipCode = zipCode => {
  // Assuming a simple check for a valid zip code
  return /^\d{6}$/.test(zipCode);
};

export const formatCurrency = amount => {
  const locale = 'en-US';
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR', // change this based on your currency code
  });

  return currencyFormatter.format(amount);
};
