

window.fbAsyncInit = function() {
    FB.init({
    appId      : '1784543425113726',
    xfbml      : true,
    version    : 'v2.7'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function myFacebookLogin() {
  FB.login(function(){
  FB.api('/me/feed', 'post', {message: 'Hello, world!'});
  }, {scope: 'publish_actions'});
} 

function FaceebookLogout() {
  FB.logout();
}



$("document").ready(function(){
    var $form=$("formlogin");
    var defaultpwd = 'a';
    $("#msg1").hide();
    $("#msg2").hide();
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