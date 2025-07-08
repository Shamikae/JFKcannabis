import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, AlertTriangle, X, Search, ThumbsUp, ThumbsDown, Link as LinkIcon } from 'lucide-react';

interface AskAIProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  productLinks?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    url: string;
  }>;
}

const AskAI: React.FC<AskAIProps> = ({ onClose }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [feedback, setFeedback] = useState<Record<number, 'helpful' | 'not-helpful'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Add user question to conversation
    setConversation(prev => [...prev, { 
      role: 'user', 
      content: question,
      timestamp: new Date()
    }]);
    
    // Simulate AI processing
    setIsLoading(true);
    
    // In a real implementation, this would call an API endpoint
    setTimeout(() => {
      let aiResponse = '';
      let productLinks = undefined;
      
      // Generate mock responses based on keywords in the question
      const lowerCaseQuestion = question.toLowerCase();
      
      if (lowerCaseQuestion.includes('migraine') || lowerCaseQuestion.includes('headache')) {
        aiResponse = "Based on your question about migraines, I can suggest exploring products with CBD and low THC content. Many users report that CBD-dominant products may help with headache symptoms. Our CBD Recovery Balm can be applied to temples and neck, or you might consider a 1:1 CBD:THC tincture for sublingual use. Remember, while cannabis may help manage symptoms for some people, it's not a medical treatment, and effects vary by individual.";
        
        productLinks = [
          {
            id: 't1',
            name: 'CBD Recovery Balm',
            price: 45.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/t1'
          },
          {
            id: 'tn1',
            name: 'CBN Sleep Tincture',
            price: 40.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/tn1'
          }
        ];
      } 
      else if (lowerCaseQuestion.includes('sleep') || lowerCaseQuestion.includes('insomnia')) {
        aiResponse = "For sleep-related concerns, products containing CBN and indica strains with myrcene terpenes are popular choices among our customers. The 1906 PM Gummies with CBN or our Nanticoke Sleep Mints are specifically formulated with sleep in mind. Many users also prefer indica flower like OG Kush for evening use. These products are not medical treatments, but some users find them helpful as part of their nighttime routine.";
        
        productLinks = [
          {
            id: '1906-pm-gummies',
            name: '1906 PM Gummies with CBN',
            price: 6.00,
            image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
            url: '/product/1906-pm-gummies'
          },
          {
            id: 'nanticoke-sleep-mints',
            name: 'Nanticoke Sleep Mints with CBN',
            price: 15.00,
            image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
            url: '/product/nanticoke-sleep-mints'
          },
          {
            id: 'f2',
            name: 'OG Kush Ground',
            price: 35.00,
            image: 'https://images.pexels.com/photos/7667669/pexels-photo-7667669.jpeg',
            url: '/product/f2'
          }
        ];
      }
      else if (lowerCaseQuestion.includes('anxiety') || lowerCaseQuestion.includes('stress')) {
        aiResponse = "Many cannabis consumers choose products with balanced CBD:THC ratios for stress management. Terpenes like linalool (found in lavender) and limonene may also contribute to relaxing effects. Our MFNY Premium Tincture offers a balanced cannabinoid profile, and strains like Blue Dream are popular for their balanced effects. Remember that cannabis affects everyone differently, and what works for one person may not work for another.";
        
        productLinks = [
          {
            id: 'mfny-tincture',
            name: 'MFNY Premium Cannabis Tincture',
            price: 25.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/mfny-tincture'
          },
          {
            id: 'f1',
            name: 'Blue Dream',
            price: 55.00,
            image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg',
            url: '/product/f1'
          }
        ];
      }
      else if (lowerCaseQuestion.includes('pain') || lowerCaseQuestion.includes('inflammation')) {
        aiResponse = "For discomfort management, many consumers explore products with both CBD and THC, as they may work together through the entourage effect. Topicals like our CBD Recovery Balm can be applied directly to specific areas, while tinctures offer systemic effects. Terpenes like beta-caryophyllene, which binds to CB2 receptors, are also of interest to many consumers. These products are not medical treatments, but some users incorporate them into their wellness routines.";
        
        productLinks = [
          {
            id: 't1',
            name: 'CBD Recovery Balm',
            price: 45.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/t1'
          },
          {
            id: 'mfny-tincture',
            name: 'MFNY Premium Cannabis Tincture',
            price: 25.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/mfny-tincture'
          }
        ];
      }
      else if (lowerCaseQuestion.includes('cancer') || lowerCaseQuestion.includes('chemo')) {
        aiResponse = "Research on cannabis and cancer is ongoing. Some studies suggest that cannabinoids may help manage symptoms associated with cancer and cancer treatments, such as nausea, pain, and appetite loss. Many cancer patients report finding relief with various cannabis products, though experiences vary widely. Products with balanced THC:CBD ratios are often preferred. It's important to note that cannabis is not a cure for cancer, and any cannabis use should be discussed with your healthcare team, especially during cancer treatment.";
        
        productLinks = [
          {
            id: 'mfny-tincture',
            name: 'MFNY Premium Cannabis Tincture',
            price: 25.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/mfny-tincture'
          },
          {
            id: 'e1',
            name: 'Cosmic Gummies - Mixed Berry',
            price: 25.00,
            image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
            url: '/product/e1'
          }
        ];
      }
      else if (lowerCaseQuestion.includes('terpene') || lowerCaseQuestion.includes('myrcene') || lowerCaseQuestion.includes('limonene')) {
        aiResponse = "Terpenes are aromatic compounds found in cannabis and many other plants that contribute to the plant's smell, taste, and effects. The most common cannabis terpenes include myrcene (earthy, sedative), limonene (citrusy, uplifting), pinene (pine, alertness), linalool (floral, calming), and caryophyllene (peppery, potentially anti-inflammatory). These compounds work synergistically with cannabinoids in what's called the 'entourage effect.' Many consumers choose cannabis products based on terpene profiles that align with their desired effects.";
        
        productLinks = [
          {
            id: 'f1',
            name: 'Blue Dream (High in Myrcene)',
            price: 55.00,
            image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg',
            url: '/product/f1'
          },
          {
            id: 'c1',
            name: 'Wedding Cake Live Rosin (Rich Terpene Profile)',
            price: 80.00,
            image: 'https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg',
            url: '/product/c1'
          }
        ];
      }
      else if (lowerCaseQuestion.includes('depression')) {
        aiResponse = "Many people report that certain cannabis products may help with mood elevation, though experiences vary widely. Sativa and sativa-dominant hybrid strains are often associated with uplifting effects. Products with terpenes like limonene (citrusy) may also contribute to mood enhancement for some users. It's important to note that cannabis can affect people differently, and for some, it may worsen symptoms of depression. If you're managing depression, it's advisable to work with healthcare providers to develop a comprehensive approach to your mental health.";
        
        productLinks = [
          {
            id: 'pr2',
            name: 'Sativa Sunrise 12-Pack',
            price: 120.00,
            image: 'https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg',
            url: '/product/pr2'
          },
          {
            id: 'v1',
            name: 'Northern Lights Live Resin Cart',
            price: 50.00,
            image: 'https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg',
            url: '/product/v1'
          }
        ];
      }
      else if (lowerCaseQuestion.includes('cbd') || lowerCaseQuestion.includes('thc')) {
        aiResponse = "CBD (cannabidiol) and THC (tetrahydrocannabinol) are the two most well-known cannabinoids in cannabis. THC is psychoactive and produces the 'high' associated with cannabis, while CBD is non-intoxicating. Both have potential therapeutic applications. THC may help with pain, nausea, and appetite stimulation, while CBD is being studied for anxiety, inflammation, and seizure disorders. Many products contain various ratios of these cannabinoids, from THC-dominant to balanced THC:CBD to CBD-dominant options, allowing consumers to choose based on their preferences and needs.";
        
        productLinks = [
          {
            id: 't1',
            name: 'CBD Recovery Balm',
            price: 45.00,
            image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
            url: '/product/t1'
          },
          {
            id: 'f1',
            name: 'Blue Dream (THC-dominant)',
            price: 55.00,
            image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg',
            url: '/product/f1'
          }
        ];
      }
      else {
        aiResponse = "Thank you for your question. While I can provide information about cannabis products and their reported effects, I'm not able to make medical claims or diagnose conditions. Many of our customers explore different products based on their personal wellness goals. Would you like me to suggest some popular products that might align with your interests?";
      }
      
      setConversation(prev => [...prev, { 
        role: 'ai', 
        content: aiResponse,
        timestamp: new Date(),
        productLinks
      }]);
      setIsLoading(false);
      setQuestion('');
    }, 1500);
  };

  const handleFeedback = (messageIndex: number, type: 'helpful' | 'not-helpful') => {
    setFeedback(prev => ({
      ...prev,
      [messageIndex]: type
    }));
    
    // In a real implementation, this would send feedback to the server
    console.log(`Feedback for message ${messageIndex}: ${type}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-primary-600 text-white">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            <h3 className="font-bold">Ask AI About Cannabis</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-neutral-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-amber-50 p-3 border-b border-amber-100">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              This AI assistant provides information about cannabis products, not medical advice. 
              Always consult a healthcare professional for medical concerns.
            </p>
          </div>
        </div>
        
        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Welcome message */}
          {conversation.length === 0 && (
            <div className="bg-neutral-100 p-4 rounded-lg">
              <p className="text-neutral-700">
                Hi there! I'm your cannabis AI assistant. I can help answer questions about cannabis products, 
                effects, consumption methods, and more. What would you like to know?
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setQuestion("What products might help with sleep?")}
                  className="text-sm text-left p-2 bg-white rounded border border-neutral-200 hover:bg-neutral-50"
                >
                  What products might help with sleep?
                </button>
                <button 
                  onClick={() => setQuestion("How can cannabis help with anxiety?")}
                  className="text-sm text-left p-2 bg-white rounded border border-neutral-200 hover:bg-neutral-50"
                >
                  How can cannabis help with anxiety?
                </button>
                <button 
                  onClick={() => setQuestion("What are terpenes?")}
                  className="text-sm text-left p-2 bg-white rounded border border-neutral-200 hover:bg-neutral-50"
                >
                  What are terpenes?
                </button>
                <button 
                  onClick={() => setQuestion("What's the difference between THC and CBD?")}
                  className="text-sm text-left p-2 bg-white rounded border border-neutral-200 hover:bg-neutral-50"
                >
                  What's the difference between THC and CBD?
                </button>
              </div>
            </div>
          )}
          
          {/* Conversation messages */}
          {conversation.map((message, index) => (
            <div 
              key={index} 
              className={`${
                message.role === 'user' 
                  ? 'bg-primary-100 ml-12' 
                  : 'bg-neutral-100 mr-12'
              } p-4 rounded-lg`}
            >
              <p className={message.role === 'user' ? 'text-primary-800' : 'text-neutral-700'}>
                {message.content}
              </p>
              
              {/* Product Links */}
              {message.productLinks && message.productLinks.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-medium text-neutral-700">Recommended Products:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {message.productLinks.map(product => (
                      <a 
                        key={product.id}
                        href={product.url}
                        className="flex items-center bg-white p-2 rounded border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-neutral-900 truncate">{product.name}</p>
                          <p className="text-primary-600 text-sm">${product.price.toFixed(2)}</p>
                        </div>
                        <LinkIcon className="h-4 w-4 text-neutral-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Feedback buttons (only for AI messages) */}
              {message.role === 'ai' && (
                <div className="mt-3 flex justify-end">
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <span>Was this helpful?</span>
                    <button 
                      onClick={() => handleFeedback(index, 'helpful')}
                      className={`p-1 rounded ${
                        feedback[index] === 'helpful'
                          ? 'bg-green-100 text-green-600'
                          : 'hover:bg-neutral-200'
                      }`}
                      aria-label="This was helpful"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleFeedback(index, 'not-helpful')}
                      className={`p-1 rounded ${
                        feedback[index] === 'not-helpful'
                          ? 'bg-red-100 text-red-600'
                          : 'hover:bg-neutral-200'
                      }`}
                      aria-label="This was not helpful"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-neutral-500 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="bg-neutral-100 p-4 rounded-lg mr-12 flex items-center">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-neutral-400 rounded-full"></div>
                <div className="h-2 w-2 bg-neutral-400 rounded-full"></div>
                <div className="h-2 w-2 bg-neutral-400 rounded-full"></div>
              </div>
              <span className="ml-3 text-neutral-500 text-sm">AI is thinking...</span>
            </div>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about cannabis products, effects, or consumption methods..."
            className="flex-1 p-2 border border-neutral-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-primary-600 text-white p-2 rounded-r-lg hover:bg-primary-700 disabled:opacity-50"
            disabled={isLoading || !question.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskAI;