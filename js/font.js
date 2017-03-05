(function(global, $) {
  'use strict';

  var indexOf = [].indexOf || function(prop) {
      for (var i = 0; i < this.length; i++) {
          if (this[i] === prop) return i;
      }
      return -1;
  };
  window.getElementsByClassName = function(className,context) {
      if (context.getElementsByClassName) return context.getElementsByClassName(className);
      var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
          var all = context.getElementsByTagName("*"),
              elements = [],
              i = 0;
          for (; i < all.length; i++) {
              if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements,all[i]) === -1) elements.push(all[i]);
          }
          return elements;
      })();
      return elems;
  };

  var body = document.body;
  if(navigator.appVersion.indexOf('MSIE 8.0') > 0 || navigator.appVersion.indexOf('MSIE 7.0') > 0) // IE8 이하
  {
    // 모달
    var modal = document.querySelectorAll('.modal');
    // 모달오픈
    var btn = document.querySelectorAll(".btn");
    // 모달 닫기
    var close = document.querySelectorAll(".close");
  }
  else // IE9 이상
  {
    // 모달
    var modal = document.getElementsByClassName('modal');
    // 모달오픈
    var btn = document.getElementsByClassName("btn");
    // 모달 닫기
    var close = document.getElementsByClassName("close");
  }
  var open_modal = 0;
  var modal_btn = 0;
  var close_modal_btn = 0;
  var index = 0;
  var m_index = 0;



  for(var i = 0; i < modal.length; i++){
    
    open_modal = modal[i];
    open_modal.num = i;

    modal_btn = btn[i];
    modal_btn.num = i;

    close_modal_btn = close[i];
    close_modal_btn.num = i;


    modal_btn.onclick = openModal; // 버튼을 클릭했을때 , 모달오픈
    close_modal_btn.onclick = closeModalBtn; // <sapn>(x)클릭했을 때, 모달닫기
    open_modal.onclick = closeModalOutside; // 모달 바같에 아무 곳이나 클릭했을 때, 모달닫기
  }

  // 모달 오픈
  function openModal() {
    //console.log(this.num);
    index = this.num;
    m_index = modal[index];
    m_index.style.display = "block";

    var modalSlider = m_index.querySelector(".slider");
    var modalColor = m_index.querySelector(".base");
    var f_view = m_index.querySelector(".f_view");
    var f_result = m_index.querySelector(".f_result");

    // 폰트 사이즈 변경
    $(modalSlider).on('change mousemove', function () {
        var range = $(this).val();
        $(f_view).each(function() {
          $(this).css('font-size', range + 'px');
        });
        $(f_result).each(function() {
          $(this).html(range);
        });   
    });

     // 폰트 컬러 변경
    $(modalColor).on("change", function () {
      var color = $(this).val();
      $(f_view).each(function() {
          $(this).css({"color": color});
        });
    });
   
  }

  // 모달 닫기
  function closeModalBtn() {
    index = this.num;
    m_index = modal[index];
    modal[index].style.display = "none";
  }

  // 모달 밖같 영역으로 닫기
  function closeModalOutside(event) {
    //console.log(this.num);
    index = this.num;
    m_index = modal[index];
    if (event.target == m_index) {
     // console.log(event.target == modal[index]);
     m_index.style.display = "none";
   }
  }
})(this, this.jQuery);
