import React, { useState } from 'react';
import { BlogArticle } from '../data/blogData';
import { 
  X, Clock, Calendar, ShieldCheck, CheckCircle2, ArrowRight, 
  Share2, Bookmark, Check, Sparkles, User, Tag, HelpCircle, ChevronRight
} from 'lucide-react';

interface ArticleModalProps {
  article: BlogArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onBookService
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!isOpen || !article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-[32px] sm:rounded-2xl max-w-4xl w-full max-h-[94vh] overflow-hidden shadow-2xl border-t sm:border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1 bg-[#D5CDC5] rounded-full mx-auto mt-2.5 mb-0.5 sm:hidden shrink-0" />

        {/* Modal Top Nav Header */}
        <div className="px-5 sm:px-8 py-3.5 border-b border-[#EAE3DE] flex items-center justify-between bg-[#FDFCFB]">
          <div className="flex items-center gap-2 text-xs text-[#637068]">
            <span className="px-2.5 py-0.5 bg-[#FAF4F5] text-[#964B59] font-semibold rounded-full uppercase tracking-wider text-[10px]">
              {article.category}
            </span>
            <span className="hidden sm:inline-block">·</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#964B59]" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-[#637068] hover:text-[#1F2421] rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Share Article Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 text-[#637068] hover:text-[#1F2421] rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Save to bookmarks"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#964B59] text-[#964B59]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#637068] hover:text-[#1F2421] rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-8">
          
          {/* Article Header & Title */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#964B59] font-medium mb-2 bg-[#FAF4F5] px-2.5 py-1 rounded-md">
              <Tag className="w-3.5 h-3.5" />
              <span>Target SEO Search Query: <strong>&ldquo;{article.primaryKeyword}&rdquo;</strong></span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1F2421] leading-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#525E57] leading-relaxed">
              {article.summary}
            </p>

            {/* Author Credential Card */}
            <div className="mt-5 p-4 rounded-xl bg-[#FAF9F5] border border-[#EAE3DE] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <div className="font-semibold text-xs sm:text-sm text-[#1F2421] flex items-center gap-1.5">
                    <span>{article.author.name}</span>
                    <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
                  </div>
                  <div className="text-[11px] text-[#637068]">{article.author.role}</div>
                  <div className="text-[10px] text-[#8C9890]">{article.author.credentials}</div>
                </div>
              </div>

              <div className="text-right text-[11px] text-[#7C8880]">
                <div>Published: {article.publishDate}</div>
                <div className="text-emerald-700 font-medium">✓ Clinically Reviewed</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-16/9 shadow-xs">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 sm:p-6 bg-[#FAF6F3] rounded-2xl border border-[#E8DFD5] space-y-3">
            <h3 className="font-serif text-lg font-medium text-[#1F2421] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#964B59]" />
              <span>Key Clinical & Convenience Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3E4A43]">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formatted Content Sections */}
          <div className="space-y-6 text-[#2C3530] text-sm sm:text-base leading-relaxed">
            {article.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F2421] border-b border-[#F0EBE5] pb-2">
                  {sec.heading}
                </h2>
                <p className="text-[#4A5550] leading-relaxed">
                  {sec.body}
                </p>
                {sec.bulletPoints && (
                  <ul className="space-y-2 pl-2">
                    {sec.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#525E57]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#964B59] mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Embedded FAQ Accordion inside Article */}
          <div className="pt-6 border-t border-[#EAE3DE] space-y-4">
            <h3 className="font-serif text-xl font-medium text-[#1F2421] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#964B59]" />
              <span>Frequently Asked Questions for &ldquo;{article.primaryKeyword}&rdquo;</span>
            </h3>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="p-4 bg-[#FBF9F6] border border-[#E8E2D9] rounded-xl text-xs sm:text-sm">
                  <div className="font-semibold text-[#1F2421] mb-1">
                    Q: {faq.question}
                  </div>
                  <div className="text-[#637068] leading-relaxed">
                    A: {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Keywords Cloud */}
          <div className="pt-4 border-t border-[#EAE3DE]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7C8880] mb-2">
              Related Search Terms:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {article.secondaryKeywords.map((kw, kwIdx) => (
                <span
                  key={kwIdx}
                  className="px-2.5 py-1 bg-[#F5EFEA] text-[#525E57] rounded-md text-[11px]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Direct Booking Promotion Banner */}
          <div className="p-6 rounded-2xl bg-[#1F2B24] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[#C1AA91]">
                Ready for Pure Rejuvenation?
              </div>
              <div className="font-serif text-lg sm:text-xl font-normal text-white mt-0.5">
                Book {article.linkedServiceTitle} at Your Doorstep
              </div>
              <div className="text-xs text-[#A8B7AF] mt-1">
                Therapist arrives with heated table, sterile linens & organic oils.
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookService(article.linkedServiceId);
              }}
              className="px-5 py-2.5 bg-[#964B59] hover:bg-[#823E4B] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Book This Ritual Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-[#EAE3DE] bg-[#FDFCFB] flex items-center justify-between">
          <div className="text-xs text-[#637068] hidden sm:block">
            Enjoyed this guide? Experience it live in your home.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#DDD7CD] hover:bg-neutral-100 text-xs font-medium rounded-full cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(article.linkedServiceId);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Book {article.linkedServiceTitle}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
