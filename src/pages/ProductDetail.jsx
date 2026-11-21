import React from 'react';
import { Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import SEO from '@/components/common/SEO';
import ScallopDivider from '@/components/common/ScallopDivider';
import { ProductDetailSkeleton } from '@/components/common/Skeleton';
import { KidStampBadge, SproutDoodle, HeartDoodle } from '@/components/graphics/KidsDoodles';
import { useProductDetail } from '@/hooks/useProductDetail';
import {
  ProductGallery,
  ProductPurchasePanel,
  ProductStickyBars,
  ProductHighlights,
  ProductBundleSection,
  ProductDailyRoutine,
  ProductIngredients,
  ProductScienceCare,
  ProductReviews,
  ProductFAQ,
  RelatedProducts,
} from '@/components/product-detail';

export default function ProductDetail({ onAddToCart, cartItems = [] }) {
  const detail = useProductDetail({ onAddToCart, cartItems });

  if (detail.isLoading) {
    return <ProductDetailSkeleton />;
  }

  const { product, currentPack } = detail;

  return (
    <div className="bg-brand-cream min-h-screen pb-24 pt-4 md:pt-6">
      {/* Sticky Add-to-Bag Bars */}
      <ProductStickyBars
        showStickyBar={detail.showStickyBar}
        product={product}
        currentPack={currentPack}
        addedAnimation={detail.addedAnimation}
        onAdd={detail.handleAdd}
      />

      <SEO
        title={`${product.title} - Pediatrician Formulated Kids Nutrition | Nestor`}
        description={
          product.description ||
          `Shop ${product.title} at Nestor. 100% lab tested clean nutrition with zero refined sugar.`
        }
        ogImage={product.image}
        ogType="product"
        schemaData={{
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.title,
          image: [product.image],
          description: product.description,
          sku: product.id || product.slug,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.price,
            availability: 'https://schema.org/InStock',
          },
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Breadcrumbs & Share */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <Link to="/" className="hover:text-[#13805B] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop/all" className="hover:text-[#13805B] transition-colors">
              Shop All
            </Link>
            <span>/</span>
            <Link
              to={`/shop/all?category=${encodeURIComponent(product.category || '')}`}
              className="hover:text-[#13805B] transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-45 sm:max-w-none">
              {product.title}
            </span>
          </div>

          <button
            onClick={detail.handleShare}
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#13805B] bg-white px-3 py-1.5 rounded-full border border-orange-100 shadow-2xs transition-colors shrink-0"
            title="Share product link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-bold">Share</span>
          </button>
        </div>

        {detail.showShareToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-in fade-in">
            Link copied to clipboard! 📋
          </div>
        )}

        {/* Purchase Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start bg-white rounded-3xl p-5 sm:p-7 md:p-9 border border-orange-100/90 shadow-sm">
          <ProductGallery
            product={product}
            galleryImages={detail.galleryImages}
            selectedThumbnail={detail.selectedThumbnail}
            setSelectedThumbnail={detail.setSelectedThumbnail}
            isFavorite={detail.isFavorite}
            onToggleWishlist={detail.handleToggleWishlist}
          />

          <ProductPurchasePanel
            product={product}
            packVariants={detail.packVariants}
            selectedPackIndex={detail.selectedPackIndex}
            setSelectedPackIndex={detail.setSelectedPackIndex}
            currentPack={currentPack}
            discount={detail.discount}
            quantity={detail.quantity}
            setQuantity={detail.setQuantity}
            addedAnimation={detail.addedAnimation}
            onAdd={detail.handleAdd}
            onBuyNow={detail.handleBuyNow}
            pincode={detail.pincode}
            setPincode={detail.setPincode}
            pincodeStatus={detail.pincodeStatus}
            onCheckPincode={detail.handleCheckPincode}
          />
        </div>

        {/* Divider 1 */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <ScallopDivider
            direction="up"
            color="text-orange-300/80"
            centerBadge={<KidStampBadge text="Doctor-Formulated Daily Care" />}
          />
        </div>

        <ProductHighlights />

        <ProductBundleSection
          product={product}
          currentPack={currentPack}
          bundleComplement={detail.bundleComplement}
          includeBundleItem2={detail.includeBundleItem2}
          setIncludeBundleItem2={detail.setIncludeBundleItem2}
          bundleAdded={detail.bundleAdded}
          onAddBundle={detail.handleAddBundle}
        />

        <ProductDailyRoutine />

        <ProductIngredients product={product} />

        {/* Divider 2 */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <ScallopDivider
            direction="down"
            color="text-emerald-300/80"
            centerBadge={
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-white px-3.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                <SproutDoodle className="w-4 h-4 text-emerald-600" />
                <span>Backed by Science + Care</span>
              </div>
            }
          />
        </div>

        <ProductScienceCare
          scienceTab={detail.scienceTab}
          setScienceTab={detail.setScienceTab}
          openScienceAccordion={detail.openScienceAccordion}
          setOpenScienceAccordion={detail.setOpenScienceAccordion}
        />

        {/* Divider 3 */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <ScallopDivider
            direction="up"
            color="text-amber-200/80"
            centerBadge={
              <div className="flex items-center gap-1.5 text-xs font-black text-[#C89B58] bg-white px-3.5 py-0.5 rounded-full border border-[#C89B58]/30 shadow-2xs">
                <HeartDoodle className="w-3.5 h-3.5 text-[#C89B58]" />
                <span>Verified Parent Reviews</span>
              </div>
            }
          />
        </div>

        <ProductReviews
          product={product}
          productReviews={detail.productReviews}
          activeReviewFilter={detail.activeReviewFilter}
          setActiveReviewFilter={detail.setActiveReviewFilter}
          showReviewModal={detail.showReviewModal}
          setShowReviewModal={detail.setShowReviewModal}
          reviewRating={detail.reviewRating}
          setReviewRating={detail.setReviewRating}
          reviewTitle={detail.reviewTitle}
          setReviewTitle={detail.setReviewTitle}
          reviewComment={detail.reviewComment}
          setReviewComment={detail.setReviewComment}
          reviewSubmitted={detail.reviewSubmitted}
          onReviewSubmit={detail.handleReviewSubmit}
        />

        <RelatedProducts
          relatedProducts={detail.relatedProducts}
          cartItems={cartItems}
          onAddToCart={detail.effectiveAddToCart}
        />

        <ProductFAQ
          productFaqs={detail.productFaqs}
          openFaq={detail.openFaq}
          setOpenFaq={detail.setOpenFaq}
        />
      </div>
    </div>
  );
}
