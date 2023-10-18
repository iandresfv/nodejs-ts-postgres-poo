import { type Request, type Response } from 'express';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { CategoryService } from '../services/category.service';

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async getCategories(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const categories = await this.categoryService.findAllCategoties();
            if (categories.length === 0) {
                return this.httpResponse.NotFound(res, 'Categories not found');
            }
            return this.httpResponse.Ok(res, categories);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getCategoryById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const category = await this.categoryService.findCategoryById(id);
            if (category === null) {
                return this.httpResponse.NotFound(res, 'Category not found');
            }
            return this.httpResponse.Ok(res, category);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createCategory(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateCategory(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const {
                body,
                params: { id },
            } = req;
            const data: UpdateResult = await this.categoryService.updateCategory(id, body);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update category. Category with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.categoryService.deleteCategory(id);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update category. Category with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
