const usersData = [];
const userPosts = [];

const usersApiUrl = "https://jsonplaceholder.typicode.com/users";
const postsApiUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsApiUrl = "https://jsonplaceholder.typicode.com/comments";

const usersContainer = document.getElementById("users");
const userFullInfo = document.getElementById("userfullinfo");
const postsHeaders = document.getElementById("postsheaders");
const fullUserInfo = document.getElementById("fullinfo");


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

getUsers();

usersContainer.addEventListener("click", async (event) =>
{
    const selectedUser = event.target.closest(".userinfo");

    if(selectedUser !== null)
    {
        const position = selectedUser.id - 1;

        usersContainer.hidden = true;
        userFullInfo.hidden = false;

        fullUserInfo.innerHTML =
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
        await fetch(`${postsApiUrl}?userId=${selectedUser.id}`).then(response => response.json()).then(postsArray =>
            postsArray.map(post => 
            {
                postsHeaders.querySelector("ul").innerHTML += `<li id="${post.id}" class="postheader"><u>${post.title}</u></li>`
                userPosts.push(post);
            })
        );
    } 
});
postsHeaders.addEventListener("click", (event) => 
{
    const selectedPost = event.target.closest(".postheader");

    if(selectedPost !== null)
    {
        console.log(selectedPost.id)
    }
});