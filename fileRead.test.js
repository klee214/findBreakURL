const { fileRead } = require('./fileRead');

jest.mock('fs');
const fs = require('fs');

describe('file reading test', () => {
    const filename = "file";
    const fileData = "<p>Hello World</p>";

    beforeAll(() => {
        fs.__setMockFileData(filename, fileData);
    });

    test('empty, null, undefined should return null', () => {
        [null, undefined, ''].forEach((file) =>
            expect(fileRead(file)).toBe(null)
        );
    });
    test('wrong file path should return null', () => {
        expect(fileRead('wrongFilename.txt')).toBe(null);
    });
    test("reading an existing file should work", () => {
        const data = fileRead(filename);
        expect(data).toEqual(fileData);
      });
});
