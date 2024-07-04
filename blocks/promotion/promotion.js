import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { div } from '../../scripts/dom.js';

/**
 * loads and decorates the promotion
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const promoMeta = getMetadata('promotion');
  const promoPath = promoMeta ? new URL(promoMeta, window.location).pathname : '/promotion';
  const promo = await loadFragment(promoPath);

  block.textContent = '';
  const promotion = div({ class: 'promotion' });

  while (promo.firstElementChild) {
    promotion.append(promo.firstElementChild);
  }

  block.append(promotion);
}
