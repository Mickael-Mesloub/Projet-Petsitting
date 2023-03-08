export const generateRandomFilename = (originalFilename) => {
    const fileExtension = originalFilename.split('.').pop();
    const randomString = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}.${fileExtension}`;
}