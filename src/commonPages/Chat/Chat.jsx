import { useState } from "react";
import "./Chat.css";

function Chat() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]); // store all messages

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setChatHistory(prev => [...prev, { type: "user", text: message }]);

        const es = new EventSource(`http://localhost:3000/chatQuim?prompt=${encodeURIComponent(message)}`);

        let aiMessage = "";
        es.onmessage = (event) => {
            aiMessage += event.data;
            setChatHistory(prev => {
                const copy = [...prev];
                if (copy[copy.length - 1]?.type === "ai") {
                    copy[copy.length - 1].text = aiMessage;
                } else {
                    copy.push({ type: "ai", text: aiMessage });
                }
                return copy;
            });
            es.addEventListener("done", () => {
                es.close();
            });
        };

        setMessage("");
    };

    return (
        <div>
            <button className="open-button" onClick={() => setOpen(true)}>
                Chat
            </button>

            {open && (
                <div className="form-popup">
                    <form onSubmit={handleSubmit} className="form-container">
                        <h1>Chat</h1>

                        <div className="chat-window">
                            {chatHistory.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`message ${msg.type === "user" ? "user" : "ai"}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <textarea
                            placeholder="Type message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>

                        <button type="submit" className="btn">
                            Send
                        </button>
                        <button
                            type="button"
                            className="btn cancel"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;
