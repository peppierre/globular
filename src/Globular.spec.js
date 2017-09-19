import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';

import globular from './Globular';
import ApplicationFactory from './modules/application';
import isInterfaceImplemented from './util/isInterfaceImplemented';
import isMethod from './util/isMethod';

describe('globular Framework', () => {
    context('when no custom plugins defined', () => {
        it('should create a new application', () => {
            expect(isInterfaceImplemented(globular.initializeApp('sample-app'), ['getFeatures', 'getFeature', 'extendWithFeature', 'executeFeature'])).to.be.equal(true);
        });
        it('should return application immediately when initialized', () => {
            const initializedApp = globular.initializeApp('sample-app');
            const application = globular.app('sample-app');
            expect(application).to.equal(initializedApp);
        });
    });
    context('when custom plugins defined', () => {
        let FactoryStub;

        beforeEach(() => {
            FactoryStub = sinon.stub(ApplicationFactory, 'produce');
        });
        afterEach(() => {
            FactoryStub.restore();
        });
        it('should pass Persistency Adapter to newly created application', () => {
            const localStorageToInject = new LocalStorage('./tmp/localStorage');
            globular.initializeApp('sample-app', { persistency: localStorageToInject });
            expect(FactoryStub.calledOnce).to.be.equal(true);
            expect(FactoryStub.lastCall.args[0].persistency).to.be.equal(localStorageToInject);
        });
        it('should pass API Adapter to newly created application', () => {
            const apiAdapterToInject = { pluginCall() {}, request() {} };
            globular.initializeApp('sample-app', { api: apiAdapterToInject });
            expect(FactoryStub.calledOnce).to.be.equal(true);
            expect(FactoryStub.lastCall.args[0].api).to.be.equal(apiAdapterToInject);
        });
        it('should pass default API Adapter instance to application when no Adapter defined', () => {
            globular.initializeApp('sample-app1');
            expect(FactoryStub.lastCall.args[0].api).not.to.be.equal(undefined);

            globular.initializeApp('sample-app2', {});
            expect(FactoryStub.lastCall.args[0].api).not.to.be.equal(undefined);

            globular.initializeApp('sample-app3', { persistency: new LocalStorage('./tmp/localStorage') });
            expect(FactoryStub.lastCall.args[0].api).not.to.be.equal(undefined);
        });
    });

    context('when examining interface', () => {
        it('should have expected overall interface', () => {
            expect(isInterfaceImplemented(globular, ['initializeApp', 'app'])).to.be.equal(true);
        });
        it('should have expected API Adapter interface', () => {
            expect(isMethod(globular.Api)).to.be.equal(true);
        });
    });
});
