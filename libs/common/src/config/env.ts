import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: {
    AUTH: process.env.PORT_AUTH,
    RESERVATION: process.env.PORT_RESERVATION,
    TCP: process.env.PORT_TCP,
  },
  MONGODB_URI: process.env.MONGODB_URI,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRATION: process.env.JWT_EXPIRATION,
  },
};
