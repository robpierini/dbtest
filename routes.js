'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
    //admin
    { method: 'PUT', path: '/admin/{username}/role', config: Controllers.admin.updaterole },
    { method: 'GET', path: '/users', config: Controllers.admin.getusers }, //for testing
    
    //Authentication    
    { method: 'POST', path: '/create_account', config: Controllers.auth.adduser },
    { method: 'POST', path: '/login', config: Controllers.auth.login },
    { method: 'GET', path: '/logout', config: Controllers.auth.logout },

    //mod

    //items
    { method: 'GET', path: '/items', config: Controllers.items.getitems },
    { method: 'GET', path: '/items/{id}', config: Controllers.items.getitembyid },
    { method: 'GET', path: '/items/linked/{id}', config: Controllers.items.getitemsbylink },
    { method: 'PUT', path: '/items/{id}', config: Controllers.items.updateitem },
    { method: 'POST', path: '/items', config: Controllers.items.additem },
    
    //users
    { method: 'GET', path: '/users/{username}', config: Controllers.users.getuser },
    { method: 'GET', path: '/users/{username}/favorites', config: Controllers.users.getuserfav },    
    { method: 'GET', path: '/users/{username}/lists', config: Controllers.users.getuserslists },
    { method: 'PUT', path: '/users/{id}', config: Controllers.users.updateuser },
    { method: 'POST', path: '/users/lists', config: Controllers.users.addlist },
    { method: 'POST', path: '/users/items', config: Controllers.users.additem },
    
    //lists
    { method: 'GET', path: '/lists/{id}', config: Controllers.lists.getlistsbyid },
    { method: 'GET', path: '/lists', config: Controllers.lists.getlists },
    { method: 'POST', path: '/lists/listitems', config: Controllers.listitems.addlistitem },
    { method: 'DELETE', path: '/lists/listitems', config: Controllers.listitems.dellistitem },
    { method: 'PUT', path: '/lists/{id}', config: Controllers.lists.updatelist },

    //tags
    { method: 'POST', path: '/tags', config: Controllers.tags.addtag },
   // { method: 'DELETE', path: '/tags', config: Controllers.tags.deltag }
];