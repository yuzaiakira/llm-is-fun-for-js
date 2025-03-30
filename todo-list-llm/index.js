const input = document.getElementById("input");
const listItem = document.getElementById("listItem");
const llmResult = document.getElementById("llmResult");

const submit = document.getElementById("submit");
const clear = document.getElementById("clear");
const calculateAi = document.getElementById("calculateAi");

// Submit button
document.getElementById("submit").addEventListener("click", addText);
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        addText();
    }
});

// Add text to textarea
function addText() {
    if (input.value.trim() !== "") {
        listItem.value += (listItem.value ? "\n" : "") + input.value;
        input.value = "";
    }
}

// Clear button
document.getElementById("clear").addEventListener("click", function () {
    listItem.value = "";
});


// Calculate AI button
calculateAi.addEventListener("click", function () {
    const text = listItem.value;
    const list = formatList(text);
    llmResult.innerHTML = "loading...";
    botResponse(list);
});

// make markdown list style
function formatList(text) {
    return text
        .split("\n")
        .filter(line => line.trim() !== "") 
        .map(line => `- ${line}`)
        .join("\n");
}

// AI response
function botResponse(userMsg) {
    let prompt = `You are an advanced task organizer. Given the following list of tasks:  

${userMsg} 

Your job is to:  
1. Complete the list by adding any missing steps.  
2. Ensure each task is a single concise sentence.  
3. Arrange tasks logically and sequentially.  
4. Output ONLY in pure HTML \`<li>\` format without any extra words or explanations.  

### Example:  

**Input:**  
Buy groceries.  
Develop a website.  
Fix a bug in my code.  

**Output:**  
<li>Create a grocery list</li>  
<li>Go to the supermarket</li>  
<li>Purchase necessary items</li>  
<li>Return home and store groceries</li>  
<li>Plan website structure</li>  
<li>Design the website layout</li>  
<li>Write website code</li>  
<li>Test functionality</li>  
<li>Fix bugs</li>  
<li>Deploy the website</li>  
<li>Identify the bug in the code</li>  
<li>Debug and fix the issue</li>  
<li>Test and verify the fix</li>`;

    puter.ai.chat(prompt).then(response => {
        llmResult.innerHTML = response.toString();
    }).catch(error => {
        console.error("AI response error:", error);
    });
    
}