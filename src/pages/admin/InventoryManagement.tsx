import React, { useState, useEffect } from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Archive,
  MoreVertical,
  Database,
  Link,
  Zap
} from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';
import { InventoryItem } from '../../services/alleaves';
import { useZapierStore } from '../../store/zapierStore';
import { getAiSuggestedIntegrations } from '../../services/zapier';

// New component for adding inventory
const AddInventoryModal: React.FC<{
  onClose: () => void;
  onAdd: (item: any) => void;
}> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    location: 'Main Store',
    batchNumber: '',
    expirationDate: '',
    receivedDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <h3 className="text-lg font-medium">Add Inventory Item</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product ID
                </label>
                <input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Main Store">Main Store</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Delivery Vehicle">Delivery Vehicle</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Number
                </label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Received Date
                </label>
                <input
                  type="date"
                  name="receivedDate"
                  value={formData.receivedDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
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
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Zapier integration suggestion modal
const ZapierSuggestionModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const suggestions = getAiSuggestedIntegrations();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Zap className="h-5 w-5 text-primary-600 mr-2" />
              AI-Suggested Zapier Automations
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Our AI has analyzed your business operations and suggests these Zapier automations to save time and improve efficiency:
          </p>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <h4 className="font-medium text-primary-700">{suggestion.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{suggestion.description}</p>
                <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded inline-block">
                  {suggestion.benefit}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InventoryManagement: React.FC = () => {
  const { 
    items, 
    manualItems,
    isLoading, 
    error, 
    lastSynced,
    fetchInventory, 
    addManualItem, 
    updateItem, 
    removeItem,
    syncWithAlleaves
  } = useInventoryStore();
  
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showZapierModal, setShowZapierModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{added: number; updated: number; removed: number} | null>(null);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply source filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(item => item.source === sourceFilter);
    }

    // Apply location filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.location === statusFilter);
    }

    setFilteredInventory(filtered);
  }, [items, searchTerm, categoryFilter, statusFilter, supplierFilter, sourceFilter]);

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredInventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredInventory.map(item => item.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on items:`, selectedItems);
    // Implement bulk actions
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleAddItem = (formData: any) => {
    addManualItem({
      productId: formData.productId,
      quantity: parseInt(formData.quantity),
      location: formData.location,
      batchNumber: formData.batchNumber,
      expirationDate: formData.expirationDate,
      receivedDate: formData.receivedDate
    });
  };

  const handleSyncWithAlleaves = async () => {
    setIsSyncing(true);
    try {
      const result = await syncWithAlleaves();
      setSyncResult(result);
      setTimeout(() => setSyncResult(null), 5000);
    } catch (error) {
      console.error('Error syncing with Alleaves:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const getSourceBadge = (source: string) => {
    if (source === 'alleaves') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Database className="h-3 w-3 mr-1" />
          Alleaves POS
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <Edit className="h-3 w-3 mr-1" />
        Manual Entry
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your cannabis inventory</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="btn-outline flex items-center"
            onClick={() => setShowZapierModal(true)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Zapier
          </button>
          <button 
            className="btn-outline flex items-center"
            onClick={handleSyncWithAlleaves}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync with Alleaves
              </>
            )}
          </button>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </button>
        </div>
      </div>

      {/* Sync Result Alert */}
      {syncResult && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start">
          <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium">Sync with Alleaves completed successfully</p>
            <p className="text-sm">
              Added {syncResult.added} items, updated {syncResult.updated} items, removed {syncResult.removed} items
            </p>
          </div>
        </div>
      )}

      {/* Last Synced Info */}
      {lastSynced && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Database className="h-5 w-5 mr-3 text-blue-500" />
            <div>
              <p className="font-medium">Alleaves POS Connection Active</p>
              <p className="text-sm">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </span>
            <Link className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{items.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {items.filter(item => item.quantity <= 10 && item.quantity > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {items.filter(item => item.quantity === 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Edit className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Manual Items</p>
              <p className="text-2xl font-bold text-gray-900">{manualItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Sources</option>
            <option value="alleaves">Alleaves POS</option>
            <option value="manual">Manual Entry</option>
          </select>

          {/* Location Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Locations</option>
            <option value="Main Store">Main Store</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Delivery Vehicle">Delivery Vehicle</option>
          </select>

          {/* Sort Filter */}
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="quantity-low">Quantity: Low to High</option>
            <option value="quantity-high">Quantity: High to Low</option>
            <option value="date-new">Date: Newest First</option>
            <option value="date-old">Date: Oldest First</option>
          </select>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
              </span>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('reorder')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Reorder
                </button>
                <button
                  onClick={() => handleBulkAction('adjust')}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Adjust Stock
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                >
                  Archive
                </button>
              </div>
            )}
          </div>

          <span className="text-sm text-gray-600">
            {filteredInventory.length} items
          </span>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const isLowStock = item.quantity <= 10 && item.quantity > 0;
                const isOutOfStock = item.quantity === 0;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getSourceBadge(item.source)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`text-sm font-medium ${
                          isOutOfStock ? 'text-red-600' : 
                          isLowStock ? 'text-yellow-600' : 
                          'text-gray-900'
                        }`}>
                          {item.quantity}
                        </span>
                        {isLowStock && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Low Stock
                          </span>
                        )}
                        {isOutOfStock && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{item.location}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{item.batchNumber || '-'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {new Date(item.receivedDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => {
                            const newQuantity = prompt('Enter new quantity:', item.quantity.toString());
                            if (newQuantity !== null) {
                              updateItem(item.id, parseInt(newQuantity));
                            }
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Add Inventory Modal */}
      {showAddModal && (
        <AddInventoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}

      {/* Zapier Suggestion Modal */}
      {showZapierModal && (
        <ZapierSuggestionModal
          onClose={() => setShowZapierModal(false)}
        />
      )}
    </div>
  );
};

export default InventoryManagement;