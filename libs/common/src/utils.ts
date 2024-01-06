export const utils = {
  generateRandomNumberString(length: number): string {
    const randomNumberArray = Array.from({ length }, () => Math.floor(Math.random() * 10));
    return randomNumberArray.join('');
  },

  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
