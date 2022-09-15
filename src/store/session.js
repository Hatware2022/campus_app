import SyncStorage from 'sync-storage';
import keys from './keys';

const intiStorage = async () => await SyncStorage.init();
intiStorage();

const session = {
    set: (key, value) => SyncStorage.set(key, value),
    setStringified: (key, value) => SyncStorage.set(key, JSON.stringify(value)),
    get: key => SyncStorage.get(key) || null,
    getParsed: key => SyncStorage.get(key) && JSON.parse(SyncStorage.get(key)) || null,
    remove: key => SyncStorage.remove(key),
    logout: () => {
        for (const [key, value] of Object.entries(keys)) {
            SyncStorage.remove(value);
        }

        session.set(keys.isFirstLaunch, "true");
    }
};

export default session;