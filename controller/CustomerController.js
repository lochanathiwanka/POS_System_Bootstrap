/*Manage Customer Form------------------------------------------------------------*/
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
/*---------------------------------------------------------------------------------*/
