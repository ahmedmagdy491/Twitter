/* $(document).ready(()=>{
    $.get("/api/posts", (posts)=> {
      outputPosts(posts, $('.postsContainer'))
    })
})

function outputPosts(results, container) {
    container.html("")
    results.forEach(result =>{
        var html = createPostHtml(result)
        container.append(html)
    })

    if (results == 0) {
        container.append("<span class='noResults'>Nothing to show.</span>")
    }
} */


$(document).ready(()=>{
    $.get("/api/posts", results =>{
        outputPosts(results, $(".postsContainer"))
        console.log(results)
    })
})


function outputPosts(results , container) {
    container.html("")
    results.forEach((result) => {
        var html = createPostHtml(result)
        container.append(html);
    });

    if (results.length == 0) {
        container.append("<span class='noResults'>Nothing to show</span>")
    }
}



