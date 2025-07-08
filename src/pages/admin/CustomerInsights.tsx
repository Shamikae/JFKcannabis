import React, { useState, useEffect } from 'react';
import { 
  Users, 
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
  UserCircle,
  ShoppingBag,
  Calendar,
  MapPin,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { CustomerInsight } from '../../services/aiSuggestions';

const CustomerInsights: React.FC = () => {
  const { 
    customerInsights,
    isLoading, 
    error, 
    fetchCustomerInsights,
    saveSuggestionFeedback
  } = useAnalyticsStore();
  
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'positive' | 'negative'>>({});
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInsights, setFilteredInsights] = useState<CustomerInsight[]>([]);
  
  useEffect(() => {
    fetchCustomerInsights();
  }, [fetchCustomerInsights]);
  
  useEffect(() => {
    let filtered = [...customerInsights];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(insight =>
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.segment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply segment filter
    if (segmentFilter !== 'all') {
      filtered = filtered.filter(insight => insight.segment.toLowerCase() === segmentFilter.toLowerCase());
    }
    
    setFilteredInsights(filtered);
  }, [customerInsights, searchTerm, segmentFilter]);
  
  const toggleInsight = (id: string) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };
  
  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({ ...prev, [id]: type }));
    saveSuggestionFeedback(id, 'customer', type);
  };
  
  const getSegmentIcon = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'travelers':
        return <MapPin className="h-4 w-4" />;
      case 'suburban':
        return <Home className="h-4 w-4" />;
      case 'medical crossover':
        return <Heart className="h-4 w-4" />;
      default:
        return <UserCircle className="h-4 w-4" />;
    }
  };
  
  // Define the Home and Heart icons since they're not imported
  const Home = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
  
  const Heart = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
  
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Get unique segments for filter
  const segments = ['all', ...Array.from(new Set(customerInsights.map(insight => insight.segment.toLowerCase())))];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Insights</h1>
          <p className="text-gray-600">AI-generated insights about your customer segments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => fetchCustomerInsights()}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customer insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          {/* Segment Filter */}
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {segments.map(segment => (
              <option key={segment} value={segment}>
                {segment === 'all' 
                  ? 'All Segments' 
                  : segment.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.map(insight => (
          <div 
            key={insight.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div 
              className="p-4 bg-white cursor-pointer"
              onClick={() => toggleInsight(insight.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mr-3">
                    {getSegmentIcon(insight.segment)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-500">{insight.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 mr-2">
                    {insight.segment}
                  </span>
                  {expandedInsight === insight.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {expandedInsight === insight.id && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Behavior:</h5>
                    <p className="text-sm text-gray-600">{insight.behavior}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Opportunity:</h5>
                    <p className="text-sm text-gray-600">{insight.opportunity}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Data Points:</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {insight.dataPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Suggested Actions:</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {insight.suggestedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Generated on {new Date(insight.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 mr-2">Was this insight helpful?</span>
                    <button 
                      onClick={() => handleFeedback(insight.id, 'positive')}
                      className={`p-1 rounded ${
                        feedbackGiven[insight.id] === 'positive'
                          ? 'bg-green-100 text-green-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleFeedback(insight.id, 'negative')}
                      className={`p-1 rounded ${
                        feedbackGiven[insight.id] === 'negative'
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
      {filteredInsights.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customer insights found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || segmentFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Generate new customer insights based on your data.'}
          </p>
          <button
            onClick={() => fetchCustomerInsights()}
            className="btn-primary"
          >
            Generate Insights
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerInsights;