import { expect } from 'chai';
import sinon from 'sinon';

import { isFeatureCore } from './isFeatureCore';
import * as Util from '../../util/isInterfaceImplemented';

import { MinimumRequiredFeature } from './isFeatureCore.specdef';

describe('Feature Module', () => {
    describe('FeatureCore Validator', () => {
        beforeEach(() => {
            sinon.stub(Util, 'isInterfaceImplemented').returns(true);
        });

        afterEach(() => {
            Util.isInterfaceImplemented.restore();
        });

        it('should call helper function to check object or class against interface required', () => {
            isFeatureCore(MinimumRequiredFeature);

            const callArgs = Util.isInterfaceImplemented.firstCall.args;
            expect(Util.isInterfaceImplemented.calledOnce).to.be.equal(true);
            expect(callArgs[0]).to.be.equal(MinimumRequiredFeature);
            expect(callArgs[1]).to.be.deep.equal(['execute']);
        });
    });
});
