let loadingGifHTML = `<div id="loading-gif" class="loading-gif"><div class="gif-container"><img src="./static/rotating-balls-spinner.gif"></div></div>`
let table = document.getElementById('reportTable');
let userGridLayOut = document.getElementById('userGridLayOut');
var firstRow;
var tableRows;
$(document).ready(function () {
    $('#uploadForm').submit(function () {
        document.getElementById('documentForm').innerHTML += loadingGifHTML
        $(this).ajaxSubmit({
            error: function (xhr) {
                console.log(xhr)
            },
            success: function (response) {
                document.getElementById('loading-gif').remove();
                document.getElementById('previewContainer').style.display = "block";
                console.log(JSON.stringify(response));
                for (let key in response.report) {
                    firstRow = document.createElement('tr')
                    firstRow.id = key;
                    firstRow.innerHTML = '<th></th><th>' + key + '</th>';
                    // console.log(Object.keys(response.report).indexOf(key))
                    if (Object.keys(response.report).indexOf(key) == 0) {
                        var firstData = firstRow;
                        table.appendChild(firstRow)
                        createRow(response.report[key])
                    }
                    else {
                        firstData.innerHTML += '<th>' + key + '</th>';
                    }
                    addDataInColumn(response.report[key])
                    // console.log(firstRow)
                    // console.log(key)
                    // console.log(response.report[key])
                }
                addNumberOfUsers(response.users);
            }
        });
        return false;
    });
});

var newRows;
function createRow(rows) {
    for (let key in rows) {
        // console.log(Object.keys(rows).indexOf(key))
        newRows = document.createElement('tr');
        newRows.id = key;
        newRows.innerHTML = '<td>' + key + '</td>';
        table.appendChild(newRows)
        // console.log(key)
    }
}

function addDataInColumn(data) {
    for (let key in data) {
        // console.log(key)
        document.getElementById(key).innerHTML += '<td>'+data[key]+'</td>';
    }
}

function addNumberOfUsers(numberOfUsers){
    for (let key in numberOfUsers) {
        userGridLayOut.innerHTML += '<div class="full-sec"><div class="left-sec">'+key+'</div><div class="right-sec">'+numberOfUsers[key]+'</div></div>'
    }
}

function sendFile() {
    return new Promise(async function (resolve, reject) {
        let file = document.getElementById("excelFile");


        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
        $.ajax({
            type: "POST",
            headers: "application/json",
            url: "/calulation",
            data: queryData,
            success: function (urldata) {
                console.log(JSON.stringify(urldata))
                submitForm(urldata)
            },
            error: function () {
            }
        });
    })
}

function submitForm(urldata) {
    return new Promise(function (resolve, reject) {
        console.log("submitForm@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(urldata["projectId"])
        console.log(urldata["url"])

        $("#sec-webLoader").hide();

        setTimeout(function () {

            document.body.innerHTML +=
                '<section class="sec-main sec-download" id="sec-download">' +
                '<div class="container">' +
                '<div class="documentForm documentFormDowmload">' +
                '<div class="closeDocsection" onclick="closeSecDownload()">' +
                '<img src="./static/close.png">' +
                '</div>' +
                '<h3 class="main-title center">Total Unhandled Queries</h3>' +
                '<h6>Project Id: <span>' + urldata["projectId"] + '</span></h6>' +
                '<div class="titleBorder">' +
                '<div class="borderBar1"></div>' +
                '<div class="borderBar2"></div>' +
                '</div>' +
                '<div class="row">' +
                '<form class="col s12">' +
                '<div class="section">  ' +
                '<div class="row">' +
                '<div class="input-field excel-image col s12 center">' +
                '<img src="./static/excel.png" class="responsive-img">' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="input-field col s12 center">' +
                '<a href=' + urldata["url"] + ' download class="btn waves-effect waves-light">Download</a>' +
                '</div> ' +
                '</div>' +
                '</div>  ' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</section>';
        }, 1500);

    })

}
function closeSecDownload() {
    $("#sec-download").hide();
}