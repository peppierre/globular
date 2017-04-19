import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';
import isInterfaceImplemented from '../../util/isInterfaceImplemented';
import ApplicationFactory from './ApplicationFactory';
import FeatureFactory from '../../modules/feature/FeatureFactory';

describe('Application Module', () => {
    describe('ApplicationFactory', () => {
        it('should accept if no configuration defined at all', () => {
            expect(() => {
                ApplicationFactory.produce();
            }).not.to.throw(TypeError);
        });
        it('should accept if no persistency neither API configuration defined', () => {
            expect(() => {
                ApplicationFactory.produce({});
            }).not.to.throw(TypeError);
        });
        it('should accept persistency with Storage API implemented', () => {
            const localStorage = new LocalStorage('./tmp/localStorage');
            expect(() => {
                ApplicationFactory.produce({ persistency: localStorage });
            }).not.to.throw(TypeError);
        });
        it('should reject persistency with no proper Storage API implemented', () => {
            expect(() => {
                ApplicationFactory.produce({ persistency: {} });
            }).to.throw(TypeError);
        });
        it('should accept API adapter with API Adapter API implemented', () => {
            expect(() => {
                ApplicationFactory.produce({ api: {
                    request: () => {},
                    pluginCall: () => {},
                } });
            }).not.to.throw(TypeError);
        });
        it('should reject API adapter with no proper API Adapter API implemented', () => {
            expect(() => {
                ApplicationFactory.produce({ api: {} });
            }).to.throw(TypeError);
        });
    });
    describe('Application', () => {
        context('when application is ready to manage features', () => {
            let application;

            beforeEach(() => {
                application = ApplicationFactory.produce({});
            });
            it('should have an empty list of features by default', () => {
                expect(application.getFeatures()).to.deep.equal([]);
            });
            it('should be extended by a feature with core implementing required API', () => {
                /* eslint-disable class-methods-use-this */
                class SimpleFeatureCore {
                    execute() {}
                }
                /* eslint-enable class-methods-use-this */
                application.extendWithFeature('goalie-in', SimpleFeatureCore);
                expect(application.getFeatures()).to.deep.equal(['goalie-in']);
            });
            it('should return feature when extended', () => {
                /* eslint-disable class-methods-use-this */
                class SimpleFeatureCore {
                    execute() {}
                }
                /* eslint-enable class-methods-use-this */
                const feature = application.extendWithFeature('goalie-in', SimpleFeatureCore);
                expect(isInterfaceImplemented(feature, ['execute'])).to.equal(true);
            });
            it('should return feature after extended', () => {
                /* eslint-disable class-methods-use-this */
                class SimpleFeatureCore {
                    execute() {}
                }
                /* eslint-enable class-methods-use-this */
                const featureWhileExtending = application.extendWithFeature('goalie-in', SimpleFeatureCore);
                const featureAfterExtending = application.getFeature('goalie-in');
                expect(featureWhileExtending).to.equal(featureAfterExtending);
            });
            it('should execute a feature already available', () => {
                const coreMock = {
                    execute: sinon.stub(),
                };

                /* eslint-disable class-methods-use-this */
                class SimpleFeatureCore {
                    execute() {
                        coreMock.execute();
                    }
                }
                /* eslint-enable class-methods-use-this */
                application.extendWithFeature('score-team', SimpleFeatureCore);

                application.executeFeature('score-team');
                expect(coreMock.execute.calledOnce).to.be.equal(true);
            });
            it('should not throw error when feature to execute is not available', () => {
                expect(() => {
                    application.executeFeature('punish-player');
                }).not.to.throw(Error);
            });
            it('should replace already added feature when feature with same id is added to', () => {
                const coreMock1 = {
                    execute: sinon.stub(),
                };

                const coreMock2 = {
                    execute: sinon.stub(),
                };

                /* eslint-disable class-methods-use-this */
                class SimpleFeatureCore1 {
                    execute() {
                        coreMock1.execute();
                    }
                }
                class SimpleFeatureCore2 {
                    execute() {
                        coreMock2.execute();
                    }
                }
                /* eslint-enable class-methods-use-this */
                application.extendWithFeature('score-team', SimpleFeatureCore1);
                application.extendWithFeature('score-team', SimpleFeatureCore2);
                expect(application.getFeatures()).to.deep.equal(['score-team']);

                application.executeFeature('score-team');
                expect(coreMock1.execute.called).to.be.equal(false);
                expect(coreMock2.execute.calledOnce).to.be.equal(true);
            });
        });
        context('when dependency is injected to application', () => {
            let FactoryStub;

            beforeEach(() => {
                FactoryStub = sinon.stub(FeatureFactory, 'produce');
            });

            afterEach(() => {
                FactoryStub.restore();
            });

            /* eslint-disable class-methods-use-this */
            class SimpleFeatureCore {
                execute() {}
            }
            /* eslint-enable class-methods-use-this */

            it('should pass persistency to feature factory while extending with new feature', () => {
                const persistencyStub = {
                    getItem: () => {},
                    setItem: () => {},
                    removeItem: () => {},
                    clear: () => {},
                };
                const application = ApplicationFactory.produce({
                    Core: SimpleFeatureCore,
                    persistency: persistencyStub,
                });
                application.extendWithFeature('end-period');
                expect(FactoryStub.calledOnce).to.be.equal(true);
                expect(FactoryStub.getCall(0).args[0].persistency).to.be.equal(persistencyStub);
            });

            it('should pass api to feature factory while extending with new feature', () => {
                const apiStub = {
                    pluginCall: () => {},
                    request: () => {},
                };
                const application = ApplicationFactory.produce({
                    Core: SimpleFeatureCore,
                    api: apiStub,
                });
                application.extendWithFeature('goalie-out');
                expect(FactoryStub.calledOnce).to.be.equal(true);
                expect(FactoryStub.getCall(0).args[0].api).to.be.equal(apiStub);
            });
        });
    });
});
