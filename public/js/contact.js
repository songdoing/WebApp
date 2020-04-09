// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var fname = getInputVal('fname');
  var email = getInputVal('email');
  var subject = getInputVal('subject');
  var message = getInputVal('message');

  console.log(fname);

  // Save message
  saveMessage(fname, email, subject, message);

  // Show alert
  document.querySelector('.alertContact').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alertContact').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname, email, subject, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    fname: fname,
    email:email,
    subject:subject,
    message:message
  });
}