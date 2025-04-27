const productiveSites = ["github.com", "leetcode.com", "stackoverflow.com"];

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(null, (items) => {
        const analytics = document.getElementById('analytics');
        let productiveTime = 0;
        let unproductiveTime = 0;

        for (const [site, time] of Object.entries(items)) {
            const domain = new URL('https://' + site).hostname;
            if (productiveSites.includes(domain)) {
                productiveTime += time;
            } else {
                unproductiveTime += time;
            }
        }

        analytics.innerHTML = `
            <h2>Productive Time: ${(productiveTime/60000).toFixed(2)} mins</h2>
            <h2>Unproductive Time: ${(unproductiveTime/60000).toFixed(2)} mins</h2>
        `;
    });
});
