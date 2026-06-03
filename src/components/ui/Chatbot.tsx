"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "./Button";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg = { id: Date.now().toString(), role: "user", content: inputValue };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Network error");
      if (!res.body) throw new Error("No body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      const assistantMsgId = Date.now().toString() + "ai";
      setMessages(prev => [...prev, { id: assistantMsgId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...lastMsg, content: lastMsg.content + chunk }
          ];
        });
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-zen-charcoal text-zen-offwhite rounded-full shadow-2xl flex items-center justify-center hover:bg-zen-charcoal/90 transition-all z-50 group border border-zen-stone/20 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0, scale: isOpen ? 0.8 : 1, pointerEvents: isOpen ? "none" : "auto" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-zen-sage/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Sparkles className="w-6 h-6 z-10 group-hover:rotate-12 transition-transform duration-500" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-[calc(100%-3rem)] md:w-full max-w-[400px] h-[650px] max-h-[85vh] bg-zen-offwhite/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-zen-stone/40"
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-zen-charcoal text-zen-offwhite px-6 py-5 flex items-center justify-between shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-zen-sage/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-serif text-xl tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-zen-sage" /> Assistant Zen
                </h3>
                <p className="text-xs text-zen-offwhite/60 font-light mt-1">Guide de bien-être IA</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="relative z-10 text-zen-offwhite/60 hover:text-zen-offwhite transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent scroll-smooth">
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-zen-sand rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <MessageCircle className="w-8 h-8 text-zen-sage/50" />
                  </div>
                  <p className="text-zen-charcoal/70 text-sm font-light px-4 leading-relaxed">
                    Bienvenue chez Zen Gym. Posez-moi des questions sur nos disciplines, nos abonnements ou notre espace.
                  </p>
                </motion.div>
              )}
              
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div 
                    key={m.id} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div 
                      layout
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        m.role === 'user' 
                          ? 'bg-zen-charcoal text-zen-offwhite rounded-br-sm' 
                          : 'bg-zen-sand text-zen-charcoal rounded-bl-sm border border-zen-stone/30'
                      }`}
                    >
                      {m.content}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-zen-sand text-zen-charcoal p-4 rounded-2xl rounded-bl-sm border border-zen-stone/30 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-zen-sage" />
                    <span className="text-xs text-zen-charcoal/50 font-light tracking-wide animate-pulse">En train d'écrire...</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center my-4">
                  <div className="bg-red-50 text-red-600 text-xs py-2 px-4 rounded-full flex items-center gap-2 border border-red-100 shadow-sm">
                    <AlertCircle className="w-3 h-3" />
                    Échec de la connexion. Veuillez réessayer.
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white/50 backdrop-blur-md border-t border-zen-stone/20">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-white border border-zen-stone/40 focus:border-zen-sage/60 focus:ring-2 focus:ring-zen-sage/10 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-300 text-zen-charcoal placeholder:text-zen-charcoal/40 shadow-inner"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="rounded-2xl px-4 h-auto shadow-md bg-zen-charcoal text-zen-offwhite hover:bg-zen-charcoal/90 hover:-translate-y-0.5 transition-all duration-300"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
