import { expect } from 'chai';
import { getType } from './getType';

describe('Utilities', () => {
    describe('getType utility', () => {
        context('when number is passed', () => {
            it('should return "number"', () => {
                expect(getType(1)).to.be.equal('number');
                expect(getType(0)).to.be.equal('number');
                expect(getType(-1)).to.be.equal('number');
                expect(getType(Infinity)).to.be.equal('number');
                expect(getType(-Infinity)).to.be.equal('number');
                expect(getType(NaN)).to.be.equal('number');
                /* eslint-disable no-new-wrappers */
                expect(getType(new Number(5))).to.be.equal('number');
                /* eslint-enable no-new-wrappers */
            });
        });

        context('when string is passed', () => {
            it('should return "string"', () => {
                expect(getType('')).to.be.equal('string');
                /* eslint-disable no-new-wrappers */
                expect(getType(new String(''))).to.be.equal('string');
                /* eslint-enable no-new-wrappers */
            });
        });

        context('when true or false is passed', () => {
            it('should return "boolean"', () => {
                expect(getType(true)).to.be.equal('boolean');
                expect(getType(false)).to.be.equal('boolean');
                /* eslint-disable no-new-wrappers */
                expect(getType(new Boolean(true))).to.be.equal('boolean');
                /* eslint-enable no-new-wrappers */
            });
        });

        context('when object is passed', () => {
            it('should return "object"', () => {
                expect(getType({})).to.be.equal('object');
                /* eslint-disable no-new-object */
                expect(getType(new Object())).to.be.equal('object');
                /* eslint-enable no-new-object */
                expect(getType(Object.create({}))).to.be.equal('object');
            });
        });

        context('when function is passed', () => {
            it('should return "function"', () => {
                expect(getType(() => {
                })).to.be.equal('function');
                /* eslint-disable no-new-func */
                expect(getType(new Function(''))).to.be.equal('function');
                /* eslint-enable no-new-func */
            });
        });

        context('when nothing is passed', () => {
            it('should return "undefined"', () => {
                expect(getType()).to.be.equal('undefined');
            });
        });

        context('when null is passed', () => {
            it('should return "null"', () => {
                expect(getType(null)).to.be.equal('null');
            });
        });

        context('when array is passed', () => {
            it('should return "array"', () => {
                expect(getType([])).to.be.equal('array');
                /* eslint-disable no-array-constructor */
                expect(getType(new Array())).to.be.equal('array');
                /* eslint-enable no-array-constructor */
            });
        });

        context('when date is passed', () => {
            it('should return "date"', () => {
                expect(getType(new Date())).to.be.equal('date');
            });
        });

        context('when regular expression is passed', () => {
            it('should return "regexp"', () => {
                expect(getType(/a/g)).to.be.equal('regexp');
                expect(getType(new RegExp('a', 'g'))).to.be.equal('regexp');
            });
        });
    });
});
