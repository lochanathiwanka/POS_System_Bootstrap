/*Stages Styling----*/
function showManageItemForm() {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    $("#manageItemForm").css("display", "block");
    $("#placeOrderForm").css("display", "none");
    $("#manageCustomerForm").css("display", "none");
}

function showPlaceOrderForm() {
    $("#placeOrderForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#manageCustomerForm").css("display", "none");
}

function showManageCustomerForm() {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    $("#manageCustomerForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#placeOrderForm").css("display", "none");
}
/*--------------------------------------------------*/

/*Add items to Item table*/
$("#btnAddItem").click(function () {
    let description = $("#txtDescription").val();
    let unitPrice = $("#txtUnitPrice").val();
    let qty = $("#txtItemQTY").val();
    $("#tblItems-manage-items > tbody").append("<tr>" +
        "<td>P003</td>" +
        "<td>"+description+"</td>" +
        "<td>"+qty+"</td>" +
        "<td>"+unitPrice+"</td>" +
        "</tr>");
    setItemDetailsValue("", "", "");
});

function setItemDetailsValue(description, unitPrice, qty) {
    $("#txtDescription").val(description);
    $("#txtUnitPrice").val(unitPrice);
    $("#txtItemQTY").val(qty);
}
/*-----------------------------------------------*/

/*Select item from Item table*/
$("#tblItems-manage-items > tbody").on("click", "tr", function () {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let selectedRow = $(this).closest("tr");
    $(this).css({
        "background-color" : "#a7a7a7",
        "color" : "white"
    });

    let description = selectedRow.find("td:eq(1)").text();
    let unitPrice = selectedRow.find("td:eq(2)").text();
    let qty = selectedRow.find("td:eq(3)").text();

    setItemDetailsValue(description, unitPrice, qty);
});
/*----------------------------------------*/

/*Add customer to Customer table*/
$("#btnAddCustomer").click(function () {
    let name = $("#txtCustomerName").val();
    let address = $("#txtCustomerAddress").val();
    let contact = $("#txtCustomerContact").val();

    $("#tblCustomers > tbody").append("<tr>" +
        "<td>C005</td>" +
        "<td>"+name+"</td>" +
        "<td>"+address+"</td>" +
        "<td>"+contact+"</td>" +
        "</tr>");
    setCustomerDetailsValue("", "", "");
});

function setCustomerDetailsValue(name, address, contact) {
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}
/*-----------------------------------------*/

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

    let name = selectedRow.find("td:eq(1)").text();
    let address = selectedRow.find("td:eq(2)").text();
    let contact = selectedRow.find("td:eq(3)").text();

    setCustomerDetailsValue(name, address, contact);
});
/*--------------------------------------------*/
