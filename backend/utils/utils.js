import fs from "fs";
import jwt from "jsonwebtoken";

export const getUserIdFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "key_secret");
  const userId = decoded.id;
  return userId;
};

export const generateRandomFilename = (originalFilename) => {
  const fileExtension = originalFilename.split(".").pop();
  const randomString =
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();
  return `${timestamp}-${randomString}.${fileExtension}`;
};

export const copyFiles = (files, path) => {
  console.log("LOG 1");
  if (!Array.isArray(files)) {
    console.log("LOG 2");
    files = [files];
  }
  const promises = files.map((file) => {
    console.log("LOG 3", file.filepath);

    return new Promise((resolve, reject) => {
      console.log("LOG 4");

      const newFilename = generateRandomFilename(file.originalFilename);
      console.log("LOG 5" + " " + newFilename);
      const oldpath = file.filepath;
      console.log("LOG 6");
      const newpath = `${path}/${newFilename}`;
      console.log("LOG 7", newpath);
      fs.copyFile(oldpath, `public/${newpath}`, (err) => {
        console.log("LOG 8");
        if (err) {
          console.log("LOG 9");
          reject(err);
        } else {
          console.log("LOG 10");
          resolve(newpath);
        }
      });
    });
  });
  return Promise.all(promises);
};

export const copyFile = (file) => {
  console.log(file.originalFilename + "ORIGINAL FILE NAME");
  const newFilename = generateRandomFilename(file.originalFilename);
  const oldpath = file.filepath;
  const newpath = `images/${newFilename}`;
  fs.copyFile(oldpath, `public/${newpath}`, (err) => {
    if (err) {
      return err.message;
    }
  });
  return newpath;
};
