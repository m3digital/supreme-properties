/*------------------------------------------------------------------
[Table of contents]

    - split
    - textify

- Project:    Restate - HTML Template
- Version:    1.1
- Author:  Andrey Sokoltsov
- Profile:    http://themeforest.net/user/andreysokoltsov
--*/

/*split*/
split = function (element) {
    words = $(element).text().split('');
    for (i in words) {
        words[i] = '<span>' + words[i] + '</span>';
    }
    text = words.join('');
    $(element).html(text);
};

/*textify*/
textify = function(element,method,delay) {
    split(element);
    $(element).find('span').css('opacity','0');
    $(element).find('span').css('position','relative');
    in_speed = 25;
    count = 0;
    setTimeout(function(){
        count = 0;
        $(element).find('span').each(function () {
            if(method == 'fade'){
                $(this).delay(0 + in_speed * count).animate({ opacity: '1' }, 1000);
            } else if(method == 'bounce'){
                $(this).delay(0 + in_speed * count).animate({ opacity: '1','top':'-4px'}, 220,'easeOutCubic');
                $(this).delay(0 + in_speed * count/4).animate({ opacity: '1','top':'0px'}, 220);
            }
            count++;
        });
    },delay);
};
