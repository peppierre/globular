import { expect } from 'chai';
import isMethod from './isMethod';

describe('Utilities', () => {
    describe('isMethod utility', () => {
        it('should return true when a function passed', () => {
            expect(isMethod(() => {
            })).to.be.equal(true);
        });
        it('should not return false when a anything else passed', () => {
            expect(isMethod(8)).to.be.equal(false);
            expect(isMethod('')).to.be.equal(false);
            expect(isMethod(true)).to.be.equal(false);
            expect(isMethod()).to.be.equal(false);
            expect(isMethod([])).to.be.equal(false);
        });
    });
});
