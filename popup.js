document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(null, (items) => {
        const siteList = document.getElementById('siteList');
        for (const [site, time] of Object.entries(items)) {
            const li = document.createElement('div');
            li.textContent = `${site}: ${(time / 1000).toFixed(1)} sec`;
            siteList.appendChild(li);
        }
    });

    document.getElementById('openDashboard').addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/dashboard.html') });
    });
});
