import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';

import FeatureFactory from './FeatureFactory';
import * as ApplicationFeatureModule from './ApplicationFeature';
import * as TestClasses from './FeatureFactory.spec-def';

describe('Feature Module', () => {
    describe('FeatureFactory', () => {
        let featureSpy;
        let coreSpy;

        beforeEach(() => {
            featureSpy = sinon.spy(ApplicationFeatureModule, 'ApplicationFeature');
            coreSpy = sinon.spy(TestClasses, 'SyncPureCore');
        });

        afterEach(() => {
            featureSpy.restore();
            coreSpy.restore();
        });

        it('should accept FeatureCore class with minimum required interface', () => {
            expect(() => {
                FeatureFactory.produce({ Core: TestClasses.SyncPureCore });
            }).not.to.throw(TypeError);
        });

        it('should reject class with no minimum required interface implemented', () => {
            expect(() => {
                FeatureFactory.produce({ Core: TestClasses.InvalidCore });
            }).to.throw(TypeError);
        });

        it('should instantiate a core to inject into feature', () => {
            FeatureFactory.produce({ Core: TestClasses.SyncPureCore });
            expect(coreSpy.calledWithNew()).to.be.equal(true);
        });

        it('should pass persistency to feature core wrapped', () => {
            const localStorage = new LocalStorage('./tmp/localStorage');
            FeatureFactory.produce({ Core: TestClasses.SyncPureCore, persistency: localStorage });

            const callArgs = coreSpy.firstCall.args;
            expect(callArgs[0].persistency).to.be.equal(localStorage);
        });

        it('should pass API adapter to feature core wrapped', () => {
            const apiAdapter = { request: () => {} };
            FeatureFactory.produce({ Core: TestClasses.SyncPureCore, api: apiAdapter });

            const callArgs = coreSpy.firstCall.args;
            expect(callArgs[0].api).to.be.equal(apiAdapter);
        });

        it('should instantiate a feature with core', () => {
            FeatureFactory.produce({ Core: TestClasses.SyncPureCore });
            expect(featureSpy.calledWithNew()).to.be.equal(true);

            const callArgs = featureSpy.firstCall.args;
            expect(callArgs[0].fakeProperty).to.be.equal(42);
        });
    });
});
