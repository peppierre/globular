import { expect } from 'chai';
import sinon from 'sinon';
import { LocalStorage } from 'node-localstorage';
import Globular from './Globular';
import ApplicationFactory from './modules/application/ApplicationFactory';
import isInterfaceImplemented from './util/isInterfaceImplemented';
import isMethod from './util/isMethod';

describe('Globular Framework', () => {
    context('when no custom plugins defined', () => {
        it('should create a new application', () => {
            expect(isInterfaceImplemented(Globular.initializeApp('sample-app'), ['getFeatures', 'getFeature', 'extendWithFeature', 'executeFeature'])).to.be.equal(true);
        });
        it('should return application immediately when initialized', () => {
            const initializedApp = Globular.initializeApp('sample-app');
            const application = Globular.app('sample-app');
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
            Globular.initializeApp('sample-app', { persistency: localStorageToInject });
            expect(FactoryStub.calledOnce).to.be.equal(true);
            expect(FactoryStub.getCall(0).args[0].persistency).to.be.equal(localStorageToInject);
        });
        it('should pass API Adapter to newly created application', () => {
            const apiAdapterToInject = { pluginCall() {}, request() {} };
            Globular.initializeApp('sample-app', { api: apiAdapterToInject });
            expect(FactoryStub.calledOnce).to.be.equal(true);
            expect(FactoryStub.getCall(0).args[0].api).to.be.equal(apiAdapterToInject);
        });
    });

    context('when examining interface', () => {
        it('should have expected overall interface', () => {
            expect(isInterfaceImplemented(Globular, ['initializeApp', 'app'])).to.be.equal(true);
        });
        it('should have expected API Adapter interface', () => {
            expect(isMethod(Globular.Api)).to.be.equal(true);
        });
    });
});
