import { LocalStorage } from 'node-localstorage';
import { expect } from 'chai';
import sinon from 'sinon';
import FeatureFactory from './FeatureFactory';

const SAMPLE_RESULT = 'sample-result';

describe('Feature Module', () => {
    class AsyncPureCore {
        execute(data) {
            this.result = data;
            return Promise.resolve(this.result);
        }
    }

    class SyncPureCore {
        execute(data) {
            this.result = data;
            return this.result;
        }
    }

    let synchonousFeature;
    let asynchronousFeature;

    describe('FeatureFactory', () => {
        /* eslint-disable class-methods-use-this */
        class InvalidCore {
            unExecute() {}
        }
        /* eslint-enable class-methods-use-this */

        it('should accept FeatureCore class with minimum required interface', () => {
            expect(() => {
                synchonousFeature = FeatureFactory.produce({ Core: SyncPureCore });
            }).not.to.throw(TypeError);
        });
        it('should reject class with no minimum required interface implemented', () => {
            expect(() => {
                synchonousFeature = FeatureFactory.produce({ Core: InvalidCore });
            }).to.throw(TypeError);
        });
    });

    describe('Feature', () => {
        context('when a view is plugged in', () => {
            beforeEach(() => {
                synchonousFeature = FeatureFactory.produce({ Core: SyncPureCore });
            });
            it('should accept functions as view callback', () => {
                expect(() => {
                    synchonousFeature.pluginView(() => {});
                }).not.to.throw(Error);
            });
            it('should reject strings as view callback', () => {
                expect(() => {
                    synchonousFeature.pluginView('definately not a function');
                }).to.throw(Error);
            });
            it('should reject numbers as view callback', () => {
                expect(() => {
                    synchonousFeature.pluginView(42);
                }).to.throw(Error);
            });
            it('should reject booleans as view callback', () => {
                expect(() => {
                    synchonousFeature.pluginView(true);
                }).to.throw(Error);
            });
            it('should reject objects as view callback', () => {
                expect(() => {
                    synchonousFeature.pluginView({});
                }).to.throw(Error);
            });
            it('should reject undefineds as view callback', () => {
                expect(() => {
                    synchonousFeature.pluginView();
                }).to.throw(Error);
            });
            it('should return synchonousFeature itself', () => {
                const returnedFeature = synchonousFeature.pluginView(() => {

                });
                expect(returnedFeature).to.equal(synchonousFeature);
            });
        });
        context('when stand-alone synchonousFeature with no persistency nor API dependency wrapped', () => {
            beforeEach(() => {
                synchonousFeature = FeatureFactory.produce({ Core: SyncPureCore });
                asynchronousFeature = FeatureFactory.produce({ Core: AsyncPureCore });
            });
            it('should execute wrapped core synchonousFeature', () => {
                expect(() => {
                    synchonousFeature.execute(SAMPLE_RESULT);
                }).not.to.throw(Error);
            });
            it('should call back all plugged-in views after execution in case of synchronous functionality', () => {
                const view1Callback = sinon.stub();
                const view2Callback = sinon.stub();

                synchonousFeature.pluginView(view1Callback);
                synchonousFeature.pluginView(view2Callback);

                synchonousFeature.execute(SAMPLE_RESULT);

                expect(view1Callback.calledOnce).to.be.equal(true);
                expect(view1Callback.calledWith(SAMPLE_RESULT)).to.be.equal(true);

                expect(view2Callback.calledOnce).to.be.equal(true);
                expect(view2Callback.calledWith(SAMPLE_RESULT)).to.be.equal(true);
            });
            it('should call back all plugged-in views after execution in case of asynchronous functionality', (done) => {
                const view1Callback = sinon.stub();
                const view2Callback = sinon.stub();

                asynchronousFeature.pluginView(view1Callback);
                asynchronousFeature.pluginView(view2Callback);

                asynchronousFeature.execute(SAMPLE_RESULT);

                setTimeout(() => {
                    expect(view1Callback.calledOnce).to.be.equal(true);
                    expect(view1Callback.calledWith(SAMPLE_RESULT)).to.be.equal(true);

                    expect(view2Callback.calledOnce).to.be.equal(true);
                    expect(view2Callback.calledWith(SAMPLE_RESULT)).to.be.equal(true);

                    done();
                }, 500);
            });
        });

        context('when persistency-dependent synchonousFeature is wrapped', () => {
            class PersistencyCore {
                constructor({ persistency }) {
                    this.persistency = persistency;
                }
                execute(data) {
                    this.persistency.setItem(SAMPLE_RESULT, data);
                    return Promise.resolve(data);
                }
            }

            let mockPersistency;
            let setItemSpy;

            beforeEach(() => {
                mockPersistency = new LocalStorage('./tmp/localStorage');
                setItemSpy = sinon.spy(mockPersistency, 'setItem');
                synchonousFeature = FeatureFactory.produce({
                    Core: PersistencyCore,
                    persistency: mockPersistency,
                });
            });
            afterEach(() => {
                setItemSpy.restore();
            });
            it('should use injected persistency adapter', () => {
                synchonousFeature.execute('fake value');
                expect(setItemSpy.calledOnce).to.be.equal(true);
            });
        });

        context('when API-dependent synchonousFeature is wrapped', () => {
            class ApiCore {
                constructor({ api }) {
                    this.api = api;
                }

                execute(data) {
                    this.api.request(SAMPLE_RESULT, data).then(() => {
                    });
                    return Promise.resolve('OK');
                }
                }

            let mockApi;
            let requestSpy;

            beforeEach(() => {
                mockApi = {
                    request: () => ({
                        then: () => {

                        },
                    }),
                };
                requestSpy = sinon.spy(mockApi, 'request');
                synchonousFeature = FeatureFactory.produce({ Core: ApiCore, api: mockApi });
            });
            afterEach(() => {
                requestSpy.restore();
            });
            it('should use injected API adapter', () => {
                synchonousFeature.execute('fake value');
                expect(requestSpy.calledOnce).to.be.equal(true);
            });
        });
    });
});
