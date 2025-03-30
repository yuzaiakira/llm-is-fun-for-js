document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const htmlContent = range.cloneContents();
    
    // Create temporary container
    const container = document.createElement('div');
    container.appendChild(htmlContent);
    
    // Initialize Turndown with custom options
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
  
    // Add custom rules if needed
    turndownService.addRule('pre', {
      filter: 'pre',
      replacement: (content) => `\`\`\`\n${content}\n\`\`\``
    });
  
    try {
      const markdown = turndownService.turndown(container.innerHTML);
      browser.runtime.sendMessage({ 
        text: markdown,
        html: container.innerHTML 
      });
    } catch (error) {
      console.error('Conversion error:', error);
    }
  });