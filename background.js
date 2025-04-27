let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (activeTabId && startTime) {
        const timeSpent = Date.now() - startTime;
        const { url } = await chrome.tabs.get(activeTabId);
        saveTime(url, timeSpent);
    }
    activeTabId = activeInfo.tabId;
    startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        activeTabId = tabId;
        startTime = Date.now();
    }
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        if (activeTabId && startTime) {
            chrome.tabs.get(activeTabId).then(tab => {
                const timeSpent = Date.now() - startTime;
                saveTime(tab.url, timeSpent);
            });
        }
        activeTabId = null;
        startTime = null;
    }
});

function saveTime(url, timeSpent) {
    const domain = (new URL(url)).hostname;
    chrome.storage.local.get([domain], (result) => {
        const previousTime = result[domain] || 0;
        chrome.storage.local.set({ [domain]: previousTime + timeSpent });
    });
}
