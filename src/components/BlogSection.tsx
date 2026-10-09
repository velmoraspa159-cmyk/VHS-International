import React, { useState } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogData';
import { SpaService } from '../types';
import { 
  BookOpen, Clock, Calendar, ArrowRight, Sparkles, 
  Search, CheckCircle2, ShieldCheck, Flame, Tag
} from 'lucide-react';

interface BlogSectionProps {
  onReadArticle: (article: BlogArticle) => void;
  onBookService: (serviceId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadArticle, onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Home Spa Guide', 'Pain Relief', 'Couples & Events', 'Athlete Recovery', 'Prenatal Care'];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.secondaryKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="wellness-journal" className="py-16 sm:py-24 bg-[#FCFBF9] border-t border-[#EAE3DE] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EBE8] text-[#964B59] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Organic Traffic & Wellness Journal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1F2421] tracking-tight">
            The In-Home Sanctuary Journal
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#637068] leading-relaxed">
            Evidence-based therapeutic guides, doorstep preparation checklists, and expert answers to the most frequent Google searches on luxury in-home bodywork.
          </p>

          {/* Search bar inside blog */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C9890] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics: deep tissue, couples, prenatal, room setup..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E0D8CE] rounded-full text-xs text-[#1F2421] placeholder-[#8C9890] focus:outline-hidden focus:ring-2 focus:ring-[#964B59]/20 focus:border-[#964B59] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C9890] hover:text-[#1F2421]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1F2B24] text-white shadow-xs'
                    : 'bg-white border border-[#E5DFD7] text-[#525E57] hover:border-[#1F2B24]/40 hover:text-[#1F2421]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured / Grid of Articles */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#EAE3DE] p-8 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-[#8C9890] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-medium text-[#1F2421]">No Articles Found</h3>
            <p className="text-xs text-[#637068] mt-1">
              Try a different keyword or reset categories to explore our full library of home wellness guides.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#964B59] text-white text-xs font-medium rounded-full cursor-pointer hover:bg-[#823E4B]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-[#EAE3DE] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group hover:-translate-y-0.5 duration-300"
              >
                {/* Article Image Container */}
                <div 
                  className="relative aspect-16/10 overflow-hidden cursor-pointer"
                  onClick={() => onReadArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1F2421] shadow-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#964B59]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* High-Intent Search Keyword Pill */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#964B59] font-medium mb-2.5">
                      <Tag className="w-3 h-3 shrink-0" />
                      <span className="truncate">Top Query: &ldquo;{article.primaryKeyword}&rdquo;</span>
                    </div>

                    {/* Headline */}
                    <h3 
                      onClick={() => onReadArticle(article)}
                      className="font-serif text-lg sm:text-xl font-medium text-[#1F2421] group-hover:text-[#964B59] transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-2 text-xs sm:text-sm text-[#637068] line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Key Takeaways preview */}
                    <div className="mt-4 pt-3 border-t border-[#F2ECE6] space-y-1.5">
                      <div className="text-[11px] font-semibold text-[#1F2421] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E]" />
                        <span>Core Insight</span>
                      </div>
                      <p className="text-[11px] text-[#525E57] line-clamp-2 italic">
                        &ldquo;{article.keyTakeaways[0]}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Author & Direct Booking Call to Action */}
                  <div className="mt-6 pt-4 border-t border-[#EAE3DE] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-[#EAE3DE]"
                      />
                      <div className="text-[11px] min-w-0">
                        <div className="font-semibold text-[#1F2421] truncate">{article.author.name}</div>
                        <div className="text-[#8C9890] text-[10px] truncate">{article.publishDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onReadArticle(article)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#1F2421] hover:text-[#964B59] transition-colors cursor-pointer"
                      >
                        Read Guide
                      </button>
                      <button
                        onClick={() => onBookService(article.linkedServiceId)}
                        className="px-3 py-1.5 bg-[#964B59] hover:bg-[#823E4B] text-white text-[11px] font-medium rounded-full transition-all cursor-pointer shadow-xs flex items-center gap-1"
                        title={`Book ${article.linkedServiceTitle}`}
                      >
                        <span>Book Ritual</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* SEO Traffic & Search Intent Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#21352A] to-[#14231B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left max-w-2xl">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C1AA91]">
              Zero Friction · Verified Master Therapists
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
              Ready to Experience Five-Star Relaxation at Your Doorstep?
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B7AF]">
              No phone calls, no driving in traffic. Instant live scheduling with heated memory foam beds and organic botanical oils.
            </p>
          </div>

          <button
            onClick={() => onBookService('serv-deep-balinese')}
            className="px-6 py-3 bg-[#FAF9F5] hover:bg-white text-[#1F2B24] text-xs font-semibold rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Book Your Home Ritual Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
