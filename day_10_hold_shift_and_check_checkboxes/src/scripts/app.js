var checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

var lastChecked;

function handleCheck(e) {

    if (!e.shiftKey) return;
    
    var first, last;
    checkboxes.forEach(function(checkbox) {
        
        if(checkbox.checked) {
            if(!first) first = checkbox;
            last = checkbox;
        }
    });

    var inBetween = false;
    
    checkboxes.forEach(function(checkbox) {
        if (checkbox === first || checkbox === last) {
            inBetween = !inBetween;
            if (checkbox === first && checkbox === last) {
                inBetween = false;
            }
        }
        if (inBetween) checkbox.checked = true;
    });
    
}

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', handleCheck);
});