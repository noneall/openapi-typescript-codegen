import {
    copyFile as __copyFile,
    pathExists as __pathExists,
    readFile as __readFile,
    remove as __remove,
    writeFile as __writeFile,
    ensureDir,
} from 'fs-extra';

// Export calls (needed for mocking)
export const readFile = __readFile;
export const writeFile = __writeFile;
export const copyFile = __copyFile;
export const exists = __pathExists;
export const mkdir = ensureDir;
export const rmdir = async (path: string) => {
    return Promise.resolve();
};
