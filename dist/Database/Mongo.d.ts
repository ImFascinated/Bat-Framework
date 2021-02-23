import { Connection } from 'mongoose';
import BatClient from '../Client/BatClient';
declare const Mongo: (mongoPath: string, instance: BatClient, dbOptions?: {}) => Promise<void>;
export declare const getMongoConnection: () => Connection;
export default Mongo;
