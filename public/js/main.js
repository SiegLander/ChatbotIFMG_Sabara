window.onload = function () {
  $(".header-row").click(function () {
    if ($(".chatbot").height() == 470) {
      $(".chatbot").animate({ height: "52" });
      $(".fa.fa-chevron-up").show();
      $(".fa.fa-chevron-down").hide();
    } else {
      $(".chatbot").animate({ height: "470" });
      $(".fa.fa-chevron-up").hide();
      $(".fa.fa-chevron-down").show();
    }
  });
};
