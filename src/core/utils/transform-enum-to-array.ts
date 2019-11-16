export const transformEnumToArray = (en: any): string[] => {
  const keys = Object.keys(en);
  return keys.map((key: string) => en[key]);
};
