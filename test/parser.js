import { expect } from 'chai';
import parsePayload  from '../lib/parser';

describe('Parsing', () => {
    it('should extract the method', () => {
        const text = `GET http://www.google.com`;

        const options = parsePayload(text);
        expect(options.method).to.be.equal('GET');
    });
});
