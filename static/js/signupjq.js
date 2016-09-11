
$("document").ready(function(){
    var $form=$("formlogin");
    $("#msg2").hide();
    // signup
    $("#submit").click(function(event){
      if($(".form-control").val().length===0){
        $("#msg2").show();
        event.preventDefault();
      }
      else {
      $.ajax({
          type: "POST",
          url: "/signup/",
          data: 
          { 
            username : $("#username").val(), 
            password : $("#password").val()
          },
          success: function(data){        
            window.location.href = '/';
                  }
            });
    }
    return false;
    });
});