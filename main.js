let data;
let currentpage;

let request = new XMLHttpRequest();
let url = "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json";
request.open("GET",url,true);
request.onload = () => {
    data = JSON.parse(request.responseText);
    tableData();
    navigate();
}
request.send();

let table = creation("table",document.body,"",[['style','width:90%; margin:50px 5%']]);

function creation(elem,parent,content = "",attributes = [])
{
    let element= document.createElement(elem);
    attributes.forEach((value) => {
        element.setAttribute(value[0],value[1]);
    });
    element.textContent=content;
    parent.append(element);
    return element;
}

function tableData()
{
    let header = creation("thead",table,"",[["style","color:white; background:lightblue;"]]);
    let headRow = creation("tr",header);
    creation("th",headRow,"ID");
    creation("th",headRow,"Name");
    creation("th",headRow,"Email");

    let body = creation("tbody",table);
    for(let i=0;i<10;i++)
    {
        let bodyRow = creation("tr",body,"",[["style","color:black; background:lightblue;"]]);
        creation("td",bodyRow);
        creation("td",bodyRow);
        creation("td",bodyRow);
    }
    resetTable(1);
}


function resetTable(pagenum){
    if(pagenum<1) pagenum = 1;
    if(pagenum>10) pagenum = 10;
    currentpage = pagenum;
    let entrynum = currentpage * 10;
    let body = document.querySelector("tbody");
    for(let j = entrynum - 10, k=0; j < entrynum; j++,k++)
    {
        resetRow(body.children[k],data[j])
    }  
} 

function resetRow(row,info){
    row.children[0].textContent = info['id'];
    row.children[1].textContent = info['name'];
    row.children[2].textContent = info['email'];
}

function navigate(){
   
    let paginate = creation("div",document.body,"",[['style','width:100%; text-align:center;']])

    let first = creation("button",paginate,"FIRST");
    first.addEventListener("click",()=>resetTable(1));

    let previous = creation("button",paginate,"PREVIOUS")
    previous.addEventListener("click",()=> resetTable(currentpage - 1));

    for (let j=1;j<=10;j++){
        let page = creation("button",paginate,j);
        page.addEventListener("click", () => resetTable(j))
    }

    let next = creation("button",paginate,"NEXT")
    next.addEventListener("click",() => resetTable(currentpage + 1));

    let last = creation("button",paginate,"LAST");
    last.addEventListener("click",()=> resetTable(10));
}