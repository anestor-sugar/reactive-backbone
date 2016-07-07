'use strict';
define(['jquery', 'react', 'app/collections/todos'], function($, React, Todos) {
    return React.createClass({

        componentDidMount: function() {
            $('#new-todo').on('keypress', this.handleKeyPressed);
        },

        componentWillUnmount: function() {
            $('#new-todo').off('keypress');
        },

        handleKeyPressed: function(e) {
            var $input = $('#new-todo');
            if (e.which !== 13 || !$input.val().trim()) {
                return;
            }

            Todos.create({
                title: $input.val().trim(),
                order: Todos.nextOrder(),
                completed: false
            });

            $input.val('');
        },

        render: function() {
            return (
                <div>
                    <label>New Item</label>
                    <input
                        type="text"
                        id="new-todo"
                        className="form-control"
                        defaultValue={this.props.value}
                    />
                </div>
            );
        }
    });
});
