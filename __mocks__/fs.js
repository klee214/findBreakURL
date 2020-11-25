const fs = jest.createMockFromModule('fs');
const path = require('path')

const mockFiles = {};
function __setMockFileData(filename, data) {
    mockFiles[filename] = data;
}

function readFileSync(filename) {
    const data = mockFiles[filename];

    if (data) {
        return data;
    } else {
        throw new Error("invalid file");
    }
}

fs.__setMockFileData = __setMockFileData;
fs.readFileSync = readFileSync;

module.exports = fs;
