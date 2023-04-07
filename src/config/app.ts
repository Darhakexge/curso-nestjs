import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
    environment: process.env.NODE_ENV || 'dev',
    port: parseInt(process.env.PORT || '', 10) || 3000,
});
