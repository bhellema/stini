import {createOptimizedPicture} from "../../scripts/aem.js";
import {a, div, h3, li, p, span, ul} from "../../scripts/dom.js";

async function getFeatured() {
    const featured = await fetch('/query-index.json');
    return await featured.json();
}

function getFeaturedItemByPath(path, items) {
    return items.find((item) => item.path === path);
}

export default async function decorate(block) {
    const { data: items } = await getFeatured();

    /* change to ul, li */
    const ulEl = ul();
    [...block.children].forEach((row) => {
        const liEl = li({class: 'featured-card'});
        [...row.children].forEach((child) => {
            const path = child.querySelector('p').textContent;
            const item = getFeaturedItemByPath(path, items);
            const pic = createOptimizedPicture(item.image, item.title, false, [{ width: '750' }]);
            pic.querySelector('img').classList.add('featured-card-image');
            const category = p({class: 'featured-card-callout'}, item.category)
            const title = h3(item.title);
            const divider = div({class: 'featured-card-divider'});
            const body = div({class: 'featured-card-body'}, category, title);
                const action = a({class: 'button outlined', href: item.path}, span('View Details'));
            const card = div(pic, body, divider, action);
            liEl.append(card);
        });
        ulEl.append(liEl);
    });
    // ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    block.textContent = '';
    block.append(ulEl);
}
