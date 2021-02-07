import express, { Express } from 'express';
import compression from 'compression';
import cors from 'cors';
import config from 'config';
import morgan from 'morgan';
import * as controller from './controller';
import asyncHandler from './uti/asyncHannder';
import * as middleware from './middleware';

export default class AppBuilder {
  constructor(private app: Express = express()) {
  }

  setGlobalMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(cors({
      origin: config.get<string>('cors.origin'),
      allowedHeaders: config.get<string>('cors.allowedHeaders'),
    }));

    if (process.env.NODE_ENV !== 'test') {
      this.app.use(morgan('common'));
    }
  }

  configRouters(): void {
    const v1ProductRouter = express.Router();
    v1ProductRouter.get(
      '/',
      middleware.Authenticate,
      asyncHandler(controller.Api.V1.searchProducts),
    );
    v1ProductRouter.get(
      '/:productId',
      middleware.Authenticate,
      asyncHandler(controller.Api.V1.getProduct),
    );

    const v1Router = express.Router();
    v1Router.use('/products', v1ProductRouter);

    const apiRouter = express.Router();
    apiRouter.use('/v1', v1Router);
    apiRouter.use(controller.Api.handleApiNotFound);
    apiRouter.use(controller.Api.handleValidationError);
    apiRouter.use(controller.Api.handleNotFoundError);
    apiRouter.use(controller.Api.handleApiError);

    this.app.use('/api', apiRouter);
    this.app.use(controller.handleNotFound);
    this.app.use(controller.handleError);
  }

  getApp(): Express {
    return this.app;
  }
}
