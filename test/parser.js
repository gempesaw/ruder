import { expect } from 'chai';
import { parsePayload } from 'app';

describe('Parsing', () => {
    it('should extract the method', () => {
        const text = `GET http://www.google.com`;

        const options = parsePayload(text);
        expect(options.method).to.be('GET');
    });
});
