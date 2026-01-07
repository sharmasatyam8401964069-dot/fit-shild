
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { X, Sparkles, Loader2, PlusCircle } from 'lucide-react';

interface SmartRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Recommendation {
  name: string;
  reason: string;
  macros: string;
}

const SmartRecommendationModal: React.FC<SmartRecommendationModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Suggest 3 high-protein, nutritionally dense dinner options for someone aiming for 622 Kcal. One should be Paneer-based, one Chicken-based, and one Tofu-based.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING },
                macros: { type: Type.STRING }
              },
              required: ["name", "reason", "macros"]
            }
          }
        }
      });

      const data = JSON.parse(response.text);
      setRecommendations(data);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-md rounded-t-[32px] p-6 pb-12 border-t border-zinc-800 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={20} className="text-green-500 fill-green-500/20" />
              <h2 className="text-xl font-bold">Smart Picks</h2>
            </div>
            <p className="text-sm text-zinc-400">AI-curated meals based on your 622 Kcal goal.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-green-500 mb-4" size={32} />
            <p className="text-zinc-400 animate-pulse">Consulting the nutrition expert...</p>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex justify-between items-center group active:scale-95 transition-all">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">{rec.name}</h3>
                  <p className="text-[11px] text-zinc-500 mb-2 leading-relaxed">{rec.reason}</p>
                  <span className="text-[10px] font-bold text-green-500/80 tracking-wider uppercase">{rec.macros}</span>
                </div>
                <button className="ml-4 p-2 bg-zinc-800 group-hover:bg-green-500/10 rounded-xl transition-colors">
                  <PlusCircle size={24} className="text-zinc-500 group-hover:text-green-500" />
                </button>
              </div>
            ))}
            <button 
              onClick={fetchRecommendations}
              className="w-full py-4 text-zinc-500 text-sm font-medium hover:text-white transition-colors"
            >
              Refresh Recommendations
            </button>
          </div>
        ) : (
          <button 
            onClick={fetchRecommendations}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20"
          >
            Generate AI Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default SmartRecommendationModal;
