const handleBuyNow = () => {
  const offer = getOfferByPieces(product, selectedPieces);

  addItem(product, offer);

  const eventId = generateFreshEventId("addToCart");

  trackAddToCart(
    {
      id: product.id,
      name: product.arabicName,
      price: offer.price,
    },
    eventId
  );

  trackEvent({
    event_name: "AddToCart",
    event_id: eventId,
    payload: {
      product_id: product.id,
      pieces: selectedPieces,
    },
  });

  // فتح Checkout مباشرة
  setTimeout(() => {
    openCheckout();
  }, 50);
};
