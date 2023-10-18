import { BaseRouter } from '../../shared/router/router';
import { CategoryController } from '../controllers/category.controller';
import { CategoryMiddleware } from '../middlewares/category.middleware';

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {
    constructor() {
        super(CategoryController, CategoryMiddleware);
    }

    routes(): void {
        this.router.get('/categories', async (req, res) => this.controller.getCategories(req, res));
        this.router.post(
            '/categories',
            async (req, res, next) => this.middleware.categoryValidator(req, res, next),
            async (req, res) => this.controller.createCategory(req, res),
        );
        this.router.get('/categories/:id', async (req, res) =>
            this.controller.getCategoryById(req, res),
        );
        this.router.put('/categories/:id', async (req, res) =>
            this.controller.updateCategory(req, res),
        );
        this.router.delete('/categories/:id', async (req, res) =>
            this.controller.deleteCategory(req, res),
        );
    }
}
