'use strict';
define(['jquery', 'react'], function($, React) {
    return React.createClass({

        componentDidMount: function() {
            var id = this.props.model.get('id');
            $('#' + id).on('keypress', this.handleKeyPressed);
        },

        componentWillUnmount: function() {
            var id = this.props.model.get('id');
            $('#' + id).off('keypress');
        },

        handleKeyPressed: function(e) {
            var id = this.props.model.get('id');
            var $input = $('#' + id);
            if (e.which !== 13 || !$input.val().trim()) {
                return;
            }

            this.props.model.save({title: $input.val().trim()});
            // force triggering change event even if nothing changed
            this.props.model.trigger('change');
        },

        render: function() {
            return (
                <input
                    type="text"
                    className="form-control"
                    id={this.props.model.get('id')}
                    defaultValue={this.props.value}
                />
            );
        }
    });
});
