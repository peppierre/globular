import { expect } from 'chai';
import isApiAdapter from './isApiAdapter';

class NonPlugableApi {
    request(data) {
        this.data = data;
    }
}

class NonRequestableApi {
    pluginCall(id, call) {
        this[id] = call;
    }
}

class MinimumRequiredApi {
    request(data) {
        this.data = data;
    }

    pluginCall(id, call) {
        this[id] = call;
    }
}

describe('API Module', () => {
    describe('API Adapter Validator', () => {
        context('when proper API implementation is passed to', () => {
            it('should return true', () => {
                expect(isApiAdapter(new MinimumRequiredApi())).to.be.equal(true);
            });
        });
        context('when invalid API implementation is passed to', () => {
            it('should return false', () => {
                expect(isApiAdapter(new NonPlugableApi())).to.be.equal(false);
                expect(isApiAdapter(new NonRequestableApi())).to.be.equal(false);
            });
        });
    });
});
