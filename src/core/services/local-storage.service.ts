export class LocalStorageService {
    get supports_html5_storage(): boolean {
        try {
            return window && 'localStorage' in window && window['localStorage'] !== undefined;
        } catch (e) {
            console.warn('Current browser doesn\'t support local storage');
            return false;
        }
    }

    setItem(key: string, value: string): void {
        if (this.supports_html5_storage) {
            localStorage.setItem(key, value);
        }
    }

    getItem(key: string): (string | null) {
        if (this.supports_html5_storage) {
            return localStorage.getItem(key);
        }
        return null;
    }

    removeItem(key: string): void {
        if (this.supports_html5_storage) {
            localStorage.removeItem(key);
        }
    }

    hasItem(key: string): boolean {
        const v = this.getItem(key);
        return !!v;
    }

    clear(): void {
        if (this.supports_html5_storage) {
            localStorage.clear();
        }
    }
}