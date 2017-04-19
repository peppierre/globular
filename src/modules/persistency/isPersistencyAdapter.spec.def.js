/* eslint-disable class-methods-use-this */
export class NonGetableApi {
    setItem() {}
    removeItem() {}
    clear() {}
}

export class NonSetableApi {
    getItem() {}
    removeItem() {}
    clear() {}
}

export class NonRemovableApi {
    getItem() {}
    setItem() {}
    clear() {}
}

export class NonClearableApi {
    getItem() {}
    setItem() {}
    removeItem() {}
}

export class MinimumRequiredApi {
    getItem() {}
    setItem() {}
    removeItem() {}
    clear() {}
}
/* eslint-enable class-methods-use-this */
