// made by Vladislav Gapurov
//
// thanks to http://stackoverflow.com/
//           http://paulgueller.com/2011/04/26/parse-the-querystring-with-jquery/

jQuery.extend({
  parseQuerystring: function(){
    var nvpair = {};
    var qs = window.location.search.replace('?', '');
    var pairs = qs.split('&');
    $.each(pairs, function(i, v){
      var pair = v.split('=');
      nvpair[pair[0]] = pair[1];
    });
    return nvpair;
  }
});


(function($){
        var qs = jQuery.parseQuerystring(),
            dataIn = '',
            url = window.location.href;

        var isHidden = function() {
            if ($('.balloon').is(':hidden')){
                $('.balloon').show();
            }
        }

        var updateUrl = function(){
            window.location.replace(url);
        }

        $('input').focus();

        $('.balloon').on('click','.reset',function(){
            window.location.replace(url.substring(0,url.indexOf("?")));
        });

        $('.copylink').on({
            click: function(e){
                e.preventDefault;
                msgToUrl();
                updateUrl();
              }
        });

        $("input").keypress(function(e) {
            if (e.which == 13 | e.which == 10) {
                e.preventDefault();
                mouthAnimate();
                newLine();
                $('#formValue').val('');
                $('.info').hide();
                $('.copylink').attr('href', msgToUrl());
            }
            else{
                mouthAnimate();
                setTimeout(function(){
                mouthReset();
                    }, 80);
                }
        });

        function msgToUrl() {
            if (url.indexOf('?') != -1){
                url = url.substring(0,url.indexOf('?')) + '?msg=' + qs.msg;
            }
            else {
                url += '?msg=' + qs.msg;
            }
            return url;
        };

        function mouthAnimate(){
            $('#formValue').css({
                "-webkit-border-radius": "10em",
                "-moz-border-radius": "10em",
                "border-radius": "10em",
                "width": "3.5em"
            });
        }

        function mouthReset(){
             $('#formValue').css({
                "-webkit-border-radius": "1em",
                "-moz-border-radius": "1em",
                "border-radius": "1em",
                "width": "4em"
            });
        }

        function newLine(){
            isHidden();
            dataIn = $('#formValue').val() + ' ';
            $('.balloon>p').append(' '+dataIn)
            qs.msg = $('.balloon>p').text();
        }

        (function(){
            if (qs.msg != undefined){
                isHidden();
                mouthAnimate();
                $('.balloon>p').append(decodeURIComponent(qs.msg));
                $('.info').hide();

                $("input").on('keypress', function(e){
                            qs.tmp = String.fromCharCode(e.which);
                        }).on('keypress', function(e){
                            for (i=0; i<=1; i++){
                            window.location.replace(url.substring(0,url.indexOf("?")) + '?tmp=' + qs.tmp);
                            }
                        });
                }
            if (qs.tmp != undefined){
                $('#formValue').val(qs.tmp);
            }
        })();

})(jQuery);
