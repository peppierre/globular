import { expect } from 'chai';
import isPersistencyAdapter from './isPersistencyAdapter';
import { MinimumRequiredApi, NonGetableApi, NonSetableApi, NonRemovableApi, NonClearableApi } from './isPersistencyAdapter.spec.def';

describe('Persistency Module', () => {
    describe('Persistency Adapter Validator', () => {
        context('when proper API implementation is passed to', () => {
            it('should return true', () => {
                expect(isPersistencyAdapter(new MinimumRequiredApi())).to.be.equal(true);
            });
        });
        context('when invalid API implementation is passed to', () => {
            it('should return false', () => {
                expect(isPersistencyAdapter(new NonGetableApi())).to.be.equal(false);
                expect(isPersistencyAdapter(new NonSetableApi())).to.be.equal(false);
                expect(isPersistencyAdapter(new NonRemovableApi())).to.be.equal(false);
                expect(isPersistencyAdapter(new NonClearableApi())).to.be.equal(false);
            });
        });
    });
});
