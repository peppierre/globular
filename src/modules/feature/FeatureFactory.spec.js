import { expect } from 'chai';
import sinon from 'sinon';

import FeatureFactory from './FeatureFactory';
import * as ApplicationFeatureModule from './ApplicationFeature';
import { SyncPureCore, InvalidCore } from './FeatureFactory.spec.def';

describe('Feature Module', () => {
    describe('FeatureFactory', () => {
        it('should accept FeatureCore class with minimum required interface', () => {
            expect(() => {
                FeatureFactory.produce({ Core: SyncPureCore });
            }).not.to.throw(TypeError);
        });
        it('should reject class with no minimum required interface implemented', () => {
            expect(() => {
                FeatureFactory.produce({ Core: InvalidCore });
            }).to.throw(TypeError);
        });
        it('should instantiate a feature', () => {
            const featureSpy = sinon.spy(ApplicationFeatureModule, 'ApplicationFeature');
            FeatureFactory.produce({ Core: SyncPureCore });
            expect(featureSpy.calledWithNew()).to.be.equal(true);
        });
    });
});
