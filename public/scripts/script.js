var inputs=document.querySelectorAll('input');
inputs.forEach(input=>{
    input.addEventListener('focusout',evt=>{
        var name=evt.target.name;
        var label=document.querySelector(`[for=${name}]`);
        var value=evt.target.value;
        value!==""?label.classList.add('small-label'):label.classList.remove('small-label');
    });
});