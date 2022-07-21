const productsModel = require('../model/ProductsModel');
const { ObjectId } = require('mongodb');

module.exports = new class ProductsService {
    async createProduct(body) {
        const product = new productsModel(body);

        try {
            await product.save();
            return product;    
        } catch (error) {
            return error;
        }
    }

    async listAll(params) {
        const page = (params.page ? Number(params.page) : 1);
        const limit = (params.limit ? Number(params.limit) : 5);
        const offset = (page - 1) * limit;
        let filter = {};

        if (params.name) {
            filter.name = {$regex: params.name, $options: 'i'};
        }

        if (params.price) {
            filter.netPrice = params.price;
        }
        
        const productsTotal = await productsModel.find(filter);
        const products = await productsModel.find(filter).skip(offset).limit(limit).select().lean();
        const productsList = {
            total: productsTotal.length,
            products: products
        };

        return productsList;
    }

    async findById(id) {
        let product = await productsModel.findById({'_id': id});
        if (!product) {
            product = {};
        }
        return product;
    }

    async updateProduct(id, body) {
        try {
            const product = productsModel.findByIdAndUpdate({'_id': id}, body, { new: true });
            return product;
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            await productsModel.deleteOne({'_id': id});
        } catch (error) {
            return error;
        }
    }
}