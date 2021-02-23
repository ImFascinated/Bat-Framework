declare class Guild {
    private _id;
    private _data;
    /**
     * @description Constructs the {Guild} instance
     * @param {string} id - Guild id
     */
    constructor(id: string);
    /**
     * @description Sets data in the {Guild} object
     * @param {string} key - The data name (example: prefix)
     * @param {string} value - The data to be stored (example: !)
     * @param {boolean} forceSave - Whether to force save the guild and not wait for the auto save to save it
     */
    setData(key: string, value: Object, forceSave?: boolean): Promise<any>;
    /**
     * @description Returns a {Object} from the provided key
     * @param {string} key - Key for the data you are trying to get
     * @returns Object
     */
    getData(key: string): Object | undefined;
    /**
     * @description Saves the guild into the database
     * @param {boolean} log - Whether to log that the guild has saved
     */
    save(log?: boolean): Promise<void>;
    get id(): string;
}
export = Guild;
