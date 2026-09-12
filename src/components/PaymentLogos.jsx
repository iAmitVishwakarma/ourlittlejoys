import React from 'react';

/**
 * Authentic Payment Logos matching Little Joys checkout & footer trust strip
 */

export function AmexLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="38" rx="4" fill="#006FCF" />
      <path
        d="M6 14.5L10 24H12.8L16.8 14.5H13.6L11.4 20.2L9.2 14.5H6ZM17 14.5V24H25V21.8H19.6V19.9H24.5V17.8H19.6V16.7H25V14.5H17ZM26.2 14.5L29 19.3L31.8 14.5H34.5L30.5 20.5L34.8 24H32L29.3 19.8L26.6 24H23.8L28.1 19.4L23.5 14.5H26.2ZM36 14.5V24H38.5V14.5H36ZM40 14.5V24H42.5V19.8H46.8L49 24H51.8L49.3 19.4C50.8 18.8 51.5 17.5 51.5 16C51.5 14.8 50.5 14.5 48.5 14.5H40ZM42.5 16.5H47C48 16.5 48.8 16.8 48.8 17.8C48.8 18.8 48 19.1 47 19.1H42.5V16.5Z"
        fill="#FFFFFF"
        transform="scale(0.9) translate(3, 3)"
      />
    </svg>
  );
}

export function MastercardLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="19" r="13" fill="#EB001B" />
      <circle cx="37" cy="19" r="13" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M30 9.2C32.8 11.6 34.6 15.1 34.6 19C34.6 22.9 32.8 26.4 30 28.8C27.2 26.4 25.4 22.9 25.4 19C25.4 15.1 27.2 11.6 30 9.2Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function VisaLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="30"
        y="26"
        textAnchor="middle"
        fill="#1A1F71"
        fontFamily="sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="20"
        letterSpacing="1"
      >
        VISA
      </text>
      {/* Golden tip on V */}
      <path d="M14 11L18 11L16 16Z" fill="#F7B600" />
    </svg>
  );
}

export function UpiLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tri-color UPI double arrows */}
      <g transform="translate(6, 9)">
        <path d="M7 0L17 10L14 13L4 3L7 0Z" fill="#097939" />
        <path d="M13 3L23 13L20 16L10 6L13 3Z" fill="#ED752E" />
      </g>
      <text
        x="38"
        y="25"
        textAnchor="middle"
        fill="#2B2F3A"
        fontFamily="sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="14"
        letterSpacing="0.5"
      >
        UPI
      </text>
    </svg>
  );
}

export function GPayLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Google 'G' icon */}
      <g transform="translate(10, 10)">
        <path
          d="M9 3.6C10.2 3.6 11.3 4 12.1 4.8L14.7 2.2C13.1 0.8 11.2 0 9 0C5.5 0 2.5 2 1 4.9L3.9 7.2C4.7 5.1 6.7 3.6 9 3.6Z"
          fill="#EA4335"
        />
        <path
          d="M17.6 9.2C17.6 8.6 17.5 8 17.4 7.4H9V11H13.9C13.7 12 13.1 12.8 12.2 13.4L15.1 15.6C16.8 14.1 17.6 11.8 17.6 9.2Z"
          fill="#4285F4"
        />
        <path
          d="M3.9 10.8C3.7 10.2 3.6 9.6 3.6 9C3.6 8.4 3.7 7.8 3.9 7.2L1 4.9C0.4 6.1 0 7.5 0 9C0 10.5 0.4 11.9 1 13.1L3.9 10.8Z"
          fill="#FBBC05"
        />
        <path
          d="M9 18C11.2 18 13.1 17.2 14.6 15.8L11.7 13.6C11 14.1 10.1 14.4 9 14.4C6.7 14.4 4.7 12.9 3.9 10.8L1 13.1C2.5 16 5.5 18 9 18Z"
          fill="#34A853"
        />
      </g>
      <text
        x="38"
        y="24"
        textAnchor="middle"
        fill="#5F6368"
        fontFamily="sans-serif"
        fontWeight="700"
        fontSize="12"
      >
        Pay
      </text>
    </svg>
  );
}

export function PluxeeLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 60 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="24"
        y="24"
        textAnchor="middle"
        fill="#391C7A"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="13"
        letterSpacing="-0.5"
      >
        pluxee
      </text>
      {/* Pluxee cross/spark symbol */}
      <g transform="translate(43, 14)">
        <rect x="3" y="0" width="3" height="10" rx="1" fill="#C4F435" />
        <rect x="0" y="3" width="10" height="3" rx="1" fill="#C4F435" />
      </g>
    </svg>
  );
}

export function NetBankingLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 70 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Classic Bank pillar building icon */}
      <g transform="translate(6, 10)">
        <path d="M12 0L24 6H0L12 0Z" fill="#13805B" />
        <rect x="2" y="7" width="3" height="8" rx="0.5" fill="#13805B" />
        <rect x="8" y="7" width="3" height="8" rx="0.5" fill="#13805B" />
        <rect x="13" y="7" width="3" height="8" rx="0.5" fill="#13805B" />
        <rect x="19" y="7" width="3" height="8" rx="0.5" fill="#13805B" />
        <rect x="0" y="16" width="24" height="2" rx="0.5" fill="#13805B" />
      </g>
      <text
        x="45"
        y="18"
        textAnchor="middle"
        fill="#334155"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="8"
      >
        Net
      </text>
      <text
        x="45"
        y="27"
        textAnchor="middle"
        fill="#334155"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="7.5"
      >
        Banking
      </text>
    </svg>
  );
}

export function CashOnDeliveryLogoSVG({ className = "h-6" }) {
  return (
    <svg viewBox="0 0 72 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cash / Banknotes icon with Rupee */}
      <g transform="translate(6, 10)">
        <rect x="0" y="1" width="22" height="15" rx="2" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
        <circle cx="11" cy="8.5" r="4" fill="#059669" opacity="0.15" />
        <text
          x="11"
          y="11.5"
          textAnchor="middle"
          fill="#059669"
          fontFamily="sans-serif"
          fontWeight="900"
          fontSize="9"
        >
          ₹
        </text>
      </g>
      <text
        x="47"
        y="17"
        textAnchor="middle"
        fill="#334155"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="7.5"
      >
        Cash on
      </text>
      <text
        x="47"
        y="26"
        textAnchor="middle"
        fill="#334155"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="7.5"
      >
        Delivery
      </text>
    </svg>
  );
}

export const PAYMENT_PARTNERS = [
  { id: 'amex', name: 'American Express', Component: AmexLogoSVG },
  { id: 'mastercard', name: 'Mastercard', Component: MastercardLogoSVG },
  { id: 'visa', name: 'VISA', Component: VisaLogoSVG },
  { id: 'upi', name: 'UPI', Component: UpiLogoSVG },
  { id: 'gpay', name: 'Google Pay', Component: GPayLogoSVG },
  { id: 'pluxee', name: 'Pluxee', Component: PluxeeLogoSVG },
  { id: 'netbanking', name: 'Net Banking', Component: NetBankingLogoSVG },
  { id: 'cod', name: 'Cash on Delivery', Component: CashOnDeliveryLogoSVG },
];
