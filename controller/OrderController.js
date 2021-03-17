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
