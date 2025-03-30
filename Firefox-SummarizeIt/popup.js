const statusOutPut = document.getElementById('status');
const MODEL_ID = "gemini-2.0-flash-thinking-exp-01-21";
const GENERATE_CONTENT_API = "streamGenerateContent";
let apiKey = '';

document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get("selectedText").then((result) => {
      if (result.selectedText) {

        const article = result.selectedText;
        let sendText = `Summarize the following article while preserving all key information. The summary should be concise yet comprehensive, ensuring that no important details are omitted. Focus on retaining the essential points, main arguments, and critical data while making the text more concise.
        
        ${article}`;

        statusOutPut.textContent = "SUMMARIZING...";

        callGeminiAPI(sendText).then(LLMMsg => {
          const formattedMsg = replaceNewlineWithBr(LLMMsg);
          document.getElementById("selectedText").innerHTML = formattedMsg;
          statusOutPut.textContent = "Summary complete!";
      }).catch(error => {
          console.error("Final error:", error);
          document.getElementById("selectedText").innerHTML = `Error: ${error.message}`;
          statusOutPut.textContent = "Failed to generate summary";
      });
      
      }
    });
});

// replaceNewlineWithBr is a function that replaces all newline characters in a string with <br> tags.
function replaceNewlineWithBr(text) {
  return text.replace(/\n/g, "<br>");
}

// save api key
document.getElementById('save').addEventListener('click', () => {
  const apiKey = document.getElementById('api_key').value;
  browser.storage.local.set({ api_key: apiKey }).then(() => {
    statusOutPut.textContent = "APi Key is saved!"
    apiKey = apiKey
  });
});

// set api key to input
browser.storage.local.get('api_key').then((result) => {
  const key = result.api_key;

  if (key) {
    document.getElementById("api_key").value = '*'.repeat(key.length); // show passwprd length
    apiKey = key
  } else {
    statusOutPut.textContent = "you have not api key"
  }
});


// google ai studio
async function callGeminiAPI(inputText) {
  if (!apiKey) {
      statusOutPut.textContent = 'Error: Please enter API Key';
      return '';
  }

  try {
      const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${apiKey}`,
          {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  contents: [{
                      parts: [{ text: inputText }]
                  }]
              })
          }
      );

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      // Handle streaming response chunks
      const data = await response.json();
      
      // Check if response is in array format
      if (Array.isArray(data)) {
          return data
              .flatMap(chunk => 
                  chunk.candidates?.[0]?.content?.parts?.[0]?.text || []
              )
              .join('');
      }

      // Handle single response format
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
      }

      throw new Error('Unexpected API response structure');

  } catch (error) {
      statusOutPut.textContent = `Error: ${error.message}`;
      console.error('API Error:', error);
      return '';
  }
}