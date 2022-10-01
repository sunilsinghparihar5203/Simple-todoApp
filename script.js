function TodoformSubmit() {
    const mytasks = {
        ID: Math.random().toString(16).slice(2),
        Title: $("#title").val(),
        Description: $("#description").val(),
        Status: "Pending",
    }

    localStorage.setItem(mytasks.ID, JSON.stringify(mytasks))
    showCards("All")
}

showCards("All")

function showCards(Type) {
    let items = getAllKeys()
    let item;
    $("#listcontainer").html("")
    if (Type != 'All') {
        for (let i = 0; i < items.length; i++) {
            item = localStorage.getItem(items[i]);
            item = JSON.parse(item);
            let display ;
            if(item.Status === "Pending"){
                display = `<button class="btn btn-sm btn-info hello" onClick="ChangeStatus('${item.ID}','${item.Title}','${item.Description}','${Type}')">Complete</button>`;
            }else{
                display = " " 
            }
           
            if (item.Status == Type) {
                $("#listcontainer").append(`<div class="card m-1" style="width:16rem">
                                    <div class="card-body">
                                      <h5 class="card-title">${item.Title ? item.Title : 'NA'}</h5>
                                      <p class="card-text">${item.Description ? item.Description : 'NA'}</p>
                                      <p class="card-text">Status : ${item.Status ? item.Status : 'NA'}</p>
                                      ${display}
                                      <button class="btn btn-sm mx-2 btn-warning"    onClick="DeleteItem('${item.ID}','${item.Title}','${Type}')">Delete</button>
                                    </div>
                                  </div>`);
            }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            item = localStorage.getItem(items[i]);
            item = JSON.parse(item);
            if(item.Status === "Pending"){
                display = `<button class="btn btn-sm btn-info hello" onClick="ChangeStatus('${item.ID}','${item.Title}','${item.Description}','${Type}')">Complete</button>`;
            }else{
                display = " " 
            }
            $("#listcontainer").append(`<div class="card m-1" style="width:16rem">
                                    <div class="card-body">
                                      <h5 class="card-title">${item.Title ? item.Title : 'NA'}</h5>
                                      <p class="card-text">${item.Description ? item.Description : 'NA'}</p>
                                      <p class="card-text">Status : ${item.Status ? item.Status : 'NA'}</p>
                                      ${display}
                                      <button class="btn btn-sm mx-2 btn-warning" onClick="DeleteItem('${item.ID}','${item.Title}','${Type}')">Delete</button>
                                    </div>
                                  </div>`);
        }
    }

}


function getAllKeys() {
    let values = []
    let keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
        values.push(keys[i])
    }
    return values
}

function DeleteItem(id, title, type) {
    if (confirm("confirm!")) {
        localStorage.removeItem(id);
        alert(`${title} deleted!`)
        showCards(type)
    }
}

function ChangeStatus(id, title, description, type) {
    if (confirm("confirm!")) {
        const mytasksUpdate = {
            ID: id,
            Title: title,
            Description: description,
            Status: "Completed",
        }
        localStorage.setItem(id, JSON.stringify(mytasksUpdate))
        alert(`${title} Completed!`)
        showCards(type)
    }
}