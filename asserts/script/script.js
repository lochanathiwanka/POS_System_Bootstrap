/*Stages Styling----*/
function showManageItemForm() {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    setItemDetailsValue("", "", "");
    $("#txtSearchItem").val("");
    $("#manageItemForm").css("display", "block");
    $("#placeOrderForm").css("display", "none");
    $("#manageCustomerForm").css("display", "none");
}

function showPlaceOrderForm() {
    $("#tblItems > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    $("#tblCart > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    getAllItemsOnPlaceOrderForm();
    $("#txtQTY").val("");
    setCustomerDetailsOnPlaceOrder("", "", "");
    $("#cmbCustomers").get(0).selectedIndex = 0;
    $("#placeOrderForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#manageCustomerForm").css("display", "none");
}

function showManageCustomerForm() {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    setCustomerDetailsValue("", "", "");
    $("#txtSearchCustomer").val("");
    $("#manageCustomerForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#placeOrderForm").css("display", "none");
}
/*--------------------------------------------------*/