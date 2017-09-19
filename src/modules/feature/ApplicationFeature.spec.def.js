export class AsyncPureCore {
    execute(data) {
        this.result = data;
        return Promise.resolve(this.result);
    }
}

export class SyncPureCore {
    execute(data) {
        this.result = data;
        return this.result;
    }
}
