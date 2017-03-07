$(document).ready(function() {
    $('[name=language]').change(function(){
        if($(this).val() === 'en'){
             alert("hi");
        }
    });
});