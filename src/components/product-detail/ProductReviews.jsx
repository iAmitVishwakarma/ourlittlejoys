import React from 'react';
import { Star, ThumbsUp, X } from 'lucide-react';

export default function ProductReviews({
  product,
  productReviews,
  activeReviewFilter,
  setActiveReviewFilter,
  showReviewModal,
  setShowReviewModal,
  reviewRating,
  setReviewRating,
  reviewTitle,
  setReviewTitle,
  reviewComment,
  setReviewComment,
  reviewSubmitted,
  onReviewSubmit,
}) {
  return (
    <section id="customer-reviews" className="py-6">
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-orange-100 shadow-xs space-y-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Rating Summary Block */}
          <div className="flex items-center gap-6">
            <div className="text-center bg-brand-cream p-5 rounded-3xl border border-orange-100 shrink-0">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 block">
                {product.rating}
              </span>
              <div className="flex items-center justify-center gap-1 my-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-bold block">
                {product.reviews || '4,680'} Verified Reviews
              </span>
            </div>

            {/* Star Distribution Progress Bars */}
            <div className="space-y-1.5 flex-1 max-w-xs text-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 text-slate-600 font-bold">5 ★</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                </div>
                <span className="w-8 text-right text-slate-500 font-semibold">84%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 text-slate-600 font-bold">4 ★</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '12%' }} />
                </div>
                <span className="w-8 text-right text-slate-500 font-semibold">12%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 text-slate-600 font-bold">3 ★</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '3%' }} />
                </div>
                <span className="w-8 text-right text-slate-500 font-semibold">3%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 text-slate-600 font-bold">2 ★</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: '1%' }} />
                </div>
                <span className="w-8 text-right text-slate-500 font-semibold">1%</span>
              </div>
            </div>
          </div>

          {/* Write a Review Button */}
          <div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full md:w-auto bg-white hover:bg-orange-50 text-slate-900 border-2 border-slate-900 font-black py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Review Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'With Photos', 'Verified Buyers', '5 Stars'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveReviewFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeReviewFilter === filter
                  ? 'bg-[#13805B] text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-5 divide-y divide-slate-100">
          {productReviews.map((rev) => (
            <div key={rev.id} className="pt-5 first:pt-0 space-y-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                    "{rev.title}"
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {rev.comment}
              </p>

              {rev.image && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-orange-100 mt-2 shadow-2xs">
                  <img src={rev.image} alt="Customer photo" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{rev.author}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">{rev.child}</span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="text-slate-500 font-medium hidden sm:inline">{rev.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ Verified Buyer
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-100 space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">Share Your Experience</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewRating(s)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-transform hover:scale-110 ${
                          s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Review Title</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. My child loves the chocolate taste!"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#13805B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Review</label>
                <textarea
                  rows="4"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share how this product helped your child's daily nutrition routine..."
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#13805B]"
                />
              </div>

              <button
                type="button"
                onClick={onReviewSubmit}
                disabled={reviewSubmitted}
                className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {reviewSubmitted ? (
                  <span>Thank You! Review Submitted ✓</span>
                ) : (
                  <span>Submit Review</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
