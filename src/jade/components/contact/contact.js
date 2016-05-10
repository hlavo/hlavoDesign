$(function(){
    var validate = {
        patterns: {
            length: /.{2,}/i,
            email:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
        },
        __success: true,
        __init: function(){
            this.$form = $(".form");
            this.$emailInput = this.$form.find("input[type=email]");
            this.$inputs = this.$form.find("input, textarea");
            this.__handlers();
        },
        __checkAll: function(e){
            e.preventDefault();
            validate.__success = true;
            validate.$inputs.each(function(index,e){
                validate.__checkItem($(e));
            });

            if(validate.__success){
                validate.__ajaxForm();
            }

        },
        __ajaxForm: function(){
            var serialize = validate.$form.serialize(),
                endpoint = validate.$form.attr('action');
            $.post(endpoint,serialize)
                .always(function(){
                    validate.$form.addClass('form--loading')
                })
                .done(function(data){
                    data = $.parseJSON(data);
                    if(data.success){
                        var $restartInput = validate.$form.find("input:not([type='hidden']), textarea"),
                            alertJson = validate.$form.data("alert");
                        $restartInput.val("").siblings(".form__label__text").removeClass("form__label__text--valid")
                        validate.$form.removeClass('form--loading');
                        swal(alertJson.success.title, alertJson.success.text, "success")
                    }else{
                        validate.__ajaxFail();
                    }
                })
                .fail(validate.__ajaxFail);
        },
        __ajaxFail:function(){
            var alertJson = validate.$form.data("alert");
            swal(alertJson.fail.title, alertJson.fail.text, "error");
            validate.$form.removeClass('form--loading');
        },
        __checkItem:function($input) {
            var $input = $input.target ? $($input.target) : $input,
                pattern = $input.data('pattern'),
                val = $input.val();

            if (!validate.patterns.hasOwnProperty(pattern) || !validate.patterns[pattern].test(val)){
                validate.__addErrorClass($input)
                validate.__success = false;
            }
            else{
                validate.__removeErrorClass($input);
            }
        },
        __addErrorClass: function($input){
            $input.siblings(".form__label__text").addClass("form__label__text--error");
        },
        __removeErrorClass: function($input){
            $input.siblings(".form__label__text").removeClass("form__label__text--error");
        },
        __validPosition: function(e){
            var $e = $(e.target);
            if($e.val().length >= 1) $e.siblings('.form__label__text').addClass('form__label__text--valid');
            else $e.siblings('.form__label__text').removeClass('form__label__text--valid');
        },
        __handlers:function(){
            var self = this,
                $input = Modernizr.cssvalid ? self.$emailInput : self.$inputs;
            $input.on("blur",self.__validPosition);
            self.$inputs.on('keypress focus blur',self.__checkItem);
            self.$form.on('submit',self.__checkAll);
        }
    }

    validate.__init();
});