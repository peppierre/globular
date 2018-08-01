import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';

import { ApplicationFeature } from './ApplicationFeature';
import { SAMPLE_RESULT, SyncPureCore } from './ApplicationFeature.specdef';

describe('Feature Module', () => {
    let feature;

    describe('Feature', () => {
        context('view plugin functionality checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should accept functions as view callback', () => {
                expect(() => {
                    feature.pluginView(() => {});
                }).not.to.throw(Error);
            });

            it('should reject strings as view callback', () => {
                expect(() => {
                    feature.pluginView('definately not a function');
                }).to.throw(Error);
            });

            it('should reject numbers as view callback', () => {
                expect(() => {
                    feature.pluginView(42);
                }).to.throw(Error);
            });

            it('should reject booleans as view callback', () => {
                expect(() => {
                    feature.pluginView(true);
                }).to.throw(Error);
            });

            it('should reject objects as view callback', () => {
                expect(() => {
                    feature.pluginView({});
                }).to.throw(Error);
            });

            it('should reject undefineds as view callback', () => {
                expect(() => {
                    feature.pluginView();
                }).to.throw(Error);
            });

            it('should return feature itself after new view plugged-in', () => {
                const returnedFeature = feature.pluginView(view);
                expect(returnedFeature).to.equal(feature);
            });

            it('should return feature itself after view unplugged', () => {
                const returnedFeature = feature.pluginView(view).unplugView(view);
                expect(returnedFeature).to.equal(feature);
            });
        });

        context('onStart/offStart hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should accept functions as listener', () => {
                expect(() => {
                    feature.onStart(() => {});
                }).not.to.throw(Error);
            });

            it('should reject strings as listener', () => {
                expect(() => {
                    feature.onStart('definately not a function');
                }).to.throw(Error);
            });

            it('should reject numbers as listener', () => {
                expect(() => {
                    feature.onStart(42);
                }).to.throw(Error);
            });

            it('should reject booleans as listener', () => {
                expect(() => {
                    feature.onStart(true);
                }).to.throw(Error);
            });

            it('should reject objects as listener', () => {
                expect(() => {
                    feature.onStart({});
                }).to.throw(Error);
            });

            it('should reject undefineds as listener', () => {
                expect(() => {
                    feature.onStart();
                }).to.throw(Error);
            });

            it('should return feature itself after new listener registered', () => {
                const returnedFeature = feature.onStart(() => {

                });
                expect(returnedFeature).to.equal(feature);
            });

            it('should return feature itself after listener unregistered', () => {
                const returnedFeature = feature.onStart(view).offStart(view);
                expect(returnedFeature).to.equal(feature);
            });
        });

        context('onResult/offResult hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should accept functions as listener', () => {
                expect(() => {
                    feature.onResult(() => {});
                }).not.to.throw(Error);
            });

            it('should reject strings as listener', () => {
                expect(() => {
                    feature.onResult('definately not a function');
                }).to.throw(Error);
            });

            it('should reject numbers as listener', () => {
                expect(() => {
                    feature.onResult(42);
                }).to.throw(Error);
            });

            it('should reject booleans as listener', () => {
                expect(() => {
                    feature.onResult(true);
                }).to.throw(Error);
            });

            it('should reject objects as listener', () => {
                expect(() => {
                    feature.onResult({});
                }).to.throw(Error);
            });

            it('should reject undefineds as listener', () => {
                expect(() => {
                    feature.onResult();
                }).to.throw(Error);
            });

            it('should return feature itself after new listener registered', () => {
                const returnedFeature = feature.onResult(() => {

                });
                expect(returnedFeature).to.equal(feature);
            });

            it('should return feature itself after listener unregistered', () => {
                const returnedFeature = feature.onResult(view).offResult(view);
                expect(returnedFeature).to.equal(feature);
            });
        });

        context('onFailure/offFailure hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should accept functions as listener', () => {
                expect(() => {
                    feature.onFailure(() => {});
                }).not.to.throw(Error);
            });

            it('should reject strings as listener', () => {
                expect(() => {
                    feature.onFailure('definately not a function');
                }).to.throw(Error);
            });

            it('should reject numbers as listener', () => {
                expect(() => {
                    feature.onFailure(42);
                }).to.throw(Error);
            });

            it('should reject booleans as listener', () => {
                expect(() => {
                    feature.onFailure(true);
                }).to.throw(Error);
            });

            it('should reject objects as listener', () => {
                expect(() => {
                    feature.onFailure({});
                }).to.throw(Error);
            });

            it('should reject undefineds as listener', () => {
                expect(() => {
                    feature.onFailure();
                }).to.throw(Error);
            });

            it('should return feature itself after new listener registered', () => {
                const returnedFeature = feature.onFailure(() => {

                });
                expect(returnedFeature).to.equal(feature);
            });

            it('should return feature itself after listener unregistered', () => {
                const returnedFeature = feature.onFailure(view).offFailure(view);
                expect(returnedFeature).to.equal(feature);
            });
        });

        context('onFinished/offFinished hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should accept functions as listener', () => {
                expect(() => {
                    feature.onFinished(() => {});
                }).not.to.throw(Error);
            });

            it('should reject strings as listener', () => {
                expect(() => {
                    feature.onFinished('definately not a function');
                }).to.throw(Error);
            });

            it('should reject numbers as listener', () => {
                expect(() => {
                    feature.onFinished(42);
                }).to.throw(Error);
            });

            it('should reject booleans as listener', () => {
                expect(() => {
                    feature.onFinished(true);
                }).to.throw(Error);
            });

            it('should reject objects as listener', () => {
                expect(() => {
                    feature.onFinished({});
                }).to.throw(Error);
            });

            it('should reject undefineds as listener', () => {
                expect(() => {
                    feature.onFinished();
                }).to.throw(Error);
            });

            it('should return feature itself after new listener registered', () => {
                const returnedFeature = feature.onFinished(() => {

                });
                expect(returnedFeature).to.equal(feature);
            });

            it('should return feature itself after listener unregistered', () => {
                const returnedFeature = feature.onFinished(view).offFinished(view);
                expect(returnedFeature).to.equal(feature);
            });
        });

        context('persistency-dependency checking', () => {
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
                feature = new ApplicationFeature(
                    new PersistencyCore({ persistency: mockPersistency }),
                );
            });

            afterEach(() => {
                setItemSpy.restore();
            });

            it('should use injected persistency adapter', () => {
                feature.execute('fake value');
                expect(setItemSpy.calledOnce).to.be.equal(true);
            });
        });

        context('API-dependency checking', () => {
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
                feature = new ApplicationFeature(new ApiCore({ api: mockApi }));
            });

            afterEach(() => {
                requestSpy.restore();
            });

            it('should use injected API adapter', () => {
                feature.execute('fake value');
                expect(requestSpy.calledOnce).to.be.equal(true);
            });
        });
    });
});
