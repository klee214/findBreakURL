const fs = jest.createMockFromModule('fs');
const path = require('path')

let mockFiles = {};

function __setMockFileData(filename, data) {
    mockFiles = {};
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

function __setMockFiles(newMockFiles) {
    mockFiles = {};
    for (const file in newMockFiles) {
      const dir = path.dirname(file);
  
      if (!mockFiles[dir]) {
        mockFiles[dir] = [];
      }
      if(path.basename(file).toLowerCase().endsWith('.html')){
          mockFiles[dir].push(path.basename(file));
      }
    }
}

function readdirSync(argv) {
    return mockFiles[argv] || [];
}

fs.__setMockFileData = __setMockFileData;
fs.readFileSync = readFileSync;
fs.readdirSync = readdirSync;
fs.__setMockFiles = __setMockFiles;

module.exports = fs;
