import { expect } from 'chai';
import isFeatureCore from './isFeatureCore';

/* eslint-disable class-methods-use-this */
class NonExecutableFeature {
    unExecute() {}
}

class MinimumRequiredFeature {
    execute() {}
}
/* eslint-enable class-methods-use-this */

describe('Feature Module', () => {
    describe('FeatureCore Validator', () => {
        context('when proper API implementation is passed to', () => {
            it('should return true', () => {
                expect(isFeatureCore(new MinimumRequiredFeature())).to.be.equal(true);
            });
        });
        context('when invalid API implementation is passed to', () => {
            it('should return false', () => {
                expect(isFeatureCore(new NonExecutableFeature())).to.be.equal(false);
            });
        });
    });
});
