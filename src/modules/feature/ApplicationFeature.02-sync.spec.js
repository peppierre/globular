import { expect } from 'chai';
import sinon from 'sinon';

import { ApplicationFeature } from './ApplicationFeature';
import { SyncPureCore, SAMPLE_RESULT, SAMPLE_FAILURE } from './ApplicationFeature.specdef';

describe('Feature Module', () => {
    let feature;

    describe('Synchronous Feature', () => {
        context('view plugin functionality checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should notify view once feature finished successfully', () => {
                feature.pluginView(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledOnce).to.be.equal(true);
            });

            it('should pass result to view', () => {
                feature.pluginView(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledWith(SAMPLE_RESULT)).to.be.equal(true);
            });

            it('should ignore notifying view which is un-plugged', () => {
                feature.pluginView(view);
                feature.unplugView(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.called).to.be.equal(false);
            });
        });

        context('onStart/offStart hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
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
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should notify listener once feature finished successfully', () => {
                feature.onResult(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledOnce).to.be.equal(true);
            });

            it('should pass result to listener', () => {
                feature.onResult(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.calledWith(SAMPLE_RESULT)).to.be.equal(true);
            });

            it('should ignore notifying listener which is un-plugged', () => {
                feature.onResult(view);
                feature.offResult(view);
                feature.execute(SAMPLE_RESULT);
                expect(view.called).to.be.equal(false);
            });
        });

        context('onFailure/offFailure hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
            });

            it('should notify listener once feature failed', () => {
                feature.onFailure(view);
                feature.execute(SAMPLE_FAILURE);
                expect(view.calledOnce).to.be.equal(true);
            });

            it('should ignore notifying listener which is un-plugged', () => {
                feature.onFailure(view);
                feature.offFailure(view);
                feature.execute(SAMPLE_FAILURE);
                expect(view.called).to.be.equal(false);
            });
        });

        context('onFinished/offFinished hook checking', () => {
            let view;

            beforeEach(() => {
                view = sinon.spy();
                feature = new ApplicationFeature(new SyncPureCore());
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
