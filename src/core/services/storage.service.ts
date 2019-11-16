import { writeFile } from 'fs';
import path, { join as pathJoin, resolve as pathResolve } from 'path';
import { v4 as uuid } from 'uuid';
import { STORAGE } from '../models/const/paths';
import { IStorableFile } from '../models/interfaces/storage-file';
import { randomString } from '../utils/random-string';
import mkdirp from 'mkdirp';

const mkDir = (directoryPath: string): Promise<void> => {
  return new Promise((res, rej) => {
    mkdirp(directoryPath, (err) => err ? rej(err) : res());
  });
};

export const saveToStorage = async (
  file: IStorableFile,
  folder: string = 'common',
): Promise<string> => new Promise(async (resolve, reject) => {
  const fragmentsPath: string = pathJoin(randomString(), randomString());
  const directoryPath: string = pathResolve(STORAGE, folder, fragmentsPath);

  await mkDir(directoryPath);

  const fileName: string = `${uuid()}${path.extname(file.filename)}`;
  const filePath: string = path.resolve(directoryPath, fileName);

  writeFile(filePath, file.data, (error) => {
    if (error == null) {
      resolve(pathJoin(fragmentsPath, fileName));
    } else {
      reject(error);
    }
  });
});
