import fs from 'fs';

export const genOutput = (data: any, fileName = 'output') => {
    fs.writeFile(`${fileName}.json`, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
};
