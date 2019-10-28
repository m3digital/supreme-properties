/*------------------------------------------------------------------
[Table of contents]

    - custom select js

- Project:    Restate - HTML Template
- Version:    1.1
- Author:  Andrey Sokoltsov
- Profile:    http://themeforest.net/user/andreysokoltsov
--*/

/*custom select js*/
(function($) {

    $.fn.customSelect = function(options) {

        var settings = $.extend({
            "speed" : 250
        }, options);

        return this.each(function() {

            var _this = $(this);

            _this.hide();

            _this.wrap('<div class="custom-select-wrapper"></div>');
            
            var _thisParent = _this.parent('.custom-select-wrapper');

            _this.after('<div class="custom-select-box"></div>');

            _thisParent.find('.custom-select-box').append('<div class="custom-select-button"></div>')
                .append('<ul class="custom-select-ul"></ul>');

            var customSelectButton = _thisParent.find('.custom-select-button');

            var customSelectUl = _thisParent.find('.custom-select-ul');

            _thisParent.find('.custom-select-ul').hide();

            _this.find('option').each(function () {
                var optionText =  $(this).text();
                customSelectUl.append('<li>' + optionText + '</li>');
            });


            customSelectButton.append('<span></span>');
            customSelectButton.find('span').text(_this.find('option:selected').text());


            customSelectButton.on('click', function () {
                if($(this).hasClass('custom-select-opened')){
                    $(this).removeClass('custom-select-opened');
                    $(this).parent('.custom-select-box').removeClass('custom-select-box-opened');
                    $(this).next(customSelectUl).slideUp(settings.speed);
                }else{
                    $('.custom-select-button').removeClass('custom-select-opened');
                    $('.custom-select-button').parent('.custom-select-box').removeClass('custom-select-box-opened');
                    $('.custom-select-ul').slideUp(settings.speed);
                    $(this).addClass('custom-select-opened');
                    $(this).parent('.custom-select-box').addClass('custom-select-box-opened');
                    $(this).next(customSelectUl).slideDown(settings.speed);
                }
            });


            customSelectUl.find('li').on('click', function () {
                var liIndex = $(this).index();
                var liText = $(this).text();
                $(this).parent('.custom-select-ul').slideUp(settings.speed);
                $(this).parent('.custom-select-ul').prev('.custom-select-button').removeClass('custom-select-opened').text(liText);
                $(this).parents('.custom-select-box').prev('select').find('option').eq(liIndex).prop('selected', true);
                $(this).parent('.custom-select-ul').prev('.custom-select-button').parent('.custom-select-box').removeClass('custom-select-box-opened');
                _this.trigger('change');
            });


            _this.on('change', function () {
                customSelectButton.text(_this.find('option:selected').text());
            });


            $(document).on('click', function (event) {
                if ($(event.target).closest($('.custom-select-wrapper')).length) return;
                if ($(event.target).closest($('.select-wrapper label')).length) return;
                $('.custom-select-ul').slideUp(settings.speed);
                $('.custom-select-button').removeClass('custom-select-opened');
                $('.custom-select-button').parent('.custom-select-box').removeClass('custom-select-box-opened');
            });

        });

    };

})(jQuery);
