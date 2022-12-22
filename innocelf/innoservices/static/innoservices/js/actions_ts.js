'use strict';
import * as RenderTS from './render_ts.js';
import { renderHomepage } from './renderHomepage.js';
import { renderServices } from './renderServices.js';
import { renderAboutUs } from './renderAboutUs.js';
import { renderFAQ } from './renderFAQ.js';
import { renderTestimonial } from './renderTestimonials.js';
import { renderBlogHome } from './render_blog_home.js';
import * as RenderPrivacyDisclaimerTerms from './render_privacy_disclaimer_terms.js';

document.addEventListener('DOMContentLoaded', function() {
    let pathname = window.location.pathname;
    if (pathname === '/' || pathname === '/home/') {
        renderHomepage();
    } else if (pathname === '/services' || pathname === '/services/') {
        renderServices();
    } else if (
        pathname === '/testimonials-page' ||
        pathname === '/testimonials-page/'
    ) {
        renderTestimonial();
    } else if (
        pathname === '/frequently-asked-questions/' ||
        pathname === '/frequently-asked-questions'
    ) {
        renderFAQ();
    } else if (pathname === '/contact-us/' || pathname === '/contact-us') {
        RenderTS.renderContactUsPage();
    } else if (pathname === '/about-us/' || pathname === '/about-us') {
        renderAboutUs();
    } else if (
        pathname === '/privacy-policy/' ||
        pathname === '/privacy-policy'
    ) {
        RenderPrivacyDisclaimerTerms.renderPrivacyPolicy();
    } else if (
        pathname === '/terms-and-conditions/' ||
        pathname === '/terms-and-conditions'
    ) {
        RenderPrivacyDisclaimerTerms.renderTermsOfUsePage();
    } else if (pathname === '/disclaimer/' || pathname === '/disclaimer') {
        RenderPrivacyDisclaimerTerms.renderDisclaimerPage();
    } else if (
        pathname === '/administrative/send-review-request' ||
        pathname === '/administrative/send-review-request/'
    ) {
        RenderTS.renderSendReviewRequest();
    } else if (pathname.includes('/write-review/')) {
        RenderTS.renderWriteReviewPage();
    } else if (pathname.includes('/knowledge-home')) {
        renderBlogHome();
    }
});
