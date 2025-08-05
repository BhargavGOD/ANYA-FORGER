const GROQ_API_KEY = "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"; // Your Groq API key

async function anyaBrain(question) {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { role: "system", content: "You are Anya Forger, a cute anime AI daughter who calls the user Papa ❤️. Reply naturally without adding *actions* like *giggles* or *smiles*. No roleplay actions." },
                    { role: "user", content: question }
                ],
                max_tokens: 200
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Sorry Papa, I couldn’t think of anything.";
    } catch (e) {
        console.error(e);
        return "Sorry Papa, my brain glitched.";
    }
}

function anyaSpeak(message) {
    let anyaText = document.getElementById("anya-text");
    anyaText.innerText = message;

    let speech = new SpeechSynthesisUtterance(message);
    speech.pitch = 1.5; // girl voice
    speech.rate = 1.1;

    let voices = window.speechSynthesis.getVoices();
    let femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("female") ||
        v.gender === "female"
    );
    if (femaleVoice) speech.voice = femaleVoice;

    window.speechSynthesis.speak(speech);
}

document.getElementById("send-btn").addEventListener("click", async () => {
    let command = document.getElementById("command-input").value.trim();
    if (!command) return;

    document.getElementById("anya-text").innerText = "Thinking...";
    let answer = await anyaBrain(command);
    anyaSpeak(answer);
    document.getElementById("command-input").value = "";
});

// Ensure voices load
window.speechSynthesis.onvoiceschanged = () => {};
