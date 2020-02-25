let obj = [
    {
        firstName: "Hardik",
        lastName: "Motwani"
    },
    {
        firstName: "Honey",
        lastName: "Kapoor"
    },
    {
        firstName: "Tom",
        lastName: "Latham"
    },
    {
        firstName: "Jerry",
        lastName: "Patel"
    },
    {
        firstName: "Shizuka",
        lastName: "Benjamin"
    },
    {
        firstName: "Kyle",
        lastName: "Jamieson"
    },
    {
        firstName: "Jane",
        lastName: "Doe"
    },
    {
        firstName: "Shruti",
        lastName: "Sinha"
    },
    {
        firstName: "Adam",
        lastName: "Gilchrist"
    },
    {
        firstName: "Elysse",
        lastName: "Perry"
    }
];

const dynamicArray = [];
// const body = document.getElementsByTagName("body")[0];
const container = document.getElementById("mainContainer");
const div = document.createElement("div");
const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");
let id=0;
function generate_table() {
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");

    const cellText1 = document.createTextNode(document.getElementById("firstName").value);
    const cellText2 = document.createTextNode(document.getElementById("lastName").value);

    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");
    btnEdit.textContent="Edit";
    btnDelete.textContent="Delete";
    
    cell1.appendChild(cellText1);
    cell2.appendChild(cellText2);
    cell3.appendChild(btnEdit);
    cell4.appendChild(btnDelete);

    row.setAttribute("id",id);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    console.log(dynamicArray);
    
    tblBody.appendChild(row);

    tbl.appendChild(tblBody);

    div.appendChild(tbl);

    container.appendChild(div);
    
    // tbl.setAttribute("border", "2");
    tbl.className="table table-striped text-center table-bordered";
    btnEdit.style.backgroundColor="#72bf44";
    btnDelete.style.backgroundColor="red";

    btnEdit.setAttribute("onclick", `editRow(${id})`); //"editRow("+id+")"
    // btnDelete.setAttribute("onclick", "deleteRow(id)");
    btnDelete.setAttribute("onclick", `deleteRow(${id})`);

    dynamicArray.push(
        {
            firstName: cellText1.textContent, 
            lastName: cellText2.textContent
        }
    );
    id++;
}

function editRow(userID) {
    console.log(userID);
    // console.log(dynamicArray[userID]);
    document.getElementById("firstName").value = dynamicArray[userID].firstName;
    document.getElementById("lastName").value = dynamicArray[userID].lastName;
    document.getElementById("firstName").focus();
    document.getElementById("btnAdd").innerHTML = "UPDATE";
    updateRow(userID);
}

function updateRow(userID) {
    let fname = document.getElementById("firstName").value;
    let lname = document.getElementById("lastName").value;
    dynamicArray.splice(userID, 1, {firstName: "Harry", lastName: "patel"});
    for(let i = 0; i < dynamicArray.length; i++) {
        
    }
    console.log(dynamicArray);
    // dynamicArray.splice(userID-1, 1, {firstName: fname, lastName: lname});
}

function deleteRow(userID) {
    console.log(userID);
    dynamicArray.splice(userID, 1);
    // generate_table();
    console.log(dynamicArray);
}

function renderData() {
    for(let i = 0; i < obj.length; i++) {

    }
}