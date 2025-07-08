import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Beaker } from 'lucide-react';
import { FilterOptions } from '../../types/product';
import { filterOptions } from '../../data/productData';

interface AdvancedFiltersProps {
  filters: Partial<FilterOptions>;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  category?: string;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  category
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['strainType', 'subcategory', 'brands', 'price', 'compounds']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterOptions, value: string | number) => {
    const currentArray = (filters[key] as any[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const FilterSection: React.FC<{
    title: string;
    sectionKey: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }> = ({ title, sectionKey, children, icon }) => {
    const isExpanded = expandedSections.includes(sectionKey);
    
    return (
      <div className="border-b border-neutral-200 pb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <h3 className="font-medium text-neutral-900">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-neutral-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          )}
        </button>
        {isExpanded && <div className="mt-3">{children}</div>}
      </div>
    );
  };

  const CheckboxGroup: React.FC<{
    options: (string | number)[];
    selectedValues: (string | number)[];
    onChange: (value: string | number) => void;
    formatLabel?: (value: string | number) => string;
  }> = ({ options, selectedValues, onChange, formatLabel }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map(option => (
        <label key={option} className="flex items-center">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
          />
          <span className="ml-2 text-sm text-neutral-700">
            {formatLabel ? formatLabel(option) : option}
          </span>
        </label>
      ))}
    </div>
  );

  const RangeSlider: React.FC<{
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    step?: number;
    prefix?: string;
    suffix?: string;
  }> = ({ min, max, value, onChange, step = 1, prefix = '', suffix = '' }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span>{prefix}{value[0]}{suffix}</span>
        <span>{prefix}{value[1]}{suffix}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className="absolute w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="absolute w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );

  // Get subcategories from menuData
  const productSubCategories: Record<string, Array<{name: string, slug: string}>> = {
    flowers: [
      { name: 'Ground', slug: 'ground' },
      { name: 'Regular Buds', slug: 'regular-buds' },
      { name: 'Infused', slug: 'infused' },
    ],
    'pre-rolls': [
      { name: 'Uninfused', slug: 'uninfused' },
      { name: 'Infused', slug: 'infused' },
      { name: 'Premium Pre-Rolls', slug: 'premium-pre-rolls' },
    ],
    edibles: [
      { name: 'Gummies', slug: 'gummies' },
      { name: 'Chocolates', slug: 'chocolates' },
      { name: 'Hard Candy', slug: 'hard-candy' },
      { name: 'Baked Goods', slug: 'baked-goods' },
      { name: 'Mints', slug: 'mints' },
      { name: 'Capsules', slug: 'capsules' },
      { name: 'Cooking Ingredients', slug: 'cooking-ingredients' },
    ],
    vapes: [
      { name: 'Liquid Diamonds', slug: 'liquid-diamonds' },
      { name: 'Distillate', slug: 'distillate' },
      { name: 'Rosin', slug: 'rosin' },
      { name: 'Resin', slug: 'resin' },
      { name: 'RSO', slug: 'rso' },
      { name: 'Badder', slug: 'badder' },
      { name: 'Wax', slug: 'wax' },
    ],
    concentrates: [
      { name: 'Rosin', slug: 'rosin' },
      { name: 'Resin', slug: 'resin' },
      { name: 'Badder', slug: 'badder' },
      { name: 'Shatter', slug: 'shatter' },
      { name: 'Kief', slug: 'kief' },
      { name: 'Temple Ball', slug: 'temple-ball' },
      { name: 'Hash', slug: 'hash' },
    ],
    tinctures: [
      { name: 'CBN Blend', slug: 'cbn-blend' },
      { name: 'CBG Blend', slug: 'cbg-blend' },
      { name: 'CBD Blend', slug: 'cbd-blend' },
    ],
    topicals: [
      { name: 'Balm', slug: 'balm' },
      { name: 'Lotion', slug: 'lotion' },
      { name: 'Lip Balm', slug: 'lip-balm' },
    ],
    beverages: [
      { name: 'Drink Shots', slug: 'drink-shots' },
      { name: 'Iced Tea', slug: 'iced-tea' },
      { name: 'Lemonade', slug: 'lemonade' },
      { name: 'Seltzer', slug: 'seltzer' },
      { name: 'Cold Brew', slug: 'cold-brew' },
      { name: 'Juice', slug: 'juice' },
      { name: 'Soda', slug: 'soda' },
    ],
  };

  // Determine which subcategories to show based on category
  const getSubcategoryFilters = () => {
    if (!category) return null;
    
    const subcategories = productSubCategories[category as keyof typeof productSubCategories];
    if (!subcategories) return null;
    
    return (
      <FilterSection title="Subcategory" sectionKey="subcategory">
        <CheckboxGroup
          options={subcategories.map(sub => sub.name)}
          selectedValues={filters.subcategories || []}
          onChange={(value) => toggleArrayFilter('subcategories', value)}
        />
      </FilterSection>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary-600 hover:underline flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Strain Type - Show first for flower */}
        {(category === 'flowers' || !category) && (
          <FilterSection title="Strain Type" sectionKey="strainType">
            <CheckboxGroup
              options={filterOptions.strainTypes}
              selectedValues={filters.strainTypes || []}
              onChange={(value) => toggleArrayFilter('strainTypes', value)}
              formatLabel={(value) => value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}
            />
          </FilterSection>
        )}

        {/* Subcategory - Show based on category */}
        {getSubcategoryFilters()}

        {/* Brands */}
        <FilterSection title="Brands" sectionKey="brands">
          <CheckboxGroup
            options={filterOptions.brands}
            selectedValues={filters.brands || []}
            onChange={(value) => toggleArrayFilter('brands', value)}
          />
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price">
          <RangeSlider
            min={0}
            max={200}
            value={filters.priceRange || [0, 200]}
            onChange={(value) => updateFilter('priceRange', value)}
            step={5}
            prefix="$"
          />
        </FilterSection>

        {/* Compounds - New Enhanced Section */}
        <FilterSection 
          title="Compounds" 
          sectionKey="compounds"
          icon={<Beaker className="h-4 w-4 text-primary-600" />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                THC Content
              </label>
              <RangeSlider
                min={0}
                max={95}
                value={filters.thcRange || [0, 95]}
                onChange={(value) => updateFilter('thcRange', value)}
                step={1}
                suffix="%"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                CBD Content
              </label>
              <RangeSlider
                min={0}
                max={30}
                value={filters.cbdRange || [0, 30]}
                onChange={(value) => updateFilter('cbdRange', value)}
                step={0.5}
                suffix="%"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cannabinoids
              </label>
              <CheckboxGroup
                options={filterOptions.compounds}
                selectedValues={filters.compounds || []}
                onChange={(value) => toggleArrayFilter('compounds', value)}
              />
            </div>
          </div>
        </FilterSection>

        {/* Category-specific filters */}
        {(category === 'flowers' || !category) && (
          <>
            <FilterSection title="Growing Process" sectionKey="growing">
              <CheckboxGroup
                options={filterOptions.growingProcess}
                selectedValues={filters.growingProcess || []}
                onChange={(value) => toggleArrayFilter('growingProcess', value)}
                formatLabel={(value) => value.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            </FilterSection>

            <FilterSection title="Form" sectionKey="form">
              <CheckboxGroup
                options={filterOptions.forms}
                selectedValues={filters.forms || []}
                onChange={(value) => toggleArrayFilter('forms', value)}
                formatLabel={(value) => value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}
              />
            </FilterSection>

            <FilterSection title="Weight" sectionKey="weight">
              <CheckboxGroup
                options={filterOptions.weights}
                selectedValues={filters.weights || []}
                onChange={(value) => toggleArrayFilter('weights', value)}
              />
            </FilterSection>
          </>
        )}

        {(category === 'pre-rolls' || !category) && (
          <>
            <FilterSection title="Pack Size" sectionKey="packSize">
              <CheckboxGroup
                options={filterOptions.packSizes}
                selectedValues={filters.packSizes || []}
                onChange={(value) => toggleArrayFilter('packSizes', value)}
                formatLabel={(value) => `${value} pack`}
              />
            </FilterSection>

            <FilterSection title="Infusion Type" sectionKey="infusion">
              <CheckboxGroup
                options={filterOptions.infusionTypes}
                selectedValues={filters.infusionTypes || []}
                onChange={(value) => toggleArrayFilter('infusionTypes', value)}
                formatLabel={(value) => value.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            </FilterSection>

            <FilterSection title="Infusion Material" sectionKey="infusionMaterial">
              <CheckboxGroup
                options={filterOptions.infusionMaterials}
                selectedValues={filters.infusionMaterials || []}
                onChange={(value) => toggleArrayFilter('infusionMaterials', value)}
                formatLabel={(value) => value.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            </FilterSection>

            <FilterSection title="Tip Material" sectionKey="tip">
              <CheckboxGroup
                options={filterOptions.tipMaterials}
                selectedValues={filters.tipMaterials || []}
                onChange={(value) => toggleArrayFilter('tipMaterials', value)}
                formatLabel={(value) => value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}
              />
            </FilterSection>
          </>
        )}

        {(category === 'vapes' || !category) && (
          <>
            <FilterSection title="Hardware Type" sectionKey="hardware">
              <CheckboxGroup
                options={filterOptions.hardware}
                selectedValues={filters.hardware || []}
                onChange={(value) => toggleArrayFilter('hardware', value)}
                formatLabel={(value) => value.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            </FilterSection>

            <FilterSection title="Extraction Method" sectionKey="extraction">
              <CheckboxGroup
                options={filterOptions.extractionMethods}
                selectedValues={filters.extractionMethods || []}
                onChange={(value) => toggleArrayFilter('extractionMethods', value)}
                formatLabel={(value) => value.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            </FilterSection>
          </>
        )}

        {(category === 'topicals' || !category) && (
          <>
            <FilterSection title="Category" sectionKey="topicalCategory">
              <CheckboxGroup
                options={filterOptions.topicalCategories}
                selectedValues={filters.topicalCategories || []}
                onChange={(value) => toggleArrayFilter('topicalCategories', value)}
                formatLabel={(value) => value.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            </FilterSection>

            <FilterSection title="Size" sectionKey="size">
              <CheckboxGroup
                options={filterOptions.sizes.filter(size => size.includes('oz'))}
                selectedValues={filters.sizes || []}
                onChange={(value) => toggleArrayFilter('sizes', value)}
              />
            </FilterSection>
          </>
        )}

        {/* Effects */}
        <FilterSection title="Effects" sectionKey="effects">
          <CheckboxGroup
            options={filterOptions.effects}
            selectedValues={filters.effects || []}
            onChange={(value) => toggleArrayFilter('effects', value)}
          />
        </FilterSection>

        {/* Flavors */}
        {filterOptions.flavors.length > 0 && (
          <FilterSection title="Flavors" sectionKey="flavors">
            <CheckboxGroup
              options={filterOptions.flavors}
              selectedValues={filters.flavors || []}
              onChange={(value) => toggleArrayFilter('flavors', value)}
            />
          </FilterSection>
        )}

        {/* Stock Status */}
        <FilterSection title="Availability" sectionKey="availability">
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <span className="ml-2 text-sm text-neutral-700">In Stock Only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.onSale || false}
                onChange={(e) => updateFilter('onSale', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <span className="ml-2 text-sm text-neutral-700">On Sale</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.smallBatch || false}
                onChange={(e) => updateFilter('smallBatch', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <span className="ml-2 text-sm text-neutral-700">Small Batch</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.indoor || false}
                onChange={(e) => updateFilter('indoor', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <span className="ml-2 text-sm text-neutral-700">Indoor Grown</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default AdvancedFilters;