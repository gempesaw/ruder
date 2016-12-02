import { expect } from 'chai';
import parsePayload  from '../lib/parser';

describe('Parsing', () => {
    let text, options;

    describe('simplest request', () => {
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

    describe('with JSON payloads', () => {
        beforeEach( () => {
            text = `POST http://www.google.com
Header1: Value1: Value3
Header2: Value2

[
    1,
    2,
    { "three":
"four" }
]`;
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
                Header1: 'Value1: Value3',
                Header2: 'Value2'
            });
        });

        it('should extract the body', () => {
            expect(options.body).to.eql([
                1,
                2,
                { three: "four" }
            ]);
        });

        it('should set the appropriate json header', () => {
            expect(options.json).to.be.true;
        });
    });

    describe('plaintext payload', () => {
        beforeEach(() => {
            text = `POST http://www.google.com

form=data`;
            options = parsePayload(text);
        });

        it('should be able to send nonJSON bodies', () => {
            expect(options.body).to.equal('form=data');
            expect(options.json).to.be.undefined;
        });

    });

    describe('weird spacing', () => {
        it('should parse with extra spaces before/after method & url', () => {
            const text = '   method    url   ';
            const options = parsePayload(text);
            expect(options.method).to.equal('method');
            expect(options.url).to.equal('url');
        });

        it('should parse with extra spaces in headers', () => {
            const text = `method url
no:space
    many:    spaces     `;
            const options = parsePayload(text);
            expect(options.headers).to.eql({
                no: "space",
                many: "spaces"
            });
        });
    });
});
