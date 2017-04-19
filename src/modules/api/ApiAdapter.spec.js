import { expect } from 'chai';
import sinon from 'sinon';
import ApiAdapter from './ApiAdapter';
import { fakeResult, properCallId, MockedBookTableCall, MockedGetBookingsCall, MockedGetQueueItemCall } from './ApiAdapter.spec.def';

describe('API Module', () => {
    describe('ApiAdapter', () => {
        let api;
        beforeEach(() => {
            api = new ApiAdapter();
        });
        context('with focusing on API calls', () => {
            let requests;

            function checkIfMockedBookTableCalled(request) {
                expect(request.url).to.be.equal('/api/book-table');
                expect(request.method.toLowerCase()).to.be.equal('post');
                expect(Object.keys(request.requestHeaders).length).to.be.equal(1);
                expect(request.requestHeaders['Allow-Origin']).to.be.equal('*');
                expect(request.requestBody).to.be.equal('{}');
            }

            function responseToMockedBookTableCall() {
                requests[0].respond(
                    200,
                    {
                        'Content-Type': 'text/plain',
                    },
                    '42',
                );
            }

            function checkIfMockedGetBookingCalled(request) {
                expect(request.method.toLowerCase()).to.be.equal('get');
            }

            function responseToMockedGetBookingCall() {
                requests[0].respond(
                    200,
                    {
                        'Content-Type': 'text/plain',
                    },
                    '42',
                );
            }

            beforeEach(() => {
                global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
                requests = [];
                global.XMLHttpRequest.onCreate = (xhr) => {
                    requests.push(xhr);
                };
            });
            afterEach(() => {
                global.XMLHttpRequest.restore();
            });
            it('should be pluggable with propert calls', () => {
                expect(() => {
                    api.pluginCall(properCallId, MockedBookTableCall);
                }).not.to.throw(Error);
                expect(() => {
                    api.pluginCall(properCallId, '');
                }).to.throw(Error);
                expect(() => {
                    api.pluginCall(properCallId, 6);
                }).to.throw(Error);
                expect(() => {
                    api.pluginCall(properCallId, {});
                }).to.throw(Error);
                expect(() => {
                    api.pluginCall(properCallId, true);
                }).to.throw(Error);
                expect(() => {
                    api.pluginCall(properCallId);
                }).to.throw(Error);
            });
            it('should be transformed properly from data', (done) => {
                api.pluginCall(properCallId, MockedBookTableCall);
                api.request(properCallId, {}).then(() => {
                    done();
                });

                checkIfMockedBookTableCalled(requests[0]);
                responseToMockedBookTableCall(requests[0]);
            });
            it('should be called via GET if no method defined in plugin', (done) => {
                api.pluginCall(properCallId, MockedGetQueueItemCall);
                api.request(properCallId, {}).then(() => {
                    done();
                });

                checkIfMockedGetBookingCalled(requests[0]);
                responseToMockedGetBookingCall(requests[0]);
            });
            it('should be resolved when call finished successfully', (done) => {
                api.pluginCall(properCallId, MockedBookTableCall);
                api.request(properCallId, {}).then((result) => {
                    expect(result).to.be.equal('42');
                    done();
                });
                responseToMockedBookTableCall(requests[0]);
            });
            it('should be rejected when call failed', (done) => {
                api.pluginCall(properCallId, MockedBookTableCall);
                api.request(properCallId, {}).then(() => {
                    expect(true).to.be.equal(false);
                    done();
                }).catch(() => {
                    expect(true).to.be.equal(true);
                    done();
                });
                requests[0].respond(500);
            });
            it('should be rejected when network error occured', (done) => {
                api.pluginCall(properCallId, MockedBookTableCall);
                api.request(properCallId, {}).then(() => {
                    expect(true).to.be.equal(false);
                    done();
                }).catch(() => {
                    expect(true).to.be.equal(true);
                    done();
                });
                requests[0].respond(0);
            });
            it('should be rejected when not-yet-plugged-in call is called', (done) => {
                api.request(properCallId, {})
                    .then(() => {
                        expect().to.fail('API call is resolved accidentally');
                        done();
                    })
                    .catch((result) => {
                        expect(result).to.be.equal(`No API call found (${properCallId})`);
                        done();
                    });
            });
            it('should be pluggable once only', (done) => {
                api.pluginCall(properCallId, MockedBookTableCall);
                api.pluginCall(properCallId, MockedGetBookingsCall);
                api.request(properCallId, {}).then((result) => {
                    expect(result).to.be.equal(fakeResult.toString());
                    done();
                });

                checkIfMockedBookTableCalled(requests[0]);
                responseToMockedBookTableCall(requests[0]);
            });
        });
    });
});
