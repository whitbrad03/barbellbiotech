import { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { img_hero } from './images';
import { CONFIG, WALLETS, BANK_KEY, BANK_BSB, BANK_ACCOUNT } from './config';
import { PRODUCTS, CATEGORIES } from './products';

emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

// ── ANNOUNCEMENT BANNER ────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  { text: 'Free standard shipping on orders over', highlight: '$150 AUD' },
  { text: 'Every batch independently tested —', highlight: 'COA available on request' },
  { text: 'New arrival:', highlight: 'Retatrutide now in stock' },
  { text: 'Loyalty subscribers receive', highlight: '10% off every order' },
  { text: 'Same business day dispatch on orders before', highlight: '2PM AEST' },
];

function AnnouncementBanner() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % ANNOUNCEMENTS.length);
        setFading(false);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const a = ANNOUNCEMENTS[current];
  return (
    <div className="announce-bar">
      <div className="announce-slide" style={{ opacity: fading ? 0 : 1 }}>
        <span className="announce-dot" />
        <span style={{ color: 'rgba(255,255,255,.7)' }}>{a.text}</span>
        <span>{a.highlight}</span>
        <span className="announce-dot" />
      </div>
    </div>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --gold:#c9a84c;--gold-d:#a07820;--gold-l:#fdf6e3;--gold-b:#e8c96a;--gold-gradient:linear-gradient(135deg,#f5e070 0%,#c9a84c 30%,#f0d060 50%,#a07820 70%,#e8c040 100%);
  --dark:#0f0f0d;--dark-2:#1a1a16;--dark-3:#242420;
  --gray-50:#f5f3ef;--gray-100:#eeeae3;--gray-200:#e0dbd0;--gray-300:#c8c2b5;
  --gray-400:#9a9485;--gray-500:#6b6555;--gray-700:#3a3628;--gray-900:#1a1714;
  --white:#ffffff;
  --shadow:0 1px 3px rgba(0,0,0,.06);
  --shadow-md:0 4px 20px rgba(0,0,0,.08);
  --shadow-lg:0 12px 40px rgba(0,0,0,.12);
  --radius:6px;--radius-lg:10px;--radius-xl:14px;
}
body{font-family:'Inter',sans-serif;background:#f5f3ef;color:var(--gray-900);}
button{font-family:'Inter',sans-serif;cursor:pointer;}
img{max-width:100%;display:block;}

/* ANNOUNCEMENT BANNER */
.announce-bar{background:var(--dark);overflow:hidden;height:40px;position:relative;}
.announce-track{display:flex;height:100%;}
.announce-slide{min-width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:rgba(255,255,255,.85);letter-spacing:.06em;gap:12px;transition:opacity .5s ease;}
.announce-slide span{color:var(--gold);}
.announce-dot{width:4px;height:4px;background:var(--gold-gradient);border-radius:50%;opacity:.8;}

/* NAV */
.nav{position:sticky;top:0;z-index:100;background:var(--white);border-bottom:1px solid var(--gray-200);height:66px;display:flex;align-items:center;justify-content:space-between;padding:0 2.5rem;box-shadow:0 1px 0 var(--gray-200);}
.nav-logo{font-size:18px;font-weight:700;color:var(--gray-900);cursor:pointer;letter-spacing:.12em;text-transform:uppercase;background:none;border:none;}
.nav-logo span{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.nav-links{display:flex;gap:2rem;align-items:center;}
.nav-link{background:none;border:none;color:var(--gray-400);font-size:12px;font-weight:500;padding:4px 0;transition:color .15s;letter-spacing:.06em;text-transform:uppercase;}
.nav-link:hover,.nav-link.active{color:var(--gray-900);}
.cart-btn{background:var(--dark);border:none;color:var(--white);padding:10px 20px;font-size:11px;font-weight:600;border-radius:var(--radius);display:flex;align-items:center;gap:8px;transition:background .15s;letter-spacing:.08em;text-transform:uppercase;}
.cart-btn:hover{background:var(--dark-3);}
.cart-count{background:var(--gold-gradient);color:var(--dark);border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;}

/* RESEARCH BAR */
.research-bar{background:var(--gray-100);border-bottom:1px solid var(--gray-200);padding:8px 2.5rem;text-align:center;font-size:11px;color:var(--gray-400);letter-spacing:.04em;}

/* HERO */
.hero{position:relative;min-height:600px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-bottom:1px solid var(--dark-3);}
.hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.65) 50%,rgba(0,0,0,.4) 100%);}
.hero-inner{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:6rem 2.5rem;text-align:center;display:flex;flex-direction:column;align-items:center;}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.4);color:var(--gold);font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:2rem;backdrop-filter:blur(4px);}
.hero h1{font-size:clamp(42px,6vw,82px);font-weight:800;line-height:.95;letter-spacing:-.03em;color:var(--white);margin-bottom:1.5rem;}
.hero h1 em{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:normal;display:block;}
.hero-sub{font-size:15px;color:rgba(255,255,255,.65);max-width:520px;line-height:1.8;margin-bottom:2.5rem;}
.hero-pills{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}
.pill{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);padding:6px 14px;font-size:11px;font-weight:500;color:rgba(255,255,255,.7);border-radius:20px;letter-spacing:.04em;backdrop-filter:blur(4px);}
.hero-img-wrap{display:none;}
.hero-img{display:none;}

/* INFO TILES */
.marquee-strip{background:var(--dark-2);border-top:1px solid var(--dark-3);border-bottom:1px solid var(--dark-3);overflow:hidden;padding:0;height:56px;display:flex;align-items:center;}
.marquee-track{display:flex;animation:marquee 30s linear infinite;white-space:nowrap;gap:0;}
.marquee-track:hover{animation-play-state:paused;}
.marquee-item{display:inline-flex;align-items:center;gap:10px;padding:0 3rem;font-size:13px;font-weight:600;color:rgba(255,255,255,.85);letter-spacing:.04em;white-space:nowrap;}
.marquee-item i{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:16px;}
.marquee-sep{color:var(--gold);opacity:.4;font-size:18px;margin:0 1rem;}
@keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

/* SECTION */
.section{max-width:1200px;margin:0 auto;padding:4rem 2.5rem;}
.shop-bg{background:var(--gray-50);}
.section-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:2rem;padding-bottom:1rem;border-bottom:1px solid var(--gray-200);}
.section-title{font-size:22px;font-weight:800;color:var(--gray-900);letter-spacing:-.02em;}
.section-count{font-size:11px;color:var(--gray-400);letter-spacing:.04em;}

/* FILTERS */
.filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:2rem;}
.filter-btn{background:var(--white);border:1px solid var(--gray-200);color:var(--gray-400);padding:6px 16px;font-size:11px;font-weight:600;border-radius:20px;transition:all .15s;letter-spacing:.06em;text-transform:uppercase;}
.filter-btn:hover{border-color:var(--gold);color:var(--gold-d);}
.filter-btn.active{border-color:var(--gold);color:var(--gold-d);background:var(--gold-l);}

