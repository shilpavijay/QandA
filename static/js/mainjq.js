
function feed() {
  var feed_q = _.template('<a class="viewq"><h4 class="<%= c %>"> <%= q %> </h4><br/></a>');
  var pic_user = _.template('<a class="info" href="/user/<%=user %>/" color="#333"><img class="pic" src= <%=i %>> <%=user %> </a>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><button class="upvote <%= c %>"><span>Upvote |  </span><span><%= v %></span></button><button class="downvote <%= c %>">Downvote</button><button class="comments <%= c %>" data-toggle="modal" data-target="#commentsModal" data-whatever="@mdo">Comments</button><p class="time"><%= t %></p></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/feed/",function(data){
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
      cl = ".".concat(cl);
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

function comment() { 
  $(".qa").on('click','.comments',function(){ 
      var cl,q;  
      var com = _.template('<div class="commentname"><%= name %>:</div><span class="comentext"><%= text %></span>');
      cli = $(this).attr("class").slice(-2);
      cli = parseInt(cli);                                            
      cl = ".".concat(cli)
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
          $("#commentsmodal .close").click()
                }
          });
  }
  return false;
  });  
}




$("document").ready(function(){
  
  feed();
  setTimeout(wrapfeed,5);
  setTimeout(upvote_click,1);
  setTimeout(downvote_click,1);
  ask();
  readans();
  readansmore();
  comment();


  
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

