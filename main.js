(function(){
  var proximityThreshold = 100; // Pixels
  var automaticSize = true;

  function lazyLoadSize(dom,rect){
    if(automaticSize){
      var calculatedSize = Math.ceil((rect.width / window.outerWidth) * 100);
      calculatedSize = calculatedSize+"vw";
      dom.setAttribute("size",calculatedSize);
    }
    dom.setAttribute("srcset",dom.getAttribute('data-srcset'));
  }

  window.addEventListener('load',function(){
    document.querySelectorAll('img[data-srcset]').forEach(function(dom){

      var listener = function(){
        var rect = dom.getBoundingClientRect();
        if(rect.top - window.outerHeight < proximityThreshold){
          lazyLoadSize(dom,rect);
          window.removeEventListener("scroll",listener);
        }
      };
      window.addEventListener("scroll",listener);
      listener();
    });
  });
})();
