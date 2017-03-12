$(document).ready(function() {
    $('[name=language]').change(function(){
        if($(this).val() === 'ch-simplified'){
             $(".english").css("visibility","hidden");
             $(".ch-simplified").css("visibility","visible");
             $(".ch-traditional").css("visibility","hidden");
        }
        else if( $(this).val() === 'en' ){
             $(".english").css("visibility","visible");
             $(".ch-simplified").css("visibility","hidden");
             $(".ch-traditional").css("visibility","hidden");
        }
        else if( $(this).val() === 'ch-traditional' ){
             $(".english").css("visibility","hidden");
             $(".ch-simplified").css("visibility","hidden");
             $(".ch-traditional").css("visibility","visible");
        }
    });
});