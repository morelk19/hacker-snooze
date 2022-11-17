let button = document.querySelector("#storyButton");
let comments = document.querySelector("#comments");

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

    let comments = 0;

    if (data.kids === undefined){
        comments = 0;
    }else{
        comments = data.kids.length;
    }

    addRow(data.url, data.title, data.score, comments, data.by, itemNum)
    
}
function addRow(url, title, score, numComments, authorsUser, itemNum) {
    let table = document.querySelector("#myTable");
    commentAPIrequest(itemNum);

    let template = `
    <tr>
    <th table-striped scope=\'column\'>${count}</th>
    <td scope="col" class="column">${url}</td>
    <td scope="col"class="column" ><a href=\'${url}\' class="link-primary">${title}</a></td>
    <td scope="col"class="column" >${score}</td>
    <td scope="col"class="column"><a href=\'\' class="link-primary">${numComments}</a></td>
    <td scope="col"class="column" >${authorsUser}</td>
</tr>
`;
table.innerHTML += template;
count++;

}

let commentAPIrequest = async(itemNum) =>{
    let response = await fetch(`https://news.ycombinator.com/item?id=${itemNum}`);
    
    let data = await response.json();

    console.log(data);


  
    
}
