async function updateTextOnClipboardChange() {
    try {
        let totalRow = 0;
        let totalCol = 0;
        const clipboardTask = async () => {
            try {
                const clipboardText = await window.fromParent.getClipboardText();
                await window.fromParent.updateClipboardText(clipboardText);

                const rows = clipboardText.split("\n");
                totalRow = rows.length;
                totalCol = rows[0]?.split("\t")?.length;

                // const information = document.getElementById('clipboardText');
                // information?.innerText = clipboardText;

                const rowNum = document.getElementById('rowAndCol');
                rowNum.innerText = `จำนวนข้อมูล: ${totalRow} row x ${totalCol} column`;

                setTimeout(clipboardTask, 500);
            }
            catch (error) {
                console.log(error);
            }
        };
        clipboardTask();
    }
    catch (error) {
        console.log(error);
    }
}

updateTextOnClipboardChange();

window.fromParent.getStatus((isLoading) => {
    const loadingElm = document.getElementById('loading-spinner');
    const loadingTextElm = document.getElementById('loading-text');
    if(loadingElm && isLoading === true) {
        loadingElm.className = "visible";
        loadingTextElm.className = "visible";
    }
    else {
        loadingElm.className = "invisible";
        loadingTextElm.className = "invisible";
    }
});


const checkbox = document.getElementById('flexCheckDefault');
let isAlwaysOnTop = false;
checkbox.addEventListener("click", async function () {
    isAlwaysOnTop = !isAlwaysOnTop;
    await window.fromParent.setAlwaysOnTop(isAlwaysOnTop);
});


// const grokBtn = document.getElementById('grok');
// async function sendKey() {
//     try {
//         const clipboardText = await window.fromParent.getClipboardText();
//         await window.fromParent.sendKeyStroke(clipboardText);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// grokBtn.onclick = function () {
//     sendKey();
// };