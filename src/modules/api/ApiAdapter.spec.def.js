export const fakeResult = 42;
export const properCallId = 'proper-call';

export function MockedBookTableCall(data) {
    return {
        type: 'xhr',
        config: {
            url: '/api/book-table',
            method: 'post',
            headers: { 'Allow-Origin': '*' },
            body: JSON.stringify(data),
        },
    };
}

export function MockedGetBookingsCall() {
    const date = '2017-10-30';
    const session = 'globular0423';
    return {
        type: 'xhr',
        config: {
            url: `/api/get-bookings?date=${date}&session=${session}`,
            method: 'get',
        },
    };
}

export function MockedGetQueueItemCall() {
    return {
        type: 'xhr',
        config: {
            url: '/api/get-queue-item?bookingId=5',
        },
    };
}

