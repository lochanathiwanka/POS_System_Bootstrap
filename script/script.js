/*Stages Styling----*/
function showManageItemForm() {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    setItemDetailsValue("", "", "");
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
    $("#txtQTY").val("");
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
    $("#manageCustomerForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#placeOrderForm").css("display", "none");
}
/*--------------------------------------------------*/


/*Manage Items Form---------------------------------------------------------------*/
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
/*--------------------------------------------------------------------------------*/


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


/*Place Order Form*/
/*Select item qty from Item table*/
let itemDetails = [];
$("#tblItems > tbody").on("click", "tr", function () {
    $("#tblItems > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let selectedRow = $(this).closest("tr");
    $(this).css({
        "background-color" : "#a7a7a7",
        "color" : "white"
    });

    let code = selectedRow.find("td:eq(0)").text();
    let description = selectedRow.find("td:eq(1)").text();
    let qty = selectedRow.find("td:eq(2)").text();
    let unitPrice = selectedRow.find("td:eq(3)").text();

    $("#txtQTY").val(qty);
    itemDetails.push(code,description,unitPrice);
});

/*Add item to Cart*/
$("#btnAdd").click(function () {
    let newQty = $("#txtQTY");
    let check = isExist(itemDetails[0]);
    if (!check) {
        if (itemDetails[0] !== undefined) {
            let oldTot = parseFloat($("#txtTotal").val());
            if (isNaN(oldTot)) {
                oldTot = 0;
            }
            let newTot = parseInt(newQty.val()) * parseFloat(itemDetails[2]);
            let tot = oldTot + newTot;

            $("#tblCart > tbody").append("<tr>" +
                "<td>"+itemDetails[0]+"</td>" +
                "<td>"+itemDetails[1]+"</td>" +
                "<td>"+newQty.val()+"</td>" +
                "<td>"+newTot+"</td>" +
                "</tr>");

            setTotValue(tot);

            itemDetails.length = 0;

            $("#tblItems > tbody > tr").css({
                "background-color" : "initial",
                "color" : "initial"
            });
            newQty.val("");
        }
    } else {
        alert("Item is already in Cart!");
        $("#tblItems > tbody > tr").css({
            "background-color" : "initial",
            "color" : "initial"
        });
        newQty.val("");
    }
});

/*Check if item is already in the Cart??*/
const isExist = function (code) {
    /*$("#tblCart > tbody  > tr").each(function() {
        $(this).find("td:eq(0)").each(function(){
            if ($(this).text() === code) {
                console.log("this text : "+$(this).text());
                console.log("code : "+code);
                return true;
            } else {
                return false;
            }
            // console.log($(this).text());
        });
    });*/

    /*let tbl = document.getElementById("tblItems");
    for (let row of tbl.rows) {
        for (let cell of row.cells) {
            console.log(cell.innerText);
        }
    }*/

    let table = document.getElementById('tblCart');
    let count = table.rows.length;
    for(let i=0; i<count; i++) {
        if (table.rows[i].cells[0].innerText === code) {
            itemDetails.length = 0;
            return true;
        }
    }
    return false;
}

/*Select item from the Cart*/
let selectedRowOfCart;
$("#tblCart > tbody").on("click", "tr", function () {
    $("#tblCart > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    selectedRowOfCart = $(this).closest("tr");
    $(this).css({
        "background-color" : "#E4DCC0",
        "color" : "black"
    });
});

/*Delete an item from the Cart*/
$("#btnRemove").click(function () {
    let unitPrice = parseFloat(selectedRowOfCart.find("td:eq(3)").text());
    let tot = parseFloat($("#txtTotal").val()) - unitPrice;
    setTotValue(tot);

    let rowCount = $("#tblCart > tbody > tr").length;
    console.log(rowCount);
    if (rowCount === 1) {
        setTotValue("");
    }
    selectedRowOfCart.remove();
});

/*Clear Cart*/
$("#btnClear").click(function () {
    $("#tblCart > tbody").empty();
    $("#txtTotal").val("");
});

/*Set Total*/
let setTotValue = (value) => {
    $("#txtTotal").val(value);
}
