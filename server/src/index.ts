import dotenv from 'dotenv';

import wssStart from './socket';
import httpStart from './http';

dotenv.config();

httpStart();
wssStart();
