let loadingGifHTML = `<div id="loading-gif" class="loading-gif"><div class="gif-container"><img src="./static/rotating-balls-spinner.gif"></div></div>`
let dataPreviewHTML = `<table>
                            <tr>
                                <th></th>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                        </table>`;

// function displayData(data){
//     let journey = data.report
//     for(key in journey){
//         document.getElementById('paymentDone')
//     }
// }

function getDataFromExcel(data){
    for(detail in data){
        console.log(detail)
        console.log(data[detail]) 
        $('#reportTable').append('<tr id="'+detail+'"><td>'+detail+'</td><tr>')
        $('#'+detail).append('<td>'+data[detail]+'</td>')
        // if(detail == 'paymentDone'){
        //     document.getElementById('paymentDone').innerHTML += data[detail]
        // }
        // else if(detail == 'paymentfail'){
        //     document.getElementById('paymentfail').innerHTML += data[detail]
        // }
        // else if(detail == 'policyGenerated'){
        //     document.getElementById('policyGenerated').innerHTML += data[detail]
        // }
        // else if(detail == 'policyGeneratedFail'){
        //     document.getElementById('policyGeneratedFail').innerHTML += data[detail]
        // }
    }
}

$(document).ready(function() {
    $('#uploadForm').submit(function() {
        document.getElementById('documentForm').innerHTML += loadingGifHTML
        $(this).ajaxSubmit({
            error: function(xhr) {
                console.log(xhr)
            },
            success: function(response) {
                document.getElementById('loading-gif').remove();
                document.getElementById('previewContainer').style.display = "block";
                console.log(JSON.stringify(response));
                for(journey in response.report){
                    console.log(Object.keys(response.report).indexOf(journey))
                    if(Object.keys(response.report).indexOf(journey) == 0){
                        $('#reportTable').append('<tr id="'+journey+'"><td></td><td>'+journey+'</td></tr>')
                        $('#'+journey).append('<td>'+journey+'</td>')
                        getDataFromExcel(response.report[journey])
                    }
                    else{
                        $('#'+journey).append('<td>'+journey+'</td>')
                        console.log(journey)
                        getDataFromExcel(response.report[journey])
                    }
                }
            }
        });
   return false;
   });    
});

function sendFile(){
    return new Promise(async function(resolve, reject){
        let file = document.getElementById("excelFile");


        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
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
                success: function(urldata) {
                console.log(JSON.stringify(urldata))
                submitForm(urldata)
                },
                error: function() {
                }
            });
    })
}

function submitForm(urldata){
    return new Promise(function(resolve, reject){
        console.log("submitForm@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(urldata["projectId"])
        console.log(urldata["url"])
    
            $("#sec-webLoader").hide(); 
      
        setTimeout(function(){ 

            document.body.innerHTML +=          
            '<section class="sec-main sec-download" id="sec-download">'+
                '<div class="container">'+
                    '<div class="documentForm documentFormDowmload">'+  
                        '<div class="closeDocsection" onclick="closeSecDownload()">'+
                            '<img src="./static/close.png">'+
                        '</div>'+
                            '<h3 class="main-title center">Total Unhandled Queries</h3>'+
                            '<h6>Project Id: <span>'+urldata["projectId"]+'</span></h6>'+
                            '<div class="titleBorder">'+
                                '<div class="borderBar1"></div>'+
                                '<div class="borderBar2"></div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<form class="col s12">'+
                                    '<div class="section">  '+             
                                        '<div class="row">'+
                                            '<div class="input-field excel-image col s12 center">'+
                                                '<img src="./static/excel.png" class="responsive-img">'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="row">'+
                                            '<div class="input-field col s12 center">'+
                                                '<a href='+urldata["url"]+' download class="btn waves-effect waves-light">Download</a>'+
                                            '</div> '+                
                                        '</div>'+                 
                                    '</div>  '+
                            '</form>'+
                        '</div>'+                
                        '</div>'+
                    '</div>'+
            '</section>';
        },1500);

    })
 
}
function closeSecDownload(){
    $("#sec-download").hide();
}