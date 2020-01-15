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