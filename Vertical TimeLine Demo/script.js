/**
 * Created by Ryanchill on 2016/8/6.
 */
(function(){
    var items = document.querySelectorAll(".timeline li");

    //判断当前的elem是否在viewport里面
    function isElemInViewport(el){
        //返回元素距视图左上角的上下左右值
        var rect = el.getBoundingClientRect();
        return(
            rect.top  >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right  <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function callback(){
        for(var i =0;i<items.length;i++){
            if(isElemInViewport(items[i])){
                //alert("aaa");
                items[i].classList.add("in-view");
            }
        }
    }

    //bind event
    window.addEventListener("load",callback);
    window.addEventListener("resize",callback);
    window.addEventListener("scroll",callback);
})();