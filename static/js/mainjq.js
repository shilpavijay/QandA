
// function search() {
//   $("select").change(function() {
//       var filter = $(this).val();
//       console.log(filter);
//       $("h4").each(function() {         
//           var s = $(this).text().toLowerCase();     
//           console.log(s); 
//           if ($(this).text().search(new RegExp(filter, "i")) < 0) {
//                 // $(this).fadeOut();

//               // Need to revisit the fadeOut() after impl feed(): should be $(this).parent().fadeOut()
//             } else {
//                 // $(this).show();

//             }         
//     });
//   });
// }


function feed() {
  
  // var start = _.template('<div class="qna">');
  var feed_q = _.template('<h4> <%= q %> </h4><br/>');
  var pic_user = _.template('<a class="info" href="#" color="#333"><img class="image" src= <%=i %> > Batman</a>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>"><span>Upvote | </span><span><%= v %></span></a><a class="downvote">Downvote</a><a class="downvote">Comments</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/feed/",function(data){
    json = JSON.parse(data);
    var idcount = 0;
    $.each(json, function(question,answers){     
      $(".qa").append(feed_q({ 'q': question }));
    
      $.each(answers,function(ans,vote){    
          $(".qa").append(pic_user({ 'i': profpic }));
          $(".qa").append(feed_ans({ 'c': idcount, 'a' : ans }));
          $(".qa").append(vote_bar({ 'c': idcount, 'v': vote }));
          $(".qa").append(line());
          idcount = idcount + 1;
      });    
      
    });
  });  
  return true;
}


function upvote_click() {
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
}

function ask() {
    $("#askbutton").click(function(event){
      
      if($("#askquestionhere").val().length===0){
        event.preventDefault();
      }
      else {
        $.ajax({
          type: "POST",
          url: "/askq/",
          data: 
          {  
            askquestion: $("#askquestionhere").val()
          },
          success: function(data){ 
            $("#askquestionhere").val("")
                  }
            });
    }
  return false;
  });  
}


$("document").ready(function(){
  
  feed();
  upvote_click();
  ask();


  
  // var options = [];
  // $("h4").each(function() { options.push($(this).text())});
  // if ($(".selector").length > 0){
  //    $(".selector").select2({
  //       data: options,
  //       placeholder: "Ask or Search Qanda",
  //       allowClear: true
  //    });
  //   }




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