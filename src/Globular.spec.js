import sinon from 'sinon';
import { expect } from 'chai';

import Globular from './Globular';

import ApplicationFactory from './modules/application/ApplicationFactory';

describe('Globular Framework', () => {
    context('when no API nor persitency passed', () => {
        beforeEach(() => {
            sinon.stub(ApplicationFactory, 'produce').returns({ });
        });

        afterEach(() => {
            ApplicationFactory.produce.restore();
        });

        it('should indicate application factory to produce an app with API but with no persitency', () => {
            Globular.initializeApp('sampleApp');

            const callArgs = ApplicationFactory.produce.firstCall.args;
            expect(ApplicationFactory.produce.calledOnce).to.be.equal(true);
            expect(callArgs[0].api).to.not.be.equal(undefined);
            expect(callArgs[0].persistency).to.be.equal(undefined);
        });

        it('should indicate application factory to produce an with persitency passed to', () => {
            const persistency = { };
            Globular.initializeApp('sampleApp', { persistency });

            const callArgs = ApplicationFactory.produce.firstCall.args;
            expect(ApplicationFactory.produce.calledOnce).to.be.equal(true);
            expect(callArgs[0].api).to.not.be.equal(undefined);
            expect(callArgs[0].persistency).to.be.equal(persistency);
        });

        it('should indicate application factory to produce an with API passed to', () => {
            const api = { };
            Globular.initializeApp('sampleApp', { api });

            const callArgs = ApplicationFactory.produce.firstCall.args;
            expect(ApplicationFactory.produce.calledOnce).to.be.equal(true);
            expect(callArgs[0].api).to.be.equal(api);
            expect(callArgs[0].persistency).to.be.equal(undefined);
        });

        it('should make newly created app to be available', () => {
            const app = Globular.initializeApp('sampleApp');

            expect(Globular.app('sampleApp')).to.be.equal(app);
        });
    });
});
