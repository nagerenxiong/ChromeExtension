var ischrome = typeof sogouExplorer == 'undefined';
if (ischrome) {
    sogouExplorer = chrome;
} else {
    chrome = sogouExplorer;
}

