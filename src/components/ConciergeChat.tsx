import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const ConciergeChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant'}>>([]);
  const [inputValue, setInputValue] = useState("");
  const [concierge, setConcierge] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
    
    // Add welcome message when component mounts
    if (selectedConcierge && messages.length === 0) {
      const welcomeMessage = selectedConcierge === "luke" 
        ? "Hello, Luke here. I'm ready to assist you with detailed product information and specifications."
        : "Hi there! I'm Vivian, and I'm here to help you find the perfect match for your intimate journey.";
      
      setMessages([{
        id: '1',
        content: welcomeMessage,
        role: 'assistant'
      }]);
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user' as const
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on concierge and current page
    setTimeout(() => {
      const currentPage = location.pathname;
      let response = "";

      if (concierge === "luke") {
        if (currentPage.includes("pulse")) {
          response = "The Pulse features advanced pressure wave technology with 10 customizable intensities. Its medical-grade silicone construction ensures both safety and comfort.";
        } else if (currentPage.includes("vibe")) {
          response = "The Vibe's dual-stimulation design offers 8 distinct vibration patterns. Its ergonomic curve is precisely engineered for optimal comfort and effectiveness.";
        } else if (currentPage.includes("g-vibe")) {
          response = "The G-Vibe features a scientifically-angled tip for targeted stimulation. Its flexible silicone neck adapts to your unique anatomy.";
        } else if (currentPage.includes("dox")) {
          response = "The DOX storage solution features premium vegan leather, magnetic closure, and integrated USB-C charging for all Vellvii products.";
        } else {
          response = "I can provide detailed technical specifications for any of our luxury products. What would you like to know?";
        }
      } else {
        if (currentPage.includes("pulse")) {
          response = "The Pulse is perfect for those seeking gentle yet powerful stimulation. Its whisper-quiet design ensures your privacy and comfort.";
        } else if (currentPage.includes("vibe")) {
          response = "The Vibe is wonderfully versatile - perfect for both intimate moments and relaxing massage. Many find its memory function particularly convenient.";
        } else if (currentPage.includes("g-vibe")) {
          response = "The G-Vibe is designed with comfort in mind. Its soft, flexible design makes exploration feel natural and enjoyable.";
        } else if (currentPage.includes("dox")) {
          response = "The DOX keeps everything organized and discreet. I love how it charges your products automatically - no worries about battery life!";
        } else {
          response = "I'm here to help you feel comfortable and confident in your choices. What questions do you have about our collection?";
        }
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant' as const
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInputValue("");
  };

  const getConciergeInfo = () => {
    return concierge === "luke" 
      ? { name: "Luke", color: "text-primary", bg: "bg-primary/10" }
      : { name: "Vivian", color: "text-secondary", bg: "bg-secondary/10" };
  };

  if (!concierge) return null;

  const conciergeInfo = getConciergeInfo();

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-luxury hover-glow"
          variant="luxury"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 z-50 glass-luxury shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-80 h-96'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${conciergeInfo.bg}`}></div>
              <span className={`font-semibold ${conciergeInfo.color}`}>
                {conciergeInfo.name}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 text-white/60 hover:text-white"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 space-y-3 max-h-60 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-white/90'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    variant="luxury"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ConciergeChat;