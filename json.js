function loadTable(VehicleNo = '') {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/VehicleInsurance?VehicleNo_like=${VehicleNo}`);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += "<td>" + object["VehicleNo"] + "</td>";
                trHTML += "<td>" + object["VehicleType"] + "</td>";
                trHTML += "<td>" + object["Date"] + "</td>";
                trHTML += "<td>" + object["Period"] + "</td>";
                trHTML += "<td>" + object["Amount"] + "</td>";
                trHTML +=
                    '<td><img width="50px" src="' +
                    object["Image"] +
                    '" class="Image"></td>';
                trHTML +=
                    '<td><button type="button" class="btn btn-secondary ms-2" onclick="showUserEditBox(' +
                    object["id"] +
                    ')"><i class="fa-sharp fa-solid fa-user-pen"></i></button>';
                trHTML +=
                    '<button type="button" class="btn  btn-danger ms-2" onclick="userDelete(' +
                    object["id"] +
                    ')"><i class="fa-sharp fa-solid fa-trash"></i></button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}

loadTable();
// searching
function search() {
    const VehicleNo = document.getElementById("searchvalue").value;
    loadTable(VehicleNo);
}

function showUserCreateBox() {
    Swal.fire({
        title: "Add Insurance Details ",
        html: '<input id="id" type="hidden">' +
            '<input id="VehicleNo" class="swal2-input" placeholder="VehicleNo">' +
            '<input id="VehicleType" class="swal2-input" placeholder="VehicleType">' +
            '<input id="Date" class="swal2-input" placeholder="Date">' +
            '<input id="Period" class="swal2-input" placeholder="Period">' +
            '<input id="Amount" class="swal2-input" placeholder="Amount">' +
            '<input  id="image" type="file" class="swal2-input">',
        preConfirm: () => {
            userCreate();
        },
    });
}

function userCreate() {
    const VehicleNo = document.getElementById("VehicleNo").value;
    const VehicleType = document.getElementById("VehicleType").value;
    const Date = document.getElementById("Date").value;
    const Period = document.getElementById("Period").value;
    const Amount = document.getElementById("Amount").value;
    const imageInput = document.getElementById("image");
    const filename = "assets/images/" + imageInput.files[0].name;

    if (validate() == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/VehicleInsurance/");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(
            JSON.stringify({
                VehicleNo: VehicleNo,
                VehicleType: VehicleType,
                Date: Date,
                Period: Period,
                Amount: Amount,
                Image: filename,

            })
        );
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                loadTable();
            }
        };
    }
}

function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/VehicleInsurance/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);

            console.log(objects);
            Swal.fire({
                title: "Edit VehicleInsurance List",
                html: '<input id="id" type="hidden" value="' +
                    objects[`${id}`] + '">' +
                    '<input id="VehicleNo" class="swal2-input" placeholder="VehicleNo" value="' +
                    objects["VehicleNo"] + '">' +
                    '<input id="VehicleType" class="swal2-input" placeholder="VehicleType" value="' +
                    objects["VehicleType"] + '">' +
                    '<input id="Date" class="swal2-input" placeholder="Date" value="' +
                    objects["Date"] + '">' +
                    '<input id="Period" class="swal2-input" placeholder="Period" value="' +
                    objects["Period"] + '">' +
                    '<input id="Amount" class="swal2-input" placeholder="Amount" value="' +
                    objects["Amount"] + '">' +
                    '<input style="margin-left:50px;margin-top:20px" id="image" type="file" class="swal2-input" value="' + objects[`image`] + '">',
                preConfirm: () => {
                    userEdit(id);
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            const objects = JSON.parse(this.responseText);

                            loadTable();
                        }
                    };
                },
            });
        }
    };
}

function userEdit(id) {
    const VehicleNo = document.getElementById("VehicleNo").value;
    const VehicleType = document.getElementById("VehicleType").value;
    const Date = document.getElementById("Date").value;
    const Period = document.getElementById("Period").value;
    const Amount = document.getElementById("Amount").value;
    const imageInput = document.getElementById("image");
    const filename = "assets/images/" + imageInput.files[0].name;
    if (validate_edit() == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/VehicleInsurance/${id}`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(
            JSON.stringify({

                VehicleNo: VehicleNo,
                VehicleType: VehicleType,
                Date: Date,
                Address: Address,
                Period: Period,
                Amount: Amount,
                Image: filename,

            })

        );
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                loadTable();
            }
        };
    }
}


function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/VehicleInsurance/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Delete!',
        confirmButtonAriaLabel: 'Thumbs up, Delete!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => {
        if (result.value) {
            xhttp.send(
                JSON.stringify({
                    id: id,
                })
            );
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    swal.fire({
                        title: "Deleted Successfully",
                        icon: "success",
                        confirmButtonText: "OK"
                    })
                    loadTable();
                }
            };
        }
    });
}

function validate() {
    const VehicleNo = document.getElementById("VehicleNo").value;
    const VehicleType = document.getElementById("VehicleType").value;
    const Date = document.getElementById("Date").value;
    const Period = document.getElementById("Period").value;
    const Amount = document.getElementById("Amount").value;

    if (VehicleNo == "" || VehicleType == "" || Date == "" || Period == "" || Amount == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        })
        return false;
    }
    else {
        return true;
    }
}

function validate_edit() {
    const VehicleNo = document.getElementById("VehicleNo").value;
    const VehicleType = document.getElementById("VehicleType").value;
    const Date = document.getElementById("Date").value;
    const Period = document.getElementById("Period").value;
    const Amount = document.getElementById("Amount").value;
   
    if (VehicleNo == "" || VehicleType == "" || Date == "" || Period == "" || Amount == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        })
        return false;
    }

   else{
        return true;
    }
}