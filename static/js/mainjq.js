
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
  var feed_q = _.template('<a class="viewq"><h4 class="<%= c %>"> <%= q %> </h4><br/></a>');
  var pic_user = _.template('<a class="info" href="#" color="#333"><img class="image" src= <%=i %> > Batman</a>');
  var feed_ans = _.template('<br/><p class="answers <%= c %>"><%= a %> </p><br/>');
  var vote_bar = _.template('<div class="ActionBar"><a class="upvote <%= c %>"><span>Upvote |  </span><span><%= v %></span></a><a class="downvote">Downvote</a><a class="downvote">Comments</a><br/></div><br/>');
  var line = _.template('<div class="separator"></div>');
  $.get("/feed/",function(data){
    json = JSON.parse(data);
    var idcount = 0;
    $.each(json, function(question,answers){     
      $(".qa").append(feed_q({ 'c': idcount,'q': question }));
    
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
              $(".upvote" + cl).text(uptext.slice(0,-3) + ' ' +upcount);
                }
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




$("document").ready(function(){
  
  feed();
  setTimeout(wrapfeed,100);
  setTimeout(upvote_click,100);
  // setTimeout(feed(),100);
  // upvote_click();
  ask();
  readans();
  readansmore();


  
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