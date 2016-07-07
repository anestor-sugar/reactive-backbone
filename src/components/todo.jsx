'use strict';
define([
    'underscore',
    'react',
    'app/components/elements/button',
    'app/components/elements/checkbox',
    'app/components/todo-title',
    'app/components/edit-todo'
], function(_, React, Button, Checkbox, TodoTitle, EditTodo) {
    return React.createClass({

        componentDidMount: function() {
            this.props.model.on('change', _.bind(function() {
                this.setState({
                    editMode: false,
                    completed: this.props.model.get('completed')
                });
            }, this));
        },

        componentWillUnmount: function() {
            this.props.model.off('change');
        },

        getInitialState: function() {
            return {editMode: false, completed: this.props.model.get('completed')}
        },

        handleEnterEditMode: function() {
            this.setState({editMode: true})
        },

        handleRemove: function() {
            this.props.model.destroy();
        },

        handleToggle: function() {
            this.props.model.toggle();
        },

        render: function() {
            var title = this.props.model.get('title');
            return (
                <li className="todoItem list-group-item">
                    { !this.state.editMode ?
                        <Checkbox onClick={this.handleToggle} checked={this.state.completed}/> : null }
                    { !this.state.editMode ? <TodoTitle title={title} completed={this.state.completed}/> : null }

                    { !this.state.editMode ? <Button onClick={this.handleEnterEditMode} text="Edit"/> : null }
                    { !this.state.editMode ? <Button onClick={this.handleRemove} text="Remove"/> : null }
                    
                    { this.state.editMode ? <EditTodo value={title} model={this.props.model}/> : null }
                </li>
            );
        }
    });
});
