import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { AuthRouter } from './auth/routes/auth.router';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { CategoryRouter } from './category/routes/category.router';
import { ServerConfig } from './config/config';
import { CustomerRouter } from './customer/routes/customer.router';
import { ProductRouter } from './product/routes/product.router';
import { PurchaseProductRouter } from './purchase/routes/purchase-product.router';
import { PurchaseRouter } from './purchase/routes/purchase.router';
import { UserRouter } from './user/routes/user.router';

class ServerBootstrap extends ServerConfig {
    private readonly app: express.Application = express();
    private readonly port: number = this.getNumberEnvironment('PORT');

    constructor() {
        super();
        console.log('mitico');
        console.log(process.env.DB_HOST);
        this.config();
        void this.dbConnect();
        this.listen();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.passportUse();
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use('/api', this.routers());
    }

    private routers(): express.Router[] {
        return [
            new UserRouter().router,
            new ProductRouter().router,
            new CustomerRouter().router,
            new CategoryRouter().router,
            new PurchaseRouter().router,
            new PurchaseProductRouter().router,
            new AuthRouter().router,
        ];
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }

    async dbConnect(): Promise<void> {
        return this.initConnect
            .then(() => console.log('Data Source has been initialized!'))
            .catch(err => console.error('Error during Data Source initialization', err));
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server up and running on port ${this.port}`);
        });
    }
}

// eslint-disable-next-line no-new
new ServerBootstrap();
