export const isValidUUID = (id: string, uuidVersion: number = 4): boolean => {
    const uuidPattern = `^[0-9A-F]{8}-[0-9A-F]{4}-[${uuidVersion}][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$`;
    const uuidRegex = new RegExp(uuidPattern, 'i');
    return uuidRegex.test(id);
};