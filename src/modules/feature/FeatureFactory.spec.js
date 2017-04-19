import { LocalStorage } from 'node-localstorage';
import { expect } from 'chai';
import sinon from 'sinon';
import FeatureFactory from './FeatureFactory';

const SAMPLE_RESULT = 'sample-result';

let result;

describe('Feature Module', () => {
    class PureCore {
        execute(data) {
            result = data;
            this.result = data;
            return this.result;
        }
    }

    let feature;

    describe('FeatureFactory', () => {
        /* eslint-disable class-methods-use-this */
        class InvalidCore {
            unExecute() {}
        }
        /* eslint-enable class-methods-use-this */

        it('should accept FeatureCore class with minimum required interface', () => {
            expect(() => {
                feature = FeatureFactory.produce({ Core: PureCore });
            }).not.to.throw(TypeError);
        });
        it('should reject class with no minimum required interface implemented', () => {
            expect(() => {
                feature = FeatureFactory.produce({ Core: InvalidCore });
            }).to.throw(TypeError);
        });
    });

    describe('Feature', () => {
        context('when a view is plugged in', () => {
            beforeEach(() => {
                feature = FeatureFactory.produce({ Core: PureCore });
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
        });
        context('when stand-alone feature with no persistency nor API dependency wrapped', () => {
            const sampleView = {
                data: '',
                called: 0,
            };

            const mockView = {
                dataToDisplay: '',
                calledTimes: 0,
            };

            beforeEach(() => {
                feature = FeatureFactory.produce({ Core: PureCore });
            });
            it('should execute wrapped core feature', () => {
                feature.execute(SAMPLE_RESULT);
                expect(result).to.be.equal(SAMPLE_RESULT);
            });
            it('should return feature itself when plugging in a view', () => {
                const returnedFeature = feature.pluginView(() => {

                });
                expect(returnedFeature).to.equal(feature);
            });
            it('should call back all plugged-in views', () => {
                feature.pluginView((data) => {
                    sampleView.data = data;
                    sampleView.called += 1;
                });
                feature.pluginView((data) => {
                    mockView.dataToDisplay = data;
                    mockView.calledTimes += 1;
                });
                feature.execute(SAMPLE_RESULT);

                expect(sampleView.data).to.be.equal(SAMPLE_RESULT);
                expect(sampleView.called).to.be.equal(1);

                expect(mockView.dataToDisplay).to.be.equal(SAMPLE_RESULT);
                expect(mockView.calledTimes).to.be.equal(1);
            });
        });

        context('when persistency-dependent feature is wrapped', () => {
            class PersistencyCore {
                constructor({ persistency }) {
                    this.persistency = persistency;
                }
                execute(data) {
                    this.persistency.setItem(SAMPLE_RESULT, data);
                    return data;
                }
            }

            let mockPersistency;
            let setItemSpy;

            beforeEach(() => {
                mockPersistency = new LocalStorage('./tmp/localStorage');
                setItemSpy = sinon.spy(mockPersistency, 'setItem');
                feature = FeatureFactory.produce({
                    Core: PersistencyCore,
                    persistency: mockPersistency,
                });
            });
            afterEach(() => {
                setItemSpy.restore();
            });
            it('should use injected persistency adapter', () => {
                feature.execute('fake value');
                expect(setItemSpy.calledOnce).to.be.equal(true);
            });
        });

        context('when API-dependent feature is wrapped', () => {
            class ApiCore {
                constructor({ api }) {
                    this.api = api;
                }
                execute(data) {
                    this.api.request(SAMPLE_RESULT, data).then(() => {
                    });
                    return 'OK';
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
                feature = FeatureFactory.produce({ Core: ApiCore, api: mockApi });
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
