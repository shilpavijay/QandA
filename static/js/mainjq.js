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
  $("select").change(function() {
      var filter = $(this).val();
      $("h4").each(function() {         
          var s = $(this).text().toLowerCase();         
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();

              // Need to revisit the fadeOut() after impl feed(): should be $(this).parent().fadeOut()
            } else {
                $(this).show();

            }         
    });
  });
}


function feed() {
  
  var start = _.template('<div class="qna">')
  var feed_q = _.template('<h4> <%= q %> </h4><br/> <a class="usrnm">' + 'username' +'</a><br/>');
  var feed_ans = _.template('<br/><p class="answers"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote"><span>Upvote | </span><span><%= v %></span></a><a class="downvote">Downvote</a><a class="downvote">Comments</a><br/></div><br/>');
  var add_list = _.template('<option> <%= ques %> </option>');
  $.get("/feed/",function(data){
    json = JSON.parse(data);
    $(".qa").append(start);

    $.each(json, function(question,answers){     
      $(".qna").append(feed_q({ 'q': question }));
      $(".selector").append(add_list({ 'ques': question }));     
      $.each(answers,function(ans,vote){    
          $(".qna").append(feed_ans({ 'a' : ans }));
          $(".qna").append(vote_bar({ 'v': vote }));
      });    
      $(".qna").append('</div>');
    });
  });  
  return true;
}


$("document").ready(function(){
  
  if ($(".js-example-basic-single").length > 0){
     $(".js-example-basic-single").select2({
        placeholder: "Ask or Search Quora",
        allowClear: true
     });
    }

  feed();

  // blur body when focus is on the search field
  $(".selector").focusin(function(){ 
      $("#bdy").fadeTo(5, 0.4);
    } 
  ); 
  $(".selector").focusout(function(){ 
      $("#bdy").fadeTo(10, 1);
    } 
    );
    
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