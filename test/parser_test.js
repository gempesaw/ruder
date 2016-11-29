import { expect } from 'chai';
import parsePayload  from '../lib/parser';

describe('Parsing', () => {
    let text, options;
    beforeEach( () => {
        text = `POST http://www.google.com
Header: Value

{ "json": "body" }`;
        options = parsePayload(text);
    });

    it('should extract the method', () => {
        expect(options.method).to.equal('POST');
    });

    it('should extract the url', () => {
        expect(options.url).to.equal('http://www.google.com');
    });

    it('should extract the header', () => {
        expect(options.headers).to.eql({
            Header: 'Value'
        });
    });

    it('should extract the body', () => {
        expect(options.body).to.eql({json: 'body'});
    });

    it('should set the appropriate json header', () => {
        expect(options.json).to.be.true;
    });
});
