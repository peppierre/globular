import { expect } from 'chai';
import sinon from 'sinon';
import { ApiAdapter } from './ApiAdapter';
import { properCallId, MockedBookTableCall, MockedGetBookingsCall, MockedGetQueueItemCall } from './ApiAdapter.specdef';

describe('API Module', () => {
    describe('ApiAdapter', () => {
        let api;

        beforeEach(() => {
            api = new ApiAdapter();
        });

        it('should be able to plug in a call', () => {
            api.pluginCall(properCallId, () => {});

            const availableCalls = api.getAvailableCalls();
            expect(availableCalls.length).to.be.equal(1);
            expect(availableCalls.includes(properCallId)).to.be.equal(true);
        });

        it('should be able to unplug a call', () => {
            api.pluginCall(properCallId, () => {});
            api.unplugCall(properCallId);

            const availableCalls = api.getAvailableCalls();
            expect(availableCalls.length).to.be.equal(0);
        });

        context('when relevant API call is plugged in', () => {
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
        });

        context('when relevant API call is not plugged in', () => {
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
        });

        context('when relevant API call is plugged in more then once', () => {
            let requests;

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

            it('should be pluggable once only', () => {
                api.pluginCall(properCallId, MockedBookTableCall);
                api.pluginCall(properCallId, MockedGetBookingsCall);
                expect(api.getAvailableCalls().length).to.be.equal(1);
            });
        });

        context('when invalid API call tried to be plugged in', () => {
            it('should throw error', () => {
                expect(() => {
                    api.pluginCall(properCallId, '');
                }).to.throw(Error);
                expect(api.getAvailableCalls().length).to.be.equal(0);
            });
        });
    });
});
