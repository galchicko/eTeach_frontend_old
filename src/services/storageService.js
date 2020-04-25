let _storageService = null;

const STORAGE_TYPES = {
    localStorage: 'localStorage',
    sessionStorage: 'sessionStorage'
};

class StorageService {
    constructor(storageType) {
        this.storageType = storageType;
        if (!StorageService.storageAvailable(storageType)) {
            console.warn(`Browser storage type ${this.storageType} unavailable.`);
            this.getItem = () => null;
            this.setItem = () => null;
        }
    }

    getItem(key) {
        try {
            return window[this.storageType].getItem(key);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    setItem(key, value) {
        try {
            window[this.storageType].setItem(key, value);
        } catch (e) {
            console.error(e);
        }
    }

    removeItem(key) {
        try {
            window[this.storageType].removeItem(key);
        } catch (e) {
            console.error(e);
        }
    }

    static storageAvailable(type) {
        const storage = window[type];
        try {
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
            // everything except Firefox
                e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
        }
    }
}


const getStorageService = (storageType) => {
    if (!_storageService) {
        _storageService = new StorageService(storageType);
    }
    return _storageService;
};

export { getStorageService, StorageService, STORAGE_TYPES };
