import React, { useState, useEffect } from 'react';
import { 
  Globe, 
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
  FileText,
  Code,
  Tag,
  Link,
  MapPin
} from 'lucide-react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { SeoSuggestion } from '../../services/aiSuggestions';

const SeoSuggestions: React.FC = () => {
  const { 
    seoSuggestions,
    isLoading, 
    error, 
    fetchSeoSuggestions,
    saveSuggestionFeedback
  } = useAnalyticsStore();
  
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'positive' | 'negative'>>({});
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<SeoSuggestion[]>([]);
  
  useEffect(() => {
    fetchSeoSuggestions();
  }, [fetchSeoSuggestions]);
  
  useEffect(() => {
    let filtered = [...seoSuggestions];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(suggestion =>
        suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.type === typeFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.priority === priorityFilter);
    }
    
    setFilteredSuggestions(filtered);
  }, [seoSuggestions, searchTerm, typeFilter, priorityFilter]);
  
  const toggleSuggestion = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };
  
  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({ ...prev, [id]: type }));
    saveSuggestionFeedback(id, 'seo', type);
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content':
        return <FileText className="h-4 w-4" />;
      case 'technical':
        return <Code className="h-4 w-4" />;
      case 'keywords':
        return <Tag className="h-4 w-4" />;
      case 'backlinks':
        return <Link className="h-4 w-4" />;
      case 'local':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
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
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Suggestions</h1>
          <p className="text-gray-600">AI-powered SEO recommendations to improve your search rankings</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => fetchSeoSuggestions()}
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
                placeholder="Search suggestions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="content">Content</option>
            <option value="technical">Technical</option>
            <option value="keywords">Keywords</option>
            <option value="backlinks">Backlinks</option>
            <option value="local">Local SEO</option>
          </select>
          
          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
                  <div className={`p-1.5 rounded-full mr-3 ${
                    suggestion.type === 'content' ? 'bg-blue-100 text-blue-600' :
                    suggestion.type === 'technical' ? 'bg-purple-100 text-purple-600' :
                    suggestion.type === 'keywords' ? 'bg-green-100 text-green-600' :
                    suggestion.type === 'backlinks' ? 'bg-orange-100 text-orange-600' :
                    'bg-indigo-100 text-indigo-600'
                  }`}>
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                    <p className="text-sm text-gray-500">{suggestion.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
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
                {suggestion.currentScore !== undefined && suggestion.potentialImprovement !== undefined && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Current Performance:</h5>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${suggestion.currentScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{suggestion.currentScore}/100</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Potential improvement: +{suggestion.potentialImprovement} points
                    </p>
                  </div>
                )}
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Suggested Actions:</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {suggestion.suggestedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
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
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No SEO suggestions found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || typeFilter !== 'all' || priorityFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Generate new SEO suggestions based on your website data.'}
          </p>
          <button
            onClick={() => fetchSeoSuggestions()}
            className="btn-primary"
          >
            Generate Suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default SeoSuggestions;