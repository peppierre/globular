import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';

import { ApplicationFeature } from './ApplicationFeature';
import { AsyncPureCore, SyncPureCore } from './ApplicationFeature.spec-def';

const SAMPLE_RESULT = 'sample-result';

describe('Feature Module', () => {
    let synchronousFeature;
    let asynchronousFeature;

    describe('Feature', () => {
        context('when a view is plugged in', () => {
            beforeEach(() => {
                synchronousFeature = new ApplicationFeature(new SyncPureCore());
            });

            it('should accept functions as view callback', () => {
                expect(() => {
                    synchronousFeature.pluginView(() => {});
                }).not.to.throw(Error);
            });

            it('should reject strings as view callback', () => {
                expect(() => {
                    synchronousFeature.pluginView('definately not a function');
                }).to.throw(Error);
            });

            it('should reject numbers as view callback', () => {
                expect(() => {
                    synchronousFeature.pluginView(42);
                }).to.throw(Error);
            });

            it('should reject booleans as view callback', () => {
                expect(() => {
                    synchronousFeature.pluginView(true);
                }).to.throw(Error);
            });

            it('should reject objects as view callback', () => {
                expect(() => {
                    synchronousFeature.pluginView({});
                }).to.throw(Error);
            });

            it('should reject undefineds as view callback', () => {
                expect(() => {
                    synchronousFeature.pluginView();
                }).to.throw(Error);
            });

            it('should return synchronousFeature itself', () => {
                const returnedFeature = synchronousFeature.pluginView(() => {

                });
                expect(returnedFeature).to.equal(synchronousFeature);
            });
        });
        context('when a view is unplugged', () => {
            const view = sinon.spy();

            it('should make view to be unavailable', () => {
                synchronousFeature.pluginView(view);
                synchronousFeature.execute(SAMPLE_RESULT);
                expect(view.calledOnce).to.be.equal(true);
                synchronousFeature.unplugView(view);
                synchronousFeature.execute(SAMPLE_RESULT);
                expect(view.calledOnce).to.be.equal(true);
            });
        });
        context('when stand-alone Feature with no persistency nor API dependency wrapped', () => {
            beforeEach(() => {
                synchronousFeature = new ApplicationFeature(new SyncPureCore());
                asynchronousFeature = new ApplicationFeature(new AsyncPureCore());
            });

            it('should execute wrapped core synchonous Feature', () => {
                expect(() => {
                    synchronousFeature.execute(SAMPLE_RESULT);
                }).not.to.throw(Error);
            });

            it('should call back all plugged-in views after execution in case of synchronous functionality', () => {
                const view1Callback = sinon.stub();
                const view2Callback = sinon.stub();

                synchronousFeature.pluginView(view1Callback);
                synchronousFeature.pluginView(view2Callback);

                synchronousFeature.execute(SAMPLE_RESULT);

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

        context('when persistency-dependent Feature is wrapped', () => {
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
                synchronousFeature = new ApplicationFeature(
                    new PersistencyCore({ persistency: mockPersistency }),
                );
            });

            afterEach(() => {
                setItemSpy.restore();
            });

            it('should use injected persistency adapter', () => {
                synchronousFeature.execute('fake value');
                expect(setItemSpy.calledOnce).to.be.equal(true);
            });
        });

        context('when API-dependent Feature is wrapped', () => {
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
                synchronousFeature = new ApplicationFeature(new ApiCore({ api: mockApi }));
            });

            afterEach(() => {
                requestSpy.restore();
            });

            it('should use injected API adapter', () => {
                synchronousFeature.execute('fake value');
                expect(requestSpy.calledOnce).to.be.equal(true);
            });
        });
    });
});
