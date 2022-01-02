'use strict';

import * as Render from './render.js';
import * as RenderInvenDiscPage from './rend_inven_disc_quest.js';

document.addEventListener('DOMContentLoaded', function () {
    let pathname = window.location.pathname;
    console.log(pathname);
    if (
        pathname === '/client-admin/client-admin' ||
        pathname === '/client-admin/client-admin/'
    ) {
        Render.renderClientAdmin();
    } else if (
        pathname.includes(
            '/client-admin/complete-invention-disclosure-questionnaire/'
        )
    ) {
        RenderInvenDiscPage.renderInventionDiscQuestPage();
    } else if (pathname.includes('/login')) {
        Render.renderLogin();
    }
});
