/**
 * @jest-environment node
 */

const { axiosFetch } = require('./axios_fetch');
const nock = require('nock');

describe('fetching test', () => {
    test('empty, null, undefined should throw error', () => {
        [null, undefined, ''].forEach((url) =>
            expect(() => axiosFetch(url)).rejects.toThrow()
        );
    });

    test('reading from an existing URL should work', async () => {
        const url = 'https://test.ca';

        nock(url).get('/').reply(200);
        const status = await axiosFetch(url);
        expect(status).toEqual(200);
    });

    test('reading from a broken URL should throw', async () => {
        const url = 'https://brokenURL.ca';

        nock(url).get('/').reply(404);
        expect(() => axiosFetch(url)).rejects.toThrow();
    });
});
