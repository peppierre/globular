import { expect } from 'chai';
import isMethod from './isMethod';

describe('Utilities', () => {
    describe('isMethod utility', () => {
        it('should return true when a function passed', () => {
            expect(isMethod(() => {})).to.be.equal(true);
        });
        it('should return false when a number passed', () => {
            expect(isMethod(8)).to.be.equal(false);
        });
        it('should return false when text passed', () => {
            expect(isMethod('')).to.be.equal(false);
        });
        it('should return false when boolean passed', () => {
            expect(isMethod(true)).to.be.equal(false);
        });
        it('should return false when no parameters passed', () => {
            expect(isMethod()).to.be.equal(false);
        });
        it('should return false when an object passed', () => {
            expect(isMethod({})).to.be.equal(false);
        });
    });
});
