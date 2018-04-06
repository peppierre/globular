import { expect } from 'chai';
import sinon from 'sinon';
import ApiAdapterFactory from './ApiAdapterFactory';
import * as Api from './ApiAdapter';

describe('Api Module', () => {
    describe('ApiAdapterFactory', () => {
        beforeEach(() => {
            sinon.stub(Api, 'ApiAdapter').returns({
                request: () => {},
                pluginCall: () => {},
            });
        });

        afterEach(() => {
            Api.ApiAdapter.restore();
        });

        it('should produce new API Adapter', () => {
            ApiAdapterFactory.produce();
            expect(Api.ApiAdapter.calledWithNew()).to.be.equal(true);
        });
    });
});
