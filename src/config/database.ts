import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
    host: process.env.DB_HOST || null,
    port: parseInt(process.env.DB_PORT || '', 10) || null,
    database: process.env.DB_DATABASE || null,
});
