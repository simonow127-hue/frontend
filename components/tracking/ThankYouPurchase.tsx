"use client";

import Script from "next/script";

const PIXEL_ID = "1449870366149258";

type Props = {
  orderCode?: string;
  total?: number;
  eventId?: string;
};

/**
 * On thank-you: fire Meta Lead (for lead ads) + Purchase.
 * Self-contained so it does not depend on ClientShell timing.
 */
export default function ThankYouPurchase({
  orderCode,
  total = 0,
  eventId,
}: Props) {
  if (!orderCode) return null;

  const eid = eventId || `ty-${orderCode}`;
  const value = Number.isFinite(total) ? total : 0;

  const js = `
    (function(){
      var PIXEL_ID = ${JSON.stringify(PIXEL_ID)};
      var orderCode = ${JSON.stringify(orderCode)};
      var value = ${JSON.stringify(value)};
      var eventId = ${JSON.stringify(eid)};

      function ensureFbq(cb) {
        if (window.fbq && window.fbq.loaded) { cb(); return; }
        !function(f,b,e,v,n,t,s){
          if(f.fbq) return;
          n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)
        }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', PIXEL_ID);
        cb();
      }

      function fire() {
        try {
          // Lead = conversion for your current Meta lead campaigns
          window.fbq('track', 'Lead', {
            value: value,
            currency: 'SAR',
            content_name: orderCode
          }, { eventID: eventId + '-lead' });

          window.fbq('track', 'Purchase', {
            value: value,
            currency: 'SAR',
            content_type: 'product',
            order_id: orderCode
          }, { eventID: eventId });
        } catch (e) {}
      }

      ensureFbq(function(){
        fire();
        setTimeout(fire, 400);
        setTimeout(fire, 1200);
      });
    })();
  `;

  return (
    <Script
      id={`meta-lead-purchase-${orderCode}`}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: js }}
    />
  );
}

export function savePendingPurchase(payload: {
  orderCode: string;
  total: number;
  eventId: string;
  items: { id: string; name: string; quantity: number; price: number }[];
}) {
  try {
    const raw = JSON.stringify(payload);
    localStorage.setItem("riads_pending_purchase", raw);
    sessionStorage.setItem("riads_pending_purchase", raw);
  } catch {
    // ignore
  }
}
