//looping thru html elements
// $( "li" ).each(function( index ) {
//   console.log( index + ": " + $( this ).text() );
// });

// function reloadpg() {
//   $.get("getweets/",function(data){
//     json = $.parseJSON(data);
//     for(i=0;i<json.length;++i){
//       // console.log(json[0].fields.tweet_text);
//       var newp = document.createElement("p");
//       newp.innerHTML = json[i].fields.tweet_text;
//       $(".well").append(newp);
//     }
//   });
//   return true;
// } 

function search() {
  $("#search_string").keyup(function() {
      var filter = $(this).val();
      $("h4").each(function() {
          debugger
          var s = $(this).text().toLowerCase();
          debugger
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
            // Need to revisit the fadeOut() after impl feed(): should be $(this).parent().fadeOut()
            } else {
                $(this).show();
            }
          debugger
    });
  });
}


function feed() {

      // var _ = require('lodash');
      // var a = _.lowerCase('<--Foo-Bar-></--Foo-Bar->-');
      // $(".qa").append(a);
  $.get("/feed/",function(data){
    json = JSON.parse(data);
    $.each(json, function(question,answers){
      $(".qa").append("<h4>" + question +"</h4>");
      $(".qa").append("<br/>");
      $(".qa").append('<a class="usrnm">' + 'username' +'</a>');
      $(".qa").append('<br/>');

      $.each(answers,function(ans,vote){    
          $(".qa").append('<br/>');  
          $(".qa").append("<p>" + ans +"</p>");
          // $(".qa").append('<div class="ActionBar">' + '</div>');
          // $(".ActionBar").append('<a class="vote">'+'</a>');
          // $(".vote").append('<span>' + 'Upvote |' + '</span>');
          $(".qa").append('<span>'+ vote + '</span>');
          $(".qa").append('<br/>');
          // $(this).find(".qa").addClass("ActionBar");
          // $(this).find('.vote').addClass('upvote');

      });
    });


  });  

  $("body").bind("DOMNodeInserted", function() {
   $(this).find('.vote').addClass('upvote');
   // $(this).find('.qa').append('<div class="AB">' + '</div>');
   // $(this).find('.AB').append('<a class="vote">'+'</a>');
   // $(this).find('.vote').append('<span>' + 'Upvote |' + '</span>');
});

  return true;
}


$("document").ready(function(){
  feed();

  //blur body when focus is on the search field
  $("#search_string").focusin(function(){ 
      $("#bdy").fadeTo(5, 0.4);
    } 
  ); 
  $("#search_string").focusout(function(){ 
      $("#bdy").fadeTo(10, 1);
    } 
        // function () { $("#bdy").fadeTo("normal",1); }
    );

    // $(".searchlist").select2();
    
    search();


  // search($(".rowsize"), $(".qa"));
  // reloadpg();
  // stat();
  // $("#submit").click(function(event){
  //   if($(".form-control").val().length===0){
  //     event.preventDefault();
  //   }
  //   else {
  //   $.ajax({
  //       type: "POST",
  //       url: "fe_tw/",
  //       data: 
  //       { 
  //         tweetxt : $("#tweetxt").val()
  //       },
  //       success: function(data){ 
  //         $(".well").empty();     
  //         reloadpg();
  //         $("#tweetxt").val('');
  //               }
  //         });
  // }
  // return false;
  // });  

  // $("#sublogout").click(function(event){
  //   $.ajax({
  //       type: "POST",
  //       url: 'logout/',
  //       success: function(data){ 
  //       window.location.href = '/';
  //               }
  //         });
  // return false;
  // });
});