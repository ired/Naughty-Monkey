/**
*
* made by Vladislav Gapurov
* thanks to dankogai for base64.js --> https://github.com/dankogai/js-base64
*
**/


(function() {
    'use strict';
    var $place = $(".stats")
    ,$pupil = $(".eye")
    ,$ear = $(".robothead")
    ,$bwrapper = $(".bwrap")
    ,$face = $(".face")
    ,menuBtn = $('.menu')
    ,wh = $(window).height()
    ,ww = $(window).width()
    ,topLimit = 85 + 200
    ,bottomLimit = 85 + 500
    ,leftLimit = (ww/2) - 200
    ,rightLimit = (ww/2) + 200;

    var moveFace = {
        look: function(posClassRemove,posClassAdd,bwrObj,faceObj) {
            $pupil.removeClass(posClassRemove).addClass(posClassAdd);
            $ear.removeClass(posClassRemove).addClass(posClassAdd);

            $bwrapper.css(bwrObj);
            $face.css(faceObj);
        },
        lookExtOne: function(bwrObj,faceObj) {
            $bwrapper.css(bwrObj);
            $face.css(faceObj);
        },
        lookExtTwo: function(bwrObj,faceObj) {
            $bwrapper.css(bwrObj);
            $face.css(faceObj);
        },
        lookException: function(posClassRemove,bwrObj,faceObj) {
            $pupil.removeClass(posClassRemove);
            $ear.removeClass(posClassRemove);
            $bwrapper.css(bwrObj);
            $face.css(faceObj);
        },
        mouth: function() {}
    };


    // var funnyMovingHead = function() {
    //     setTimeout(function() {
    //         moveFace.look( 'top','bottom',{ 'margin-top' : '50px' },{ 'margin-top' : '50px' } );
    //         setTimeout(function() {
    //             moveFace.look('bottom','top',{ 'margin-top' : '-50px' },{ 'margin-top' : '-50px' } );
    //             setTimeout(function() {
    //                 moveFace.look( 'right','left',{ 'margin-left' : '-6.25em' },{ 'margin-left' : '-6.25em' } );
    //                 setTimeout(function() {
    //                     moveFace.lookException('bottom right left top',{ 'margin' : '0' },{ 'margin' : '0' });
    //                 }, 3000);
    //             }, 2000);
    //             setTimeout(function() {
    //                 moveFace.look('left','right',{ 'margin-left' : '6.25em' },{ 'margin-left' : '6.25em' } );
    //             }, 3000);
    //         }, 3000);

    //     }, 4000);
    // };

    // menuBtn.on('click', funnyMovingHead);

    $('body').mousemove(function(e) {
        // $place.text('e.pageX: ' + e.pageX + ' e.pageY: ' + e.pageY)
        //       .append(' bottom.limit: ' + bottomLimit + ' top.limit: ' + topLimit)
        //       .append(' left.limit: ' + leftLimit + ' right.limit: ' + rightLimit);

        if (e.pageY >= bottomLimit) {
            moveFace.look( 'top','bottom',{ 'margin-top' : '50px' },{ 'margin-top' : '50px' } );

            if (e.pageX < leftLimit - 20) {
                moveFace.lookExtOne( { 'margin-left' : '-6.25em' },{ 'margin-left' : '-6.25em' } );

            } else if (e.pageX > rightLimit + 20) {
                moveFace.lookExtTwo( { 'margin-left' : '6.25em' },{ 'margin-left' : '6.25em' } );
            }
        }
        else if (e.pageY <= topLimit) {
            moveFace.look('bottom','top',{ 'margin-top' : '-50px' },{ 'margin-top' : '-50px' } );

            if (e.pageX < leftLimit - 20) {
                moveFace.lookExtOne({ 'margin-left' : '-6.25em' },{ 'margin-left' : '-6.25em' } );

            } else if (e.pageX > rightLimit + 20) {
                moveFace.lookExtTwo( { 'margin-left' : '6.25em' },{ 'margin-left' : '6.25em' } );
            }
        }
        else if (e.pageX <= leftLimit) {
            moveFace.look( 'right','left',{ 'margin-left' : '-6.25em' },{ 'margin-left' : '-6.25em' } );

                if (e.pageY > bottomLimit-10) {
                    moveFace.lookExtOne( { 'margin-top' : '50px' },{ 'margin-top' : '50px' } );
                }
                else if (e.pageY < topLimit+10) {
                    moveFace.lookExtTwo( { 'margin-top' : '-50px' },{ 'margin-top' : '-50px' } );
                }

        }
        else if (e.pageX >= rightLimit) {
            moveFace.look('left','right',{ 'margin-left' : '6.25em' },{ 'margin-left' : '6.25em' } );

                if (e.pageY > bottomLimit-10) {
                    moveFace.lookExtOne( { 'margin-top' : '50px' },{ 'margin-top' : '50px' } );
                }
                else if (e.pageY < topLimit+10) {
                    moveFace.lookExtTwo( { 'margin-top' : '-50px' },{ 'margin-top' : '-50px' } );
                }
        }
        else {
            moveFace.lookException('bottom right left top',{ 'margin' : '0' },{ 'margin' : '0' });
        }

    });

})();
