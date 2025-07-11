import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import vLogo from "@/assets/v-logo.png";
import vellviiLogo from "@/assets/vellvii-logo.png";
import vivienImage from "@/assets/vivien-assistant.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);

  const message = "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  useEffect(() => {
    // Start typing animation after a brief delay
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setShowButtons(true);
        }
      }, 50); // Typing speed

      return () => clearInterval(typeInterval);
    }, 2000);

    return () => clearTimeout(startTyping);
  }, []);

  const handleYes = () => {
    setAgeVerified(true);
    // Navigate to home or next page
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
    // Could redirect to age restriction page or close tab
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Logo Section */}
      <div className="flex flex-col items-center pt-12 md:pt-20">
        {/* V Logo with shimmer */}
        <div className="mb-8 shimmer-container">
          <img 
            src="/lovable-uploads/c5420417-5d7d-43fb-83f7-096b095f26c6.png" 
            alt="V Logo" 
            className="h-24 md:h-32 w-auto shimmer-logo"
          />
        </div>

        {/* Vellvii Logo with shimmer */}
        <div className="shimmer-container">
          <img 
            src="/lovable-uploads/12536082-5a87-4e12-82c9-d705ecb8d3e5.png" 
            alt="Vellvii - The art of O" 
            className="h-16 md:h-20 w-auto shimmer-logo"
          />
        </div>
      </div>

      {/* Vivien Section */}
      <div className="absolute right-8 md:right-16 top-1/3 md:top-1/4 flex flex-col md:flex-row items-center md:items-start max-w-2xl">
        {/* Vivien's Image */}
        <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <img 
            src={vivienImage} 
            alt="Vivien" 
            className="w-32 h-40 md:w-48 md:h-60 object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* Vivien's Message */}
        <div className="text-white max-w-md">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <p className="font-playfair text-lg md:text-xl leading-relaxed">
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
            
            {showButtons && (
              <div className="mt-6 space-y-3 fade-in">
                <Button
                  onClick={handleYes}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Yes, I am older than 18
                </Button>
                <Button
                  onClick={handleNo}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 py-3 rounded-lg transition-all duration-300"
                >
                  No, I am not
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Hidden on desktop */}
      <div className="md:hidden fixed bottom-8 left-4 right-4 z-10">
        <div className="text-white">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-20 flex-shrink-0">
                <img 
                  src={vivienImage} 
                  alt="Vivien" 
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
              <div className="flex-1">
                <p className="font-playfair text-sm leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
            
            {showButtons && (
              <div className="space-y-2 fade-in">
                <Button
                  onClick={handleYes}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 text-sm rounded-lg transition-all duration-300"
                >
                  Yes, I am older than 18
                </Button>
                <Button
                  onClick={handleNo}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 py-2 text-sm rounded-lg transition-all duration-300"
                >
                  No, I am not
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;