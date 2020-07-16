export class Config {

    private static _config: Map<string, string>;

    private static init() : void {
        const REQUIRED_PROPERTIES: string[] = ['MONGO_DB_URL'];
        let config: any = {}
        try {
            config = require('../config.json');
        } catch (e) {
            console.log(`Unable to find config.json file. Skipping.`);
        }
        this._config = new Map<string, string>();

        for (let key of REQUIRED_PROPERTIES) {
            this._config.set(key, config[key] || process.env[key]);
        }
    }

    public static get(key: string): string {
        
        if (!this._config) {
            this.init();
        }
        let result: string = this._config.get(key);
        console.log(`${key} = ${result}`);
        return result;
    }
}