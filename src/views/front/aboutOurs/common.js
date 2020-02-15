export default function common(jQuery) {
    return new Promise((resolve, reject) => {
        (function($){

            /*滚动显示动画初始化*/
            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                var wow = new WOW({
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    mobile: true,
                    live: true
                });
                wow.init();
            }
        
            /*头部样式变换*/
            if($(document).scrollTop() != 0) {
                $('#header').attr('class','header_hover');
            }
            $(window).scroll(function() {
                if($(document).scrollTop() == 0) {
                    $('#header').attr('class','header');
                }else{
                    if(!$('#header').hasClass('header_hover')){
                        $('#header').attr('class','header_hover');
                    }
                }
            });
        
            /*项目简介展示*/
            $('#case_xl').click(function(){
                if($(this).is('.on')){
                    $(this).removeClass('on');
                    $('#case_txt').removeClass('on');
                }else{
                    $(this).addClass('on');
                    $('#case_txt').addClass('on');
                }
            });
        
        })(jQuery);
        
        if ($('.swiper-cases').size() > 0) {
            /*案例切换*/
            var cases = new Swiper('.swiper-cases', {
                pagination: '.clients_pages',
                paginationClickable: true,
                loop: true,
                speed: 500,
                autoplay: 4500,
                spaceBetween: 30
            });
        }
        if ($('.swiper-latest').size() > 0) {
            var latest = new Swiper('.swiper-latest', {
                nextButton: '.latest-next',
                prevButton: '.latest-prev',
                spaceBetween: 20,
                slidesPerView: 3,
                lazyLoading: true,
                autoHeight: true,
                //loop: true
            });
        }
        
        if ($('.swiper-mobile').size() > 0) {
            var mobile = new Swiper('.swiper-mobile', {
                pagination: '.swiper-pages',
                paginationClickable: true,
                nextButton: '.mobile-next',
                prevButton: '.mobile-prev'
            });
        }
        //if ($('.gallery-top').size() > 0) {
        //    var galleryTop = new Swiper('.gallery-top', {
        //        nextButton: '.gallery-next',
        //        prevButton: '.gallery-prev',
        //        spaceBetween: 10,
        //    });
        //}
        
        if ($('.gallery-thumbs').size() > 0) {
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                slideToClickedSlide: true,
                nextButton: '.thumbs-next',
                prevButton: '.thumbs-prev',
                onSlideChangeStart: function (swiper) {
                    var src = $('.thumbs').find('.swiper-slide').eq(swiper.activeIndex).find('img').attr('src');
                    $('.gallery-top').find('img').attr('src', src);
                }
            });
        
            //galleryTop.params.control = galleryThumbs;
            //galleryThumbs.params.control = galleryTop;
        }
        if ($('.swiper-container-h').size() > 0) {
            var swiperH = new Swiper('.swiper-container-h', {
                direction: 'vertical',
                slidesPerView : 1,
                pagination: '.swiper-pagination-h',
                paginationClickable: true,
                speed: 500,
                keyboardControl: true,
                height: window.innerHeight,
                mousewheelControl: true,
                hashnav: true,
                onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
                    swiperAnimateCache(swiper); //隐藏动画元素
                    swiperAnimate(swiper); //初始化完成开始动画
                },
                onSlideChangeEnd: function (swiper) {
                    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                }
            });
        }
            function setInitialSlide(index){
                swiperH.slideTo(index,500);
            }
            //调整字体大小
            function ChangeFontSize(id, size) {
                $('#' + id + " p,td").css("font-size", size + 'px');
            }
        
            //div层随屏幕滚动
            //层样式需设置绝对定位position:absolute;
            $(document).ready(function () {
                if ($("#online").size() > 0) {
                    mouseScrollFun('online');
                }
                
            });
            function mouseScrollFun(id) {
                var menuYloc = $("#" + id).offset().top;
                $(window).scroll(function () {
                    if ($(window).scrollTop() > menuYloc) {
                        $("#" + id).css("position", "absolute");
                        var offsetTop = $(window).scrollTop() + 100 + "px";
                        $("#" + id).animate({ top: offsetTop }, { duration: 100, queue: false });
                    }
                    else { $("#" + id).animate({ top: 100 }, { duration: 100, queue: false }); }
                });
            }
            function closeFloatWindow() {
                $("#online_right").hide();
                $("#online").css("width", "32px");
                //$("#smallFloatWindow").show();
        
            }
            function showFloatWindow() {
                //$("#smallFloatWindow").hide();
                if ($("#online_right").css("display") == "none") {
                    $("#online_right").show();
                    $("#online").css("width", "151px");
                } else {
                    closeFloatWindow();
                }
        
            }
            function backToTop() {
                $(document).scrollTop(0);
            }
            
            
            $(function(){
            $(".nav>li").hover(function(){
                $(".nav>li").removeClass("next");
                $(this).addClass("next");
                },function(){
                    $(this).removeClass("next");
                    });
            });
    });
  }
