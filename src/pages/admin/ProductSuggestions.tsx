import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  ThumbsDown, 
  Download,
  Brain,
  Info,
  ArrowRight,
  Tag,
  Users,
  TrendingUp,
  DollarSign,
  BarChart
} from 'lucide-react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { ProductSuggestion } from '../../services/aiSuggestions';

const ProductSuggestions: React.FC = () => {
  const { 
    productSuggestions,
    isLoading, 
    error, 
    fetchProductSuggestions,
    saveSuggestionFeedback
  } = useAnalyticsStore();
  
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'positive' | 'negative'>>({});
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [demandFilter, setDemandFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<ProductSuggestion[]>([]);
  
  useEffect(() => {
    fetchProductSuggestions();
  }, [fetchProductSuggestions]);
  
  useEffect(() => {
    let filtered = [...productSuggestions];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(suggestion =>
        suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(suggestion => 
        suggestion.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply demand filter
    if (demandFilter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.estimatedDemand === demandFilter);
    }
    
    setFilteredSuggestions(filtered);
  }, [productSuggestions, searchTerm, categoryFilter, demandFilter]);
  
  const toggleSuggestion = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };
  
  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({ ...prev, [id]: type }));
    saveSuggestionFeedback(id, 'product', type);
  };
  
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(productSuggestions.map(suggestion => suggestion.category.toLowerCase())))];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Suggestions</h1>
          <p className="text-gray-600">AI-generated product ideas based on market trends and customer data</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => fetchProductSuggestions()}
            className="btn-outline flex items-center"
          >
            <Brain className="h-4 w-4 mr-2" />
            Generate New
          </button>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search product suggestions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' 
                  ? 'All Categories' 
                  : category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
          
          {/* Demand Filter */}
          <select
            value={demandFilter}
            onChange={(e) => setDemandFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Demand Levels</option>
            <option value="high">High Demand</option>
            <option value="medium">Medium Demand</option>
            <option value="low">Low Demand</option>
          </select>
        </div>
      </div>
      
      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map(suggestion => (
          <div 
            key={suggestion.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div 
              className="p-4 bg-white cursor-pointer"
              onClick={() => toggleSuggestion(suggestion.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-purple-100 text-purple-600 mr-3">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                    <p className="text-sm text-gray-500">{suggestion.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 mr-2">
                    {suggestion.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${getDemandColor(suggestion.estimatedDemand)}`}>
                    {suggestion.estimatedDemand.charAt(0).toUpperCase() + suggestion.estimatedDemand.slice(1)} Demand
                  </span>
                  {expandedSuggestion === suggestion.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {expandedSuggestion === suggestion.id && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Target Audience:</h5>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.targetAudience.map((audience, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Pricing Strategy:</h5>
                    <p className="text-sm text-gray-600">{suggestion.pricingStrategy}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Competitive Analysis:</h5>
                  <p className="text-sm text-gray-600">{suggestion.competitiveAnalysis}</p>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Data Points:</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {suggestion.dataPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Generated on {new Date(suggestion.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 mr-2">Was this suggestion helpful?</span>
                    <button 
                      onClick={() => handleFeedback(suggestion.id, 'positive')}
                      className={`p-1 rounded ${
                        feedbackGiven[suggestion.id] === 'positive'
                          ? 'bg-green-100 text-green-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleFeedback(suggestion.id, 'negative')}
                      className={`p-1 rounded ${
                        feedbackGiven[suggestion.id] === 'negative'
                          ? 'bg-red-100 text-red-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No product suggestions found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || categoryFilter !== 'all' || demandFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Generate new product suggestions based on market trends and customer data.'}
          </p>
          <button
            onClick={() => fetchProductSuggestions()}
            className="btn-primary"
          >
            Generate Suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSuggestions;