import { expect } from 'chai';
import sinon from 'sinon';

import { isApiAdapter } from './isApiAdapter';
import * as Util from '../../util/isInterfaceImplemented';

import { MinimumRequiredApi } from './isApiAdapter.spec-def';

describe('API Module', () => {
    describe('API Adapter Validator', () => {
        beforeEach(() => {
            sinon.stub(Util, 'isInterfaceImplemented').returns(true);
        });

        afterEach(() => {
            Util.isInterfaceImplemented.restore();
        });

        it('should check whether all required API methods implemented', () => {
            isApiAdapter(MinimumRequiredApi);

            const callArgs = Util.isInterfaceImplemented.firstCall.args;
            expect(Util.isInterfaceImplemented.callCount).to.be.equal(1);
            expect(callArgs[1]).to.deep.equal(['pluginCall', 'unplugCall', 'request']);
        });
    });
});
