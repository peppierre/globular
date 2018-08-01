import { expect } from 'chai';
import sinon from 'sinon';

import { ApplicationFeature } from './ApplicationFeature';
import { AsyncPureCore, SAMPLE_RESULT, SAMPLE_FAILURE } from './ApplicationFeature.specdef';

describe('Feature Module', () => {
    let feature;

    describe('Asynchronous Feature', () => {
        context('view plugin functionality checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new AsyncPureCore());
            });

            it('should notify view once feature finished successfully', (done) => {
                feature.pluginView(view);
                feature.execute(SAMPLE_RESULT);
                setTimeout(() => {
                    expect(view.calledOnce).to.be.equal(true);
                    done();
                }, 500);
            });

            it('should pass result to view', (done) => {
                feature.pluginView(view);
                feature.execute(SAMPLE_RESULT);
                setTimeout(() => {
                    expect(view.calledWith(SAMPLE_RESULT)).to.be.equal(true);
                    done();
                }, 500);
            });

            it('should ignore notifying view which is un-plugged', (done) => {
                feature.pluginView(view);
                feature.unplugView(view);
                feature.execute(SAMPLE_RESULT);
                setTimeout(() => {
                    expect(view.called).to.be.equal(false);
                    done();
                }, 500);
            });
        });

        context('onStart/offStart hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new AsyncPureCore());
            });

            it('should notify listener once feature is started', () => {
                feature.onStart(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledOnce).to.be.equal(true);
            });

            it('should pass feature parameter to listener', () => {
                feature.onStart(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledWith(SAMPLE_RESULT)).to.be.equal(true);
            });

            it('should ignore notifying listener which is un-plugged', () => {
                feature.onStart(view);
                feature.offStart(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.called).to.be.equal(false);
            });
        });

        context('onResult/offResult hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new AsyncPureCore());
            });

            it('should notify listener once feature finished successfully', (done) => {
                feature.onResult(view);
                feature.execute(SAMPLE_RESULT);
                setTimeout(() => {
                    expect(view.calledOnce).to.be.equal(true);
                    done();
                }, 500);
            });

            it('should pass result to listener', (done) => {
                feature.onResult(view);
                feature.execute(SAMPLE_RESULT);
                setTimeout(() => {
                    expect(view.calledWith(SAMPLE_RESULT)).to.be.equal(true);
                    done();
                }, 500);
            });

            it('should ignore notifying listener which is un-plugged', (done) => {
                feature.onResult(view);
                feature.offResult(view);
                feature.execute(SAMPLE_RESULT);
                setTimeout(() => {
                    expect(view.called).to.be.equal(false);
                    done();
                }, 500);
            });
        });

        context('onFailure/offFailure hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new AsyncPureCore());
            });

            it('should notify listener once feature failed', (done) => {
                feature.onFailure(view);
                feature.execute(SAMPLE_FAILURE);
                setTimeout(() => {
                    expect(view.calledOnce).to.be.equal(true);
                    done();
                }, 500);
            });

            it('should ignore notifying listener which is un-plugged', (done) => {
                feature.onFailure(view);
                feature.offFailure(view);
                feature.execute(SAMPLE_FAILURE);
                setTimeout(() => {
                    expect(view.called).to.be.equal(false);
                    done();
                }, 500);
            });
        });

        context('onFinished/offFinished hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new AsyncPureCore());
            });

            it('should notify listener once feature finished successfully', () => {
                feature.onFinished(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledOnce).to.be.equal(true);
            });

            it('should notify listener once feature failed', () => {
                feature.onFinished(view);
                feature.execute(SAMPLE_FAILURE);
                expect(view.calledOnce).to.be.equal(true);
            });

            it('should ignore notifying listener which is un-plugged', () => {
                feature.onFinished(view);
                feature.offFinished(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.called).to.be.equal(false);
            });
        });
    });
});
