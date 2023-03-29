import { ConfigObject } from '@nestjs/config';
import app from './app';
import database from './database';

export default (): ConfigObject => ({
    app,
    database,
});
