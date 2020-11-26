const { fileRead, readDirectory } = require('./fileRead');

jest.mock('fs');
const fs = require('fs');

describe('file reading test', () => {
    const filename = 'file';
    const fileData = '<p>Hello World</p>';

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
    test('reading an existing file should work', () => {
        const data = fileRead(filename);
        expect(data).toEqual(fileData);
    });
});

describe('directory reading test', () => {
    const MOCK_FILE_INFO = {
        '/path/to/file1.js': 'console.log("file1 contents");',
        '/path/to/file2.html': '<p>test</p>',
    };

    beforeAll(() => {
        require('fs').__setMockFiles(MOCK_FILE_INFO);
    });

    test('no argument should return null', () => {
        const argv = {
            _: [],
        };
        expect(readDirectory(argv)).toEqual([]);
    });

    test('wrong argument should return null', () => {
        const argv = {
            _: ['wrong'],
        };
        expect(readDirectory(argv)).toEqual([]);
    });

    test('valid directory path should return files', () => {
        const argv = {
            _: ['start'],
            p: '/path/to',
        };
        expect(readDirectory(argv)).toEqual(['file2.html']);
    });

    test('valid file should return the file', () => {
        const argv = {
            _: ['start'],
            f: 'test1.js,test2.html',
        };
        expect(readDirectory(argv)).toEqual(['test1.js', 'test2.html']);
    });

    test('-a option should return null', () => {
        const argv = {
            _: ['start'],
            a: 'test',
        };
        expect(readDirectory(argv)).toEqual([]);
    });

    test('non-option should return null', () => {
        const argv = {
            _: ['start'],
        };
        expect(readDirectory(argv)).toEqual([]);
    });
});
