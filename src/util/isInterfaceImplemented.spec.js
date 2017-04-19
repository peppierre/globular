import { expect } from 'chai';
import isInterfaceImplemented from './isInterfaceImplemented';
import { requiredMethods, NonFooableApi, NonBooableApi, MinimumApi } from './isInterfaceImplemented.spec.def';

describe('Utilities', () => {
    describe('isInterfaceImplemented utility', () => {
        it('should return true only when proper API implementation is passed to', () => {
            expect(isInterfaceImplemented(new NonFooableApi(), requiredMethods)).to.be.equal(false);
            expect(isInterfaceImplemented(new NonBooableApi(), requiredMethods)).to.be.equal(false);
            expect(isInterfaceImplemented(new MinimumApi(), requiredMethods)).to.be.equal(true);
        });
    });
});
