import { expect } from 'chai';
import { isInterfaceImplemented } from './isInterfaceImplemented';
import {
    requiredMethods, MinimumApiInstance, MinimumApiClass,
    MinimumApiMixed,
} from './isInterfaceImplemented.spec-def';

describe('Utilities', () => {
    describe('isInterfaceImplemented utility', () => {
        it('should return true when object instance has all required method implemented', () => {
            expect(isInterfaceImplemented(MinimumApiInstance, requiredMethods)).to.be.equal(true);
        });

        it('should return true when class has all required static method implemented', () => {
            expect(isInterfaceImplemented(MinimumApiClass, requiredMethods)).to.be.equal(true);
        });

        it('should return false when class has a part of required static method implemented and instance', () => {
            expect(isInterfaceImplemented(MinimumApiMixed, requiredMethods)).to.be.equal(false);
        });
    });
});
