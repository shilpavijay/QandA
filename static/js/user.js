function feedans() {
  var username = window.location.href;
  username = username.split('/')[4];
  var feed_q = _.template('<a class="viewq"><h4 class="<%= c %>"> <%= q %> </h4><br/></a>');
  var pic_user = _.template('<a class="info" href="#" color="#333"><img class="image" src= <%=i %> > Batman</a>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>"><span>Upvote |  </span><span><%= v %></span></a><a class="downvote">Downvote</a><a class="downvote <%= c %>">Comments</a><p class="time"><%= t %></p></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/userans/"+username+'/',function(data){
    json = JSON.parse(data);
    var idcount = 0;
    $.each(json, function(question,answers){     
      $(".qa").append(feed_q({ 'c': idcount,'q': question }));
    
      $.each(answers,function(ans,info){    
          $(".qa").append(pic_user({ 'i': profpic }));
          $(".qa").append(feed_ans({ 'c': idcount, 'a' : ans }));
          $(".qa").append(vote_bar({ 'c': idcount, 'v': info[0], 't': info[1]}));
          $(".qa").append(line());
          idcount = idcount + 1;
      });    
      
    });
  });   
  return true; 
}

function feed() {
  var username = window.location.href;
  username = username.split('/')[4];
  var content_head = _.template('<div class="contenthead">Question asked . India . 22m</div> ')
  var feed_q = _.template('<h4 class=" <%= c %>"><%= q %></h4>');
  var feed_ans = _.template('<br/><a class="contenthead <%= c %>">Read <%= a %> Answers </a><br/>');
  var ans_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><span class="clickans">Answer</span><a class="downvote">Pass</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/userq/"+username+'/',function(data){
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
      $(".qa").on('click','.viewq',function(){
        var id;    
        var qtext = $(this).text();
        qtext = qtext.trimLeft().trimRight();
        $.get("/ans_count/",function(data){
          json = JSON.parse(data);
          $.each(json, function(quest,idcount){ 
            quest=quest.trimLeft().trimRight()
            if ( quest == qtext) {
               id = idcount[0];
               window.location.href = id + '/';
            }
           });
    });
  });
}

function wrapfeed() {
  $.each($(".answers"),function(ans){ 
    var atext = $(this).text();
    var width = 400;
    var replacer = ' ... '
    var more = _.template('<a class="m <%= id %>">(more)</a>');
    var result;
    if (atext.length > width) {
      result = atext.substring(0,width) + replacer;
    }
    else {
      result=atext;
      more = _.template('<br><br><a class="m <%= id %>">(more)</a>');
    }
    $(this).text(result); 
    $(this).append(more({ 'id':$(this).attr("Class").slice(-1) })); 
  });

}

function readansmore() {
  $(".qa").on('click','.m',function(){
        var id,cl,qtext;    
        cl = $(this).attr("class").slice(-1);
        cl = ".".concat(cl)
        qtext = $("h4"+cl).text();
        qtext = qtext.trimLeft().trimRight();
        $.get("/ans_count/",function(data){
          json = JSON.parse(data);
          $.each(json, function(quest,idcount){ 
            quest=quest.trimLeft().trimRight()
            if ( quest == qtext) {
               id = idcount[0];
               window.location.href = id + '/';
            }
           });
    });
  });
}

function upvote_click() {
    $(".qa").one('click','.upvote',function(){
      var cl,q;    
      cl = $(this).attr("class").slice(-1);
      cl = ".".concat(cl)
      q = $("p"+cl).text().slice(0,80);
      $.ajax({
        type: "POST",
        url: "/upvote/",
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
              $(".upvote" + cl).text(uptext.slice(0,-3) + ' ' +upcount);
                }
          });
  });
}

function clicksidebar() {
  $("ul").click(function(event){
    var selection=$(this).text();
    $("#feedtitle").text(selection);
    if (selection === 'Answers'){
        $(".qa").empty();
        feedans();
    }  //end - if Questions
    else {
       $(".qa").empty();
       feed();       
    }
  
  });

}

function downvote_click() {
    $(".qa").one('click','.downvote',function(){
      var cl,q;    
      cl = $(this).attr("class").slice(-1);
      cl = ".".concat(cl)
      q = $("p"+cl).text().slice(0,80);
      $.ajax({
        type: "POST",
        url: "/downvote/",
        data: 
        { 
          clicked: 'yes',
          ans: q
        },
        success: function(data){ 
              // setTimeout(feed,10);
              var uptext = $(".upvote" + cl).text();
              var upcount = parseInt(uptext.slice(-3));
              upcount = upcount-1;
              // alert(uptext.slice(0,-3) + upcount);
              $(".upvote" + cl).text(uptext.slice(0,-3) + ' ' +upcount);
                }
          });
  });
}

function writeans() {
  $(".qa").on('click','.upvote',function(){ 
      var cl,q;    
      cl = $(this).attr("class").slice(-1);
      cl = ".".concat(cl)
      q = $("h4"+cl).text();
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
        data: 
        { 
          csrfmiddlewaretoken: "{{ csrf_token }}", 
          forquestion: $("#modaltitle").text(),
          answritten : $("#answer-text").val()
        },
        success: function(data){ 
          $("#answer-text").val("");
          $("#modal .close").click()
                }
          });
  }
  return false;
  });  
}


$("document").ready(function(){
  var username = window.location.href;
  username = username.split('/')[4];
  $("#username").text(username);
  setTimeout(feedans,100);
  setTimeout(wrapfeed,100);
  setTimeout(upvote_click,100);
  setTimeout(downvote_click,100);
  ask();
  readans();
  readansmore();
  clicksidebar();
  setTimeout(writeans,10);


});