'use strict';
define([
    'underscore',
    'react',
    'app/components/todo',
    'app/components/new-todo'
], function(_, React, Todo, NewTodo) {
    return React.createClass({

        getInitialState: function() {
            return {rows: []}
        },

        componentDidMount: function() {
            this.props.todos.on('add', _.bind(this.handleCollectionChanged, this));
            this.props.todos.on('remove', _.bind(this.handleCollectionChanged, this));
            this.props.todos.on('reset', _.bind(this.handleCollectionChanged, this));
            this.props.todos.on('all', _.bind(this.handleCollectionChanged, this));
        },

        componentWillUnmount: function() {
            this.props.todos.off('add');
            this.props.todos.off('remove');
            this.props.todos.off('reset');
            this.props.todos.off('all');
        },

        handleCollectionChanged: function() {
            var rows = [];
            var i = 0;
            this.props.todos.models.forEach(function(todo) {
                rows.push(<Todo model={todo} key={i++}/>)
            });

            this.setState({rows: rows});
        },

        render: function() {
            return (
                <div className="todoList">
                    Hello, I am a TodoList.
                    {this.state.rows}
                    <NewTodo />
                </div>
            );
        }
    });
});
