import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, Check, Loader2, Leaf, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Price"); 
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL Params
  const urlCategory = searchParams.get("cat");
  const urlType = searchParams.get("type");
  const urlCollection = searchParams.get("collection");
  const urlOnOffer = searchParams.get("onOffer");
  const urlSearch = searchParams.get("search");
  const urlSort = searchParams.get("sort"); // Get sort param

  // State
  const [allSizes, setAllSizes] = useState<string[]>([]);
  const [allColors, setAllColors] = useState<string[]>([]);
  
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState(urlSort || "featured"); // Default to URL sort or featured
  
  const [loading, setLoading] = useState(true);

  const availableTags = [
    { label: 'Air Purifying', value: 'clean-air' },
    { label: 'Pet Friendly', value: 'pet-friendly' },
    { label: 'Good Luck / Vastu', value: 'good-luck' },
    { label: 'Low Maintenance', value: 'easy' },
    { label: 'Flowering', value: 'flowering' }
  ];

  // Logic to determine Title
  const getPageTitle = () => {
    if (urlSearch) return `Search Results for "${urlSearch}"`;
    if (urlOnOffer) return "Exclusive Offers";
    
    // Collections
    if (urlCollection === 'sleep') return "Sleep Better Collection";
    if (urlCollection === 'work') return "Focus & Work Collection";
    if (urlCollection === 'air') return "Breathe Easy Collection";
    if (urlCollection === 'vastu') return "Good Luck & Vastu";
    if (urlCollection === 'self-watering') return "Self-Watering Planters";

    // Categories / Types
    if (urlType === 'pots') return "Planters & Pots";
    if (urlType === 'seeds') return "Organic Seeds";
    if (urlType === 'care') return "Plant Care & Tools";
    if (urlType === 'combo') return "Combos & Bundles";
    
    if (urlCategory) return `${urlCategory.replace('-', ' ')} Plants`;

    // Sort based titles if no other filter exists
    if (!urlCategory && !urlType && !urlCollection) {
        if (urlSort === 'rating') return "Best Sellers";
        if (urlSort === 'new') return "Fresh Arrivals";
    }

    return "All Plants";
  };

  // Initialization
  useEffect(() => {
    setLoading(true);
    // If URL has sort, set it
    if (urlSort) setSortBy(urlSort);

    setTimeout(() => {
        const sizes = new Set<string>();
        const colors = new Set<string>();
        products.forEach(p => {
            p.sizes.forEach(s => sizes.add(s.label));
            p.colors.forEach(c => colors.add(c));
        });
        setAllSizes(Array.from(sizes));
        setAllColors(Array.from(colors));
        setLoading(false);
    }, 500);
  }, [urlSort]); // Re-run if URL sort changes

  const toggleFilter = (item: string, list: string[], setList: (a: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search
      if (urlSearch) {
        const lower = urlSearch.toLowerCase();
        if (!product.name.toLowerCase().includes(lower) && 
            !product.category.some(c => c.includes(lower)) && 
            !product.description.toLowerCase().includes(lower)) return false;
      }

      // 2. Collections
      if (urlCollection === 'self-watering') {
          if (!product.selfWatering) return false;
      }
      else if (urlCollection) {
         if (urlCollection === 'sleep' && !product.category.includes('bedroom')) return false;
         if (urlCollection === 'work' && !product.category.includes('office')) return false;
         if (urlCollection === 'air' && !product.category.includes('clean-air')) return false;
         if (urlCollection === 'vastu' && !product.category.includes('good-luck')) return false;
      }

      // 3. Other params
      if (urlOnOffer && !product.onOffer) return false;
      if (urlType && product.type !== urlType) return false;
      if (urlCategory && !product.category.includes(urlCategory)) return false;

      // 4. Client Filters
      if (product.price > priceRange[1]) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some(s => product.sizes.map(ps=>ps.label).includes(s))) return false;
      if (selectedColors.length > 0 && !selectedColors.some(c => product.colors.includes(c))) return false;
      if (onlyInStock && !product.inStock) return false;
      if (selectedTags.length > 0) {
         const matchesTag = selectedTags.some(tag => {
            if (tag === 'pet-friendly') return product.petSafe;
            if (tag === 'easy') return product.careLevel === 'Very Easy' || product.careLevel === 'Easy';
            return product.category.includes(tag);
         });
         if (!matchesTag) return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "new") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); // Simplified "New" logic
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0; 
    });
  }, [products, priceRange, selectedSizes, selectedColors, selectedTags, onlyInStock, sortBy, urlCategory, urlType, urlOnOffer, urlCollection, urlSearch]);

  const sliderStyle = {
    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(priceRange[1] / 5000) * 100}%, #e5e7eb ${(priceRange[1] / 5000) * 100}%, #e5e7eb 100%)`
  };

  const mobileFilterTabs = ["Price", "Size", "Color", "Tags", "Availability"];

  const renderMobileFilterContent = () => {
    switch (activeFilterTab) {
      case "Price":
        return (
          <div className="p-4">
            <h4 className="font-bold mb-4 text-[color:var(--foreground)]">Max Price: ₹{priceRange[1]}</h4>
            <input type="range" min="0" max="5000" step="100" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[color:var(--primary)]" style={sliderStyle} />
            <div className="flex justify-between text-xs text-gray-500 mt-3 font-medium"><span>₹0</span><span>₹5000+</span></div>
          </div>
        );
      case "Color": return <div className="p-4 space-y-3">{allColors.map(color => (<label key={color} className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 border-gray-300 rounded text-[color:var(--primary)] focus:ring-[color:var(--primary)]" checked={selectedColors.includes(color)} onChange={() => toggleFilter(color, selectedColors, setSelectedColors)} /><span className="text-gray-700 capitalize">{color}</span></label>))}</div>;
      case "Size": return <div className="p-4 grid grid-cols-2 gap-3">{allSizes.map(size => (<button key={size} onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)} className={`py-2 px-3 text-sm border rounded transition-all ${selectedSizes.includes(size) ? "bg-[color:var(--primary)] text-white border-[color:var(--primary)]" : "border-gray-200 text-gray-600"}`}>{size}</button>))}</div>;
      case "Tags": return <div className="p-4 space-y-3">{availableTags.map(tag => (<label key={tag.value} className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 border-gray-300 rounded text-[color:var(--primary)] focus:ring-[color:var(--primary)]" checked={selectedTags.includes(tag.value)} onChange={() => toggleFilter(tag.value, selectedTags, setSelectedTags)} /><span className="text-gray-700">{tag.label}</span></label>))}</div>;
      case "Availability": return <div className="p-4"><label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 border-gray-300 rounded text-[color:var(--primary)] focus:ring-[color:var(--primary)]" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} /><span className="text-gray-700">In Stock Only</span></label></div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12"> 
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-gray-100 pb-6">
          <div>
            <nav className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Home / Shop</nav>
            <h1 className="text-3xl md:text-4xl font-serif text-[color:var(--primary)] capitalize">
              {getPageTitle()}
            </h1>
            <p className="text-gray-500 text-sm mt-2">{filteredProducts.length} Products Found</p>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-600 font-medium text-sm">Sort By:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white border-gray-200 text-gray-700"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Filter Strip */}
        <div className="md:hidden sticky top-[80px] z-30 bg-white border-b border-gray-100 py-3 mb-6 -mx-4 px-4 shadow-sm flex items-center justify-between">
            <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] border border-gray-200 rounded-full px-4 py-1.5 active:bg-gray-50">
                <SlidersHorizontal className="w-4 h-4" /> Filter
            </button>
            <div className="flex items-center relative">
                <ArrowUpDown className="w-3 h-3 text-gray-500 mr-2" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] h-8 border-none shadow-none bg-transparent p-0 text-sm font-medium justify-end text-gray-700 focus:ring-0"><SelectValue placeholder="Sort by" /></SelectTrigger>
                  <SelectContent align="end"><SelectItem value="featured">Featured</SelectItem><SelectItem value="rating">Top Rated</SelectItem><SelectItem value="price-low">Price: Low</SelectItem><SelectItem value="price-high">Price: High</SelectItem></SelectContent>
                </Select>
            </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="space-y-8 sticky top-28">
              <div><h3 className="font-bold text-sm text-[color:var(--foreground)] mb-4 uppercase tracking-wider">Price</h3><input type="range" min="0" max="5000" step="100" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[color:var(--primary)]" style={sliderStyle} /><div className="flex justify-between text-xs text-gray-500 mt-2 font-medium"><span>₹0</span><span>₹{priceRange[1]}</span></div></div>
              <div><h3 className="font-bold text-sm text-[color:var(--foreground)] mb-4 uppercase tracking-wider">Category & Benefits</h3><div className="space-y-2">{availableTags.map(tag => (<label key={tag.value} className="flex items-center space-x-3 cursor-pointer group"><input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-[color:var(--primary)] focus:ring-[color:var(--primary)]" checked={selectedTags.includes(tag.value)} onChange={() => toggleFilter(tag.value, selectedTags, setSelectedTags)} /><span className="text-sm text-gray-600 group-hover:text-[color:var(--primary)] transition-colors">{tag.label}</span></label>))}</div></div>
              <div><h3 className="font-bold text-sm text-[color:var(--foreground)] mb-4 uppercase tracking-wider">Size</h3><div className="flex flex-wrap gap-2">{allSizes.map(size => (<button key={size} onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)} className={`px-3 py-1.5 text-xs border rounded transition-all ${selectedSizes.includes(size) ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white" : "border-gray-200 text-gray-600 hover:border-[color:var(--primary)]"}`}>{size}</button>))}</div></div>
              <div><h3 className="font-bold text-sm text-[color:var(--foreground)] mb-4 uppercase tracking-wider">Pot Color</h3><div className="space-y-2">{allColors.map(color => (<label key={color} className="flex items-center space-x-3 cursor-pointer group"><div className={`w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${selectedColors.includes(color) ? 'ring-2 ring-[color:var(--primary)] ring-offset-1' : ''}`} style={{ backgroundColor: color.toLowerCase() === 'terracotta' ? '#E2725B' : color.toLowerCase() }}>{selectedColors.includes(color) && <Check className={`w-3 h-3 ${color.toLowerCase() === 'white' ? 'text-black' : 'text-white'}`} />}</div><span className="text-sm text-gray-600 group-hover:text-[color:var(--primary)] capitalize">{color}</span><input type="checkbox" className="hidden" checked={selectedColors.includes(color)} onChange={() => toggleFilter(color, selectedColors, setSelectedColors)} /></label>))}</div></div>
              <div><label className="flex items-center space-x-3 cursor-pointer group"><input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-[color:var(--primary)] focus:ring-[color:var(--primary)]" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} /><span className="text-sm font-medium text-gray-700 group-hover:text-[color:var(--primary)]">In Stock Only</span></label></div>
              <button onClick={() => {setSelectedSizes([]); setSelectedColors([]); setSelectedTags([]); setOnlyInStock(false); setPriceRange([0,5000])}} className="text-xs text-[color:var(--primary)] underline font-medium hover:text-[color:var(--accent-gold)]">Clear All Filters</button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? <div className="flex flex-col justify-center items-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary)] mb-4" /><p className="text-sm text-gray-500">Loading plants...</p></div> : filteredProducts.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200"><Leaf className="w-12 h-12 text-gray-300 mx-auto mb-4" /><h3 className="text-lg font-serif mb-2 text-gray-900">No products found</h3><p className="text-gray-500 mb-6">We couldn't find what you were looking for.</p><button onClick={() => {navigate('/shop')}} className="text-[color:var(--primary)] font-semibold hover:underline">Clear Search</button></div> : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)}></div>
          <div className="relative bg-white w-[85%] h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-[color:var(--primary)] font-serif">Filter Plants</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-white rounded-full shadow-sm text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                {mobileFilterTabs.map(tab => (<button key={tab} onClick={() => setActiveFilterTab(tab)} className={`w-full text-left px-3 py-4 text-xs font-semibold border-l-4 transition-colors ${activeFilterTab === tab ? "bg-white border-[color:var(--primary)] text-[color:var(--primary)] shadow-sm" : "border-transparent text-gray-500 hover:bg-gray-100"}`}>{tab}</button>))}
              </div>
              <div className="w-2/3 bg-white overflow-y-auto">{renderMobileFilterContent()}</div>
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <button onClick={() => {setSelectedSizes([]); setSelectedColors([]); setSelectedTags([]); setOnlyInStock(false); setPriceRange([0,5000])}} className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg border border-gray-200">Reset</button>
              <button onClick={() => setShowFilters(false)} className="flex-1 py-3 text-sm font-semibold text-white bg-primary rounded-lg shadow-md">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}