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
  var content_head = _.template('<div class="contenthead">Question asked . India . 22m</div> ')
  var feed_q = _.template('<h4 class="<%= c %>"><%= q %></h4>');
  var feed_ans = _.template('<br/><a class="contenthead <%= c %>">Read <%= a %> Answers </a><br/>');
  var ans_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><span class="clickans">Answer</span><a class="downvote">Pass</a><a class="downvote">Downvote</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/ans_count/",function(data){
    json = JSON.parse(data);
    var idcount = 0;

    $.each(json, function(quest,count){ 
      var question = quest;
      // $(".upvote #modaltitle").text(question);
      $(".qa").append(content_head());  
      $(".qa").append(feed_q({ 'c': idcount,'q': question }));
      $(".qa").append(feed_ans({ 'c': idcount,'a' : count }));
      $(".qa").append(ans_bar({  'c': idcount }));
      idcount = idcount + 1
      });    
      
    });
  // });  
  return true;
}


$("document").ready(function(){
  
  var options = [];
  feed();

  $("h4").each(function() { options.push($(this).text())});
  if ($(".selector").length > 0){
  $(".selector").select2({
    data: options,
    placeholder: {id: 0, text: "Ask Qanda"},
    allowClear: true
     });
 // $(".selector").select2("val", null);
    }

    $(".qa").on('click','.contenthead',function(){
        var cl,q;    
        cl = $(this).attr("class").slice(-1);
        cl = ".".concat(cl)
        q = $("h4"+cl).text();
        $(".contenthead"+cl).attr("href",q);
    })


  $(".qa").on('click','.upvote',function(){ 
      var cl,q;    
      cl = $(this).attr("class").slice(-1);
      cl = ".".concat(cl)
      q = $("h4"+cl).text();
      $("#modaltitle").text(q);
  });

  $("#written_ans").click(function(event){
    if($(".form-control").val().length===0){
      event.preventDefault();
    }
    else {
      $.ajax({
        type: "POST",
        url: "/answer/",
        data: 
        { 
          csrfmiddlewaretoken: "{{ csrf_token }}", 
          forquestion: $("#modaltitle").text(),
          answritten : $("#answer-text").val()
        },
        success: function(data){ 
          $("#answer-text").val("")
                }
          });
  }
  return false;
  });  
});

