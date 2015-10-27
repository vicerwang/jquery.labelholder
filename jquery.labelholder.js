(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;

    $.fn.labelholder = function(options) {
        if (isInputSupported && isTextareaSupported) {
            return this;
        }

        var defaults = {
            style: {}
        };
        options = $.extend({}, defaults, options);

        return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
            .on({
                'focus.labelholder': clearLabelholder,
                'blur.labelholder': setLabelholder
            })
            .trigger('blur.labelholder');

        function setLabelholder() {
            var $this = $(this);
            if ($this.val() === '') {
                var placeholder = $this.attr('placeholder');
                var style = $.extend({
                    'line-height': $this.css('line-height'),
                    'font-size': $this.css('font-size'),
                    'color': 'graytext'
                }, style, {
                    'position': 'absolute',
                    'margin-top': $this.css('margin-top'),
                    'margin-left': $this.css('margin-left'),
                    'padding-top': $this.css('padding-top'),
                    'padding-left': $this.css('padding-left'),
                    'cursor': 'text'
                });

            $('<label>' + placeholder + '</label>')
                .css(style)
                .one('click', function() {
                    $this.focus();
                })
                .insertBefore($this);
            }
        }

        function clearLabelholder() {
            $(this).prev('label').remove();
        }
    }
}));
