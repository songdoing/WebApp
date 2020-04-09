//Reference comments collection
var commentsRef = firebase.database().ref('comments');
//Listen for click on Submit Comment button, and post comment.
document.getElementById("btnSubmitComment").addEventListener("click", function () {
    //Replace line breaks in comment with br tags.
    var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
    //Define a new, keyed post.
    var newPostRef = commentsRef.push();
    //Fill tne new keyed post with data
    newPostRef.set({
        name: document.getElementById('tbName').value.trim(),
        comment: newcomment.trim(),
        frompage: location.pathname,
        when: firebase.database.ServerValue.TIMESTAMP
    });
    document.location.href="#Comments-section";
    
});

document.getElementById("commentMore").addEventListener("click", function () {
    var showat = document.getElementById('pastAllcomments');
    //Get comments whose from page equals this page's pathname.
    var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
    commentsRef.once('value', function (snapshot) {
        snapshot.forEach(function (itemSnapshot) {
            //Get the object for one snapshot
            var itemData = itemSnapshot.val();
            var comment = itemData.comment;
            var name = itemData.name;
            var when = new Date(itemData.when).toLocaleDateString("en-us");
            showat.innerHTML += "<li>" + comment + "<span> FROM " + name + " (" + when +
                ")</span></li>";
        })
    })
});

function showpastcomments() {
    var showat = document.getElementById('pastcomments');
    //Get comments in the last 5
    var commentsRef = firebase.database().ref('comments/').orderByChild('when').limitToLast(4);
    commentsRef.once('value', function (snapshot) {
        snapshot.forEach(function (itemSnapshot) {
            //Get the object for one snapshot
            var itemData = itemSnapshot.val();
            var comment = itemData.comment;
            var name = itemData.name;
            var when = new Date(itemData.when).toLocaleDateString("en-us");
            showat.innerHTML += "<li>" + comment + "<span> FROM " + name + " (" + when +
                ")</span></li>";
        })
    })
}
//Called when page first opens and also after Submit button click to show all comments for this page.
showpastcomments()