
$("document").ready(function(){
    var $form=$("formlogin");
    $("#msg1").hide();
    $("#msg2").hide();

    // validation
    $("#submit").click(function(event){
      if($(".form-control").val().length===0){
        $("#msg2").show();
        event.preventDefault();
      }
      else {
      $.ajax({
          type: "POST",
          url: $form.attr("action"),
          data: 
          { 
            username : $("#username").val(), 
            password : $("#password").val()
          },
          success: function(data){        
            window.location.href = '/main/';
                  }
            });
    }
    return false;
    });
});