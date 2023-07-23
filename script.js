const usersData = [];

const usersApiUrl = "https://jsonplaceholder.typicode.com/users";
const postsApiUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsApiUrl = "https://jsonplaceholder.typicode.com/comments";

const newsFeed = document.getElementById("newsfeed");
const biography = document.getElementById("biography");
const postTitle = document.getElementById("posttitle");
const postComments = document.getElementById("comments");
const userFullInfo = document.getElementById("userfullinfo");
const postFullInfo = document.getElementById("postfullinfo");
const postsHeaders = document.getElementById("postsheaders");
const usersContainer = document.getElementById("users");
const postHeadersList = postsHeaders.querySelector("ul");


const showAllPosts = async () =>
{
    const postsArray = await fetch(postsApiUrl).then(response => response.json());
    
    for(let i = postsArray.length - 1; i >= 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [postsArray[i], postsArray[j]] = [postsArray[j], postsArray[i]];
    }

    postsArray.map(post =>
    {
        newsFeed.innerHTML +=
        `
            <div id="${post.id}" class="postinfo">
                <p><b>Title: </b>${post.title}</p>
                <p><b>Author: </b>${usersData[post.userId - 1].name}</p>
                <br>
                <p>${post.body}</p>
            </div>
        `
    });
}
const showAllUsers = async () =>
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

    showAllPosts();
}

const getUser = async (event, closestSelectorName) =>
{
    const selectedUser = event.target.closest(closestSelectorName);

    if(selectedUser !== null)
    {
        const position = selectedUser.id - 1;

        newsFeed.hidden = true;
        usersContainer.hidden = true;
        postFullInfo.hidden = true;
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

        postHeadersList.innerHTML = "";
        await fetch(`${postsApiUrl}?userId=${selectedUser.id}`).then(response => response.json()).then(postsArray => postsArray.map(post => 
        {
            postHeadersList.innerHTML += `<li id="${post.id}" class="postheader"><u>${post.title}</u></li>`
        }));
    } 
}
const getPost = async (event, closestSelectorName) =>
{
    const selectedPost = event.target.closest(closestSelectorName);

    if(selectedPost !== null)
    {
        users.hidden = true;
        newsFeed.hidden = true;
        userFullInfo.hidden = true;
        postFullInfo.hidden = false;

        alert(selectedPost.id);

        await fetch(`${postsApiUrl}/${selectedPost.id}`).then(response => response.json()).then(result => 
        {
            postTitle.innerHTML =
            `
                <p><b>Title: </b>${result.title}</p>
                <p id="${result.userId}" class="authorname"><b>Author: </b>${usersData[result.userId - 1].name}</p>
                <br>
                <p>${result.body}</p>
            `
        })

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
}

showAllUsers();

usersContainer.addEventListener("click", (event) => getUser(event, ".userinfo"));
postsHeaders.addEventListener("click", (event) => getPost(event, ".postheader"));
newsFeed.addEventListener("click", (event) => getPost(event, ".postinfo"))
postTitle.addEventListener("click", (event) => getUser(event, ".authorname"));

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