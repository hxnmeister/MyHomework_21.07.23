const usersData = [];
const userPosts = [];

const usersApiUrl = "https://jsonplaceholder.typicode.com/users";
const postsApiUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsApiUrl = "https://jsonplaceholder.typicode.com/comments";

const biography = document.getElementById("biography");
const postTitle = document.getElementById("posttitle");
const postComments = document.getElementById("comments");
const userFullInfo = document.getElementById("userfullinfo");
const postFullInfo = document.getElementById("postfullinfo");
const postsHeaders = document.getElementById("postsheaders");
const usersContainer = document.getElementById("users");
const newsFeed = document.getElementById("newsfeed");
const postHeadersList = postsHeaders.querySelector("ul");


const getUsers = async () =>
{
    await fetch(usersApiUrl).then(response => response.json()).then(usersArray => usersArray.map(user => 
    {
        usersContainer.innerHTML +=
        `
            <div id="${user.id}" class="userinfo">
                <p><b>Name: </b>${user.name}</p>
                <p><b>Username: </b>${user.username}</p>
                <p><b>Email: </b>${user.email}</p>
            </div>
        `
        usersData.push(user);
    }));
}
const showAllPosts = async () =>
{

}

getUsers();

usersContainer.addEventListener("click", async (event) =>
{
    const selectedUser = event.target.closest(".userinfo");

    if(selectedUser !== null)
    {
        const position = selectedUser.id - 1;

        newsFeed.hidden = true;
        usersContainer.hidden = true;
        userFullInfo.hidden = false;

        biography.innerHTML =
        `
            <p><b>Name: </b>${usersData[position].name}</p>
            <p><b>Username: </b>${usersData[position].username}</p>
            <p><b>Email: </b>${usersData[position].email}</p>
            <p><b>City: </b>${usersData[position].address.city}</p>
            <p><b>Street: </b>${usersData[position].address.street}</p>
            <p><b>Phone: </b>${usersData[position].phone}</p>
            <p><b>Website: </b>${usersData[position].website}</p>
            <p><b>Company: </b>${usersData[position].company.name}</p>
        `
        await fetch(`${postsApiUrl}?userId=${selectedUser.id}`).then(response => response.json()).then(postsArray => postsArray.map(post => 
        {
            postHeadersList.innerHTML += `<li id="${post.id}" class="postheader"><u>${post.title}</u></li>`
            userPosts.push(post);
        }));
    } 
});
postsHeaders.addEventListener("click", async (event) => 
{
    const selectedPost = event.target.closest(".postheader");

    if(selectedPost !== null)
    {
        const userId = userPosts[0].userId - 1;
        const post = userPosts.find(post => String(post.id) === selectedPost.id);

        userFullInfo.hidden = true;
        postFullInfo.hidden = false;
        
        postTitle.innerHTML =
        `
            <p><b>Title: </b>${post.title}</p>
            <p id="authorname"><b>Author: </b>${usersData[userId].name}</p>
            <br>
            <p>${post.body}</p>
        `

        await fetch(`${commentsApiUrl}?postId=${selectedPost.id}`).then(response => response.json()).then(commentsArray => commentsArray.map(comment =>
        {
            postComments.innerHTML +=
            `
                <div class="comment">
                    <p><b>Name: </b>${comment.name}</p>
                    <p><b>Email: </b>${comment.email}</p>
                    <br>
                    <p><b>${comment.body}</b></p>
                </div>
            `
        }));
    }
});
postTitle.addEventListener("click", (event) => 
{
    const authorSelected = event.target.closest("#authorname");

    if(authorSelected !== null)
    {
        userFullInfo.hidden = false;
        postFullInfo.hidden = true;

        postComments.innerHTML = "";
    }
});
document.getElementById("homebutton").addEventListener("click", () => 
{
    if(usersContainer.hidden)
    {
        usersContainer.hidden = false;
        newsFeed.hidden = false;

        userFullInfo.hidden = true;
        postFullInfo.hidden = true;

        postHeadersList.innerHTML = "";
        postComments.innerHTML = "";
    }
});