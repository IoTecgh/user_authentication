
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');


    $('.validate1-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


   


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }
        
    });

    const firebaseConfig = {
        apiKey: "AIzaSyCMY3PIGB-TVmidGRe3rDDDoLUTCjsRzRI",
        authDomain: "new-hashlands.firebaseapp.com",
        databaseURL: "https://new-hashlands.firebaseio.com",
        projectId: "new-hashlands",
        storageBucket: "",
        messagingSenderId: "942000603398",
        appId: "1:942000603398:web:68bb4f554f9c655b"
      };
    firebase.initializeApp(firebaseConfig);
    var Auth = firebase.auth(); 
    var dbRef = firebase.database();
    var usersRef = dbRef.ref('users')
    var auth = null;
    var email=document.forms['myform']['email'];
    var password=document.forms['myform']['pass']
    var fields=[email,password];

    $('form[id="myform"]').validate({
        errorClass:'error',
        rules: {
        fname: 'required',
        lname: 'required',
        email: {
          required: true,
          email: true,
        },
        pass: {
          required: true,
          minlength: 8,
        }
      },
      messages: {
        fname: 'This field is required',
        lname: 'This field is required',
        email: 'Enter a valid email',
        pass: {
          minlength: 'Password must be at least 8 characters long'
        }
      },
      submitHandler: function() {
        $(".gif-loader").show();
        var data = {
            email: email.value,
            password: password.value
        }
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(function(authData) {
              auth = authData;
              alert("Success")
              email.value=""
              password.value=""
              $(".gif-loader").hide();
              
            })
            .catch(function(error) {
             email.value=""
             password.value=""
             $(".gif-loader").hide();
             swal({
                title: "Error occured",
                text: "Account with these credentials does not exist",
                icon: "warning",
                button: "Ok",
              });

            });
      }
    });
    
          
      
       

    

})(jQuery);