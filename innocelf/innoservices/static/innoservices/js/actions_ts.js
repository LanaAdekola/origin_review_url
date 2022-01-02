'use strict';
import * as RenderTS from './render_ts.js';
import * as RenderPrivacyDisclaimerTerms from './render_privacy_disclaimer_terms.js';
document.addEventListener('DOMContentLoaded', function () {
    let pathname = window.location.pathname;
    if (pathname === '/' || pathname === '/home/') {
        RenderTS.renderHomepage();
    } else if (pathname === '/services' || pathname === '/services/') {
        RenderTS.renderServicesPage();
    } else if (
        pathname === '/testimonials-page' ||
        pathname === '/testimonials-page/'
    ) {
        RenderTS.renderTestimonialsPage();
    } else if (
        pathname === '/frequently-asked-questions/' ||
        pathname === '/frequently-asked-questions'
    ) {
        RenderTS.renderFAQPage();
    } else if (pathname === '/contact-us/' || pathname === '/contact-us') {
        RenderTS.renderContactUsPage();
    } else if (pathname === '/about-us/' || pathname === '/about-us') {
        RenderTS.renderAboutUsPage();
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
    } else if (pathname === '/our-process' || pathname === '/our-process/') {
        RenderTS.renderOurProcessPage();
    }
});
