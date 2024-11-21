$(document).ready(function() {
    var delay = 2000;
    $('.send-btn').click(function(e){
    e.preventDefault();
    var name = $('#name').val();
    if(name == ''){
    
    return false;
    }
         
    var email = $('#email').val();
    if(email == ''){

    return false;
    }
    if( $("#email").val()!='' ){
    if( !isValidEmailAddress( $("#email").val() ) ){
    $('.error-mail').html(
    'Email jest niepoprawny'
    );
    $('#email').focus();
    return false;
    }  
      
    }
             
    var message = $('#msg').val();
                     
    $.ajax
    ({
    type: "POST",
    url: "./dist/php/mail.php",
    data: "name="+name+"&email="+email+"&message="+message,
    success: function(data)
    {
    setTimeout(function() {
    $('.msg-status').html(data);
    }, delay);
    }
    });
    });
             
 });