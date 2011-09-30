/*!
* jQuery UI Dialog Maximize Extension v1.1
*
* Copyright 2011, Tony Kramer
* Dual licensed under the MIT or GPL Version 2 licenses.
* https://github.com/flamewave/jquery-ui-dialog-maximize/raw/master/GPL-LICENSE.txt
* https://github.com/flamewave/jquery-ui-dialog-maximize/raw/master/MIT-LICENSE.txt
*/

/*
* For documentation and for the latest version, see:
* https://github.com/flamewave/jquery-ui-dialog-maximize
*
* Dependencies:
* - jQuery (1.4.2 and up)
* - jQuery UI (1.8.5 and up - core, widget, dialog)
*/
(function($)
{
    if ($.ui.dialog)
    {
        // Cache the original functions that we want to override otherwise if we try to call the base
        // implementation we will get stuck in an infinate loop.
        var _oldCreate = $.ui.dialog.prototype._create;
        var _oldClose = $.ui.dialog.prototype.close;
        var _oldOpen = $.ui.dialog.prototype.open;
        var _oldSetOption = $.ui.dialog.prototype._setOption;

        $.ui.dialog.maximizeExtension = {
            version: '1.1',
            globalization: {
                textMaximize: 'Maximize',
                textRestore: 'Restore'
            }
        };

        $.extend(true, $.ui.dialog.prototype, {
            _isMaximized: false,
            _originals: null,
            options: {
                maximize: false,
                openMaximized: false,
                maximizeFx: { easing: null, duration: 'normal', complete: null },
                restoreFx: { easing: null, duration: 'normal', complete: null }
            },

            _setupMaximize: function()
            {
                var t = this;
                if (t.options.maximize !== true || t.uiDialog.find('.ui-dialog-titlebar-maximize').length)
                    return;

                $('<a href="#" class="ui-dialog-titlebar-maximize ui-corner-all" role="button" title="' + $.ui.dialog.maximizeExtension.globalization.textMaximize + '"><span class="ui-icon ui-icon-extlink"></span></a>')
		            .insertBefore(t.uiDialog.find('.ui-dialog-titlebar .ui-dialog-titlebar-close'))
		            .click(function(e)
		            {
		                e.preventDefault();

		                if (t._isMaximized)
		                    t.restore();
		                else
		                    t.maximize();

		                return false;
		            })
		            .bind('mouseenter', function() { $(this).addClass('ui-state-hover'); })
		            .bind('mouseleave', function() { $(this).removeClass('ui-state-hover'); });
            },

            _removeMaximize: function()
            {
                this.uiDialog.find('.ui-dialog-titlebar-maximize').remove();
            },

            _create: function()
            {
                _oldCreate.call(this);
                this._setupMaximize();
            },

            _setOption: function(key, value)
            {
                if (key === 'maximize')
                {
                    if (value)
                        this._setupMaximize();
                    else
                        this._removeMaximize();
                }
                _oldSetOption.apply(this, arguments);
            },

            close: function()
            {
                if (!this._isOpen)
                    return;

                _oldClose.call(this);

                if (this._isMaximized)
                {
                    this.options.position = this._originals.opts.position;
                    this.options.width = this._originals.opts.width;
                    this.options.height = this._originals.opts.height;

                    if (this.options.maximize)
                        this._setMaxRestoreIcon(false);

                    this._isMaximized = false;
                    this._originals = null;
                }
            },

            open: function()
            {
                if (this._isOpen)
                    return;

                if (this.options.openMaximized)
                {
                    var v_size = this._calcMaxSize(true);
                    this.options.position = ['left', 'top'];
                    this.options.width = v_size.w;
                    this.options.height = v_size.h;

                    if (this.options.maximize)
                        this._setMaxRestoreIcon(true);

                    this._isMaximized = true;
                }

                _oldOpen.call(this);
            },

            isMaximized: function()
            {
                return this._isMaximized;
            },

            maximize: function(fx)
            {
                if (this._isMaximized || !this._isOpen)
                    return;

                this.moveToTop();

                var v_size = this._calcMaxSize(true);
                this._maxRestoreAnimated(
                    fx === undefined ? this.options.maximizeFx : $.isFunction(fx) ? $.extend({}, this.options.maximizeFx, { complete: fx }) : fx,
                    {
                        left: $(window).scrollLeft(),
                        top: $(window).scrollTop(),
                        width: v_size.w + 'px',
                        height: v_size.h + 'px'
                    },
                    {
                        position: ['left', 'top'],
                        width: v_size.w,
                        height: v_size.h
                    },
                    true);
                return this;
            },

            restore: function(fx)
            {
                if (!this._isMaximized || this._originals === null || !this._isOpen)
                    return;

                this.moveToTop();
                this._maxRestoreAnimated(
                    fx === undefined ? this.options.restoreFx : $.isFunction(fx) ? $.extend({}, this.options.restoreFx, { complete: fx }) : fx,
                    this._originals.rect,
                    this._originals.opts,
                    false);
                return this;
            },

            _calcMaxSize: function(backup)
            {
                if (backup)
                    this._originals = {
                        opts: { position: this.options.position, width: this.options.width, height: this.options.height },
                        rect: $.extend({ width: this.uiDialog.innerWidth(), height: this.uiDialog.innerHeight() }, this.uiDialog.position())
                    };

                return {
                    w: $(window).width() - parseInt($(document.body).css('padding-left'), 10) - parseInt($(document.body).css('padding-right'), 10),
                    h: $(window).height() - parseInt($(document.body).css("padding-top"), 10) - parseInt($(document.body).css('padding-bottom'), 10)
                };
            },

            _setMaxRestoreIcon: function(isMax)
            {
                this.uiDialog.find('.ui-dialog-titlebar-maximize .ui-icon')
                    .toggleClass('ui-icon-extlink', !isMax)
                    .toggleClass('ui-icon-newwin', isMax)
                    .attr('title', isMax ? $.ui.dialog.maximizeExtension.globalization.textRestore : $.ui.dialog.maximizeExtension.globalization.textMaximize);
            },

            _maxRestore: function(opts, isMax)
            {
                this._setOptions(opts);

                if (this.options.maximize)
                    this._setMaxRestoreIcon(isMax);

                this._isMaximized = isMax;
                if (!isMax)
                    this._originals = null;
            },

            _maxRestoreAnimated: function(fx, rect, opts, isMax)
            {
                var t = this;
                if (!fx)
                {
                    t.uiDialog.css(rect);
                    t._maxRestore(opts, isMax);
                    t._trigger(isMax ? 'maximized' : 'restored');
                    return;
                }

                var w = -1, h = -1;
                t.uiDialog.animate(
                    rect,
                    {
                        duration: fx.duration,
                        easing: fx.easing,
                        step: function(now, fx)
                        {
                            if (fx.prop == 'width')
                                w = now;

                            else if (fx.prop == 'height')
                                h = now;

                            if (w !== -1 && h !== -1)
                            {
                                t._setOptions({ width: w, height: h });
                                w = h = -1;
                            }
                        },
                        complete: function()
                        {
                            t._maxRestore(opts, isMax);
                            if ($.isFunction(fx.complete))
                                fx.complete.call(this);

                            t._trigger(isMax ? 'maximized' : 'restored');
                        }
                    }
                );
            }
        });
    }

})(jQuery);