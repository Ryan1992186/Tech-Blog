const postId = document.querySelector('#postId').innerHTML;
const urlId = document.querySelector('#postId-url').innerHTML;

const postComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-text').value.trim();

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, urlId}),
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok){
        document.location.replace(`/post/${urlId}`);
    } else {
        alert('Comment failed');
    }
}

document.querySelector('#send-comment-btn').addEventListener('click', postComment);