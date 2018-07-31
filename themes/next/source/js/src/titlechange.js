 var OriginTitile = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function() {
   if (document.hidden) {
     $('[rel="icon"]').attr('href', "/img/TEP.ico");
     document.title = '╭(°A°`)╮ 你快回来 ~ | ';
     clearTimeout(titleTime);
   } else {
     $('[rel="icon"]').attr('href', "/favicon.ico");
     document.title = '(ฅ>ω<*ฅ) 我一人承受不来！~' + OriginTitile;
     titleTime = setTimeout(function() {
       document.title = OriginTitile;
     }, 2000);
   }
 });
