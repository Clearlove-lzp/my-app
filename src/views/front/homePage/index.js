export default function common() {
  $(function(){

    $('.news_nav a').click(function(){
        $(this).addClass('hover').siblings('a').removeClass('hover');
        var nav_id = $(this).data('newskey');
        $('[data-newsVal="'+nav_id+'"]').show().siblings('.news_container').hide();
    });
  
    setTimeout(function(){
        $('[data-newsVal]').find('.news_left').css({'visibility': 'visible', 'animation-name': 'fadeInLeft'});
        $('[data-newsVal]').find('.news_right').css({'visibility': 'visible', 'animation-name': 'fadeInRight'});
    }, 400);
  
  });
  
  $(function(){
  
    $('.case_nav a').click(function(){
        $(this).addClass('hover').siblings('a').removeClass('hover');
        var nav_id = $(this).data('casekey');
        $('[data-caseVal="'+nav_id+'"]').show().siblings('.n_case').hide();
    });
  
  
  
  });
  
  
    var itlinks ;
  
    $(document).ready(function () {
        hj();
        $('.myhex').hover(function () {
            clearInterval(itlinks);
        }, function () {
            if (itlinks) {
                clearInterval(itlinks);
            }
            itlinks = setInterval(showNextLinks2, 3500);
        });
    });
  
  
    $('.myhex-next').click(function(){
        showNextLinks2(false);
    });
  
    $('.myhex-prev').click(function(){
        showNextLinks2(true);
    });
  
  
  
    var swiper = new Swiper('.swiper-banner', {
        pagination: '.banner-pages',
        nextButton: '.banner-next',
        prevButton: '.banner-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        //loop: true,
        autoplay: 6500,
        autoplayDisableOnInteraction: false,
        effect: 'fade',
        onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onTouchEnd: function (swiper) {
            swiperAnimate(swiper);
        }
    });
  
  
  
  
     new Swiper('.swiper-clients', {
        pagination: '.clients_pages',
        paginationClickable: true,
        loop: true,
        autoplay: 3500,
        spaceBetween: 30
    });
  
    new Swiper('.swiper-solution', {
        nextButton: '.solution-next',
        prevButton: '.solution-prev',
        paginationClickable: true,
        spaceBetween: 30,
        loop: true,
    });
  
  
    var swiperCase = new Swiper('.swiper-case-ul', {
        speed:300
    });
  
    function setCaseIndex(index,that){
        that.addClass('on');
        that.siblings('a').removeClass('on');
        swiperCase.slideTo(index,500);
    }
  
  
    var notice = new Swiper('.swiper-notice', {
        direction : 'vertical',
        speed:300,
        autoplayDisableOnInteraction : false,
        loop : true,
        autoplay: 4000
    });
  
    $('.swiper-notice li').hover(function(){
        notice.stopAutoplay();
    },function(){
        notice.startAutoplay();
    });
  
  var isBegin = false;
  $(function(){
    $(window).scroll(function () {
        var u = 96;
        var Height = $("#easing").offset().top;
        var height = $("#easing").height() + 500;
  
        if ($(window).scrollTop() >= (Height-height) && $(window).scrollTop() <= (Height+height)) {
            if(isBegin) return false;
            isBegin = true;
  
            $(".num1").css('backgroundPosition','0 0');
            var result = '10';
            var num_arr = (result+'').split('');
            $(".num1").each(function(index){
                var _num = $(this);
                setTimeout(function(){
                    _num.animate({
                        backgroundPosition: '(0 '+((u*60) - (u*num_arr[index]))+'px)'
                    },{
                        duration: 5000,
                        easing: "easeInOutCirc"
                    });
                }, index * 900);
            });
  
            $(".num2").css('backgroundPosition','0 0');
            var result1 = '2000';
            var num_arr1 = (result1+'').split('');
            $(".num2").each(function(index){
                var _num = $(this);
                setTimeout(function(){
                    _num.animate({
                        backgroundPosition: '(0 '+((u*60) - (u*num_arr1[index]))+'px)'
                    },{
                        duration: 5000,
                        easing: "easeInOutCirc"
                    });
                }, index * 900);
            });
  
            $(".num3").css('backgroundPosition','0 0');
            var result2 = '1200';
            var num_arr2 = (result2+'').split('');
            $(".num3").each(function(index){
                var _num = $(this);
                setTimeout(function(){
                    _num.animate({
                        backgroundPosition: '(0 '+((u*60) - (u*num_arr2[index]))+'px)'
                    },{
                        duration: 5000,
                        easing: "easeInOutCirc"
                    });
                }, index * 900);
            });

            $(".num4").css('backgroundPosition','0 0');
            var result3 = '30';
            var num_arr3 = (result3+'').split('');
            $(".num4").each(function(index){
                var _num = $(this);
                setTimeout(function(){
                    _num.animate({
                        backgroundPosition: '(0 '+((u*60) - (u*num_arr3[index]))+'px)'
                    },{
                        duration: 5000,
                        easing: "easeInOutCirc"
                    });
                }, index * 900);
            });
        }
    });
  });
  
  skrollr.init({ forceHeight: false });
  
  
  
  function hj() {}
}
