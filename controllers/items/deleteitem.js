import { object } from '../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/joi';

'use strict';
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401', '404', '400']);

module.exports = {
    description: 'Delete item',
    tags: ['api', 'users'],
    // validate: {
    //     params: {
    //         id: Joi.number().required()
    //     },
    //     payload: Schema.additem,
    //     headers: Joi.object({
    //         'authorization': Joi.string().required()
    //     }).unknown()
    // },
    handler: async function (request, reply) {
        const credentials = request.auth.credentials;

        if (credentials.role == "user") {
            let item_owners = await this.db.item_owners.validate({ item_id: request.params.id, user_id: credentials.id });
            if (!item_owners) {
                throw Boom.unauthorized("Not permitted to edit item");
            }
        }

        let item = await this.db.items.findOne({ id: request.params.id });

        // Does item exist?
        if (!item) {
            throw Boom.notFound("Item not found");
        }

        item = request.payload;

        let listItem = await this.db.list_items.findOne({ item_id: request.params.id })

        /* if Item on List, cannot delete */
        /* should this change for mods? */
        if (listItem) 
        {
            throw Boom.preconditionFailed("Cannot Delete Item on List")
        }

        let itemOwners = await this.db.item_owners.find({ item_id: request.params.id })
        let ownerCount = object.keys(itemOwners)

        /* If more than one owner, cannot delete */
        /* Should this change for mods? */
        if( ownerCount.length > 1)
        {
            throw Boom.preconditionFailed("Cannot Delete Item with additional Owner")
        }
        else
        {
            await this.db.items.destroy({ id: request.params.id });
            return reply({ message: "Item deleted" });
        }
        
    },
    // response: {
    //     status: {
    //         200: Schema.item_response
    //     }
    // },
    plugins: {
        'hapi-swagger': swagger
    }
};