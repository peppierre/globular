export const SAMPLE_RESULT = 'sample-result';
export const SAMPLE_FAILURE = 'failure-result';

export class AsyncPureCore {
    execute(data) {
        this.result = data;
        const result = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data === SAMPLE_FAILURE) {
                    reject();
                } else {
                    resolve(this.result);
                }
            }, 250);
        });
        return result;
    }
}

export class SyncPureCore {
    execute(data) {
        if (data === SAMPLE_FAILURE) {
            throw new Error();
        }
        this.result = data;
        return this.result;
    }
}
