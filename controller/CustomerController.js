/*Generate Item Code*/
function generateCustomerId() {
    try {
        let lastCustomerId = customerTable[customerTable.length-1].getCid();
        let newCustomerId = parseInt(lastCustomerId.substring(1,4))+1;
        if (newCustomerId < 10) {
            $("#customer-id").text("#C00"+newCustomerId);
        }else if (newCustomerId < 100) {
            $("#customer-id").text("#C0"+newCustomerId);
        } else {
            $("#customer-id").text("#C"+newCustomerId);
        }
    } catch (e) {
        $("#customer-id").text("#C001");
    }

}
generateCustomerId();

/*Add customer to Customer table*/
$("#btnAddCustomer").click(function () {
    let cid = $("#customer-id").text().substring(1);
    let name = $("#txtCustomerName").val();
    let address = $("#txtCustomerAddress").val();
    let contact = $("#txtCustomerContact").val();


    if (name.length !==0 && address.length !==0 && contact.length !==0) {
        customerTable.push(new Customer(cid, name, address, contact));
        getAllCustomers();
        setCustomerDetailsValue("", "", "");
        generateCustomerId();

        addValuesToCmbCustomers("<option>"+cid+"</option>");
    } else {
        alert("Fields cannot be empty!");
    }
});
function setCustomerDetailsValue(name, address, contact) {
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}

function getAllCustomers() {
    $("#tblCustomers > tbody").empty();
    for (let i = 0; i < customerTable.length; i++) {
        $("#tblCustomers > tbody").append("<tr>" +
            "<td>"+customerTable[i].getCid()+"</td>" +
            "<td>"+customerTable[i].getName()+"</td>" +
            "<td>"+customerTable[i].getAddress()+"</td>" +
            "<td>"+customerTable[i].getContact()+"</td>" +
            "</tr>");
    }
}

/*Select customer from Customer table*/
$("#tblCustomers > tbody").on("click", "tr", function () {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let selectedRow = $(this).closest("tr");
    $(this).css({
        "background-color" : "#a7a7a7",
        "color" : "white"
    });

    let cid = selectedRow.find("td:eq(0)").text();
    let name = selectedRow.find("td:eq(1)").text();
    let address = selectedRow.find("td:eq(2)").text();
    let contact = selectedRow.find("td:eq(3)").text();

    setCustomerDetailsValue(name, address, contact);
    $("#txtSearchCustomer").val(cid);
});

/*Update a Customer*/
$("#btnUpdateCustomer").click(function () {
    if ($("#txtCustomerName").val().length !== 0) {
        let cid = $("#txtSearchCustomer").val();
        let name = $("#txtCustomerName").val();
        let address = $("#txtCustomerAddress").val();
        let contact = $("#txtCustomerContact").val();

        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].getCid() === cid ) {
                customerTable[i].setName(name);
                customerTable[i].setAddress(address);
                customerTable[i].setContact(contact);
            }
        }
        getAllCustomers();
        alert("Customer was updated!");
        setCustomerDetailsValue("", "", "");
        $("#txtSearchCustomer").val("");
    } else {
        alert("Select a Customer to Update!");
    }
});

/*Remove a Customer*/
$("#btnRemoveCustomer").click(function () {
    if ($("#txtCustomerName").val().length !== 0) {
        let cid = $("#txtSearchCustomer").val();

        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].getCid() === cid ) {
                customerTable.splice(i, 1);
            }
        }
        getAllCustomers();
        alert("Customer was deleted!");
        generateCustomerId();
        setCustomerDetailsValue("", "", "");
        $("#txtSearchCustomer").val("");

        let cmbCustomer = document.getElementById("cmbCustomers");
        for (let i = 0; i < cmbCustomer.length; i++) {
            if (cmbCustomer.options[i].innerText === cid) {
                cmbCustomer.remove(i);
            }
        }
    } else {
        alert("Select a Customer to Remove!");
    }
});

/*Search a Customer*/
$("#txtSearchCustomer").on("keyup", function () {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let cid = $("#txtSearchCustomer").val();
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getCid().toLowerCase() === cid.toLowerCase() ) {
            setCustomerDetailsValue(customerTable[i].getName(), customerTable[i].getAddress(), customerTable[i].getContact());
            return;
        }
    }
    setCustomerDetailsValue("", "", "");
});
