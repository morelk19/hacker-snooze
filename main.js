let button = document.querySelector("#storyButton")
let count = 1;




button.addEventListener("click", function(){
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then((response) => response.json())
    .then((storyIds) => {
        console.log(storyIds);
        for(let i = 0; i< 200; i++){
            itemAPIrequest(storyIds[i]);
        }
        count = 1;
        


        // TODO:
        // * For each ID...
        //   * Make an API request to get the story's details

    });
})


let itemAPIrequest = async(itemNum, row) =>{
    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemNum}.json?print=pretty`);
    
    let data = await response.json();

    console.log(data);
    let comments = 0;

    if (data.kids === undefined){
        comments = 0;
    }else{
        comments = data.kids.length;
    }


    addRow(data.url, data.title, data.score, comments, data.by)



    
}
function addRow(url, title, score, numComments, authorsUser) {
    let table = document.querySelector("#myTable");

    let template = `
    <tr>
    <th table-striped scope=\'row\'>${count}</th>
    <td>${url}</td>
    <td><a href=\'${url}\' class="link-primary">${title}</a></td>
    <td>${score}</td>
    <td>${numComments}</td>
    <td>${authorsUser}</td>
</tr>
`;
table.innerHTML += template;
count++;

}
