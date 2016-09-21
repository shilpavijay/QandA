
function feed() {
  
  // var start = _.template('<div class="qna">');
  var content_head = _.template('<div class="contenthead">Question asked . India . 22m</div> ')
  var feed_q = _.template('<h4 href="#" class=" <%= c %>"><a class=" <%= c %> "><%= q %></a></h4>');
  var feed_ans = _.template('<br/><a class="contenthead <%= c %>">Read <%= a %> Answers </a><br/>');
  var ans_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><span class="clickans">Answer</span><a class="downvote">Pass</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/ans_count/",function(data){
    json = JSON.parse(data);

    $.each(json, function(quest,idcount){ 
      var question = quest;
      $(".qa").append(content_head()); 
      $(".qa").append(feed_q({ 'c': idcount[0], 'q': question }));    
      $(".qa").append(feed_ans({ 'c': idcount[0],'a' : idcount[1] }));
      $(".qa").append(ans_bar({  'c': idcount[0] }));       
    });
  return true;
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

function readans() {
      $(".qa").on('click','.contenthead',function(){
        var cl,q;    
        cl = $(this).attr("class").slice(-2);
        cl = parseInt(cl);
        cldot = ".".concat(cl);
        $(".contenthead"+cldot).attr("href",'/main/'+cl+'/');
    });
}

function qclick_read() {
    $(".qa").on('click','h4',function(){
      var cl,q;    
      cl = $(this).attr("class").slice(-2);
      cl = parseInt(cl);
      cldot = ".".concat(cl);
      $("a"+cldot).attr("href",'/main/'+cl+'/');
  });
}



function writeans() {
  $(".qa").on('click','.upvote',function(){ 
      var cl,q;    
      cl = $(this).attr("class").slice(-2);
      cl = parseInt(cl);
      cldot = ".".concat(cl);
      q = $("h4"+cldot).text();
      $("#modaltitle").text(q);
  });

    $(".btn").click(function(event){
    if($(".form-control").val().length===0){
      event.preventDefault();
    }
    else {
      $.ajax({
        type: "POST",
        url: "/answer/",
        // async: false,
        data: 
        { 
          csrfmiddlewaretoken: "{{ csrf_token }}", 
          forquestion: $("#modaltitle").text(),
          answritten : $("#answer-text").val()
        },
        success: function(data){ 
          $("#answer-text").val("");
          $("#modal .close").click();
          $(document.body).html(data);
                }
          });
      
  }
  
  return false;
  });  
}

// function auto_load(){
//         $.ajax({
//           url: "/answer/",
//           cache: false,
//           success: function(data){
//              $("body").html(data);
//           } 
//         });
// }


$("document").ready(function(){
  
  feed();
  ask();
  readans();
  qclick_read();
  writeans();

});

