/*global define */
define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'app/models/todo'
], function (_, Backbone, Store, Todo) {
    'use strict';

    var TodosCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Todo,

        localStorage: new Store('todos-backbone'),

        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },

        comparator: 'order'
    });

    return new TodosCollection();
});
