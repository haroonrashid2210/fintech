export const utils = {
  generateRandomNumberString(length: number): string {
    const randomNumberArray = Array.from({ length }, () => Math.floor(Math.random() * 10));
    return randomNumberArray.join('');
  },
};
