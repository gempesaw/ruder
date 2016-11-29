import { expect } from 'chai';
import parsePayload  from '../lib/parser';

describe('Parsing', () => {
    let text, options;

    describe('GET', () => {
        beforeEach(() => {
            text = 'GET https://www.google.com';
            options = parsePayload(text);
        });

        it('should extract the method', () => {
            expect(options.method).to.equal('GET');
        });

        it('should extract the url', () => {
            expect(options.url).to.equal('https://www.google.com');
        });

        it('should not specify a body or json options', () => {
            expect(options.body).to.be.undefined;
            expect(options.json).to.be.undefined;
        });
    });

    describe('POST', () => {
        beforeEach( () => {
            text = `POST http://www.google.com
Header1: Value1
Header2: Value2

{ "json": "body", "json2": "body"}`;
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
                Header1: 'Value1',
                Header2: 'Value2'
            });
        });

        it('should extract the body', () => {
            expect(options.body).to.eql({
                json: 'body',
                json2: 'body'
            });
        });

        it('should set the appropriate json header', () => {
            expect(options.json).to.be.true;
        });
    });
});
