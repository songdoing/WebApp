firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('#BTN_LOGOUT').show();
      $('#BTN_SIGN').hide();
      console.log(user);
    } else {
      $('#BTN_LOGOUT').hide();
      $('#BTN_SIGN').show();
     }
  });

 //sign out
  $('#BTN_LOGOUT').click(function() {
    firebase.auth().signOut().then(function() {
      alert("logged out");
      $("#BTN_LOGOUT").hide();
      $("#BTN_SIGN").show();
      console.log("logged out");
      
    }, function(error) {
      alert(error.message);
    });
  });

 //sign up 
  $('#BTN_SIGNUP').click(function(){
    var signup_mail = $('#INPUT_MAIL').val();
    var signup_password = $('#INPUT_PASSWORD').val();

    firebase.auth().createUserWithEmailAndPassword(signup_mail, signup_password)
        .then(function(user) {
            console.log(user);
            alert("Signed up successfully.");
        })
        .catch(function(error){
            alert(error.message);
        });
  }); //BTN_SIGNUP ends

//sign in with email and password
  $('#BTN_SIGNIN').click(function(){
    var signin_mail = $('#SIGNIN_MAIL').val();
    var signin_password = $('#SIGNIN_PASSWORD').val();
    firebase.auth().signInWithEmailAndPassword(signin_mail, signin_password)
        .then(function(user) {
            console.log(user);
            alert("Hello. Logged In.");
            $("#BTN_LOGOUT").show();
            $("#BTN_SIGN").hide();
    }).catch(function(error) {
      alert(error.message);
    });
  });

//sign in with google
$('#BTN_GGIN').click(function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(user){
            console.log(user);
            alert("Google account linked");
        }).catch(function(error){
            alert(error.message);
        }); 
});

//sign in with facebook
$('#BTN_FBIN').click(function() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
      .then(function(user){
          console.log(user);
          alert("Facebook account linked");
      }).catch(function(error){
          alert(error.message);
      }); 
});