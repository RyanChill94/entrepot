/**
 * Created by Ryanchill on 2016/8/6.
 */
(function(){
    var items = document.querySelectorAll(".timeline li");

    //�жϵ�ǰ��elem�Ƿ���viewport����
    function isElemInViewport(el){
        //����Ԫ�ؾ���ͼ���Ͻǵ���������ֵ
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