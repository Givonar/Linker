document.addEventListener('DOMContentLoaded', (event) => {
    let links = [];
    let currentIndex = 0;

    document.getElementById('parse').addEventListener('click', function() {
        const text = document.getElementById('inputText').value;
        links = text.match(/(https?:\/\/[^\s]+)/g) || [];
        currentIndex = 0;
        updateLinkDisplay();
    });

    document.getElementById('nextLink').addEventListener('click', function() {
        if (currentIndex < links.length - 1) {
            currentIndex++;
            updateLinkDisplay();
        }
    });

    document.getElementById('prevLink').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLinkDisplay();
        }
    });

    document.getElementById('copyLink').addEventListener('click', function() {
        navigator.clipboard.writeText(links[currentIndex]).then(() => {
            console.log('Link copied to clipboard');
            if (document.getElementById('autoNext').checked && currentIndex < links.length - 1) {
                currentIndex++;
                updateLinkDisplay();
            }
        });
    });

    function updateLinkDisplay() {
        document.getElementById('currentLink').value = links[currentIndex] || '';
        // Disable buttons if at the start or end of the list
        document.getElementById('prevLink').disabled = currentIndex === 0;
        document.getElementById('nextLink').disabled = currentIndex === links.length - 1;
    }
});
