# llm-is-fun-for-js

## Introduction

This project aims to introduce front-end developers to the world of Large Language Models (LLMs), encouraging them to leverage new technologies in their projects to build exciting commercial applications. Additionally, this repository serves as an inspiration for developers to enhance their resumes by engaging with LLM-powered projects.

This project was originally created as a consultancy effort for a friend, but I decided to release it publicly so that everyone can benefit from it.

The repository includes video content with links to:

- [LinkedIn](#)
- [YouTube](#)

## Projects

### [`simple llm chat`](./simple-llm-chat/)

A basic chatbot LLM project created using a pre-built template from [sajadhsm CodePen](https://codepen.io/sajadhsm/pen/odaBdd) and the JavaScript APIs of [Puter](https://docs.puter.com/AI/chat/). This project is intended for beginners to get familiar with LLMs and understand how to send and receive requests from an LLM-powered backend.

#### Example Code

Using the following JavaScript snippet, you can interact with Puter:

```javascript
puter.ai.chat(userMsg).then(response => {
    console.error("AI response:", response.toString());
}).catch(error => {
    console.error("AI response error:", error);
});
```

---

### [`Firefox SummarizeIt`](./Firefox-SummarizeIt/)

A Firefox extension that uses [Google AI Studio](https://aistudio.google.com/) APIs to summarize selected text from articles. It utilizes the `Gemini 2.0 Flash Thinking Experimental 01-21` model to generate concise summaries efficiently.

#### Example Code

The following JavaScript snippet demonstrates how to communicate with Google models:

```javascript
// call api
const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${apiKey}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: "your input text" }]
            }]
        })
    }
);

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

```

---

### [`todo list llm`](./todo-list-llm/)

A simple To-Do List application enhanced with LLMs using Puter. This project helps organize and refine tasks dynamically. The main objective is to create a comprehensive prompt that manages both the input and output of the application effectively.

#### Example Prompt

Below is a sample prompt demonstrating how to structure input for the LLM:

```text
You are an advanced task organizer. Given the following list of tasks:  

${userMsg} 

Your job is to:  
1. Carefully analyze the given tasks and identify any missing steps.  
2. **Add all necessary missing tasks to ensure completeness.**  
3. Ensure each task is a single concise sentence.  
4. Arrange tasks logically and sequentially.  
5. **If a task is too broad, break it down into smaller actionable steps.**  
6. **Respond in the same language as the input tasks.**  
7. Output ONLY in pure HTML \`<li>\` format without any extra words or explanations.  

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
<li>Test and verify the fix</li>
```

---

## Resources

The following resources were used in this project and are also referenced in the video:

- [Puter](https://docs.puter.com/getting-started/) - Free LLM api on js
- [Google AI Studio](https://aistudio.google.com/) - Free Gemini api
- [OpenRouter](https://openrouter.ai/) - Free LLM api
- [Chat UI](https://codepen.io/sajadhsm/pen/odaBdd)

## Contribute

You are welcome to contribute by adding your own LLM-related projects to this repository. Let's make it a comprehensive resource for everyone interested in integrating LLMs into their front-end projects!

## License

This project is licensed under the MIT License.

