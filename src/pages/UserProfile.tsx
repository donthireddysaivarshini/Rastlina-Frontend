import { useState, useRef } from 'react';
import { User, Package, MapPin, LogOut, ChevronRight, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, formatPrice } from '@/data/products'; // Import products to get real images

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'address'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. User State (to allow photo update)
  const [user, setUser] = useState({
    name: "Surya K.",
    email: "surya.k@example.com",
    phone: "+91 98765 43210",
    avatarImage: null as string | null, // Stores the uploaded image URL
    initials: "SK"
  });

  // 2. Enhanced Mock Orders with Product Details
  const orders = [
    { 
      id: '#ORD-7721', 
      date: 'Oct 24, 2025', 
      status: 'Delivered', 
      total: 1499, 
      // Link to real product IDs for images
      items: [
        { productId: 'MON-001', name: 'Monstera Deliciosa', size: 'Medium', color: 'Terracotta', price: 1499, qty: 1 }
      ]
    },
    { 
      id: '#ORD-7650', 
      date: 'Sep 12, 2025', 
      status: 'Processing', 
      total: 1798, 
      items: [
        { productId: 'SNK-002', name: 'Snake Plant', size: 'Small', color: 'White', price: 599, qty: 1 },
        { productId: 'ZZ-005', name: 'ZZ Plant', size: 'Medium', color: 'Black', price: 1199, qty: 1 }
      ] 
    },
  ];

  const addresses = [
    { type: 'Home', text: 'Flat 402, Lake View Towers, Kondapur, Hyderabad, 500084' },
    { type: 'Office', text: 'Satoru Foundation, Hitech City, Hyderabad, 500081' },
  ];

  // 3. Handle Photo Upload Simulation
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a fake local URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      setUser(prev => ({ ...prev, avatarImage: imageUrl }));
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif mb-6 text-primary">My Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {order.items.map((item, idx) => {
                    // Find real product image
                    const productData = products.find(p => p.id === item.productId);
                    
                    return (
                      <div key={idx} className="flex gap-4 items-start">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                          {productData?.image ? (
                            <img src={productData.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300"><Package /></div>
                          )}
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1">
                          <h4 className="font-serif font-bold text-gray-900">{item.name}</h4>
                          <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                            <p>Size: <span className="text-gray-700 font-medium">{item.size}</span></p>
                            <p>Color: <span className="text-gray-700 font-medium">{item.color}</span></p>
                            <p>Qty: {item.qty} × {formatPrice(item.price)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-gray-50/30 text-right">
                  <button className="text-sm text-primary font-bold hover:underline">View Invoice</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'address':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif mb-6 text-primary">Saved Addresses</h2>
            <div className="grid gap-4">
              {addresses.map((addr, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block mb-1">{addr.type}</span>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-md">{addr.text}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-1 sm:flex-none">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full sm:w-auto bg-primary text-white mt-4">Add New Address</Button>
          </div>
        );
      default: // Profile
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-primary">Personal Information</h2>
            
            {/* Photo Upload Section */}
            <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
              <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                  {user.avatarImage ? (
                    <img src={user.avatarImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-accent-gold flex items-center justify-center text-white text-3xl font-serif">
                      {user.initials}
                    </div>
                  )}
                </div>
                {/* Overlay Icon */}
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white h-6 w-6" />
                </div>
                {/* Hidden Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500 mb-3">Update your profile photo</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePhotoClick} className="gap-2">
                    <Upload className="h-3 w-3" /> Change Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => setUser(prev => ({ ...prev, avatarImage: null }))}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Form Fields */}
            <div className="grid gap-6 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
                <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Email Address</label>
                <input type="email" value={user.email} readOnly className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                <p className="text-[10px] text-gray-400 mt-1">Contact support to change email</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Phone Number</label>
                <input type="tel" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" />
              </div>
            </div>
            <Button className="bg-primary text-white px-8">Save Changes</Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 bg-white rounded-xl shadow-sm p-6 h-fit border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-accent-gold flex items-center justify-center text-white font-bold text-lg">
                 {user.avatarImage ? <img src={user.avatarImage} className="w-full h-full object-cover" /> : user.initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-base font-bold truncate">{user.name}</p>
                <p className="text-xs text-gray-500">Member since 2025</p>
              </div>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'address', label: 'Addresses', icon: MapPin },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`} />
                    {item.label}
                  </div>
                  {activeTab === item.id && <ChevronRight className="h-4 w-4 text-white/80" />}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 min-h-[500px]">
            {renderContent()}
          </main>

        </div>
      </div>
    </div>
  );
}