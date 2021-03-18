/*Load Customers to Combo Box*/
function addValuesToCmbCustomers(value) {
    $("#cmbCustomers").append(value);
}

/*Select a Customer from Combo Box*/
$("#cmbCustomers").change(function () {
    let cid = $(this).children("option:selected").text();
    if (cid.toLowerCase() === "select") {
        setCustomerDetailsOnPlaceOrder("", "", "");
    }
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getCid() === cid) {
            setCustomerDetailsOnPlaceOrder(customerTable[i].getName(), customerTable[i].getAddress(), customerTable[i].getContact());
        }
    }
});

function setCustomerDetailsOnPlaceOrder(name, address, contact) {
    $("#txtName").val(name);
    $("#txtAddress").val(address);
    $("#txtContact").val(contact);
}


/*Get all Items*/
function getAllItemsOnPlaceOrderForm() {
    $("#tblItems > tbody").empty();
    for (let i = 0; i < itemTable.length; i++) {
        $("#tblItems > tbody").append("<tr>" +
            "<td>"+itemTable[i].getCode()+"</td>" +
            "<td>"+itemTable[i].getDescription()+"</td>" +
            "<td>"+itemTable[i].getQty()+"</td>" +
            "<td>"+itemTable[i].getUnitPrice()+"</td>" +
            "</tr>");
    }
}

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
    itemDetails.push(code,description,qty,unitPrice);
});

/*Add item to Cart*/
$("#btnAdd").click(function () {
    let newQty = $("#txtQTY");
    let check = isExist(itemDetails[0]);
    if (!check) {
        if (itemDetails[0] !== undefined) {
            if (itemDetails[2] >= newQty.val()) {
                let newTot = parseInt(newQty.val()) * parseFloat(itemDetails[3]);
                let tot = 0;

                $("#tblCart > tbody").append("<tr>" +
                    "<td>" + itemDetails[0] + "</td>" +
                    "<td>" + itemDetails[1] + "</td>" +
                    "<td>" + newQty.val() + "</td>" +
                    "<td>" + newTot + "</td>" +
                    "</tr>");

                let table = document.getElementById('tblCart');
                let count = table.rows.length;
                for(let i=1; i<count; i++) {
                    tot += parseFloat(table.rows[i].cells[3].innerText);
                }

                let discount = $("#txtDiscount");
                if (tot > 2000 && tot < 5000) {
                    discount.val((tot/100)*10);
                    setTotValue(tot - (tot/100)*10);
                } else if (tot > 5000) {
                    discount.val((tot/100)*20);
                    setTotValue(tot - (tot/100)*20);
                } else {
                    discount.val("");
                    setTotValue(tot);
                }

                itemDetails.length = 0;

                $("#tblItems > tbody > tr").css({
                    "background-color": "initial",
                    "color": "initial"
                });
                newQty.val("");
            } else {
                alert("Insufficient amount of QTY!");
            }
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
    let totAmountWithoutDiscount = parseFloat($("#txtDiscount").val()) + parseFloat(($("#txtTotal").val()));
    // let discount = parseFloat($("#txtDiscount").val());
    let tot = totAmountWithoutDiscount - unitPrice;

    if (tot > 2000 && tot < 5000) {
        $("#txtDiscount").val((tot/100)*10);
        setTotValue(tot - (tot/100)*10);
    } else if (tot > 5000) {
        $("#txtDiscount").val((tot/100)*20);
        setTotValue(tot - (tot/100)*20);
    } else {
        $("#txtDiscount").val("");
        setTotValue(tot);
    }

    let rowCount = $("#tblCart > tbody > tr").length;
    if (rowCount === 1) {
        $("#txtDiscount").val("");
        setTotValue("");
    }
    selectedRowOfCart.remove();
});

/*Clear Cart*/
$("#btnClear").click(function () {
    $("#tblCart > tbody").empty();
    $("#txtDiscount").val("");
    $("#txtTotal").val("");
});

/*Set Total*/
let setTotValue = (value) => {
    $("#txtTotal").val(value);
}

/*txtDiscount onAction*/
$("#txtDiscount").on("keyup", function (event) {
    let tot = 0;
    let table = document.getElementById('tblCart');
    let count = table.rows.length;
    for(let i=1; i<count; i++) {
        tot += parseFloat(table.rows[i].cells[3].innerText);
    }
    $("#txtTotal").val(tot);

    if (event.key === "Enter") {
        tot = parseFloat($("#txtTotal").val()) - parseFloat($("#txtDiscount").val());
        $("#txtTotal").val(tot);
    }
});
