import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';

import { Application } from './Application';
import FeatureFactory from '../../modules/feature/FeatureFactory';
import { SimpleFeatureCore } from './Application.spec-def';

describe('Application Module', () => {
    describe('Application', () => {
        let application;

        context('when creating application', () => {
            it('should be able to create an application with no persistency nor API', () => {
                expect(() => {
                    application = new Application();
                }).not.to.throw(TypeError);
            });

            it('should accept persistency with Storage API implemented', () => {
                const localStorage = new LocalStorage('./tmp/localStorage');
                expect(() => {
                    application = new Application({ persistency: localStorage });
                }).not.to.throw(TypeError);
            });

            it('should reject persistency with no proper Storage API implemented', () => {
                expect(() => {
                    application = new Application({ persistency: {} });
                }).to.throw(TypeError);
            });

            it('should accept API Adapter with API API implemented', () => {
                expect(() => {
                    application = new Application({ api: {
                        pluginCall: () => true,
                        unplugCall: () => true,
                        request: () => true,
                    },
                    });
                }).not.to.throw(TypeError);
            });

            it('should reject API Adapter with no proper api API implemented', () => {
                expect(() => {
                    application = new Application({ api: {} });
                }).to.throw(TypeError);
            });
        });

        context('when application is being configured', () => {
            const localStorage = new LocalStorage('./tmp/localStorage');
            const apiAdapter = {
                pluginCall: () => true,
                unplugCall: () => true,
                request: () => true,
            };
            const mockFeature = {};

            beforeEach(() => {
                application = new Application({ persistency: localStorage, api: apiAdapter });
                sinon.stub(FeatureFactory, 'produce').returns(mockFeature);
            });

            afterEach(() => {
                FeatureFactory.produce.restore();
            });

            it('should be able to be extend with a feature', () => {
                application.extendWithFeature('goalie-in', SimpleFeatureCore);
                const availableFeatures = application.getFeatureNames();

                expect(availableFeatures.length).to.be.equal(1);
                expect(availableFeatures.includes('goalie-in')).to.be.equal(true);
            });

            it('should be able to be shrinked by a feature', () => {
                application.extendWithFeature('goalie-in', SimpleFeatureCore);
                application.shrinkWithFeature('goalie-in');
                const availableFeatures = application.getFeatureNames();

                expect(availableFeatures.length).to.be.equal(0);
            });

            it('should return feature instance when available', () => {
                application.extendWithFeature('goalie-in', SimpleFeatureCore);
                const feature = application.getFeature('goalie-in');
                expect(feature).to.be.equal(mockFeature);
            });

            it('should return undefined when no requested feature added to application', () => {
                application.extendWithFeature('goalie-in', SimpleFeatureCore);
                const feature = application.getFeature('goalie-out');
                expect(feature).to.be.equal(undefined);
            });

            it('should pass persistency and API adapter to feature', () => {
                application.extendWithFeature('goalie-in', SimpleFeatureCore);

                const call = FeatureFactory.produce.getCall(0);

                expect(FeatureFactory.produce.calledOnce).to.be.equal(true);
                expect(typeof call.args[0]).to.be.equal('object');
                expect(call.args[0].Core).to.be.equal(SimpleFeatureCore);
                expect(call.args[0].persistency).to.be.equal(localStorage);
                expect(call.args[0].api).to.be.equal(apiAdapter);
            });
        });

        context('when application is executing', () => {
            let feature;

            beforeEach(() => {
                feature = {
                    execute: sinon.spy(),
                };
                sinon.stub(FeatureFactory, 'produce').returns(feature);

                application = new Application();
                application.extendWithFeature('goalie-in', SimpleFeatureCore);
            });

            afterEach(() => {
                FeatureFactory.produce.restore();
            });

            it('should run existing feature when required', () => {
                application.executeFeature('goalie-in');

                expect(feature.execute.calledOnce).to.be.equal(true);
            });

            it('should not do anything when unregistered feature is required to run', () => {
                expect(() => {
                    application.executeFeature('goalie-out');
                }).not.to.throw(Error);

                expect(feature.execute.calledOnce).to.be.equal(false);
            });

            it('should pass received arguments to feature', () => {
                application.executeFeature('goalie-in', '97');

                expect(feature.execute.getCall(0).args[0]).to.be.equal('97');
            });
        });
    });
});
