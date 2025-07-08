import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Search, Filter, Tag, TrendingUp, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
  trending?: boolean;
}

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock blog posts with comprehensive data
  const blogPosts: BlogPost[] = [
    {
      id: 'b1',
      title: 'Understanding Terpenes: The Aromatic Compounds in Cannabis',
      excerpt: 'Learn about how terpenes affect the aroma, flavor, and effects of different cannabis strains.',
      image: 'https://images.pexels.com/photos/7667724/pexels-photo-7667724.jpeg',
      date: '2025-01-15',
      author: 'Dr. Emily Chen',
      category: 'Education',
      tags: ['terpenes', 'science', 'effects', 'aromatherapy'],
      readTime: 8,
      featured: true,
      trending: true
    },
    {
      id: 'b2',
      title: 'The Entourage Effect: How Cannabinoids Work Together',
      excerpt: 'Discover how THC, CBD, and other cannabinoids interact to produce unique effects.',
      image: 'https://images.pexels.com/photos/7667551/pexels-photo-7667551.jpeg',
      date: '2025-01-10',
      author: 'Michael Rodriguez',
      category: 'Science',
      tags: ['entourage effect', 'cannabinoids', 'research', 'medical'],
      readTime: 12,
      featured: true
    },
    {
      id: 'b3',
      title: 'Cannabis and Creativity: What the Research Says',
      excerpt: 'Exploring the relationship between cannabis consumption and creative thinking.',
      image: 'https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg',
      date: '2025-01-05',
      author: 'Jessica Williams',
      category: 'Lifestyle',
      tags: ['creativity', 'research', 'productivity', 'wellness'],
      readTime: 6,
      trending: true
    },
    {
      id: 'b4',
      title: 'A Guide to Cannabis Concentrates: From Rosin to Live Resin',
      excerpt: 'Understanding the different types of cannabis extracts and how they\'re made.',
      image: 'https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg',
      date: '2024-12-28',
      author: 'David Johnson',
      category: 'Products',
      tags: ['concentrates', 'extraction', 'rosin', 'live resin', 'dabbing'],
      readTime: 15
    },
    {
      id: 'b5',
      title: 'Cannabis Infused Beverages: The Rise of THC Drinks',
      excerpt: 'How cannabis beverages are becoming a popular alternative to smoking and edibles.',
      image: 'https://images.pexels.com/photos/7439073/pexels-photo-7439073.jpeg',
      date: '2024-12-20',
      author: 'Sarah Thompson',
      category: 'Trends',
      tags: ['beverages', 'drinks', 'innovation', 'market trends'],
      readTime: 7
    },
    {
      id: 'b6',
      title: 'Growing Cannabis at Home: Tips for Beginners',
      excerpt: 'Essential advice for starting your home cultivation journey legally and successfully.',
      image: 'https://images.pexels.com/photos/7667669/pexels-photo-7667669.jpeg',
      date: '2024-12-15',
      author: 'Robert Green',
      category: 'Cultivation',
      tags: ['growing', 'cultivation', 'home grow', 'beginner tips'],
      readTime: 20
    },
    {
      id: 'b7',
      title: 'New York Cannabis Laws: What You Need to Know in 2025',
      excerpt: 'Complete guide to New York\'s cannabis regulations, licensing, and legal requirements.',
      image: 'https://images.pexels.com/photos/7667711/pexels-photo-7667711.jpeg',
      date: '2025-01-01',
      author: 'Legal Team',
      category: 'Legal',
      tags: ['new york', 'laws', 'regulations', 'licensing', 'compliance'],
      readTime: 10,
      featured: true
    },
    {
      id: 'b8',
      title: 'Microdosing Cannabis: Benefits and Best Practices',
      excerpt: 'How to use small amounts of cannabis for therapeutic benefits without impairment.',
      image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
      date: '2024-12-10',
      author: 'Dr. Maria Santos',
      category: 'Medical',
      tags: ['microdosing', 'medical', 'therapy', 'wellness', 'dosing'],
      readTime: 9
    },
    {
      id: 'b9',
      title: 'Cannabis Tourism in New York: A Complete Guide',
      excerpt: 'Discover the best cannabis-friendly destinations, dispensaries, and experiences in NY.',
      image: 'https://images.pexels.com/photos/6306246/pexels-photo-6306246.jpeg',
      date: '2024-12-05',
      author: 'Travel Writer',
      category: 'Travel',
      tags: ['tourism', 'travel', 'new york', 'dispensaries', 'experiences'],
      readTime: 14
    },
    {
      id: 'b10',
      title: 'Cooking with Cannabis: Infusion Techniques and Recipes',
      excerpt: 'Master the art of cannabis cooking with professional techniques and delicious recipes.',
      image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
      date: '2024-11-30',
      author: 'Chef Maria Rodriguez',
      category: 'Cooking',
      tags: ['cooking', 'recipes', 'infusion', 'edibles', 'culinary'],
      readTime: 18
    }
  ];

  // Get unique categories and tags
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case 'read-time-short':
          return a.readTime - b.readTime;
        case 'read-time-long':
          return b.readTime - a.readTime;
        default:
          return 0;
      }
    });

  const featuredPost = blogPosts.find(post => post.featured);
  const trendingPosts = blogPosts.filter(post => post.trending).slice(0, 3);

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">JFK Cannabis Blog</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Stay informed with the latest cannabis news, educational content, and insights from our experts.
          </p>
        </div>
        
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <div className="card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-full">
                  <img 
                    src={featuredPost.image}
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-3 text-sm">
                    <span className="bg-primary-100 text-primary-800 px-2.5 py-0.5 rounded-full">
                      Featured
                    </span>
                    <span className="mx-2 text-neutral-400">•</span>
                    <span className="bg-neutral-100 px-2 py-0.5 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="mx-2 text-neutral-400">•</span>
                    <span className="flex items-center text-neutral-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-neutral-500 mb-6">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="btn-primary inline-flex items-center w-fit"
                  >
                    Read Article <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="read-time-short">Quick Reads</option>
                <option value="read-time-long">Long Reads</option>
              </select>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <Tag className="h-4 w-4 mr-2 text-neutral-500" />
              <span className="text-sm font-medium text-neutral-700">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === '' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                All Tags
              </button>
              {allTags.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === tag 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {filteredPosts.length} Article{filteredPosts.length !== 1 ? 's' : ''} Found
          </h2>
          {(searchTerm || selectedCategory !== 'all' || selectedTag) && (
            <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
              {searchTerm && <span>Search: "{searchTerm}"</span>}
              {selectedCategory !== 'all' && <span>Category: {selectedCategory}</span>}
              {selectedTag && <span>Tag: #{selectedTag}</span>}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('');
                }}
                className="text-primary-600 hover:underline ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="card overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.trending && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-sm text-neutral-500 mb-3">
                        <span className="bg-neutral-100 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime} min read
                        </span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-1 text-neutral-400" />
                          <span className="text-neutral-500">{post.author}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <span 
                              key={tag}
                              className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search terms or filters to find articles.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedTag('');
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending Posts */}
            {trendingPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                  Trending Now
                </h3>
                <div className="space-y-4">
                  {trendingPosts.map(post => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm group-hover:text-primary-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center text-xs text-neutral-500 mt-1">
                            <span>{post.category}</span>
                            <span className="mx-1">•</span>
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-primary-600" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 15).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedTag === tag 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredPosts.length > 12 && (
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a 
                href="#"
                className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
              >
                2
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
              >
                Next
              </a>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;