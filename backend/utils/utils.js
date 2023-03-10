import fs from 'fs';

export const generateRandomFilename = (originalFilename) => {
    const fileExtension = originalFilename.split('.').pop();
    const randomString = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}.${fileExtension}`;
}

export const copyFiles = ((files) => {
    if (!Array.isArray(files)) {
        files = [files];
    }
    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const newFilename = generateRandomFilename(file.originalFilename);
            const oldpath = file.filepath;
            const newpath = `images/${newFilename}`;
            fs.copyFile(oldpath, `public/${newpath}` , (err) => {
                
                if(err) {
                    reject(err)
                }
                else {
                    resolve(newpath)
                } 
            })
        })
    })
    return Promise.all(promises)
})

export const copyFile = ((file) => {
    const newFilename = generateRandomFilename(file.originalFilename);
    const oldpath = file.filepath;
    const newpath = `images/${newFilename}`;
    fs.copyFile(oldpath, `public/${newpath}` , (err) => {
        
        if(err) {
            return err.message
        }
    })
    return newpath
})