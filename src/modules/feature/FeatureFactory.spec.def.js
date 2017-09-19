export class SyncPureCore {
    execute(data) {
        this.result = data;
        return this.result;
    }
}

/* eslint-disable class-methods-use-this */
export class InvalidCore {
    unExecute() {}
}
/* eslint-enable class-methods-use-this */
