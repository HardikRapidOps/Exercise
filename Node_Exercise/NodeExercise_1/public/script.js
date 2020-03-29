function fetchData() {
    fetch('http://localhost:3000/user')
        .then(res => res.json())
        .then(data => displayUser(data))
        .catch(err => console.error('Could not find', err));
}

function displayUser(user) {
    console.log(user);
    
    for (data of user) {
        document.getElementById('tbody').innerHTML +=
            `<tr>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td><button class="btn btn-success" onclick='editUser(${data._id})'>Edit</button></td>
                <td><button class="btn btn-danger" onsubmit='deleteUser(${data._id})'>Delete</button></td>
            </tr>`
    }
};

fetchData();

function editUser(id) {
    // console.log(this);
    console.log(id);
    
    // document.getElementsByName('firstName').value = ;
    const editObj = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
    };

    fetch('http://localhost:3000/user', editObj)
        .then(res => res.json())
        .then(data => displayUser(data))
        .catch(err => console.error('Could not find', err));
}

function deleteUser(id) {
    
}

addBtn.addEventListener('click', () => {
    fetchData();
    // const configObj = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //         firstName, 
    //         lastName
    //     })
    // };
    // fetch(`http://localhost:3000/`, configObj)
    // .then(res => res.json());
    // .then(user => console.log(user));
    // let response = await fetch('http://localhost:3000/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(firstName, lastName)
    //   });
      
    //   let result = await response.json();
    //   alert(result.message);

});