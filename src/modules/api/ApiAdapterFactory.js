import { ApiAdapter } from './ApiAdapter';

export default class ApiAdapterFactory {
    static produce() {
        return new ApiAdapter();
    }
}
