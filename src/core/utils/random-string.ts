export const randomString = (length: number = 2): string => {
  return Math
    .random()
    .toString(16)
    .substr(2, Math.min(8, length));
};
