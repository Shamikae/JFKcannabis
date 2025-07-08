import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle,
  Clock,
  RefreshCw,
  Search,
  Link as LinkIcon,
  Settings,
  Play,
  Pause,
  Info,
  ArrowRight,
  Brain
} from 'lucide-react';
import { useZapierStore } from '../../store/zapierStore';
import { ZapierIntegration, getAiSuggestedIntegrations } from '../../services/zapier';

interface AddIntegrationModalProps {
  onClose: () => void;
  onAdd: (integration: any) => void;
}

const AddIntegrationModal: React.FC<AddIntegrationModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: '',
    action: '',
    webhookUrl: '',
    enabled: true
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const { testConnection } = useZapierStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTestConnection = async () => {
    if (!formData.webhookUrl) return;
    
    setIsTestingConnection(true);
    setTestResult(null);
    
    try {
      const result = await testConnection(formData.webhookUrl);
      setTestResult(result);
    } catch (error) {
      setTestResult(false);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Add Zapier Integration</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integration Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. New Order Notification"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="What does this integration do?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trigger Event
                </label>
                <select
                  name="trigger"
                  value={formData.trigger}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a trigger event</option>
                  <option value="order.created">Order Created</option>
                  <option value="order.updated">Order Updated</option>
                  <option value="order.completed">Order Completed</option>
                  <option value="customer.created">Customer Created</option>
                  <option value="customer.updated">Customer Updated</option>
                  <option value="inventory.low">Low Inventory</option>
                  <option value="product.created">Product Created</option>
                  <option value="product.updated">Product Updated</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action
                </label>
                <input
                  type="text"
                  name="action"
                  value={formData.action}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. Send Slack message"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zapier Webhook URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="webhookUrl"
                    value={formData.webhookUrl}
                    onChange={handleChange}
                    required
                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="hooks.zapier.com/hooks/catch/123456/abcdef/"
                  />
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={!formData.webhookUrl || isTestingConnection}
                    className="px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    {isTestingConnection ? (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Test'
                    )}
                  </button>
                </div>
                {testResult !== null && (
                  <div className={`mt-1 text-sm ${testResult ? 'text-green-600' : 'text-red-600'}`}>
                    {testResult ? (
                      <span className="flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Connection successful
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Connection failed
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enabled"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
                  Enable this integration
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Integration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ZapierIntegrations: React.FC = () => {
  const { 
    integrations, 
    isLoading, 
    error, 
    fetchIntegrations, 
    addIntegration, 
    updateIntegration, 
    removeIntegration,
    toggleIntegration
  } = useZapierStore();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredIntegrations, setFilteredIntegrations] = useState<ZapierIntegration[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  
  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);
  
  useEffect(() => {
    let filtered = [...integrations];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(integration =>
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(integration => integration.status === statusFilter);
    }
    
    setFilteredIntegrations(filtered);
  }, [integrations, searchTerm, statusFilter]);
  
  const handleAddIntegration = (formData: any) => {
    addIntegration({
      name: formData.name,
      description: formData.description,
      trigger: formData.trigger,
      action: formData.action,
      webhookUrl: formData.webhookUrl,
      enabled: formData.enabled
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Pause className="h-3 w-3 mr-1" />
            Inactive
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            Unknown
          </span>
        );
    }
  };
  
  const aiSuggestions = getAiSuggestedIntegrations();
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Zapier Integrations</h1>
          <p className="text-gray-600">Automate your workflows with Zapier integrations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="btn-outline flex items-center"
            onClick={() => setShowAiSuggestions(!showAiSuggestions)}
          >
            <Brain className="h-4 w-4 mr-2" />
            AI Suggestions
          </button>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </button>
        </div>
      </div>
      
      {/* AI Suggestions */}
      {showAiSuggestions && (
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              AI-Suggested Zapier Automations
            </h3>
            <button 
              onClick={() => setShowAiSuggestions(false)}
              className="text-white opacity-70 hover:opacity-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiSuggestions.slice(0, 3).map((suggestion, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{suggestion.name}</h4>
                <p className="text-sm text-white text-opacity-90 mb-3">{suggestion.description}</p>
                <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded inline-block">
                  {suggestion.benefit}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => {
                setShowAiSuggestions(false);
                setShowAddModal(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-opacity-90"
            >
              Create Integration <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
      
      {/* Integrations List */}
      <div className="space-y-4">
        {filteredIntegrations.map(integration => (
          <div 
            key={integration.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Trigger: {integration.trigger}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Action: {integration.action}
                    </span>
                    {getStatusBadge(integration.status)}
                  </div>
                  
                  {integration.lastRun && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last run: {new Date(integration.lastRun).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className={`p-1 rounded ${
                    integration.enabled 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title={integration.enabled ? 'Disable integration' : 'Enable integration'}
                >
                  {integration.enabled ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
                <button
                  className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                  title="Edit integration"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => removeIntegration(integration.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete integration"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {integration.status === 'error' && integration.errorMessage && (
              <div className="mt-3 bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>{integration.errorMessage}</span>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <LinkIcon className="h-3 w-3 mr-1" />
                <span className="truncate max-w-md">{integration.webhookUrl}</span>
              </div>
              
              <button className="text-primary-600 text-xs hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first Zapier integration.'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            Add Your First Integration
          </button>
        </div>
      )}
      
      {/* Add Integration Modal */}
      {showAddModal && (
        <AddIntegrationModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddIntegration}
        />
      )}
    </div>
  );
};

export default ZapierIntegrations;