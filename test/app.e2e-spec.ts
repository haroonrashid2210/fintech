import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { connect, Connection } from 'mongoose';
import { ENV } from '@app/common';
import * as cookieParser from 'cookie-parser';
import { EPaymentMethod } from '../src/payments/enums';
import { EBookingStatus } from '../src/bookings/enums';

const DATA = {
  cookie: [],
  email: {
    valid: 'haroonrashid2210@gmail.com',
    invalid: 'invalid@gmail.com',
  },
  password: {
    valid: 'Password@123',
    invalid: 'Invalid@123',
  },
  firstName: 'Haroon',
  lastName: 'Rashid',
  merchantId: '',
  serviceId: '',
  bookingId: '',
};

describe('e2e Testing', () => {
  let app: INestApplication;

  let mongoConnection: Connection;
  let verificationCode = '';

  beforeAll(async () => {
    mongoConnection = (await connect(ENV.MONGODB_URI)).connection;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await app.close();
  });

  describe('Auth', () => {
    describe('/register', () => {
      it('should not register with invalid email', async () => {
        const response = await request(app.getHttpServer()).post('/auth/register').send({
          email: 'Haroon',
          firstName: DATA.firstName,
          lastName: DATA.lastName,
          password: DATA.password.valid,
        });

        expect(response.statusCode).toEqual(400);
      });

      it('should not register with weak password', async () => {
        const response = await request(app.getHttpServer()).post('/auth/register').send({
          name: DATA.email.valid,
          password: DATA.password.invalid,
        });

        expect(response.statusCode).toEqual(400);
      });

      it('should signup with with correct data', async () => {
        const response = await request(app.getHttpServer()).post('/auth/register').send({
          email: DATA.email.valid,
          firstName: DATA.firstName,
          lastName: DATA.lastName,
          password: DATA.password.valid,
        });

        verificationCode = response.body.verificationCode;

        expect(response.statusCode).toEqual(201);
      });
    });

    describe('/verify-email', () => {
      it('should not verify with invalid email', async () => {
        const response = await request(app.getHttpServer()).post('/auth/verify-email').send({
          email: DATA.email.invalid,
          verificationCode,
        });

        expect(response.statusCode).toEqual(400);
      });

      it('should not verify with invalid verificationCode', async () => {
        const response = await request(app.getHttpServer()).post('/auth/verify-email').send({
          email: DATA.email.valid,
          verificationCode: '000000',
        });

        expect(response.statusCode).toEqual(400);
      });

      it('should verify with with correct data', async () => {
        const response = await request(app.getHttpServer()).post('/auth/verify-email').send({
          email: DATA.email.valid,
          verificationCode,
        });

        expect(response.statusCode).toEqual(201);
      });
    });

    describe('/auth/login', () => {
      it('should not login with invalid email', async () => {
        const response = await request(app.getHttpServer()).post('/auth/signin').send({
          email: DATA.email.invalid,
          password: DATA.password.valid,
        });

        expect(response.statusCode).toEqual(404);
      });

      it('should not login with invalid password', async () => {
        const response = await request(app.getHttpServer()).post('/auth/signin').send({
          email: DATA.email.valid,
          password: DATA.password.invalid,
        });

        expect(response.statusCode).toEqual(404);
      });

      it('should login with correct data', async () => {
        const response = await request(app.getHttpServer()).post('/auth/login').send({
          email: DATA.email.valid,
          password: DATA.password.valid,
        });

        expect(response.statusCode).toEqual(201);
        DATA.cookie = response.headers['set-cookie']?.[0] as any;
      });
    });
  });

  describe('Merchants', () => {
    expect(DATA.cookie).toBeDefined();

    it('should fetch all merchants', async () => {
      const response = await request(app.getHttpServer()).get('/merchants').set('Cookie', DATA.cookie).send();
      expect(response.body).toHaveLength(3);
      expect(response.statusCode).toEqual(200);

      DATA.merchantId = response.body[0]?._id;
    });

    it('should fetch merchant services', async () => {
      const response = await request(app.getHttpServer())
        .get(`/merchants/${DATA.merchantId}/services`)
        .set('Cookie', DATA.cookie)
        .send();

      expect(response.body).toHaveLength(3);
      expect(response.statusCode).toEqual(200);

      DATA.serviceId = response.body[0]?._id;
    });
  });

  describe('Booking', () => {
    it('should create a booking', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .set('Cookie', DATA.cookie)
        .send({ serviceId: DATA.serviceId });

      expect(response.statusCode).toEqual(201);
      DATA.bookingId = response.body?._id;
    });
  });

  describe('Payment', () => {
    it('should do payment against booking with invalid method', async () => {
      const response = await request(app.getHttpServer())
        .post('/payments')
        .set('Cookie', DATA.cookie)
        .send({ bookingId: DATA.bookingId, method: 'ABC' });

      expect(response.statusCode).toEqual(400);
    });

    it('should do payment against booking', async () => {
      const response = await request(app.getHttpServer())
        .post('/payments')
        .set('Cookie', DATA.cookie)
        .send({ bookingId: DATA.bookingId, method: EPaymentMethod.CARD });

      expect(response.statusCode).toEqual(201);
      console.log('response.statusCode: ', response.body);
    });

    it('booking status should be booked', async () => {
      const response = await request(app.getHttpServer())
        .get(`/bookings/${DATA.bookingId}`)
        .set('Cookie', DATA.cookie)
        .send();

      expect(response.body.status).toEqual(EBookingStatus.BOOKED);
    });
  });
});
