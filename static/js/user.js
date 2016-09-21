function feedans() {
  var username = window.location.href;
  username = username.split('/')[4];
  var feed_q = _.template('<a class="viewq"><h4 class="<%= c %>"> <%= q %> </h4><br/></a>');
  var pic_user = _.template('<a class="info" href="/user/<%=user %>/" color="#333"><img class="pic" src= <%=i %>> <%=user %> </a>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>"><span>Upvote |  </span><span><%= v %></span></a><button class="downvote <%= c %>">Downvote</button><button class="comments <%= c %>" data-toggle="modal" data-target="#commentsModal" data-whatever="@mdo">Comments</button><p class="time"><%= t %></p></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/userans/"+username+'/',function(data){
    json = JSON.parse(data);
    var idcount = 0;
    $.each(json, function(question,answers){     
      $(".qa").append(feed_q({ 'c': idcount,'q': question }));
    
      $.each(answers,function(ans,info){    
          $(".qa").append(pic_user({ 'i': profpic, 'user': info[2] }));
          $(".qa").append(feed_ans({ 'c': idcount, 'a' : ans }));
          $(".qa").append(vote_bar({ 'c': idcount, 'v': info[0],'t': info[1] }));
          $(".qa").append(line());
          idcount = idcount + 1;
      });    
      
    });
  });   
  return true; 
}

function auto_load(){
    var username = window.location.href;
    username = username.split('/')[4];
        $.ajax({
          url: "/user/"+username+"/",
          cache: false,
          success: function(data){
             $("body").html(data);
          } 
        });
}

function feed() {
  var username = window.location.href;
  username = username.split('/')[4];
  var content_head = _.template('<div class="contenthead">Question asked . India . 22m</div> ')
  var feed_q = _.template('<h4 href="#" class=" <%= c %>"><a class=" <%= c %> "><%= q %></a></h4>');
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

function readansq() {
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
               window.location.href = '/main/' + id + '/';
            }
           });
    });
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
      cldot = ".".concat(cl)
      $("a"+cldot).attr("href",'/main/'+cl+'/');
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
    var data = $(this).attr("Class").slice(-2);
    data = parseInt(data);
    $(this).append(more({ 'id':data }));
  });

}

function readansmore() {
  $(".qa").on('click','.m',function(){
        var id,cl,qtext;    
        cl = $(this).attr("class").slice(-2);
        cl = parseInt(cl);
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

    $(".qa").on('click','.upvote',function(){     
         
      var cli,q;    
      cli = $(this).attr("class").slice(-2);
      cli = parseInt(cli);                                                
      cl = ".".concat(cli)
      q = $("p"+cl).text().slice(0,80);
      q = q.trimLeft().trimRight();
       if (localStorage.upvote === cl) {
            $(".upvote" + cl).attr("disabled",true);
        } 
        else {
            $(this).attr("disabled",false);      
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
              $(".upvote" + cl).text(uptext.slice(0,-3) + ' ' +upcount);
              $(".upvote" + cl).attr("disabled",true);
              localStorage.setItem("upvote",cl)
                       }
        });
    }
      });
    
}

function downvote_click() {
    $(".qa").on('click','.downvote',function(event){
      $(this).attr("disabled",false);          
      var cl,q;    
      cl = $(this).attr("class").slice(-2);
      cl = parseInt(cl);
      cl = ".".concat(cl)
      q = $("p"+cl).text().slice(0,80);
      q = q.trimLeft().trimRight();
      if (localStorage.downvote === cl) {
            $(".downvote" + cl).attr("disabled",true);
        } 
        else {
          $(this).attr("disabled",false);
          $.ajax({
            type: "POST",
            url: "/downvote/",
            data: 
            { 
              click: 'yes',
              answer: q
            },
            success: function(data){
              var uptext = $(".upvote" + cl).text();
              var upcount = parseInt(uptext.slice(-3));
              upcount = upcount-1;
              $(".upvote" + cl).text(uptext.slice(0,-3) + ' ' +upcount);
              $(".downvote" + cl).attr("disabled",true);
              localStorage.setItem("downvote",cl)
                }
          });
        }
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



function writeans() {
  $(".qa").on('click','.upvote',function(){ 
      var cl,q;    
      cl = $(this).attr("class").slice(-2);
      cl = parseInt(cl);
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
          auto_load();
                }
          });
  }
  return false;
  });  
}

function comment() { 
  $(".qa").on('click','.comments',function(){ 
      var cl,q;  
      var com = _.template('<div class="commentname"><%= name %>:</div><span class="comentext"><%= text %></span>');
      cli = $(this).attr("class").slice(-2);
      cli = parseInt(cli);
      cl = ".".concat(cli)
      ans = $(".answers"+cl).text().slice(0,60);
      ans = ans.trimRight().trimLeft();
      // index = cli + 1
      $.get("/get_comments/"+ans+'/',function(data){
          json = JSON.parse(data);

          $("#commenttext").empty();
          $.each(json, function(date,detail){       
            $("#commenttext").append(com({ 'name': detail[1][0], 'text': detail[1][1] }));          
          });
        
        });  
  });

    $(".btn").click(function(event){
    if($(".form-control").val().length===0){
      event.preventDefault();

    }
    else {
       alert('clicked');
      console.log(ans+$("#comment-text").val());
      $.ajax({
        type: "POST",
        url: "/addcomment/",
        data: 
        { 
          csrfmiddlewaretoken: "{{ csrf_token }}", 
          forans: ans,
          commentwritten : $("#comment-text").val()
        },
        success: function(data){ 
          $("#comment-text").val("");
          $("#commentsmodal .close").click();
          $(document.body).html(data);
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
  setTimeout(feedans,10);
  setTimeout(wrapfeed,10);
  setTimeout(upvote_click,10);
  setTimeout(downvote_click,10);
  ask();
  readans();
  readansq();
  readansmore();
  clicksidebar();
  setTimeout(writeans,10);
  comment();
  qclick_read();


});