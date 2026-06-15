import {
  img_retatrutide, img_retatrutide20,
  img_cjc1295, img_bpc157, img_tb500,
  img_wolverine, img_ipamorelin,
  img_ghkcu, img_ghkcu50, img_ghkcu100,
  img_motsc, img_bac, img_bac10, img_kit,
} from './images';

export const PRODUCTS = [
  {
    id: 1, name: 'Retatrutide', cat: 'GLP / Metabolic', badge: 'NEW',
    img: img_retatrutide,
    variantImgs: [img_retatrutide, img_retatrutide20],
    variants: [{ l: '10mg', p: 139 }, { l: '20mg', p: 219 }],
    desc: 'Tri-agonist research compound targeting GLP-1, GIP, and glucagon receptors. Lyophilised, >98% purity. COA available.',
  },
  {
    id: 2, name: 'CJC-1295 No DAC', cat: 'Growth Hormone', badge: null, img: img_cjc1295,
    variants: [{ l: '10mg', p: 79 }],
    desc: 'GHRH analogue without Drug Affinity Complex. Lyophilised, >98% purity. COA available.',
  },
  {
    id: 3, name: 'BPC-157', cat: 'Repair & Recovery', badge: 'POPULAR', img: img_bpc157,
    variants: [{ l: '10mg', p: 79 }],
    desc: 'Pentadecapeptide derived from human gastric juice protein. Research-grade. COA available.',
  },
  {
    id: 4, name: 'TB-500', cat: 'Repair & Recovery', badge: null, img: img_tb500,
    variants: [{ l: '10mg', p: 105 }],
    desc: 'Synthetic analogue of Thymosin Beta-4. Lyophilised powder, >98% purity. COA available.',
  },
  {
    id: 5, name: 'Wolverine Stack', cat: 'Stacks', badge: 'BUNDLE', img: img_wolverine,
    variants: [{ l: 'BPC-157 10mg + TB-500 10mg', p: 109 }],
    desc: 'Combined BPC-157 and TB-500 research bundle. Both compounds independently tested. COAs available.',
  },
  {
    id: 6, name: 'Ipamorelin', cat: 'Growth Hormone', badge: null, img: img_ipamorelin,
    variants: [{ l: '10mg', p: 95 }],
    desc: 'Selective GH secretagogue peptide. Lyophilised, high purity. COA available.',
  },
  {
    id: 7, name: 'GHK-Cu', cat: 'Repair & Recovery', badge: null,
    img: img_ghkcu50,
    variantImgs: [img_ghkcu50, img_ghkcu100],
    variants: [{ l: '50mg', p: 84 }, { l: '100mg', p: 134 }],
    desc: 'Copper peptide complex. Research applications in cellular biology. COA available.',
  },
  {
    id: 8, name: 'MOTS-C', cat: 'Metabolic', badge: null, img: img_motsc,
    variants: [{ l: '10mg', p: 109 }],
    desc: 'Mitochondria-derived peptide. Emerging research compound. Third-party tested. COA available.',
  },
  {
    id: 9, name: 'BAC Water', cat: 'Ancillaries', badge: null,
    img: img_bac,
    variantImgs: [img_bac, img_bac10],
    variants: [{ l: '3ml', p: 17 }, { l: '10ml', p: 23 }],
    desc: 'Bacteriostatic water for research reconstitution. Sterile, 0.9% benzyl alcohol preserved.',
    isAncillary: true,
  },
  {
    id: 10, name: 'Reconstitution Kit', cat: 'Ancillaries', badge: 'ADD-ON', img: img_kit,
    variants: [{ l: 'Kit', p: 29 }],
    desc: '5x insulin needles, 1x 3ml syringe with needle, 10x alcohol wipes, 1x BAC Water 3ml. Everything needed for reconstitution.',
    isAncillary: true,
  },
];

export const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.cat)))];
