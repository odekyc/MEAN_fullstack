$(document).ready(function() {
    $('[name=language]').change(function(){
        if($(this).val() === 'ch-simplified'){
             $(".english").css("visibility","hidden");
             $(".ch-simplified").css("visibility","visible");
        }
    });
});