import React, { useState } from 'react';
import { Upload, Sofa, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import ComparisonSlider from './components/ComparisonSlider';
import StyleSelector from './components/StyleSelector';
import ChatInterface from './components/ChatInterface';
import { generateReimaginedRoom, chatWithConsultant } from './services/geminiService';
import { RoomStyle, ChatMessage } from './types';

function App() {
  // State
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<RoomStyle | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size too large. Please upload an image under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null); // Reset generated on new upload
        setSelectedStyle(null);
        setError(null);
        setChatHistory([]); // Clear chat for new room
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleSelect = async (style: RoomStyle) => {
    if (!originalImage || isGenerating) return;
    
    setSelectedStyle(style);
    setIsGenerating(true);
    setError(null);
    
    // Convert Data URL to pure Base64 for API
    const base64Data = originalImage.split(',')[1];

    try {
      const resultImage = await generateReimaginedRoom(base64Data, style);
      setGeneratedImage(resultImage);
      
      // Add initial system message to chat
      setChatHistory([
        {
          id: Date.now().toString(),
          role: 'model',
          text: `I've reimagined your space in a ${style} style. What do you think? I can help you refine details or find specific furniture items.`
        }
      ]);
    } catch (err) {
      console.error(err);
      setError("Failed to generate design. Please try again.");
      setSelectedStyle(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text
    };
    
    const updatedHistory = [...chatHistory, newUserMsg];
    setChatHistory(updatedHistory);
    setIsChatLoading(true);

    try {
      // If user is asking for visual changes, we might want to regenerate (advanced feature)
      // For this version, we focus on chat consultation + grounding.
      // We pass the currently visible image (generated if exists, else original) to the chat context.
      const currentImage = generatedImage || originalImage;
      const imageBase64 = currentImage ? currentImage.split(',')[1] : undefined;

      const response = await chatWithConsultant(updatedHistory, text, imageBase64);
      
      const newModelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        products: response.products
      };
      
      setChatHistory(prev => [...prev, newModelMsg]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I encountered an error connecting to the server.",
        isError: true
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Render
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-neutral-900 p-2 rounded-lg text-white">
                <Sofa size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-neutral-900">LUMA</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
              <span className="hover:text-neutral-900 cursor-pointer transition-colors">How it Works</span>
              <span className="hover:text-neutral-900 cursor-pointer transition-colors">Gallery</span>
              <span className="text-neutral-900">Sign In</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero / Upload Section */}
        {!originalImage && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight max-w-3xl">
              Redesign your room in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">seconds</span>.
            </h1>
            <p className="text-lg text-neutral-500 max-w-2xl">
              Upload a photo of your space and let LUMA's advanced AI reimagine it in over 6 distinct interior design styles.
            </p>
            
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all transform group-hover:scale-105 shadow-lg shadow-neutral-200">
                <Upload size={20} />
                <span>Upload Room Photo</span>
              </div>
            </div>
            
            <div className="flex gap-4 text-sm text-neutral-400 mt-8">
              <span className="flex items-center gap-1"><Sparkles size={14} /> AI Powered</span>
              <span className="flex items-center gap-1">✨ Photorealistic</span>
              <span className="flex items-center gap-1">🛍️ Shop the Look</span>
            </div>
          </div>
        )}

        {/* Editor Interface */}
        {originalImage && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Visualizer */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Comparison Slider / Image Viewer */}
              <div className="relative w-full">
                {error && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-red-100 shadow-lg">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}
                
                {generatedImage ? (
                  <ComparisonSlider 
                    originalImage={originalImage} 
                    generatedImage={generatedImage} 
                    labelAfter={selectedStyle || "Redesign"}
                  />
                ) : (
                  <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl bg-neutral-100">
                     <img 
                      src={originalImage} 
                      alt="Original" 
                      className={`w-full h-full object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}
                    />
                    {isGenerating && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-900">
                        <div className="w-16 h-16 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mb-4" />
                        <p className="font-medium animate-pulse">Designing your {selectedStyle} room...</p>
                      </div>
                    )}
                    {!isGenerating && !generatedImage && (
                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8 text-white">
                         <p className="font-medium">Original Photo Uploaded</p>
                         <p className="text-sm opacity-80">Select a style below to begin transformation.</p>
                       </div>
                    )}
                  </div>
                )}
              </div>

              {/* Style Carousel */}
              <StyleSelector 
                selectedStyle={selectedStyle} 
                onSelect={handleStyleSelect}
                disabled={isGenerating}
              />
            </div>

            {/* Right Column: Chat & Tools */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900 mb-2">Design Consultant</h2>
                <p className="text-sm text-neutral-500 mb-6">
                  Not quite right? Chat with LUMA to refine the details or find where to buy the furniture you see.
                </p>
                <ChatInterface 
                  messages={chatHistory} 
                  onSendMessage={handleSendMessage}
                  isLoading={isChatLoading}
                />
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                <h3 className="text-amber-900 font-semibold mb-2 flex items-center gap-2">
                  <Sparkles size={16} /> Pro Tip
                </h3>
                <p className="text-sm text-amber-800/80 leading-relaxed">
                  Try asking for specific adjustments like "Make the rug blue" or "Change the sofa to leather". LUMA understands context!
                </p>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default App;
