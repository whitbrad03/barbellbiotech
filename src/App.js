import { useState, useRef } from "react";
import { useForm } from "@formspree/react";

// ─── CONFIGURATION — EDIT THESE ───────────────────────────────────────────────
const CONFIG = {
  FORMSPREE_ID:      "mrednaab",
  WALLET_BTC:        "bc1q2jz2y4krrk2g8p38ede5rs5eqyt4lnlsx8wjf0",
  WALLET_ETH:        "0x0107935Cca80E523E4Eb943d4a271D2F3e4d451D",
  WALLET_USDT_ERC20: "0x0107935Cca80E523E4Eb943d4a271D2F3e4d451D",
  WALLET_SOL:        "AKuAqtFBKqRwe1pgLn4dYUVZJFbW9UbKRAR8vW42N8aa",
  CONTACT_EMAIL:     "research@barbellbiotech.com",
  CONTACT_EMAIL: "research@barbellbiotech.com",

};
// ──────────────────────────────────────────────────────────────────────────────

const CRYPTO_OPTIONS = [
  { label: "USDT (ERC-20)", address: CONFIG.WALLET_USDT_ERC20 },
  { label: "Bitcoin (BTC)", address: CONFIG.WALLET_BTC },
  { label: "Ethereum (ETH)", address: CONFIG.WALLET_ETH },
  { label: "Solana (SOL)",   address: CONFIG.WALLET_SOL },
];