/* PRODUCT GRID */
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px;}
.product-card{background:#fffefb;border:1px solid var(--gray-200);border-radius:var(--radius-lg);padding:1.5rem;display:flex;flex-direction:column;gap:12px;transition:box-shadow .2s,border-color .2s,transform .2s;}
.product-card:hover{box-shadow:var(--shadow-lg);border-color:var(--gray-300);transform:translateY(-2px);}
.product-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--radius);background:var(--gray-100);}
.product-cat{font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--gray-400);text-transform:uppercase;}
.in-stock{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:500;color:#16a34a;margin-top:2px;}
.in-stock::before{content:'';width:5px;height:5px;background:#16a34a;border-radius:50%;}
.product-name{font-size:19px;font-weight:800;color:var(--gray-900);letter-spacing:-.02em;line-height:1.1;}
.product-desc{font-size:12px;color:var(--gray-400);line-height:1.7;flex:1;}
.badge{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.08em;padding:3px 10px;border-radius:20px;margin-bottom:2px;text-transform:uppercase;}
.badge-new{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;}
.badge-popular{background:#fff7ed;color:#ea580c;border:1px solid #fed7aa;}
.badge-bundle{background:var(--gold-l);color:var(--gold-d);border:1px solid var(--gold-b);}
.badge-add-on{background:#faf5ff;color:#7c3aed;border:1px solid #e9d5ff;}
.variant-row{display:flex;gap:6px;flex-wrap:wrap;}
.variant-btn{background:var(--gray-50);border:1px solid var(--gray-200);padding:5px 12px;font-size:11px;font-weight:500;color:var(--gray-500);border-radius:var(--radius);transition:all .15s;}
.variant-btn:hover,.variant-btn.sel{border-color:var(--gold);color:var(--gold-d);background:var(--gold-l);}
.price-row{display:flex;align-items:flex-end;justify-content:space-between;}
.price{font-size:28px;font-weight:800;color:var(--gray-900);letter-spacing:-.03em;}
.price-sub{font-size:11px;color:var(--gray-400);letter-spacing:.02em;}
.add-btn{background:var(--dark);color:var(--white);border:none;padding:12px;font-size:12px;font-weight:600;border-radius:var(--radius);width:100%;transition:background .15s;display:flex;align-items:center;justify-content:center;gap:6px;letter-spacing:.06em;text-transform:uppercase;}
.add-btn:hover{background:var(--dark-3);}
.add-btn:disabled{background:var(--gray-200);color:var(--gray-400);cursor:default;}
.addon-btn{background:var(--gold-l);border:1px solid var(--gold-b);color:var(--gold-d);padding:9px;font-size:11px;font-weight:600;border-radius:var(--radius);width:100%;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .15s;letter-spacing:.04em;}
.addon-btn:hover{background:var(--gold-gradient);color:var(--dark);}
.coa-btn{background:none;border:none;color:var(--gray-400);font-size:11px;text-decoration:underline;width:100%;text-align:center;padding:2px 0;letter-spacing:.02em;}
.coa-btn:hover{color:var(--gold-d);}

/* REVIEWS */
.reviews-section{margin-top:12px;border-top:1px solid var(--gray-100);padding-top:10px;}
.reviews-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.reviews-avg{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--gray-900);}
.stars-display{display:flex;gap:2px;}
.star{font-size:13px;color:var(--gray-200);}
.star.filled{color:#c9a84c;text-shadow:0 0 8px rgba(201,168,76,.4);}
.review-item{padding:8px 0;border-bottom:1px solid var(--gray-100);}
.review-item:last-child{border-bottom:none;}
.review-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;}
.review-name{font-size:12px;font-weight:600;color:var(--gray-900);}
.review-date{font-size:10px;color:var(--gray-400);}
.review-text{font-size:12px;color:var(--gray-500);line-height:1.5;}
.write-review-btn{background:none;border:1px solid var(--gray-200);color:var(--gray-500);font-size:11px;padding:5px 10px;border-radius:var(--radius);width:100%;margin-top:8px;transition:all .15s;letter-spacing:.04em;}
.write-review-btn:hover{border-color:var(--gold);color:var(--gold-d);}

/* LOYALTY */
.loyalty-wrap{background:var(--dark);border-top:1px solid var(--dark-3);border-bottom:1px solid var(--dark-3);padding:5rem 2.5rem;}
.loyalty-inner{max-width:820px;margin:0 auto;}
.loyalty-head{display:flex;align-items:flex-start;gap:1.5rem;margin-bottom:1.5rem;}
.loyalty-icon{font-size:36px;color:var(--gold);}
.loyalty-h1{font-size:42px;font-weight:800;line-height:1;letter-spacing:-.03em;color:var(--white);}
.loyalty-h1 span{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.loyalty-desc{font-size:13px;color:rgba(255,255,255,.55);line-height:1.9;margin-bottom:2rem;}
.loyalty-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1.5rem;}
.loyalty-opt{background:var(--dark-2);border:2px solid var(--dark-3);padding:1.25rem;border-radius:var(--radius-lg);cursor:pointer;transition:border-color .15s;text-align:left;}
.loyalty-opt:hover{border-color:var(--gold);}
.loyalty-opt.sel{border-color:var(--gold);background:rgba(201,169,110,.08);}
.loyalty-opt-title{font-size:18px;font-weight:700;color:var(--white);margin-bottom:4px;}
.loyalty-opt-desc{font-size:12px;color:rgba(255,255,255,.45);}
.loyalty-form{display:flex;gap:8px;margin-bottom:1.5rem;}
.loyalty-input{flex:1;background:var(--dark-2);border:1px solid var(--dark-3);padding:10px 14px;font-size:13px;color:var(--white);border-radius:var(--radius);outline:none;font-family:'Inter',sans-serif;}
.loyalty-input:focus{border-color:var(--gold);}
.loyalty-submit{background:var(--gold-gradient);color:var(--dark);border:none;padding:10px 20px;font-size:12px;font-weight:700;border-radius:var(--radius);white-space:nowrap;transition:opacity .15s;letter-spacing:.06em;text-transform:uppercase;}
.loyalty-submit:hover{background:var(--gold-d);}
.loyalty-submit:disabled{background:var(--dark-3);color:rgba(255,255,255,.3);cursor:default;}
.perk{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--dark-3);}
.perk-check{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:14px;flex-shrink:0;margin-top:1px;}
.perk-text{font-size:13px;color:rgba(255,255,255,.5);line-height:1.5;}
.perk-text strong{color:var(--white);}
.loyalty-success{background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);padding:1rem 1.25rem;border-radius:var(--radius);font-size:13px;color:var(--gold);display:flex;align-items:center;gap:10px;}

/* PAGES */
.page-inner{max-width:800px;margin:0 auto;padding:4rem 2.5rem;}
.page-title{font-size:38px;font-weight:800;color:var(--gray-900);letter-spacing:-.03em;margin-bottom:2rem;}
.info-section{margin-bottom:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid var(--gray-100);}
.info-h2{font-size:17px;font-weight:700;color:var(--gray-900);margin-bottom:.75rem;letter-spacing:-.01em;}
.info-p{font-size:13px;color:var(--gray-500);line-height:1.9;margin-bottom:.75rem;}
.info-ul{font-size:13px;color:var(--gray-500);line-height:1.9;padding-left:1.5rem;margin-bottom:.75rem;}
.info-ul li{margin-bottom:.25rem;}

/* CART DRAWER */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:199;display:none;}
.overlay.open{display:block;}
.cart-drawer{position:fixed;right:0;top:0;bottom:0;width:420px;max-width:95vw;background:var(--white);border-left:1px solid var(--gray-200);z-index:200;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;box-shadow:-8px 0 40px rgba(0,0,0,.1);}
.cart-drawer.open{transform:translateX(0);}
.drawer-head{padding:1.5rem;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between;}
.drawer-title{font-size:17px;font-weight:800;color:var(--gray-900);letter-spacing:-.02em;}
.close-btn{background:none;border:none;color:var(--gray-400);font-size:20px;display:flex;align-items:center;border-radius:var(--radius);padding:4px;transition:background .15s;}
.close-btn:hover{background:var(--gray-100);}
.cart-items{flex:1;overflow-y:auto;padding:1rem 1.5rem;}
.cart-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--gray-100);}
.cart-item-img{width:56px;height:56px;object-fit:cover;border-radius:var(--radius);background:var(--gray-100);flex-shrink:0;}
.cart-item-info{flex:1;}
.item-name{font-size:13px;font-weight:600;color:var(--gray-900);}
.item-var{font-size:11px;color:var(--gray-400);margin-top:1px;letter-spacing:.02em;}
.qty-row{display:flex;align-items:center;gap:8px;margin-top:6px;}
.qty-btn{background:var(--gray-100);border:none;color:var(--gray-700);width:26px;height:26px;border-radius:var(--radius);font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .15s;}
.qty-btn:hover{background:var(--gray-200);}
.qty-val{font-size:13px;font-weight:600;min-width:20px;text-align:center;}
.rm-btn{background:none;border:none;color:var(--gray-400);font-size:11px;margin-top:3px;display:block;letter-spacing:.02em;}
.rm-btn:hover{color:#ef4444;}
.item-price{font-size:18px;font-weight:800;color:var(--gray-900);letter-spacing:-.02em;}
.cart-footer{padding:1.5rem;border-top:1px solid var(--gray-100);}
.total-row{display:flex;justify-content:space-between;font-size:13px;color:var(--gray-400);padding:4px 0;}
.total-row.main{font-size:15px;font-weight:700;color:var(--gray-900);margin-top:10px;padding-top:12px;border-top:1px solid var(--gray-200);}
.total-row.disc{color:#16a34a;}
.checkout-btn{background:var(--dark);color:var(--white);border:none;padding:14px;width:100%;font-size:12px;font-weight:700;border-radius:var(--radius);margin-top:12px;transition:background .15s;letter-spacing:.08em;text-transform:uppercase;}
.checkout-btn:hover{background:var(--dark-3);}
.checkout-btn:disabled{background:var(--gray-200);color:var(--gray-400);cursor:default;}
.ship-note{font-size:11px;color:var(--gray-400);text-align:center;margin-top:8px;letter-spacing:.02em;}
.ship-note.free{color:#16a34a;font-weight:500;}
.empty-cart{text-align:center;padding:3rem 1rem;}
.empty-icon{font-size:40px;color:var(--gray-200);margin-bottom:1rem;}
.empty-text{font-size:13px;color:var(--gray-400);}

/* MODALS */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:300;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal{background:var(--white);border-radius:var(--radius-xl);width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.2);}
.modal-head{padding:1.5rem;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--white);border-radius:var(--radius-xl) var(--radius-xl) 0 0;}
.modal-title{font-size:18px;font-weight:800;color:var(--gray-900);letter-spacing:-.02em;}
.modal-body{padding:1.5rem;}
.step-label{font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--gold-d);text-transform:uppercase;margin-bottom:8px;}
.steps{display:flex;align-items:center;margin-bottom:1.5rem;}
.step-dot{width:28px;height:28px;border-radius:50%;border:2px solid var(--gray-200);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--gray-400);flex-shrink:0;}
.step-dot.active{border-color:var(--gold);color:var(--gold-d);}
.step-dot.done{background:var(--gold-gradient);border-color:var(--gold);color:var(--dark);}
.step-line{flex:1;height:1px;background:var(--gray-200);}
.step-line.done{background:var(--gold);}
.order-box{background:var(--gray-50);border:1px solid var(--gray-200);padding:1rem;border-radius:var(--radius);margin-bottom:1.5rem;}
.order-row{display:flex;justify-content:space-between;font-size:12px;color:var(--gray-400);padding:2px 0;}
.order-total{display:flex;justify-content:space-between;font-size:20px;font-weight:800;color:var(--gray-900);margin-top:8px;padding-top:8px;border-top:1px solid var(--gray-200);letter-spacing:-.02em;}
.ship-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.5rem;}
.ship-opt{background:var(--gray-50);border:2px solid var(--gray-200);padding:1rem;border-radius:var(--radius-lg);cursor:pointer;text-align:left;transition:border-color .15s;}
.ship-opt:hover{border-color:var(--gold);}
.ship-opt.sel{border-color:var(--gold);background:var(--gold-l);}
.ship-opt-title{font-size:14px;font-weight:700;color:var(--gray-900);}
.ship-opt-price{font-size:12px;color:var(--gray-500);margin-top:2px;}
.ship-opt-days{font-size:11px;color:var(--gray-400);margin-top:1px;}
.crypto-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1.5rem;}
.crypto-opt{background:var(--gray-50);border:2px solid var(--gray-200);padding:10px 14px;font-size:12px;font-weight:500;color:var(--gray-700);border-radius:var(--radius);cursor:pointer;text-align:left;transition:all .15s;}
.crypto-opt:hover{border-color:var(--gold);color:var(--gold-d);}
.crypto-opt.sel{border-color:var(--gold);color:var(--gold-d);background:var(--gold-l);}
.address-box{background:var(--gray-50);border:1px solid var(--gray-200);padding:1rem;border-radius:var(--radius);margin-bottom:1.5rem;}
.address-label{font-size:10px;font-weight:700;color:var(--gray-400);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;}
.address-val{font-family:monospace;font-size:12px;color:var(--gray-900);word-break:break-all;line-height:1.6;font-weight:500;}
.copy-btn{background:var(--white);border:1px solid var(--gray-200);color:var(--gray-700);padding:6px 14px;font-size:11px;font-weight:500;border-radius:var(--radius);margin-top:10px;display:inline-flex;align-items:center;gap:6px;transition:all .15s;}
.copy-btn:hover{border-color:var(--gold);color:var(--gold-d);}
.notice{background:var(--gold-l);border:1px solid var(--gold-b);padding:12px 14px;font-size:12px;color:var(--gray-700);line-height:1.7;margin-bottom:1.5rem;border-radius:var(--radius);}
.notice strong{color:var(--gold-d);}
.bank-warning{background:#fef2f2;border:1px solid #fecaca;border-radius:var(--radius);padding:14px;margin-top:12px;font-size:12px;color:#991b1b;line-height:1.8;}
.bank-warning strong{display:block;font-size:13px;margin-bottom:6px;}
.form-field{margin-bottom:12px;}
.form-label{font-size:10px;font-weight:700;color:var(--gray-500);letter-spacing:.08em;margin-bottom:6px;display:block;text-transform:uppercase;}
.form-input{width:100%;background:var(--white);border:1px solid var(--gray-200);padding:10px 12px;font-size:13px;color:var(--gray-900);border-radius:var(--radius);outline:none;font-family:'Inter',sans-serif;transition:border-color .15s;}
.form-input:focus{border-color:var(--gold);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.form-check{display:flex;align-items:flex-start;gap:10px;margin-bottom:1rem;}
.form-check input{margin-top:2px;accent-color:var(--gold);width:14px;height:14px;flex-shrink:0;}
.form-check span{font-size:11px;color:var(--gray-500);line-height:1.6;}
.primary-btn{background:var(--dark);color:var(--white);border:none;padding:14px;width:100%;font-size:12px;font-weight:700;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s;letter-spacing:.08em;text-transform:uppercase;}
.primary-btn:hover{background:var(--dark-3);}
.primary-btn:disabled{background:var(--gray-200);color:var(--gray-400);cursor:default;}
.success-state{text-align:center;padding:2.5rem 1rem;}
.success-icon{font-size:52px;background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem;}
.success-title{font-size:28px;font-weight:800;color:var(--gray-900);margin-bottom:.5rem;letter-spacing:-.02em;}
.success-text{font-size:13px;color:var(--gray-500);line-height:1.8;max-width:400px;margin:0 auto 1.5rem;}
.star-picker{display:flex;gap:4px;margin-bottom:1rem;}
.star-pick{font-size:28px;color:var(--gray-200);cursor:pointer;transition:color .1s;background:none;border:none;padding:0;}
.star-pick:hover,.star-pick.active{color:var(--gold);}

/* FOOTER */
.footer{background:var(--dark);border-top:1px solid var(--dark-3);padding:3rem 2.5rem;display:flex;flex-wrap:wrap;gap:2rem;justify-content:space-between;align-items:flex-start;}
.footer-brand{font-size:16px;font-weight:700;color:var(--white);letter-spacing:.12em;text-transform:uppercase;}
.footer-brand span{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.footer-email{font-size:12px;color:rgba(255,255,255,.35);margin-top:6px;}
.footer-legal{font-size:11px;color:rgba(255,255,255,.25);line-height:1.8;max-width:480px;}
.footer-links{display:flex;gap:1.5rem;flex-wrap:wrap;}
.footer-link{background:none;border:none;font-size:11px;font-weight:500;color:rgba(255,255,255,.35);letter-spacing:.06em;text-transform:uppercase;}
.footer-link:hover{color:var(--gold);}

/* TOAST */
.toast{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--dark);color:var(--white);padding:10px 22px;font-size:12px;font-weight:500;border-radius:var(--radius);box-shadow:0 4px 20px rgba(0,0,0,.25);z-index:500;pointer-events:none;opacity:0;transition:opacity .2s;white-space:nowrap;border:1px solid var(--dark-3);}
.toast.show{opacity:1;}

@media(max-width:768px){.hero{min-height:480px;}.hero h1{font-size:42px;}}
@media(max-width:600px){
  .nav-link:not(.cart-btn){display:none;}
  .hero h1{font-size:36px;}
  .products-grid{grid-template-columns:1fr;}
  .form-row,.ship-opts,.crypto-grid,.loyalty-opts{grid-template-columns:1fr;}
  .cart-drawer{width:100%;}
  .info-tile{border-right:none;border-bottom:1px solid var(--gray-200);}
}
`;

// ── STAR COMPONENT// ── STAR COMPONENT ─────────────────────────────────────────────────────────
function Stars({ rating, size = 13 }) {
  return (
    <div className="stars-display">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={`star${n <= rating ? ' filled' : ''}`} style={{ fontSize: size }}>★</span>
      ))}
    </div>
  );
}

// ── REVIEWS SECTION COMPONENT ──────────────────────────────────────────────
function ProductReviews({ product, onWriteReview }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const url = CONFIG.REVIEWS_SCRIPT_URL;
    if (!url || url.includes('YOUR_GOOGLE')) { setLoading(false); return; }
    fetch(`${url}?action=getReviews&productId=${product.id}`)
      .then(r => r.json())
      .then(d => { if (d.success) setReviews(d.reviews); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [product.id]);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;
  const displayed = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        {avg ? (
          <div className="reviews-avg">
            <Stars rating={Math.round(avg)} />
            <span>{avg} ({reviews.length})</span>
          </div>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>No reviews yet</span>
        )}
      </div>
      {!loading && displayed.map((r, i) => (
        <div className="review-item" key={i}>
          <div className="review-meta">
            <span className="review-name">{r.name}</span>
            <span className="review-date">{r.date}</span>
          </div>
          <Stars rating={r.rating} size={11} />
          <p className="review-text" style={{ marginTop: 3 }}>{r.comment}</p>
        </div>
      ))}
      {reviews.length > 2 && !showAll && (
        <button className="write-review-btn" onClick={() => setShowAll(true)}>
          View all {reviews.length} reviews
        </button>
      )}
      <button className="write-review-btn" onClick={() => onWriteReview(product)}>
        <i className="ti ti-pencil" style={{ marginRight: 4 }} />Write a review
      </button>
    </div>
  );
}

// ── WRITE REVIEW MODAL ─────────────────────────────────────────────────────
function ReviewModal({ product, onClose }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hovered, setHovered] = useState(0);

  const submit = async () => {
    if (!name || !rating || !comment) return;
    setSubmitting(true);
    const url = CONFIG.REVIEWS_SCRIPT_URL;
    if (url && !url.includes('YOUR_GOOGLE')) {
      try {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            action: 'submitReview',
            productId: product.id,
            productName: product.name,
            name, rating, comment,
          }),
        });
      } catch (e) {}
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-head">
          <div className="modal-title">Review — {product.name}</div>
          <button className="close-btn" onClick={onClose}><i className="ti ti-x" /></button>
        </div>
        <div className="modal-body">
          {submitted ? (
            <div className="success-state" style={{ padding: '1.5rem 0' }}>
              <div className="success-icon" style={{ fontSize: 40 }}><i className="ti ti-circle-check" /></div>
              <div className="success-title" style={{ fontSize: 24 }}>Thanks!</div>
              <p className="success-text">Your review has been submitted and will appear once approved.</p>
              <button className="primary-btn" onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              <div className="form-field">
                <label className="form-label">Your Name</label>
                <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="John S." />
              </div>
              <div className="form-field">
                <label className="form-label">Rating</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      className={`star-pick${n <= (hovered || rating) ? ' active' : ''}`}
                      onMouseEnter={() => setHovered(n)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(n)}
                    >★</button>
                  ))}
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Review</label>
                <textarea
                  className="form-input"
                  rows={4}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share your experience with this compound..."
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button
                className="primary-btn"
                disabled={!name || !rating || !comment || submitting}
                onClick={submit}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <p style={{ fontSize: 11, color: 'var(--gray-400)', textAlign: 'center', marginTop: 8 }}>
                Reviews are moderated before appearing publicly.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('shop');
  const [cart, setCart] = useState(() => {
    try { const c = localStorage.getItem('bb_cart'); return c ? JSON.parse(c) : []; } catch { return []; }
  });
  const [selVariants, setSelVariants] = useState(() => {
    try { const v = localStorage.getItem('bb_variants'); return v ? JSON.parse(v) : {}; } catch { return {}; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutExpress, setCheckoutExpress] = useState(false);
  const [checkoutShip, setCheckoutShip] = useState({ name: '', email: '', address: '', city: '', state: '', postcode: '', country: 'Australia' });
  const [checkoutCrypto, setCheckoutCrypto] = useState('USDT (ERC-20)');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loyaltySub, setLoyaltySub] = useState(null);
  const [loyaltyEmail, setLoyaltyEmail] = useState('');
  const [loyaltyActive, setLoyaltyActive] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const [coaProduct, setCoaProduct] = useState(null);
  const [coaEmail, setCoaEmail] = useState('');
  const [coaSent, setCoaSent] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [sending, setSending] = useState(false);
  const [inventory, setInventory] = useState({});
  const toastRef = useRef(null);

  // Fetch inventory on load
  useEffect(() => {
    const url = CONFIG.INVENTORY_SCRIPT_URL;
    if (!url || url.includes('YOUR_INVENTORY')) return;
    fetch(url)
      .then(r => r.json())
      .then(d => { if (d.success) setInventory(d.inventory); })
      .catch(() => {});
  }, []);

  const getStock = (productId, variantLabel) => {
    // Match by productId + variant label (e.g. "1_Retatrutide 10mg")
    const entries = Object.values(inventory);
    // First try exact variant match
    const exactMatch = entries.find(e => 
      e.productId === productId.toString() &&
      e.productName.toLowerCase().includes(variantLabel.toLowerCase())
    );
    if (exactMatch) return exactMatch.stock;
    // Fall back to any entry with matching productId
    const idMatch = entries.find(e => e.productId === productId.toString());
    if (idMatch) return idMatch.stock;
    return null;
  };

  // Persist cart
  useEffect(() => {
    try { localStorage.setItem('bb_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('bb_variants', JSON.stringify(selVariants)); } catch {}
  }, [selVariants]);

  const toast = useCallback((msg) => {
    setToastMsg(msg); setToastOn(true);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastOn(false), 2400);
  }, []);

  const vIdx = (pid) => selVariants[pid] ?? 0;

  const addToCart = (product) => {
    const vi = vIdx(product.id);
    const v = product.variants[vi];
    const key = `${product.id}-${vi}`;
    setCart(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, pid: product.id, name: product.name, variant: v.l, price: v.p, qty: 1, img: product.img }];
    });
    toast(`${product.name} added to cart`);
  };

  const addAddon = () => {
    const kit = PRODUCTS.find(p => p.id === 10);
    const key = 'addon-kit';
    if (cart.find(i => i.key === key)) { toast('Reconstitution Kit already in cart'); return; }
    setCart(prev => [...prev, { key, pid: 10, name: 'Reconstitution Kit', variant: 'Kit', price: 24, qty: 1, img: kit.img }]);
    toast('Reconstitution Kit added');
  };

  const updateQty = (key, d) => setCart(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(0, i.qty + d) } : i).filter(i => i.qty > 0));
  const removeItem = (key) => setCart(prev => prev.filter(i => i.key !== key));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = loyaltyActive ? +(subtotal * 0.1).toFixed(2) : 0;
  const shippingCost = checkoutExpress ? 18 : subtotal - discount >= 150 ? 0 : 12;
  const total = +(subtotal - discount + shippingCost).toFixed(2);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);

  const openCheckout = () => { setCartOpen(false); setCheckoutOpen(true); setOrderDone(false); setCheckoutStep(1); setAgreedTerms(false); };

  const buildOrderData = () => ({
    name: checkoutShip.name,
    email: checkoutShip.email,
    address: `${checkoutShip.address}, ${checkoutShip.city}, ${checkoutShip.state} ${checkoutShip.postcode}, ${checkoutShip.country}`,
    shipping: checkoutExpress ? 'Express ($18)' : 'Standard',
    items: cart.map(i => `${i.name} (${i.variant}) x${i.qty} = $${(i.price * i.qty).toFixed(2)}`).join('\n'),
    subtotal: `$${subtotal.toFixed(2)}`,
    discount: loyaltyActive ? `-$${discount}` : 'None',
    shipping_cost: shippingCost === 0 ? 'Free' : `$${shippingCost}`,
    total: `$${total.toFixed(2)} AUD`,
    payment_currency: checkoutCrypto,
    wallet_address: WALLETS[checkoutCrypto],
    loyalty_plan: loyaltyActive ? loyaltySub : 'None',
  });

  const deductStock = async (orderCart) => {
    const url = CONFIG.INVENTORY_SCRIPT_URL;
    if (!url || url.includes('YOUR_INVENTORY')) return;
    for (const item of orderCart) {
      try {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            action: 'updateStock',
            productId: item.pid,
            productName: item.variant,
            quantity: item.qty,
          }),
        });
      } catch (e) {}
    }
    // Refresh inventory
    fetch(url).then(r => r.json()).then(d => { if (d.success) setInventory(d.inventory); }).catch(() => {});
  };

  const confirmOrder = async () => {
    setSending(true);
    const orderData = buildOrderData();
    // Send order notification to research@barbellbiotech.com
    try {
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ORDER, orderData);
    } catch (e) { console.error('EmailJS order notification:', e); }
    // Send confirmation to customer
    try {
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_CUSTOMER, orderData);
    } catch (e) { console.error('EmailJS customer confirmation:', e); }
    await deductStock(cart);
    setCart([]);
    setSending(false);
    setOrderDone(true);
  };

  const submitCoa = async () => {
    if (!coaEmail.includes('@')) return;
    try {
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ORDER, {
        name: 'COA Request', email: coaEmail, address: 'N/A', shipping: 'N/A',
        items: `COA REQUEST: ${coaProduct}`, subtotal: 'N/A', discount: 'N/A',
        shipping_cost: 'N/A', total: 'N/A', payment_currency: 'N/A',
        wallet_address: 'N/A', loyalty_plan: 'N/A',
      });
    } catch (e) {}
    setCoaSent(true);
    toast('COA request sent');
  };

  const badgeEl = (b) => {
    if (!b) return null;
    const cls = b === 'NEW' ? 'badge badge-new' : b === 'POPULAR' ? 'badge badge-popular' : b === 'BUNDLE' ? 'badge badge-bundle' : 'badge badge-add-on';
    return <span className={cls}>{b}</span>;
  };

  const stepDot = (n) => {
    const cls = checkoutStep > n ? 'step-dot done' : checkoutStep === n ? 'step-dot active' : 'step-dot';
    return <div className={cls}>{checkoutStep > n ? <i className="ti ti-check" style={{ fontSize: 12 }} /> : n}</div>;
  };

  const isBankTransfer = checkoutCrypto === BANK_KEY;

  return (
    <>
      <style>{css}</style>

      <AnnouncementBanner />

      {/* NAV */}
      <nav className="nav">
        <button className="nav-logo" onClick={() => setPage('shop')}>Barbell<span>.</span>Biotech</button>
        <div className="nav-links">
          {[['shop','Shop'],['loyalty','Loyalty'],['info','Info'],['terms','Terms']].map(([p,l]) => (
            <button key={p} className={`nav-link${page===p?' active':''}`} onClick={() => setPage(p)}>{l}</button>
          ))}
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <i className="ti ti-shopping-bag" />
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <div style={{background:"var(--dark-2)",borderBottom:"1px solid var(--dark-3)",padding:"10px 2.5rem",display:"flex",gap:"2rem",justifyContent:"center",flexWrap:"wrap"}}>
        {["✓ Australian Stock","✓ Same Day Dispatch","✓ ≥99% Purity","✓ COA Every Batch","✓ Discreet Packaging"].map(t => (
          <span key={t} style={{fontSize:11,color:"rgba(255,255,255,.45)",fontWeight:500,letterSpacing:".06em"}}>{t}</span>
        ))}
      </div>
      <div className="research-bar">All products are strictly for laboratory and in-vitro research use only. Not for human consumption.</div>

      {/* SHOP */}
      {page === 'shop' && (
        <>
          <div className="hero">
            <img src={img_hero} alt="Barbell Biotech" className="hero-bg" />
            <div className="hero-overlay" />
            <div className="hero-inner">
              <div className="hero-tag"><i className="ti ti-flask-2" /> Research-Grade Compounds · Australia</div>
              <h1>Premium Research<br /><em>Peptides.</em></h1>
              <p className="hero-sub">High-purity research compounds for the serious researcher. Every batch independently tested. COAs available on every compound.</p>
              <div className="hero-pills">
                {['99%+ Purity','Third-Party Tested','COA Available','Free Ship $150+','Crypto Payment','Express Available'].map(p => (
                  <span key={p} className="pill">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="marquee-strip">
            <div className="marquee-track">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{display:'inline-flex',alignItems:'center'}}>
                  {[
                    { icon: 'ti-flask-2', text: 'Third-Party HPLC Tested' },
                    { icon: 'ti-certificate', text: 'COA Available Every Batch' },
                    { icon: 'ti-truck-delivery', text: 'Free Shipping Over $150' },
                    { icon: 'ti-bolt', text: 'Same Business Day Dispatch' },
                    { icon: 'ti-shield-check', text: '≥99% Purity Guaranteed' },
                    { icon: 'ti-currency-bitcoin', text: 'Crypto & Bank Transfer' },
                    { icon: 'ti-package', text: 'Discreet Packaging' },
                    { icon: 'ti-star', text: 'Australian Stock' },
                  ].map((item, i) => (
                    <span key={i} style={{display:'inline-flex',alignItems:'center'}}>
                      <span className="marquee-item">
                        <i className={`ti ${item.icon}`} />
                        {item.text}
                      </span>
                      <span className="marquee-sep">·</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-title">Compounds</div>
              <span className="section-count">{filtered.length} items</span>
            </div>
            <div className="filter-row">
              {CATEGORIES.map(c => (
                <button key={c} className={`filter-btn${activeFilter===c?' active':''}`} onClick={() => setActiveFilter(c)}>{c}</button>
              ))}
            </div>
            <div className="products-grid">
              {filtered.map(product => {
                const vi = vIdx(product.id);
                const v = product.variants[vi];
                return (
                  <div className="product-card" key={product.id}>
                    <img className="product-img" src={product.img} alt={product.name} loading="lazy" />
                    <div>
                      <div className="product-cat">{product.cat}</div>
                      {(() => {
                        const vi = vIdx(product.id);
                        const variantLabel = product.variants[vi].l;
                        const stock = getStock(product.id, variantLabel);
                        if (stock === null) return <div className="in-stock">In Stock</div>;
                        if (stock === 0) return <div style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:500,color:'#ef4444'}}>● Out of Stock</div>;
                        if (stock < 10) return <div style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:500,color:'#f59e0b'}}>● Only {stock} left</div>;
                        return <div className="in-stock">In Stock</div>;
                      })()}
                      {badgeEl(product.badge)}
                      <div className="product-name">{product.name}</div>
                    </div>
                    <p className="product-desc">{product.desc}</p>
                    {product.variants.length > 1 && (
                      <div className="variant-row">
                        {product.variants.map((vv, i) => (
                          <button key={i} className={`variant-btn${vi===i?' sel':''}`}
                            onClick={() => setSelVariants(prev => ({ ...prev, [product.id]: i }))}>{vv.l}</button>
                        ))}
                      </div>
                    )}
                    <div className="price-row">
                      <div>
                        <div className="price">${v.p}</div>
                        <div className="price-sub">AUD · {v.l}</div>
                      </div>
                    </div>
                    {(() => {
                        const vi = vIdx(product.id);
                        const variantLabel = product.variants[vi].l;
                        const stock = getStock(product.id, variantLabel);
                        const outOfStock = stock !== null && stock === 0;
                        return (
                          <button className="add-btn" onClick={() => addToCart(product)} disabled={outOfStock} style={outOfStock ? {background:'var(--gray-200)',color:'var(--gray-400)',cursor:'default'} : {}}>
                            <i className="ti ti-shopping-cart-plus" /> {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                          </button>
                        );
                      })()}
                    {!product.isAncillary && (
                      <button className="addon-btn" onClick={addAddon}>
                        <i className="ti ti-plus" /> Add Reconstitution Kit (+$24)
                      </button>
                    )}
                    <button className="coa-btn" onClick={() => { setCoaProduct(product.name); setCoaSent(false); setCoaEmail(''); }}>
                      Request COA
                    </button>
                    <ProductReviews product={product} onWriteReview={setReviewProduct} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* LOYALTY */}
      {page === 'loyalty' && (
        <div className="loyalty-wrap" style={{ minHeight: '80vh' }}>
          <div className="loyalty-inner">
            <div className="loyalty-head">
              <div className="loyalty-icon"><i className="ti ti-repeat" /></div>
              <div className="loyalty-h1">Subscription<br /><span>Discount</span></div>
            </div>
            <p className="loyalty-desc">Sign up to a recurring subscription and receive 10% off every order, applied automatically at checkout. No lock-in. Cancel any time via email.</p>
            {!loyaltyActive ? (
              <>
                <div className="step-label">Choose frequency</div>
                <div className="loyalty-opts">
                  {[['Fortnightly','Order every 2 weeks.'],['Monthly','Order once a month.']].map(([l,d]) => (
                    <div key={l} className={`loyalty-opt${loyaltySub===l?' sel':''}`} onClick={() => setLoyaltySub(l)}>
                      <div className="loyalty-opt-title">{l}</div>
                      <div className="loyalty-opt-desc">{d}</div>
                    </div>
                  ))}
                </div>
                <div className="step-label">Your email</div>
                <div className="loyalty-form">
                  <input className="loyalty-input" type="email" placeholder="research@email.com"
                    value={loyaltyEmail} onChange={e => setLoyaltyEmail(e.target.value)} />
                  <button className="loyalty-submit"
                    disabled={!loyaltySub || !loyaltyEmail.includes('@')}
                    onClick={() => { setLoyaltyActive(true); toast('Subscribed — 10% discount active'); }}>
                    Subscribe
                  </button>
                </div>
              </>
            ) : (
              <div className="loyalty-success" style={{ marginBottom: '1.5rem' }}>
                <i className="ti ti-circle-check" style={{ fontSize: 20 }} />
                Subscribed on <strong style={{ margin: '0 4px' }}>{loyaltySub}</strong> plan — 10% discount is active.
              </div>
            )}
            {[
              ['10% off every order','Applied automatically at checkout.'],
              ['Priority dispatch','Your orders are queued first.'],
              ['Early access to new batches','First to know when new compounds land.'],
              ['No lock-in','Cancel any time. Just email us.'],
            ].map(([t, d]) => (
              <div className="perk" key={t}>
                <span className="perk-check"><i className="ti ti-check" /></span>
                <div className="perk-text"><strong>{t}</strong> — {d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INFO */}
      {page === 'info' && (
        <div className="page-inner">
          <div className="page-title">Information</div>
          {[
            ['Research Use Only', 'All compounds sold by Barbell Biotech are intended strictly for laboratory and in-vitro research purposes. Products are not approved for human or veterinary use, diagnosis, or treatment. By purchasing, you confirm products will be used solely for legitimate research in accordance with all applicable laws and regulations.'],
            ['COA & Testing', 'Every batch is independently tested via HPLC analysis to verify purity and composition. Certificates of Analysis are available upon request for any compound. Use the Request COA button on any product, or email us with your order reference and the compound name.'],
            ['Payment', 'All prices are in Australian Dollars (AUD). Accepted payment methods: USDT (ERC-20), Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Bank Transfer (AUD). Payment details are provided at checkout. Orders are dispatched once payment is confirmed.'],
            ['Shipping', 'Standard shipping is free on orders over $150 AUD. Express shipping ($18) is available at checkout. All orders ship in plain, discreet packaging with tracking. Domestic: 2–5 business days standard, 1–2 days express.'],
            ['Storage', 'Lyophilised peptide compounds should be stored at −20°C for long-term stability, or at 4°C once reconstituted. BAC water should be stored at room temperature, away from direct light.'],
            ['Contact', `For COA requests, order enquiries, or any other questions: ${CONFIG.CONTACT_EMAIL}. We aim to respond within 24 hours (AEST).`],
          ].map(([h, p]) => (
            <div className="info-section" key={h}>
              <div className="info-h2">{h}</div>
              <p className="info-p">{p}</p>
            </div>
          ))}
        </div>
      )}

      {/* TERMS */}
      {page === 'terms' && (
        <div className="page-inner">
          <div className="page-title">Terms & Conditions</div>
          {[
            ['1. Research Use Only', 'All products sold by Barbell Biotech are intended strictly for laboratory, in-vitro, and scientific research purposes only. Not for human consumption, veterinary use, or clinical application. By completing a purchase, you confirm you are 18+, a qualified researcher, and will comply with all applicable laws.'],
            ['2. Orders & Payment', 'All prices are in AUD. Payment accepted via cryptocurrency or bank transfer. Orders are not confirmed until payment is verified. For bank transfers, use your name only as the reference — do not include product names. Barbell Biotech reserves the right to cancel any order at its discretion.'],
            ['3. Shipping & Delivery', 'Standard shipping is free on orders over $150 AUD. Express available at checkout. Estimated delivery times are not guaranteed. Risk of loss passes to the customer upon dispatch.'],
            ['4. Refunds & Returns', 'All sales are final. Refunds or replacements will only be considered where a product is demonstrably defective, raised within 7 days of delivery by emailing research@barbellbiotech.com.'],
            ['5. Subscription (Loyalty) Program', 'Subscribers receive 10% off all orders while the subscription is active. Cancel any time by emailing research@barbellbiotech.com.'],
            ['6. Limitation of Liability', 'To the maximum extent permitted by law, Barbell Biotech excludes all liability for any direct, indirect, incidental, or consequential loss arising from use of our products or website.'],
            ['7. Governing Law', 'These terms are governed by the laws of Queensland, Australia.'],
          ].map(([h, p]) => (
            <div className="info-section" key={h}>
              <div className="info-h2">{h}</div>
              <p className="info-p">{p}</p>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <div className="footer-brand">Barbell<span>.</span>Biotech</div>
          <div className="footer-email">{CONFIG.CONTACT_EMAIL}</div>
        </div>
        <div className="footer-legal">All products are for research purposes only and not for human consumption. Products have not been evaluated by the TGA. Customers are responsible for compliance with all applicable local laws. © 2026 Barbell Biotech.</div>
        <div className="footer-links">
          {[['shop','Shop'],['loyalty','Loyalty'],['info','Info'],['terms','Terms']].map(([p,l]) => (
            <button key={p} className="footer-link" onClick={() => setPage(p)}>{l}</button>
          ))}
        </div>
      </footer>

      {/* CART DRAWER */}
      <div className={`overlay${cartOpen?' open':''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer${cartOpen?' open':''}`}>
        <div className="drawer-head">
          <div className="drawer-title">Cart {cartCount > 0 && `(${cartCount})`}</div>
          <button className="close-btn" onClick={() => setCartOpen(false)}><i className="ti ti-x" /></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon"><i className="ti ti-shopping-bag" /></div>
              <div className="empty-text">Your cart is empty</div>
            </div>
          ) : cart.map(item => (
            <div className="cart-item" key={item.key}>
              <img className="cart-item-img" src={item.img} alt={item.name} />
              <div className="cart-item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-var">{item.variant}</div>
                <div className="qty-row">
                  <button className="qty-btn" onClick={() => updateQty(item.key, -1)}>−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.key, 1)}>+</button>
                </div>
                <button className="rm-btn" onClick={() => removeItem(item.key)}>Remove</button>
              </div>
              <div className="item-price">${(item.price * item.qty).toFixed(0)}</div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="total-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          {loyaltyActive && <div className="total-row disc"><span>Loyalty 10% off</span><span>−${discount.toFixed(2)}</span></div>}
          <div className="total-row"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span></div>
          <div className="total-row main"><span>Total</span><span>${total.toFixed(2)} AUD</span></div>
          <button className="checkout-btn" disabled={cart.length === 0} onClick={openCheckout}>Proceed to Checkout</button>
          <div className={`ship-note${subtotal >= 150 ? ' free' : ''}`}>
            {subtotal >= 150 ? '✓ Free standard shipping applied' : `Add $${(150 - subtotal).toFixed(0)} more for free shipping`}
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget && !orderDone) setCheckoutOpen(false); }}>
          <div className="modal">
            <div className="modal-head">
              <div className="modal-title">{orderDone ? 'Order Placed' : `Checkout`}</div>
              {!orderDone && <button className="close-btn" onClick={() => setCheckoutOpen(false)}><i className="ti ti-x" /></button>}
            </div>
            <div className="modal-body">
              {orderDone ? (
                <div className="success-state">
                  <div className="success-icon"><i className="ti ti-circle-check" /></div>
                  <div className="success-title">Order Received</div>
                  <p className="success-text">We've received your order. Once payment is confirmed your order will be dispatched. A confirmation has been sent to <strong>{checkoutShip.email}</strong>.</p>
                  <button className="primary-btn" onClick={() => { setCheckoutOpen(false); setOrderDone(false); }}>Close</button>
                </div>
              ) : (
                <>
                  <div className="steps">
                    {stepDot(1)}<div className={`step-line${checkoutStep>1?' done':''}`} />
                    {stepDot(2)}<div className={`step-line${checkoutStep>2?' done':''}`} />
                    {stepDot(3)}
                  </div>

                  {checkoutStep === 1 && (
                    <>
                      <div className="step-label">Order Summary</div>
                      <div className="order-box">
                        {cart.map(i => (
                          <div className="order-row" key={i.key}>
                            <span>{i.name} ({i.variant}) ×{i.qty}</span>
                            <span>${(i.price * i.qty).toFixed(2)}</span>
                          </div>
                        ))}
                        {loyaltyActive && <div className="order-row" style={{ color: 'var(--green)' }}><span>Loyalty discount</span><span>−${discount.toFixed(2)}</span></div>}
                        <div className="order-total"><span>Subtotal</span><span>${(subtotal - discount).toFixed(2)}</span></div>
                      </div>
                      <div className="step-label">Shipping Method</div>
                      <div className="ship-opts">
                        {[false, true].map(express => (
                          <div key={String(express)} className={`ship-opt${checkoutExpress===express?' sel':''}`} onClick={() => setCheckoutExpress(express)}>
                            <div className="ship-opt-title">{express ? 'Express' : 'Standard'}</div>
                            <div className="ship-opt-price">{express ? '$18' : subtotal - discount >= 150 ? 'Free' : '$12'}</div>
                            <div className="ship-opt-days">{express ? '1–2 business days' : '2–5 business days'}</div>
                          </div>
                        ))}
                      </div>
                      <div className="order-box" style={{ marginBottom: '1.5rem' }}>
                        <div className="order-row"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span></div>
                        <div className="order-total"><span>Total</span><span>${total.toFixed(2)} AUD</span></div>
                      </div>
                      <button className="primary-btn" onClick={() => setCheckoutStep(2)}>Continue <i className="ti ti-arrow-right" /></button>
                    </>
                  )}

                  {checkoutStep === 2 && (
                    <>
                      <div className="step-label">Shipping Details</div>
                      <div className="form-field"><label className="form-label">Full Name</label><input className="form-input" value={checkoutShip.name} onChange={e => setCheckoutShip(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" /></div>
                      <div className="form-field"><label className="form-label">Email Address</label><input className="form-input" type="email" value={checkoutShip.email} onChange={e => setCheckoutShip(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" /></div>
                      <div className="form-field"><label className="form-label">Street Address</label><input className="form-input" value={checkoutShip.address} onChange={e => setCheckoutShip(p => ({ ...p, address: e.target.value }))} placeholder="123 Example Street" /></div>
                      <div className="form-row">
                        <div className="form-field"><label className="form-label">City / Suburb</label><input className="form-input" value={checkoutShip.city} onChange={e => setCheckoutShip(p => ({ ...p, city: e.target.value }))} placeholder="Townsville" /></div>
                        <div className="form-field"><label className="form-label">State</label><input className="form-input" value={checkoutShip.state} onChange={e => setCheckoutShip(p => ({ ...p, state: e.target.value }))} placeholder="QLD" /></div>
                      </div>
                      <div className="form-row">
                        <div className="form-field"><label className="form-label">Postcode</label><input className="form-input" value={checkoutShip.postcode} onChange={e => setCheckoutShip(p => ({ ...p, postcode: e.target.value }))} placeholder="4810" /></div>
                        <div className="form-field"><label className="form-label">Country</label><input className="form-input" value={checkoutShip.country} onChange={e => setCheckoutShip(p => ({ ...p, country: e.target.value }))} /></div>
                      </div>
                      <div className="form-check">
                        <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} />
                        <span>I confirm all products will be used for research purposes only and I agree to the <button style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontSize: 11, textDecoration: 'underline', padding: 0 }} onClick={() => { setCheckoutOpen(false); setPage('terms'); }}>Terms & Conditions</button>.</span>
                      </div>
                      <button className="primary-btn" disabled={!checkoutShip.name || !checkoutShip.email || !checkoutShip.address || !checkoutShip.city || !agreedTerms} onClick={() => setCheckoutStep(3)}>Continue <i className="ti ti-arrow-right" /></button>
                    </>
                  )}

                  {checkoutStep === 3 && (
                    <>
                      <div className="step-label">Payment Method</div>
                      <div className="crypto-grid">
                        {Object.keys(WALLETS).map(c => (
                          <button key={c} className={`crypto-opt${checkoutCrypto===c?' sel':''}`} onClick={() => setCheckoutCrypto(c)}>{c}</button>
                        ))}
                      </div>
                      {isBankTransfer ? (
                        <div className="address-box">
                          <div className="address-label">Bank Transfer Details</div>
                          <div className="address-val" style={{ fontFamily: 'inherit', fontSize: 14, lineHeight: 2 }}>
                            <strong>BSB:</strong> {BANK_BSB}<br />
                            <strong>Account:</strong> {BANK_ACCOUNT}<br />
                            <strong>Amount:</strong> ${total.toFixed(2)} AUD
                          </div>
                          <div className="bank-warning">
                            <strong>⚠️ READ CAREFULLY!</strong>
                            <strong>DO NOT</strong> include peptide names, product names, or any product descriptions in your transfer reference. Use your <strong>name only</strong>.<br /><br />
                            Failure to follow these instructions will result in loss of order. <strong>Funds will not be refunded.</strong>
                          </div>
                          <button className="copy-btn" onClick={() => { navigator.clipboard?.writeText(BANK_ACCOUNT); toast('Account number copied'); }}>
                            <i className="ti ti-copy" /> Copy Account Number
                          </button>
                        </div>
                      ) : (
                        <div className="address-box">
                          <div className="address-label">Send {checkoutCrypto} to:</div>
                          <div className="address-val">{WALLETS[checkoutCrypto]}</div>
                          <button className="copy-btn" onClick={() => { navigator.clipboard?.writeText(WALLETS[checkoutCrypto]); toast('Address copied'); }}>
                            <i className="ti ti-copy" /> Copy Address
                          </button>
                        </div>
                      )}
                      <div className="order-box" style={{ marginBottom: '1.5rem' }}>
                        <div className="order-row"><span>Total</span><span><strong style={{ color: 'var(--gray-900)' }}>${total.toFixed(2)} AUD</strong></span></div>
                        <div className="order-row"><span>Payment</span><span>{checkoutCrypto}</span></div>
                        <div className="order-row"><span>Shipping to</span><span>{checkoutShip.city}, {checkoutShip.state}</span></div>
                      </div>
                      <button className="primary-btn" disabled={sending} onClick={confirmOrder}>
                        {sending ? 'Submitting...' : isBankTransfer ? 'I Have Made the Transfer — Confirm Order' : 'I Have Sent Payment — Confirm Order'}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COA MODAL */}
      {coaProduct && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setCoaProduct(null); setCoaSent(false); }}}>
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-head">
              <div className="modal-title">Request COA</div>
              <button className="close-btn" onClick={() => { setCoaProduct(null); setCoaSent(false); }}><i className="ti ti-x" /></button>
            </div>
            <div className="modal-body">
              {coaSent ? (
                <div className="success-state" style={{ padding: '1.5rem 0' }}>
                  <div className="success-icon" style={{ fontSize: 36 }}><i className="ti ti-circle-check" /></div>
                  <div className="success-title" style={{ fontSize: 24 }}>Request Sent</div>
                  <p className="success-text">We'll email the COA for <strong>{coaProduct}</strong> shortly.</p>
                  <button className="primary-btn" onClick={() => { setCoaProduct(null); setCoaSent(false); }}>Close</button>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
                    Request the Certificate of Analysis for <strong style={{ color: 'var(--gray-900)' }}>{coaProduct}</strong>.
                  </p>
                  <div className="form-field">
                    <label className="form-label">Your Email</label>
                    <input className="form-input" type="email" value={coaEmail} onChange={e => setCoaEmail(e.target.value)} placeholder="research@email.com" />
                  </div>
                  <button className="primary-btn" disabled={!coaEmail.includes('@')} onClick={submitCoa}>Send COA Request</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REVIEW MODAL */}
      {reviewProduct && <ReviewModal product={reviewProduct} onClose={() => setReviewProduct(null)} />}

      <div className={`toast${toastOn?' show':''}`}>{toastMsg}</div>
    </>
  );
}
