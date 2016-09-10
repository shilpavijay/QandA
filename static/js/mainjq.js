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
      console.log(filter);
      $("h4").each(function() {         
          var s = $(this).text().toLowerCase();     
          console.log(s); 
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                // $(this).fadeOut();

              // Need to revisit the fadeOut() after impl feed(): should be $(this).parent().fadeOut()
            } else {
                // $(this).show();

            }         
    });
  });
}


function feed() {
  
  // var start = _.template('<div class="qna">');
  var feed_q = _.template('<h4> <%= q %> </h4><br/> <a class="usrnm">' + 'pic & username' +'</a><br/>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>"><span>Upvote | </span><span><%= v %></span></a><a class="downvote">Downvote</a><a class="downvote">Comments</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/feed/",function(data){
    json = JSON.parse(data);
    var idcount = 0;

    $.each(json, function(question,answers){     
      $(".qa").append(feed_q({ 'q': question }));

      $.each(answers,function(ans,vote){    
          $(".qa").append(feed_ans({ 'c': idcount, 'a' : ans }));
          $(".qa").append(vote_bar({ 'c': idcount, 'v': vote }));
          $(".qa").append(line());
          idcount = idcount + 1;
      });    
      
    });
  });  
  return true;
}


$("document").ready(function(){
  
  var options = [];
  $("h4").each(function() { options.push($(this).text())});
  if ($(".selector").length > 0){
     $(".selector").select2({
        data: options,
        placeholder: "Ask or Search Qanda",
        allowClear: true
     });
    }

  feed();

  $(".qa").on('click','.upvote',function(){
      var cl,q;    
      cl = $(this).attr("class").slice(-1);
      cl = ".".concat(cl)
      q = $("p"+cl).text().slice(0,80);
      $.ajax({
        type: "POST",
        url: "/main/",
        data: 
        { 
          clicked: 'yes',
          ans: q
        }
        // success: function(){ 
        //   feed()
        //         }
          });
  });
  





  // blur body when focus is on the search field
  // $(".selector").focusin(function(){ 
  //     $("#bdy").fadeTo(5, 0.4);
  //   } 
  // ); 
  // $(".selector").focusout(function(){ 
  //     $("#bdy").fadeTo(10, 1);
  //   });
    
  // search();

});