
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



function feed() {
  var feed_q = _.template('<h4> <%= q %> </h4><br/>');
  var pic_user = _.template('<a class="info" href="#" color="#333"><img class="image" src= <%=i %> > Batman</a>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>"><span>Upvote |  </span><span><%= v %></span></a><a class="downvote">Downvote</a><a class="downvote">Comments</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  var pg = window.location.href
  pg=pg.slice(-2,-1) + '/';
  $.get("/ajaxcall/" + pg,function(data){
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
    $(".qa").one('click','.upvote',function(){
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
        },
        success: function(data){ 
              var uptext = $(".upvote" + cl).text();
              var upcount = parseInt(uptext.slice(-3));
              ++upcount;
              // alert(uptext.slice(0,-3) + upcount);
              $(".upvote" + cl).text(uptext.slice(0,-3) + ' ' + upcount);
                }
          });
  });
}


$("document").ready(function(){
  feed();
  setTimeout(upvote_click,100);
  ask();

});