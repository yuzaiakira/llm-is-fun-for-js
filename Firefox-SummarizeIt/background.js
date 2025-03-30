browser.runtime.onMessage.addListener((message) => {
    browser.storage.local.set({ selectedText: message.text });
});