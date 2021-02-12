$("#postTextArea").keyup( event=>{
    var textbox = $(event.target)
    var value = textbox.val().trim()

    var submitButton = $("#submitPostButton")

    if(submitButton.length == 0) return alert("Not submit button found")

    if (value == "") {
        submitButton.prop("disabled", true)
        return;
    }

    submitButton.prop("disabled", false)
})



$("#submitPostButton").click( (event)=>{
    var button = $(event.target);
    var textbox = $("#postTextArea");

    var data = {
        content: textbox.val()
    }

    $.post("/api/posts", data, (postData, status, xhr)=> {
        var html = createPostHtml(postData)
        $(".postsContainer").prepend(html);
        textbox.val("")
        button.prop("disabled", true)
    })

});





function createPostHtml (postData) {
    
    var {postedBy} = postData

    console.log(postedBy)
    var displayName = postedBy.firstName+ " " + postedBy.lastName
    var timestamp = timeDifference(new Date(), new Date(postData.createdAt))

    var seconds =  1000
    var minutes =  60 * 1000
    var hour = 24 * 60 * 1000
    
    
    return `<div class='post'>

                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}' />
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class="far fa-comment"></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class="fas fa-retweet"></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                                
                        </div>
                    </div>
                    
                </div>

            </div>`
}


// Calculating timestamp
function timeDifference (current, previuos){
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previuos;

    if (elapsed < msPerMinute) {
        if (elapsed/1000 < 30) {
            return 'Just now'
        }
        return Math.round(elapsed/1000) + 'seconds ago'
    }
    else if( elapsed < msPerHour ){
        return Math.round(elapsed/msPerMinute) + 'minutes ago'
    }
    else if( elapsed < msPerDay ){
        return Math.round(elapsed/msPerHour) + 'hours ago'
    }
    else if( elapsed < msPerMonth ){
        return Math.round(elapsed/msPerDay) + 'days ago'
    }
    else if( elapsed < msPerYear ){
        return Math.round(elapsed/msPerMonth) + 'months age'
    }
    else {
        return Math.round(elapsed/msPerYear) + 'years age'
    }
    
}