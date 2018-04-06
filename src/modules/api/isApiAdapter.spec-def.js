export class NonPlugableApi {
    request(data) {
        this.data = data;
    }
}

export class NonRequestableApi {
    pluginCall(id, call) {
        this[id] = call;
    }
}

export class MinimumRequiredApi {
    request(data) {
        this.data = data;
    }

    pluginCall(id, call) {
        this[id] = call;
    }
}

