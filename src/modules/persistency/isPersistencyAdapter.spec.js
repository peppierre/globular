import sinon from 'sinon';
import { expect } from 'chai';

import { isPersistencyAdapter } from './isPersistencyAdapter';
import * as Util from '../../util/isInterfaceImplemented';

import { MinimumRequiredApi } from './isPersistencyAdapter.specdef';

describe('Persistency Module', () => {
    describe('Persistency Adapter Validator', () => {
        beforeEach(() => {
            sinon.stub(Util, 'isInterfaceImplemented').returns(true);
        });

        afterEach(() => {
            Util.isInterfaceImplemented.restore();
        });

        it('should call low-level validator with expected API passed', () => {
            isPersistencyAdapter(MinimumRequiredApi);

            const callArgs = Util.isInterfaceImplemented.firstCall.args;
            expect(Util.isInterfaceImplemented.calledOnce).to.be.equal(true);
            expect(callArgs[0]).to.be.equal(MinimumRequiredApi);
            expect(callArgs[1]).to.deep.equal(['getItem', 'setItem', 'removeItem', 'clear']);
        });
    });
});