const products = [
  { id: 1, name: "Retatrutide", category: "GLP / Metabolic", badge: "NEW",
    variants: [{ label: "10mg", price: 89 }, { label: "20mg", price: 159 }],
    description: "Tri-agonist research compound targeting GLP-1, GIP, and glucagon receptors. Lyophilised, >98% purity. COA available." },
  { id: 2, name: "CJC-1295 No DAC", category: "Growth Hormone", badge: null,
    variants: [{ label: "2mg", price: 42 }],
    description: "GHRH analogue without Drug Affinity Complex. Lyophilised, >98% purity. COA available." },
  { id: 3, name: "BPC-157", category: "Repair & Recovery", badge: "POPULAR",
    variants: [{ label: "10mg", price: 55 }],
    description: "Pentadecapeptide derived from human gastric juice protein. Research-grade. COA available." },
  { id: 4, name: "TB-500", category: "Repair & Recovery", badge: null,
    variants: [{ label: "10mg", price: 59 }],
    description: "Synthetic analogue of Thymosin Beta-4. Lyophilised powder, >98% purity. COA available." },
  { id: 5, name: "Wolverine Stack", category: "Stacks", badge: "BUNDLE",
    variants: [{ label: "BPC-157 10mg + TB-500 10mg", price: 99 }],
    description: "Combined BPC-157 and TB-500 research bundle. Both compounds independently tested. COAs available." },
  { id: 6, name: "Ipamorelin", category: "Growth Hormone", badge: null,
    variants: [{ label: "10mg", price: 48 }],
    description: "Selective GH secretagogue peptide. Lyophilised, high purity. COA available." },
  { id: 7, name: "GHK-Cu", category: "Repair & Recovery", badge: null,
    variants: [{ label: "50mg", price: 65 }, { label: "100mg", price: 110 }],
    description: "Copper peptide complex. Research applications in cellular biology. COA available." },
  { id: 8, name: "MOTS-C", category: "Metabolic", badge: null,
    variants: [{ label: "10mg", price: 72 }],
    description: "Mitochondria-derived peptide. Emerging research compound. Third-party tested. COA available." },
  { id: 9, name: "BAC Water", category: "Ancillaries", badge: null,
    variants: [{ label: "3ml", price: 8 }, { label: "10ml", price: 14 }],
    description: "Bacteriostatic water for research reconstitution. Sterile, 0.9% benzyl alcohol preserved." },
];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#f9fafb;color:#111827;}
a{color:inherit;text-decoration:none;}
.root{min-height:100vh;background:#f9fafb;color:#111827;}

/* NAV */
.nav{position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid #e5e7eb;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.nav-logo{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;letter-spacing:-.02em;color:#111827;cursor:pointer;user-select:none;}
.nav-logo span{color:#16a34a;}
.nav-links{display:flex;gap:1.5rem;align-items:center;}
.nav-link{background:none;border:none;color:#6b7280;font-size:14px;font-family:'Inter',sans-serif;font-weight:500;cursor:pointer;transition:color .15s;padding:4px 0;}
.nav-link:hover,.nav-link.active{color:#111827;}
.cart-btn{background:#16a34a;border:none;color:#fff;padding:9px 18px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;letter-spacing:-.01em;cursor:pointer;display:flex;align-items:center;gap:8px;border-radius:8px;transition:background .15s;}
.cart-btn:hover{background:#15803d;}
.cart-count{background:#fff;color:#16a34a;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;}

/* TRUST BAR */
.disc-bar{background:#16a34a;padding:10px 2rem;font-family:'Inter',monospace;font-size:12px;color:rgba(255,255,255,.9);letter-spacing:.02em;text-align:center;line-height:1.6;}
.disc-bar strong{color:#fff;font-weight:600;}

/* HERO */
.hero{background:#fff;border-bottom:1px solid #e5e7eb;padding:5rem 2rem 4rem;position:relative;overflow:hidden;}
.hero-grid{display:none;}
.hero-tag{font-family:'Inter',sans-serif;font-size:12px;font-weight:600;letter-spacing:.08em;color:#16a34a;text-transform:uppercase;margin-bottom:1rem;display:flex;align-items:center;gap:8px;background:#f0fdf4;border:1px solid #bbf7d0;padding:5px 12px;border-radius:20px;width:fit-content;}
.hero-tag::before{display:none;}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(40px,5vw,68px);line-height:1.05;color:#111827;margin-bottom:1.25rem;font-weight:800;letter-spacing:-.03em;}
.hero h1 em{color:#16a34a;font-style:normal;}
.hero-sub{font-size:15px;color:#6b7280;max-width:520px;line-height:1.75;font-family:'Inter',sans-serif;}
.hero-pills{display:flex;gap:10px;margin-top:2rem;flex-wrap:wrap;}
.pill{background:#f9fafb;border:1px solid #e5e7eb;padding:6px 14px;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#374151;border-radius:20px;}

/* TRUST TILES */
.info-strip{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0;background:#f3f4f6;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;}
.info-tile{background:#fff;padding:1.5rem 2rem;border-right:1px solid #e5e7eb;}
.info-tile:last-child{border-right:none;}
.info-icon{font-size:22px;margin-bottom:8px;color:#16a34a;}
.info-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#111827;letter-spacing:-.01em;}
.info-text{font-family:'Inter',sans-serif;font-size:12px;color:#6b7280;line-height:1.6;margin-top:4px;}

/* SECTION */
.section{padding:3rem 2rem;max-width:1200px;margin:0 auto;}
.section-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1.5rem;}
.section-title{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;letter-spacing:-.02em;color:#111827;}
.filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:2rem;}
.filter-btn{background:#fff;border:1px solid #e5e7eb;color:#6b7280;padding:7px 16px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;border-radius:20px;transition:all .15s;}
.filter-btn:hover{border-color:#16a34a;color:#16a34a;}
.filter-btn.active{border-color:#16a34a;color:#16a34a;background:#f0fdf4;}

/* PRODUCT CARDS */
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;}
.product-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:1.25rem;display:flex;flex-direction:column;gap:10px;transition:box-shadow .15s,border-color .15s;}
.product-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);border-color:#d1d5db;}
.product-cat{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;color:#9ca3af;text-transform:uppercase;}
.product-name{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#111827;line-height:1.1;letter-spacing:-.02em;}
.product-desc{font-size:12px;color:#6b7280;line-height:1.65;flex:1;}
.badge{display:inline-block;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:.04em;padding:3px 10px;margin-bottom:2px;border-radius:20px;}
.badge-new{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;}
.badge-popular{background:#fff7ed;color:#ea580c;border:1px solid #fed7aa;}
.badge-bundle{background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;}
.in-stock{display:inline-flex;align-items:center;gap:4px;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;color:#16a34a;}
.in-stock::before{content:'';width:6px;height:6px;background:#16a34a;border-radius:50%;flex-shrink:0;}
.variant-row{display:flex;gap:6px;flex-wrap:wrap;}
.variant-btn{background:#f9fafb;border:1px solid #e5e7eb;padding:5px 12px;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#374151;cursor:pointer;border-radius:6px;transition:all .15s;}
.variant-btn:hover,.variant-btn.sel{border-color:#16a34a;color:#16a34a;background:#f0fdf4;}
.price-row{display:flex;align-items:flex-end;justify-content:space-between;margin-top:2px;}
.price{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:#111827;letter-spacing:-.02em;}
.price-sub{font-family:'Inter',sans-serif;font-size:11px;color:#9ca3af;}
.add-btn{background:#16a34a;color:#fff;border:none;padding:11px 20px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;cursor:pointer;border-radius:8px;transition:background .15s;width:100%;}
.add-btn:hover{background:#15803d;}
.coa-link{font-family:'Inter',sans-serif;font-size:11px;color:#6b7280;text-align:center;cursor:pointer;text-decoration:underline;background:none;border:none;width:100%;}
.coa-link:hover{color:#16a34a;}

/* LOYALTY */
.loyalty-section{background:#fff;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;padding:4rem 2rem;}
.loyalty-inner{max-width:820px;margin:0 auto;}
.loyalty-head{display:flex;align-items:flex-start;gap:1.5rem;margin-bottom:2rem;}
.loyalty-icon{font-size:40px;color:#16a34a;flex-shrink:0;}
.loyalty-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:2rem 0;}
.loyalty-opt{background:#f9fafb;border:2px solid #e5e7eb;padding:1.25rem;cursor:pointer;border-radius:10px;transition:border-color .15s;}
.loyalty-opt:hover{border-color:#16a34a;}
.loyalty-opt.sel{border-color:#16a34a;background:#f0fdf4;}
.loyalty-opt-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#111827;margin-bottom:4px;}
.loyalty-opt-desc{font-family:'Inter',sans-serif;font-size:12px;color:#6b7280;}
.loyalty-form{display:flex;gap:8px;margin-bottom:1.5rem;}
.loyalty-input{flex:1;background:#fff;border:1px solid #d1d5db;padding:10px 14px;font-family:'Inter',sans-serif;font-size:13px;color:#111827;outline:none;border-radius:8px;}
.loyalty-input:focus{border-color:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.1);}
.loyalty-submit{background:#16a34a;color:#fff;border:none;padding:10px 20px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;cursor:pointer;border-radius:8px;transition:background .15s;white-space:nowrap;}
.loyalty-submit:hover{background:#15803d;}
.loyalty-submit:disabled{background:#d1d5db;color:#9ca3af;cursor:default;}
.perk{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid #f3f4f6;}
.perk-check{color:#16a34a;font-size:16px;flex-shrink:0;margin-top:1px;}
.perk-text{font-family:'Inter',sans-serif;font-size:13px;color:#6b7280;line-height:1.5;}
.perk-text strong{color:#111827;}
.success-strip{background:#f0fdf4;border:1px solid #bbf7d0;padding:1rem 1.25rem;font-family:'Inter',sans-serif;font-size:13px;color:#15803d;display:flex;align-items:center;gap:10px;border-radius:8px;}

/* CART DRAWER */
.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:199;display:none;}
.cart-overlay.open{display:block;}
.cart-drawer{position:fixed;right:0;top:0;bottom:0;width:420px;max-width:95vw;background:#fff;border-left:1px solid #e5e7eb;z-index:200;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;box-shadow:-4px 0 24px rgba(0,0,0,.08);}
.cart-drawer.open{transform:translateX(0);}
.cart-head{padding:1.25rem 1.5rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;}
.cart-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#111827;letter-spacing:-.02em;}
.close-btn{background:none;border:none;color:#9ca3af;cursor:pointer;font-size:20px;display:flex;align-items:center;border-radius:6px;padding:4px;transition:background .15s;}
.close-btn:hover{background:#f3f4f6;color:#374151;}
.cart-items{flex:1;overflow-y:auto;padding:1rem 1.5rem;}
.cart-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #f3f4f6;}
.cart-item-info{flex:1;}
.item-name{font-size:14px;font-weight:600;color:#111827;}
.item-var{font-family:'Inter',sans-serif;font-size:11px;color:#9ca3af;margin-top:2px;}
.item-price{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#111827;letter-spacing:-.02em;}
.qty-controls{display:flex;align-items:center;gap:8px;margin-top:8px;}
.qty-btn{background:#f3f4f6;border:none;color:#374151;width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;border-radius:6px;transition:background .15s;}
.qty-btn:hover{background:#e5e7eb;}
.qty-val{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;min-width:20px;text-align:center;}
.rm-btn{background:none;border:none;color:#9ca3af;cursor:pointer;font-size:11px;margin-top:4px;font-family:'Inter',sans-serif;}
.rm-btn:hover{color:#ef4444;}
.cart-footer{padding:1.25rem 1.5rem;border-top:1px solid #f3f4f6;}
.total-row{display:flex;justify-content:space-between;font-family:'Inter',sans-serif;font-size:13px;color:#6b7280;padding:4px 0;}
.total-row.main{color:#111827;font-size:15px;font-weight:600;margin-top:8px;padding-top:10px;border-top:1px solid #e5e7eb;}
.total-row.green{color:#16a34a;}
.checkout-btn{background:#16a34a;color:#fff;border:none;padding:14px;width:100%;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border-radius:8px;transition:background .15s;margin-top:12px;}
.checkout-btn:hover{background:#15803d;}
.checkout-btn:disabled{background:#d1d5db;color:#9ca3af;cursor:default;}
.ship-note{font-family:'Inter',sans-serif;font-size:11px;color:#9ca3af;text-align:center;margin-top:8px;}
.ship-note.free{color:#16a34a;font-weight:500;}
.empty-cart{text-align:center;padding:3rem 1rem;}
.empty-icon{font-size:40px;color:#d1d5db;margin-bottom:1rem;}
.empty-text{font-family:'Inter',sans-serif;font-size:13px;color:#9ca3af;}

/* MODALS */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal{background:#fff;border:1px solid #e5e7eb;border-radius:16px;width:100%;max-width:580px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.15);}
.modal-head{padding:1.25rem 1.5rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:1;border-radius:16px 16px 0 0;}
.modal-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#111827;letter-spacing:-.02em;}
.modal-body{padding:1.5rem;}
.step-label{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;color:#16a34a;text-transform:uppercase;margin-bottom:8px;}
.order-summary{background:#f9fafb;border:1px solid #e5e7eb;padding:1rem;margin-bottom:1.5rem;border-radius:8px;}
.order-row{display:flex;justify-content:space-between;font-family:'Inter',sans-serif;font-size:12px;color:#6b7280;padding:3px 0;}
.order-total{display:flex;justify-content:space-between;font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#111827;margin-top:8px;padding-top:8px;border-top:1px solid #e5e7eb;letter-spacing:-.02em;}
.ship-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.5rem;}
.ship-opt{background:#f9fafb;border:2px solid #e5e7eb;padding:1rem;cursor:pointer;border-radius:10px;transition:border-color .15s;text-align:left;}
.ship-opt:hover{border-color:#16a34a;}
.ship-opt.sel{border-color:#16a34a;background:#f0fdf4;}
.ship-opt-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#111827;}
.ship-opt-price{font-family:'Inter',sans-serif;font-size:12px;color:#6b7280;margin-top:2px;}
.ship-opt-days{font-family:'Inter',sans-serif;font-size:11px;color:#9ca3af;margin-top:2px;}
.crypto-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1.5rem;}
.crypto-opt{background:#f9fafb;border:2px solid #e5e7eb;padding:10px 14px;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#374151;cursor:pointer;text-align:left;border-radius:8px;transition:all .15s;}
.crypto-opt:hover{border-color:#16a34a;color:#16a34a;}
.crypto-opt.sel{border-color:#16a34a;color:#16a34a;background:#f0fdf4;}
.address-box{background:#f9fafb;border:1px solid #e5e7eb;padding:1rem;margin-bottom:1.5rem;border-radius:8px;}
.address-label{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:.04em;margin-bottom:6px;text-transform:uppercase;}
.address-val{font-family:'Inter',monospace;font-size:12px;color:#111827;word-break:break-all;line-height:1.6;font-weight:500;}
.copy-btn{background:#fff;border:1px solid #e5e7eb;color:#374151;padding:6px 14px;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;cursor:pointer;margin-top:10px;border-radius:6px;display:inline-flex;align-items:center;gap:6px;transition:all .15s;}
.copy-btn:hover{border-color:#16a34a;color:#16a34a;}
.notice{background:#f0fdf4;border:1px solid #bbf7d0;padding:12px 14px;font-family:'Inter',sans-serif;font-size:12px;color:#374151;line-height:1.7;margin-bottom:1.5rem;border-radius:8px;}
.notice strong{color:#15803d;}
.form-field{margin-bottom:12px;}
.form-label{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;color:#374151;letter-spacing:.04em;margin-bottom:6px;display:block;text-transform:uppercase;}
.form-input{width:100%;background:#fff;border:1px solid #d1d5db;padding:10px 12px;font-family:'Inter',sans-serif;font-size:13px;color:#111827;outline:none;border-radius:8px;transition:border-color .15s;}
.form-input:focus{border-color:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.1);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.form-checkbox{display:flex;align-items:flex-start;gap:10px;margin-bottom:1rem;cursor:pointer;}
.form-checkbox input{margin-top:2px;accent-color:#16a34a;width:14px;height:14px;flex-shrink:0;}
.form-checkbox span{font-family:'Inter',sans-serif;font-size:11px;color:#6b7280;line-height:1.6;}
.primary-btn{background:#16a34a;color:#fff;border:none;padding:14px;width:100%;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border-radius:8px;transition:background .15s;display:flex;align-items:center;justify-content:center;gap:8px;}
.primary-btn:hover{background:#15803d;}
.primary-btn:disabled{background:#d1d5db;color:#9ca3af;cursor:default;}
.success-state{text-align:center;padding:2.5rem 1rem;}
.success-icon{font-size:52px;color:#16a34a;margin-bottom:1rem;}
.success-title{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:#111827;margin-bottom:.5rem;letter-spacing:-.02em;}
.success-text{font-family:'Inter',sans-serif;font-size:13px;color:#6b7280;line-height:1.8;max-width:400px;margin:0 auto 1.5rem;}
.steps-indicator{display:flex;align-items:center;gap:0;margin-bottom:1.5rem;}
.step-dot{width:28px;height:28px;border-radius:50%;border:2px solid #e5e7eb;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;color:#9ca3af;flex-shrink:0;}
.step-dot.active{border-color:#16a34a;color:#16a34a;}
.step-dot.done{background:#16a34a;border-color:#16a34a;color:#fff;}
.step-line{flex:1;height:2px;background:#e5e7eb;}
.step-line.done{background:#16a34a;}

/* INFO / LEGAL PAGES */
.page-inner{max-width:800px;margin:0 auto;padding:3rem 2rem;}
.page-title{font-family:'Syne',sans-serif;font-size:40px;font-weight:800;color:#111827;margin-bottom:2rem;letter-spacing:-.03em;}
.legal-section{margin-bottom:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid #f3f4f6;}
.legal-h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:#111827;margin-bottom:1rem;letter-spacing:-.02em;}
.legal-h3{font-family:'Inter',sans-serif;font-size:12px;font-weight:600;color:#16a34a;letter-spacing:.06em;margin-bottom:.5rem;margin-top:1.25rem;text-transform:uppercase;}
.legal-p{font-family:'Inter',sans-serif;font-size:13px;color:#6b7280;line-height:1.9;margin-bottom:.75rem;}
.legal-ul{font-family:'Inter',sans-serif;font-size:13px;color:#6b7280;line-height:1.9;padding-left:1.5rem;margin-bottom:.75rem;}
.legal-ul li{margin-bottom:.25rem;}

/* FOOTER */
.footer{background:#fff;border-top:1px solid #e5e7eb;padding:2.5rem 2rem;display:flex;flex-wrap:wrap;gap:2rem;justify-content:space-between;align-items:flex-start;}
.footer-brand{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#111827;letter-spacing:-.02em;}
.footer-brand span{color:#16a34a;}
.footer-email{font-family:'Inter',sans-serif;font-size:12px;color:#9ca3af;margin-top:6px;}
.footer-legal{font-family:'Inter',sans-serif;font-size:11px;color:#9ca3af;line-height:1.8;max-width:480px;}
.footer-links{display:flex;gap:1.5rem;flex-wrap:wrap;}
.footer-link{font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#6b7280;background:none;border:none;cursor:pointer;}
.footer-link:hover{color:#16a34a;}

/* TOAST */
.toast{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:10px 22px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;z-index:500;pointer-events:none;opacity:0;transition:opacity .2s;white-space:nowrap;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.2);}
.toast.show{opacity:1;}
.sending{opacity:.6;pointer-events:none;}

@media(max-width:600px){
  .nav-links .nav-link:not(:last-child){display:none;}
  .hero h1{font-size:38px;}
  .products-grid{grid-template-columns:1fr;}
  .form-row{grid-template-columns:1fr;}
  .crypto-grid{grid-template-columns:1fr;}
  .loyalty-options{grid-template-columns:1fr;}
  .ship-options{grid-template-columns:1fr;}
  .cart-drawer{width:100%;}
  .info-tile{border-right:none;border-bottom:1px solid #e5e7eb;}
}
`;

export default function App() {
  const [page, setPage] = useState("shop");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selVariants, setSelVariants] = useState({});
  const [loyaltySub, setLoyaltySub] = useState(null);
  const [loyaltyEmail, setLoyaltyEmail] = useState("");
  const [loyaltyActive, setLoyaltyActive] = useState(false);
  const [cryptoSel, setCryptoSel] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [coaProduct, setCoaProduct] = useState(null);
  const [coaEmail, setCoaEmail] = useState("");
  const [coaSent, setCoaSent] = useState(false);
  const [ship, setShip] = useState({
    name: "", email: "", address: "", city: "", state: "", postcode: "", country: "Australia", express: false
  });
  const toastRef = useRef(null);

  // Formspree hooks — one form ID handles both order submissions and COA requests
  // The "type" field in the payload distinguishes them in your inbox
  const [orderState, submitOrderForm] = useForm(CONFIG.FORMSPREE_ID);
  const [coaState, submitCoaForm] = useForm(CONFIG.FORMSPREE_ID);

  const toast = (msg) => {
    setToastMsg(msg); setToastOn(true);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastOn(false), 2400);
  };

  const vIdx = (pid) => selVariants[pid] ?? 0;

  const addToCart = (product) => {
    const vi = vIdx(product.id);
    const variant = product.variants[vi];
    const key = `${product.id}-${vi}`;
    setCart(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, pid: product.id, name: product.name, variant: variant.label, price: variant.price, qty: 1 }];
    });
    toast(`${product.name} added to cart`);
  };

  const updateQty = (key, d) => setCart(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(0, i.qty + d) } : i).filter(i => i.qty > 0));
  const removeItem = (key) => setCart(prev => prev.filter(i => i.key !== key));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = loyaltyActive ? +(subtotal * 0.1).toFixed(2) : 0;
  const shippingCost = ship.express ? 18 : subtotal >= 150 ? 0 : 12;
  const total = +(subtotal - discount + shippingCost).toFixed(2);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = activeFilter === "All" ? products : products.filter(p => p.category === activeFilter);
  const selectedCrypto = CRYPTO_OPTIONS[cryptoSel];

  const openCheckout = () => { setCartOpen(false); setCheckoutOpen(true); setOrderDone(false); setCheckoutStep(1); setAgreedTerms(false); };

  const submitOrder = async () => {
    const result = await submitOrderForm({
      type: "ORDER",
      name: ship.name,
      email: ship.email,
      address: `${ship.address}, ${ship.city}, ${ship.state} ${ship.postcode}, ${ship.country}`,
      shipping: ship.express ? "Express ($18)" : "Standard",
      items: cart.map(i => `${i.name} (${i.variant}) x${i.qty} = $${(i.price * i.qty).toFixed(2)}`).join(" | "),
      subtotal: `$${subtotal.toFixed(2)}`,
      discount: loyaltyActive ? `-$${discount}` : "None",
      shipping_cost: shippingCost === 0 ? "Free" : `$${shippingCost}`,
      total: `$${total} AUD`,
      payment_currency: selectedCrypto.label,
      wallet_address: selectedCrypto.address,
      loyalty_plan: loyaltyActive ? loyaltySub : "None",
    });
    if (!result || !result.error) {
      setOrderDone(true);
      setCart([]);
    }
  };

  const submitCoa = async () => {
    if (!coaEmail || !coaProduct) return;
    const result = await submitCoaForm({
      type: "COA_REQUEST",
      product: coaProduct,
      email: coaEmail,
    });
    if (!result || !result.error) {
      setCoaSent(true);
      toast("COA request sent");
    }
  };

  const badgeEl = (b) => {
    if (!b) return null;
    const cls = b === "NEW" ? "badge badge-new" : b === "POPULAR" ? "badge badge-popular" : "badge badge-bundle";
    return <span className={cls}>{b}</span>;
  };

  const stepDot = (n) => {
    const cls = checkoutStep > n ? "step-dot done" : checkoutStep === n ? "step-dot active" : "step-dot";
    return <div className={cls}>{checkoutStep > n ? <i className="ti ti-check" style={{ fontSize: 12 }} /> : n}</div>;
  };

  return (
    <>
      <style>{css}</style>
      <div className="root">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={() => setPage("shop")}>BARBELL<span>.</span>BIOTECH</div>
          <div className="nav-links">
            {[["shop","Shop"],["loyalty","Loyalty"],["info","Info"],["terms","Terms"],["privacy","Privacy"]].map(([p, l]) => (
              <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => setPage(p)}>{l}</button>
            ))}
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <i className="ti ti-shopping-bag" aria-hidden="true" />
              CART {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* DISCLAIMER BAR */}
        <div className="disc-bar">
          <strong>✓ Australian Stock</strong> &nbsp;·&nbsp; <strong>✓ Same Business Day Dispatch</strong> &nbsp;·&nbsp; <strong>✓ ≥99% Purity</strong> &nbsp;·&nbsp; <strong>✓ COA Every Batch</strong> &nbsp;·&nbsp; <strong>✓ Discreet Packaging</strong>
        </div>

        {/* ── SHOP PAGE ── */}
        {page === "shop" && (
          <>
            <div className="hero" style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb",padding:"0.5rem 2rem",textAlign:"center"}}><p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#9ca3af"}}>All products are strictly for laboratory and in-vitro research use only. Not for human consumption.</p></div>
          <div className="hero">
              <div className="hero-grid" />
              <div className="hero-tag">Research-Grade Compounds · Australia</div>
              <h1>Premium<br />Research<br /><em>Peptides.</em></h1>
              <p className="hero-sub">High-purity research compounds sourced for the serious researcher. Every batch independently tested. COAs available on every compound.</p>
              <div className="hero-pills">
                {["99%+ Purity","Third-Party Tested","COA Available","Free Ship $150+","Crypto Payment","Express Available"].map(p => (
                  <div className="pill" key={p}>{p}</div>
                ))}
              </div>
            </div>

            <div className="info-strip">
              {[
                { icon: "ti-flask-2", t: "Third-Party Tested", d: "Every batch HPLC verified. COAs available for all compounds on request." },
                { icon: "ti-truck-delivery", t: "Express Shipping", d: "Standard free on $150+. Express available at checkout." },
                { icon: "ti-shield-check", t: "Research Integrity", d: "Strictly for laboratory and in-vitro research use only." },
                { icon: "ti-currency-bitcoin", t: "Crypto Payment", d: "USDT, BTC, ETH, XMR accepted. Secure and private." },
              ].map((t, i) => (
                <div className="info-tile" key={i}>
                  <div className="info-icon"><i className={`ti ${t.icon}`} aria-hidden="true" /></div>
                  <div className="info-title">{t.t}</div>
                  <p className="info-text">{t.d}</p>
                </div>
              ))}
            </div>

            <div className="section">
              <div className="section-header">
                <div className="section-title">Compounds</div>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#5a5648" }}>{filtered.length} items</span>
              </div>
              <div className="filter-row">
                {categories.map(c => (
                  <button key={c} className={`filter-btn${activeFilter === c ? " active" : ""}`} onClick={() => setActiveFilter(c)}>{c}</button>
                ))}
              </div>
              <div className="products-grid">
                {filtered.map(product => {
                  const vi = vIdx(product.id);
                  const variant = product.variants[vi];
                  return (
                    <div className="product-card" key={product.id}>
                      <div>
                        <div className="product-cat">{product.category}</div>
                        {badgeEl(product.badge)}
                        <div className="product-name">{product.name}</div>
                      </div>
                      <p className="product-desc">{product.description}</p>
                      {product.variants.length > 1 && (
                        <div className="variant-row">
                          {product.variants.map((v, i) => (
                            <button key={i} className={`variant-btn${vi === i ? " sel" : ""}`}
                              onClick={() => setSelVariants(p => ({ ...p, [product.id]: i }))}>{v.label}</button>
                          ))}
                        </div>
                      )}
                      <div className="price-row">
                        <div>
                          <div className="price">${variant.price}</div>
                          <div className="price-sub">AUD · {variant.label}</div>
                        </div>
                      </div>
                      <button className="add-btn" onClick={() => addToCart(product)}>
                        <i className="ti ti-shopping-cart-plus" aria-hidden="true" style={{ marginRight: 6 }} />Add to Cart
                      </button>
                      <button className="coa-link" onClick={() => { setCoaProduct(product.name); setCoaSent(false); setCoaEmail(""); }}>
                        Request COA
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── LOYALTY PAGE ── */}
        {page === "loyalty" && (
          <div className="loyalty-section" style={{ minHeight: "80vh" }}>
            <div className="loyalty-inner">
              <div className="loyalty-head">
                <div className="loyalty-icon"><i className="ti ti-repeat" aria-hidden="true" /></div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, letterSpacing: ".04em", lineHeight: .95, color: "#e8e4dc" }}>
                    SUBSCRIPTION<br /><span style={{ color: "#c9a84c" }}>DISCOUNT</span>
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#6b6657", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                Sign up to a recurring subscription and receive 10% off every order, applied automatically at checkout. No lock-in. Cancel any time via email.
              </p>
              {!loyaltyActive ? (
                <>
                  <div className="step-label">Choose frequency</div>
                  <div className="loyalty-options">
                    {[
                      { label: "Fortnightly", desc: "Order every 2 weeks. Best for active research programs." },
                      { label: "Monthly", desc: "Order once a month. Most flexible option." },
                    ].map(opt => (
                      <div key={opt.label} className={`loyalty-opt${loyaltySub === opt.label ? " sel" : ""}`} onClick={() => setLoyaltySub(opt.label)}>
                        <div className="loyalty-opt-title">{opt.label}</div>
                        <div className="loyalty-opt-desc">{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="step-label">Your email</div>
                  <div className="loyalty-form" style={{ marginBottom: "1.5rem" }}>
                    <input className="loyalty-input" type="email" placeholder="research@email.com"
                      value={loyaltyEmail} onChange={e => setLoyaltyEmail(e.target.value)} />
                    <button className="loyalty-submit"
                      disabled={!loyaltySub || !loyaltyEmail.includes("@")}
                      onClick={() => { setLoyaltyActive(true); toast("Subscribed — 10% discount is now active"); }}>
                      Subscribe
                    </button>
                  </div>
                </>
              ) : (
                <div className="success-strip" style={{ marginBottom: "1.5rem" }}>
                  <i className="ti ti-circle-check" aria-hidden="true" style={{ fontSize: 20 }} />
                  <span>Subscribed on <strong>{loyaltySub}</strong> plan — 10% discount is active on all orders.</span>
                </div>
              )}
              <div>
                {[
                  { t: "10% off every order", d: "Applied automatically at checkout once subscribed." },
                  { t: "Priority dispatch", d: "Your orders are queued ahead of one-off purchases." },
                  { t: "Early access to new batches", d: "First to know when new compounds or test results land." },
                  { t: "No lock-in", d: "Cancel any time. Just email us." },
                ].map((p, i) => (
                  <div className="perk" key={i}>
                    <div className="perk-check"><i className="ti ti-check" aria-hidden="true" /></div>
                    <div className="perk-text"><strong>{p.t}</strong> — {p.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── INFO PAGE ── */}
        {page === "info" && (
          <div className="page-inner">
            <div className="page-title">Information</div>
            {[
              { h: "Research Use Only", body: "All compounds sold by Barbell Biotech are intended strictly for laboratory and in-vitro research purposes. Products are not approved for human or veterinary use, diagnosis, or treatment. By purchasing, you confirm products will be used solely for legitimate research in accordance with all applicable laws and regulations." },
              { h: "COA & Testing", body: "Every batch is independently tested via HPLC analysis to verify purity and composition. Certificates of Analysis are available upon request for any compound. Use the 'Request COA' button on any product, or email us with your order reference and the compound name." },
              { h: "Payment — Cryptocurrency", body: `All transactions are completed via cryptocurrency transfer. Accepted currencies: USDT (ERC-20), Bitcoin (BTC), Ethereum (ETH), and Solana (SOL). Payment instructions and wallet address are provided at checkout. Orders are dispatched once payment is confirmed on-chain. Contact: ${CONFIG.CONTACT_EMAIL}` },
              { h: "Shipping", body: "Standard shipping is free on orders over $150 AUD. Express shipping ($18) is available at checkout. All orders are shipped in plain, discreet packaging with tracking. Domestic Australian orders: 2–5 business days standard, 1–2 days express." },
              { h: "Storage", body: "Lyophilised peptide compounds should be stored at −20°C for long-term stability, or at 4°C once reconstituted for short-term use. BAC water should be stored at room temperature, away from direct light. Full storage recommendations are included with every order." },
              { h: "Contact", body: `For COA requests, order enquiries, or any other questions, contact us at ${CONFIG.CONTACT_EMAIL}. We aim to respond within 24 hours on business days (AEST).` },
            ].map((s, i) => (
              <div className="legal-section" key={i}>
                <div className="legal-h2">{s.h}</div>
                <p className="legal-p">{s.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── TERMS & CONDITIONS PAGE ── */}
        {page === "terms" && (
          <div className="page-inner">
            <div className="page-title">Terms & Conditions</div>
            <p className="legal-p" style={{ marginBottom: "2rem" }}>Last updated: {new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}. These Terms and Conditions govern your use of barbellbiotech.com and any purchase made through the site. By placing an order you agree to these terms in full.</p>

            <div className="legal-section">
              <div className="legal-h2">1. Research Use Only</div>
              <p className="legal-p">All products sold by Barbell Biotech are intended strictly for laboratory, in-vitro, and scientific research purposes only. Products are not for human consumption, veterinary use, clinical application, diagnosis, or treatment of any condition. By completing a purchase, you represent and warrant that:</p>
              <ul className="legal-ul">
                <li>You are a qualified researcher, scientist, or research institution.</li>
                <li>Products will be used exclusively for legitimate research purposes.</li>
                <li>You are aware of and will comply with all applicable laws and regulations in your jurisdiction governing the purchase, possession, and use of research compounds.</li>
                <li>You are 18 years of age or older.</li>
              </ul>
            </div>

            <div className="legal-section">
              <div className="legal-h2">2. Orders & Payment</div>
              <p className="legal-p">All prices are in Australian Dollars (AUD) inclusive of GST where applicable. Payment is accepted exclusively via cryptocurrency transfer. An order is not confirmed until payment is verified on-chain. Barbell Biotech reserves the right to cancel any order at its discretion, in which case a full refund will be issued to the originating wallet address.</p>
              <div className="legal-h3">2.1 Cryptocurrency Payments</div>
              <p className="legal-p">You are responsible for sending the correct amount to the correct wallet address for the selected currency. Barbell Biotech is not liable for funds sent to incorrect addresses or lost due to network errors. Orders will only be dispatched once payment is confirmed on-chain. Cryptocurrency transactions are irreversible; exercise care when initiating transfers.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">3. Shipping & Delivery</div>
              <p className="legal-p">Orders are dispatched from within Australia. Standard shipping is free on orders over $150 AUD; otherwise a flat shipping fee applies. Express shipping is available at checkout for an additional fee. Estimated delivery times are not guaranteed and may vary due to carrier delays. Risk of loss passes to the customer upon dispatch. Barbell Biotech is not responsible for delays caused by customs, carrier issues, or incorrect addresses provided by the customer.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">4. Refunds & Returns</div>
              <p className="legal-p">Due to the nature of research compounds, all sales are final. Refunds or replacements will only be considered where a product is demonstrably defective or not as described, and must be raised within 7 days of delivery by contacting {CONFIG.CONTACT_EMAIL} with your order reference and supporting evidence. We reserve the right to request return of the product before issuing any remedy.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">5. Subscription (Loyalty) Program</div>
              <p className="legal-p">Subscribers who sign up to a fortnightly or monthly subscription plan receive a 10% discount applied to all orders while the subscription is active. This discount cannot be combined with other promotional offers unless stated. Subscriptions may be cancelled at any time by emailing {CONFIG.CONTACT_EMAIL}. Barbell Biotech reserves the right to modify or discontinue the loyalty program at any time with reasonable notice.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">6. Limitation of Liability</div>
              <p className="legal-p">To the maximum extent permitted by law, Barbell Biotech excludes all liability for any direct, indirect, incidental, or consequential loss or damage arising from use of our products or website. Products are sold as-is for research purposes only. Barbell Biotech makes no warranties, expressed or implied, regarding fitness for any particular research purpose. Nothing in these terms limits liability that cannot be excluded under the Australian Consumer Law.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">7. Intellectual Property</div>
              <p className="legal-p">All content on this website including text, product descriptions, branding, and design is the property of Barbell Biotech and may not be reproduced without written permission.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">8. Governing Law</div>
              <p className="legal-p">These terms are governed by the laws of Queensland, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Queensland.</p>
            </div>

            <div className="legal-section" style={{ borderBottom: "none" }}>
              <div className="legal-h2">9. Contact</div>
              <p className="legal-p">For any queries regarding these terms, contact us at {CONFIG.CONTACT_EMAIL}.</p>
            </div>
          </div>
        )}

        {/* ── PRIVACY POLICY PAGE ── */}
        {page === "privacy" && (
          <div className="page-inner">
            <div className="page-title">Privacy Policy</div>
            <p className="legal-p" style={{ marginBottom: "2rem" }}>Last updated: {new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}. Barbell Biotech is committed to handling your personal information responsibly and with respect for your privacy.</p>

            <div className="legal-section">
              <div className="legal-h2">1. Information We Collect</div>
              <p className="legal-p">We collect personal information that you provide directly, including:</p>
              <ul className="legal-ul">
                <li>Name and email address (for order processing and communication)</li>
                <li>Shipping address (for delivery)</li>
                <li>Cryptocurrency transaction references (for payment verification)</li>
                <li>Subscription preferences (for the loyalty program)</li>
              </ul>
              <p className="legal-p">We do not collect payment card details. All crypto transactions are handled wallet-to-wallet with no sensitive financial data stored on our systems.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">2. How We Use Your Information</div>
              <p className="legal-p">We use your information to:</p>
              <ul className="legal-ul">
                <li>Process and fulfil your orders</li>
                <li>Communicate with you about your order status</li>
                <li>Manage your subscription, if applicable</li>
                <li>Respond to COA requests and customer enquiries</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="legal-p">We do not use your data for targeted advertising. We do not sell or rent your personal information to third parties.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">3. Data Storage & Security</div>
              <p className="legal-p">Order data submitted through our checkout is processed via Formspree and delivered to our secure email. We take reasonable steps to protect your information from misuse, loss, and unauthorised access. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">4. Disclosure to Third Parties</div>
              <p className="legal-p">We may share your personal information with:</p>
              <ul className="legal-ul">
                <li>Shipping carriers (name and delivery address only, for fulfilment)</li>
                <li>Formspree (our order processing intermediary — see formspree.io/legal/privacy-policy)</li>
              </ul>
              <p className="legal-p">We will not disclose your information to any other third party without your consent, except where required by law.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">5. Cookies</div>
              <p className="legal-p">Our website may use minimal session cookies to support site functionality. We do not use tracking or advertising cookies. No personal data is stored in cookies.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">6. Access & Correction</div>
              <p className="legal-p">You have the right to request access to the personal information we hold about you, and to request corrections. To exercise these rights, contact us at {CONFIG.CONTACT_EMAIL}. We will respond within 30 days.</p>
            </div>

            <div className="legal-section">
              <div className="legal-h2">7. Retention</div>
              <p className="legal-p">We retain order and customer data for a minimum of 5 years to comply with Australian tax and business record-keeping obligations. Subscription data is deleted upon cancellation of the subscription.</p>
            </div>

            <div className="legal-section" style={{ borderBottom: "none" }}>
              <div className="legal-h2">8. Contact</div>
              <p className="legal-p">For privacy enquiries or complaints, contact our Privacy Officer at {CONFIG.CONTACT_EMAIL}. </p>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <div className="footer-brand">BARBELL<span>.</span>BIOTECH</div>
            <div className="footer-email">{CONFIG.CONTACT_EMAIL}</div>
            
          </div>
          <div className="footer-legal">
            All products are for research purposes only and not for human consumption. Products have not been evaluated by the TGA or any regulatory body. Customers are responsible for compliance with all applicable local laws. © {new Date().getFullYear()} Barbell Biotech. All rights reserved.
          </div>
          <div className="footer-links">
            {[["shop","Shop"],["loyalty","Loyalty"],["info","Info"],["terms","Terms"],["privacy","Privacy"]].map(([p, l]) => (
              <button key={p} className="footer-link" onClick={() => setPage(p)}>{l}</button>
            ))}
          </div>
        </footer>

        {/* CART DRAWER */}
        <div className={`cart-overlay${cartOpen ? " open" : ""}`} onClick={() => setCartOpen(false)} />
        <div className={`cart-drawer${cartOpen ? " open" : ""}`}>
          <div className="cart-head">
            <div className="cart-title">Cart {cartCount > 0 && `(${cartCount})`}</div>
            <button className="close-btn" onClick={() => setCartOpen(false)}><i className="ti ti-x" aria-hidden="true" /></button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon"><i className="ti ti-shopping-bag" aria-hidden="true" /></div>
                <div className="empty-text">Your cart is empty</div>
              </div>
            ) : cart.map(item => (
              <div className="cart-item" key={item.key}>
                <div className="cart-item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-var">{item.variant}</div>
                  <div className="qty-controls">
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
            {loyaltyActive && <div className="total-row green"><span>Loyalty 10% off</span><span>−${discount.toFixed(2)}</span></div>}
            <div className="total-row"><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span></div>
            <div className="total-row main"><span>Total</span><span>${total.toFixed(2)} AUD</span></div>
            <button className="checkout-btn" disabled={cart.length === 0} onClick={openCheckout}>
              Proceed to Checkout
            </button>
            <div className={`ship-note${subtotal >= 150 ? " free" : ""}`}>
              {subtotal >= 150 ? "✓ Free standard shipping applied" : `Add $${(150 - subtotal).toFixed(0)} more for free shipping`}
            </div>
          </div>
        </div>

        {/* CHECKOUT MODAL */}
        {checkoutOpen && (
          <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget && !orderDone) setCheckoutOpen(false); }}>
            <div className="modal">
              <div className="modal-head">
                <div className="modal-title">
                  {orderDone ? "Order Placed" : `Checkout`}
                </div>
                {!orderDone && (
                  <button className="close-btn" onClick={() => setCheckoutOpen(false)}>
                    <i className="ti ti-x" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="modal-body">
                {!orderDone && (
                  <div className="steps-indicator">
                    {stepDot(1)}
                    <div className={`step-line${checkoutStep > 1 ? " done" : ""}`} />
                    {stepDot(2)}
                    <div className={`step-line${checkoutStep > 2 ? " done" : ""}`} />
                    {stepDot(3)}
                  </div>
                )}

                {orderDone ? (
                  <div className="success-state">
                    <div className="success-icon"><i className="ti ti-circle-check" aria-hidden="true" /></div>
                    <div className="success-title">Order Received</div>
                    <p className="success-text">
                      We've received your order and payment details. Once your transfer is confirmed on-chain your order will be dispatched. A confirmation will be sent to <strong>{ship.email}</strong>.
                    </p>
                    <button className="primary-btn" onClick={() => { setCheckoutOpen(false); setOrderDone(false); }}>
                      Close
                    </button>
                  </div>

                ) : checkoutStep === 1 ? (
                  <>
                    <div className="step-label">Order Summary</div>
                    <div className="order-summary">
                      {cart.map(i => (
                        <div className="order-row" key={i.key}>
                          <span>{i.name} ({i.variant}) ×{i.qty}</span>
                          <span>${(i.price * i.qty).toFixed(2)}</span>
                        </div>
                      ))}
                      {loyaltyActive && <div className="order-row" style={{ color: "#70a878" }}><span>Loyalty discount</span><span>−${discount.toFixed(2)}</span></div>}
                      <div className="order-total"><span>Subtotal</span><span>${(subtotal - discount).toFixed(2)}</span></div>
                    </div>

                    <div className="step-label">Shipping Method</div>
                    <div className="ship-options">
                      <div className={`ship-opt${!ship.express ? " sel" : ""}`} onClick={() => setShip(p => ({ ...p, express: false }))}>
                        <div className="ship-opt-title">Standard</div>
                        <div className="ship-opt-price">{subtotal - discount >= 150 ? "Free" : "$12"}</div>
                        <div className="ship-opt-days">2–5 business days</div>
                      </div>
                      <div className={`ship-opt${ship.express ? " sel" : ""}`} onClick={() => setShip(p => ({ ...p, express: true }))}>
                        <div className="ship-opt-title">Express</div>
                        <div className="ship-opt-price">$18</div>
                        <div className="ship-opt-days">1–2 business days</div>
                      </div>
                    </div>

                    <div className="order-summary" style={{ marginBottom: "1.5rem" }}>
                      <div className="order-row"><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span></div>
                      <div className="order-total"><span>Total</span><span>${total.toFixed(2)} AUD</span></div>
                    </div>

                    <button className="primary-btn" onClick={() => setCheckoutStep(2)}>
                      Continue <i className="ti ti-arrow-right" aria-hidden="true" />
                    </button>
                  </>

                ) : checkoutStep === 2 ? (
                  <>
                    <div className="step-label">Shipping Details</div>
                    <div className="form-field">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" value={ship.name} onChange={e => setShip(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email Address</label>
                      <input className="form-input" type="email" value={ship.email} onChange={e => setShip(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Street Address</label>
                      <input className="form-input" value={ship.address} onChange={e => setShip(p => ({ ...p, address: e.target.value }))} placeholder="123 Example Street" />
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">City / Suburb</label>
                        <input className="form-input" value={ship.city} onChange={e => setShip(p => ({ ...p, city: e.target.value }))} placeholder="Townsville" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">State</label>
                        <input className="form-input" value={ship.state} onChange={e => setShip(p => ({ ...p, state: e.target.value }))} placeholder="QLD" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">Postcode</label>
                        <input className="form-input" value={ship.postcode} onChange={e => setShip(p => ({ ...p, postcode: e.target.value }))} placeholder="4810" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Country</label>
                        <input className="form-input" value={ship.country} onChange={e => setShip(p => ({ ...p, country: e.target.value }))} />
                      </div>
                    </div>
                    <label className="form-checkbox">
                      <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} />
                      <span>I confirm all products will be used for research purposes only and I have read and agree to the <button style={{ background: "none", border: "none", color: "#c9a84c", cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: 0 }} onClick={() => { setCheckoutOpen(false); setPage("terms"); }}>Terms & Conditions</button> and <button style={{ background: "none", border: "none", color: "#c9a84c", cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: 0 }} onClick={() => { setCheckoutOpen(false); setPage("privacy"); }}>Privacy Policy</button>.</span>
                    </label>
                    <button className="primary-btn"
                      disabled={!ship.name || !ship.email || !ship.address || !ship.city || !ship.postcode || !agreedTerms}
                      onClick={() => setCheckoutStep(3)}>
                      Continue <i className="ti ti-arrow-right" aria-hidden="true" />
                    </button>
                  </>

                ) : (
                  <>
                    <div className="step-label">Payment — Cryptocurrency</div>
                    <div className="notice">
                      <strong>How it works:</strong> Select your currency below, send exactly <strong>${total.toFixed(2)} AUD equivalent</strong> to the wallet address shown, then click confirm. Your order will be dispatched once payment is confirmed on-chain. Include your email in the transfer memo if your wallet supports it.
                    </div>
                    <div className="step-label">Select Currency</div>
                    <div className="crypto-grid">
                      {CRYPTO_OPTIONS.map((c, i) => (
                        <button key={i} className={`crypto-opt${cryptoSel === i ? " sel" : ""}`} onClick={() => setCryptoSel(i)}>{c.label}</button>
                      ))}
                    </div>
                    <div className="address-box">
                      <div className="address-label">Send {selectedCrypto.label} to:</div>
                      <div className="address-val">{selectedCrypto.address}</div>
                      <button className="copy-btn" onClick={() => { navigator.clipboard?.writeText(selectedCrypto.address); toast("Address copied"); }}>
                        <i className="ti ti-copy" aria-hidden="true" /> Copy Address
                      </button>
                    </div>
                    <div className="order-summary" style={{ marginBottom: "1.5rem" }}>
                      <div className="order-row"><span>Total to send (AUD equiv.)</span><span><strong style={{ color: "#e8e4dc" }}>${total.toFixed(2)}</strong></span></div>
                      <div className="order-row"><span>Currency</span><span>{selectedCrypto.label}</span></div>
                      <div className="order-row"><span>Shipping to</span><span>{ship.city}, {ship.state}</span></div>
                    </div>
                    {orderState.errors && orderState.errors.length > 0 && (
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#c87840", marginBottom: "1rem" }}>
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}
                    <button className={`primary-btn${orderState.submitting ? " sending" : ""}`} onClick={submitOrder} disabled={orderState.submitting}>
                      {orderState.submitting ? "Submitting..." : "I Have Sent Payment — Confirm Order"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* COA REQUEST MODAL */}
        {coaProduct && (
          <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setCoaProduct(null); setCoaSent(false); }}}>
            <div className="modal" style={{ maxWidth: 400 }}>
              <div className="modal-head">
                <div className="modal-title">Request COA</div>
                <button className="close-btn" onClick={() => { setCoaProduct(null); setCoaSent(false); }}>
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>
              <div className="modal-body">
                {coaSent ? (
                  <div className="success-state" style={{ padding: "1.5rem 0" }}>
                    <div className="success-icon" style={{ fontSize: 36 }}><i className="ti ti-circle-check" aria-hidden="true" /></div>
                    <div className="success-title" style={{ fontSize: 26 }}>Request Sent</div>
                    <p className="success-text">We'll email the COA for <strong>{coaProduct}</strong> to you shortly.</p>
                    <button className="primary-btn" onClick={() => { setCoaProduct(null); setCoaSent(false); }}>Close</button>
                  </div>
                ) : (
                  <>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#6b6657", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                      Request the Certificate of Analysis for <strong style={{ color: "#e8e4dc" }}>{coaProduct}</strong>. We'll send it to your email.
                    </p>
                    <div className="form-field">
                      <label className="form-label">Your Email</label>
                      <input className="form-input" type="email" value={coaEmail} onChange={e => setCoaEmail(e.target.value)} placeholder="research@email.com" />
                    </div>
                    <button className="primary-btn" disabled={!coaEmail.includes("@")} onClick={submitCoa}>
                      Send COA Request
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={`toast${toastOn ? " show" : ""}`}>{toastMsg}</div>
      </div>
    </>
  );
}
