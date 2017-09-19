import { expect } from 'chai';
import sinon from 'sinon';

import ApplicationFactory from './ApplicationFactory';
import * as ApplicationModule from './Application';

describe('Application Module', () => {
    describe('ApplicationFactory', () => {
        it('should instantiate an application', () => {
            const appConfig = { persistency: {}, api: {} };

            const featureSpy = sinon.spy(ApplicationModule, 'Application');
            /* eslint-disable no-empty */
            try {
                ApplicationFactory.produce(appConfig);
            } catch (err) {
            } finally {
                expect(featureSpy.calledWithNew()).to.be.equal(true);
                expect(featureSpy.calledWith(appConfig)).to.be.equal(true);
            }
            /* eslint-enable no-empty */
        });
    });
});
