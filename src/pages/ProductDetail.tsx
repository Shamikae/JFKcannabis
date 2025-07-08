import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, FileText, ChevronDown, ChevronUp, Beaker, Play, Download, Video } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { products, getRelatedProducts, calculateEntourageEffect } from '../data/productData';
import ProductCard from '../components/shop/ProductCard';
import ProductVideoModal from '../components/ProductVideoModal';
import LabReportUploader from '../components/admin/LabReportUploader';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showLabReport, setShowLabReport] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLabReportUploader, setShowLabReportUploader] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // In a real app, this would come from auth state
  
  // Find the product
  const product = products.find(p => p.id === id);
  const relatedProducts = getRelatedProducts(id || '');

  useEffect(() => {
    // Reset state when product changes
    setQuantity(1);
    setActiveTab('description');
    setShowFullDescription(false);
    setShowLabReport(false);
    
    // Check if user is admin (in a real app, this would come from auth state)
    // For demo purposes, we'll just set it to true
    setIsAdmin(true);
  }, [id]);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      ...product,
      cartQuantity: quantity
    });
  };

  const entourageEffects = product.labReport ? 
    calculateEntourageEffect(product.labReport.cannabinoids) : [];

  // Mock video URL for demo purposes
  const productVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  
  const handleLabReportSave = (labData: any) => {
    console.log('Lab report saved:', labData);
    setShowLabReportUploader(false);
    // In a real implementation, this would update the product with the new lab report
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 py-4">
        <div className="container-custom">
          <nav className="flex">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-600">Home</Link>
              </li>
              <span>/</span>
              <li>
                <Link to="/shop" className="text-neutral-600 hover:text-primary-600">Shop</Link>
              </li>
              <span>/</span>
              <li>
                <Link to={`/shop/${product.category}`} className="text-neutral-600 hover:text-primary-600">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </li>
              <span>/</span>
              <li className="text-neutral-900 font-medium">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-neutral-50 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            
            {/* Video Button */}
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => setShowVideoModal(true)}
                className="flex items-center justify-center px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                <Video className="h-5 w-5 mr-2" />
                Watch Product Video
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Brand - Only show for non-flower products */}
            {product.category !== 'flower' && (
              <Link to={`/brands/${product.brand}`} className="text-primary-600 font-medium mb-1">
                {product.brand}
              </Link>
            )}
            
            {/* Product Name */}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {product.category === 'flower' || product.category === 'vapes' || product.category === 'concentrates' 
                  ? `${product.thcContent}% THC` 
                  : `${product.thcContent}mg THC`}
              </span>
              {product.indoor && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Indoor Grown
                </span>
              )}
              {product.smallBatch && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                  Small Batch
                </span>
              )}
              {product.strainType && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                  {product.strainType.charAt(0).toUpperCase() + product.strainType.slice(1)}
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                {product.weight || product.size}
              </span>
            </div>
            
            {/* Effects */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-neutral-700 mb-2">Effects:</h3>
              <div className="flex flex-wrap gap-2">
                {product.effects.map(effect => (
                  <span 
                    key={effect} 
                    className="px-3 py-1 bg-neutral-100 rounded-full text-sm"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            {/* Entourage Effects */}
            {entourageEffects.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Entourage Effects:</h3>
                <div className="flex flex-wrap gap-2">
                  {entourageEffects.map(effect => (
                    <span 
                      key={effect} 
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Price */}
            <div className="text-2xl font-bold mb-6">
              {product.salePrice && product.salePrice < product.price ? (
                <div className="flex items-center gap-3">
                  <span className="text-red-600">${product.salePrice.toFixed(2)}</span>
                  <span className="text-lg text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-neutral-300 rounded-l-md hover:bg-neutral-50"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-y border-neutral-300 py-2"
                  aria-label="Quantity"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-neutral-300 rounded-r-md hover:bg-neutral-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`py-3 flex items-center justify-center mb-6 rounded-lg font-medium transition-colors ${
                product.inStock 
                  ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
              aria-disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            {/* Lab Report */}
            <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Beaker className="h-6 w-6 text-primary-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Lab Tested & Verified</h3>
                    <p className="text-sm text-neutral-600">
                      Full cannabinoid and terpene profile available
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <button 
                      onClick={() => setShowLabReportUploader(true)}
                      className="text-primary-600 hover:underline text-sm font-medium"
                    >
                      {product.hasLabReport ? 'Update' : 'Add'} Lab Report
                    </button>
                  )}
                  {product.hasLabReport && (
                    <button 
                      onClick={() => setShowLabReport(!showLabReport)}
                      className="text-primary-600 hover:underline text-sm font-medium flex items-center"
                      aria-expanded={showLabReport}
                      aria-controls="lab-report-section"
                    >
                      {showLabReport ? 'Hide' : 'View'} Lab Report
                      {showLabReport ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
              
              {showLabReport && product.labReport && (
                <div id="lab-report-section" className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Cannabinoids</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(product.labReport.cannabinoids).map(([cannabinoid, value]) => (
                          value !== undefined && (
                            <div key={cannabinoid} className="flex justify-between">
                              <span>{cannabinoid}:</span>
                              <span className="font-medium">{value}%</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Terpenes</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(product.labReport.terpenes).map(([terpene, value]) => (
                          <div key={terpene} className="flex justify-between">
                            <span>{terpene}:</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-neutral-500">
                      Tested by {product.labReport.labName} • {product.labReport.testDate}
                    </div>
                    <button className="text-primary-600 hover:underline text-sm flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Usage Instructions */}
            {product.usageInstructions && (
              <div className="border-t pt-4 mt-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  role="button"
                  aria-expanded={showFullDescription}
                  aria-controls="usage-instructions-section"
                >
                  <h3 className="font-medium">Usage & Storage</h3>
                  {showFullDescription ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
                
                {showFullDescription && (
                  <div id="usage-instructions-section" className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700 mb-2">Storage Instructions:</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        {product.usageInstructions.storage.map((instruction, index) => (
                          <li key={index}>• {instruction}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700 mb-2">Dosage Guidelines:</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        {product.usageInstructions.dosage.map((instruction, index) => (
                          <li key={index}>• {instruction}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-neutral-700">Onset:</span>
                        <span className="ml-2 text-neutral-600">{product.usageInstructions.onset}</span>
                      </div>
                      <div>
                        <span className="font-medium text-neutral-700">Duration:</span>
                        <span className="ml-2 text-neutral-600">{product.usageInstructions.duration}</span>
                      </div>
                    </div>

                    {product.usageInstructions.recipes && product.usageInstructions.recipes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-neutral-700 mb-2">Recipe Ideas:</h4>
                        {product.usageInstructions.recipes.map((recipe, index) => (
                          <div key={index} className="bg-neutral-50 p-3 rounded-lg mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{recipe.title}</h5>
                              {recipe.videoUrl && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowVideoModal(true);
                                  }}
                                  className="text-primary-600 hover:underline flex items-center text-sm"
                                >
                                  <Play className="h-4 w-4 mr-1" />
                                  Watch Video
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 mb-2">{recipe.description}</p>
                            <div className="text-xs text-neutral-500">
                              <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Description */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-neutral-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-heading">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <ProductVideoModal 
          videoUrl={productVideoUrl}
          title={`${product.name} - Product Video`}
          onClose={() => setShowVideoModal(false)}
        />
      )}
      
      {/* Lab Report Uploader Modal */}
      {showLabReportUploader && (
        <LabReportUploader 
          productId={product.id}
          onSave={handleLabReportSave}
          onClose={() => setShowLabReportUploader(false)}
          existingLabReport={product.labReport}
        />
      )}
    </div>
  );
};

export default ProductDetail;