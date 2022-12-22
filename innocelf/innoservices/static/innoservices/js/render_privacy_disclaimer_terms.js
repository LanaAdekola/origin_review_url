'use strict';
import * as ComponentsTS from './components_ts.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { Footer } from './ComponentClasses/Footer.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';
import { createHeadingWithBlueBackground } from './utils.js';
import { PageHeadElements, STATE } from './render_ts.js';
/**
 * The function returns a paragraph element for the Terms, Disclaimer and Privacy
 * Policy pages. It has certain classes predefined
 * @param textContent String of the text content that will be present in the element
 * @returns A paragraph element with predefined classes and provided text content
 */
function __typicalParagraph(textContent) {
    let para = new HeadingOrParagraph('p', textContent).renderWithClass([
        'mt-5',
        'text-justify',
    ]).result;
    return para;
}

/**
 * The function returns a heading element for the Terms, Disclaimer and Privacy
 * Policy pages. It has certain classes predefined
 * @param textContent String of the text content that will be present in the element
 * @returns A heading element with predefined classes and provided text content
 */
function __typicalHeading(textContent) {
    let heading = new HeadingOrParagraph('h6', textContent).renderWithClass([
        'mt-10',
    ]).result;
    return heading;
}

/**
 * The function renders the Privacy Policy Page /privacy-policy
 */
export function renderPrivacyPolicy() {
    // new PageHeadElements(STATE.privacyPolicy.meta, STATE.privacyPolicy.title);
    let navbar = new Navbar().render().result;
    let heading = createHeadingWithBlueBackground('Privacy Policy');

    let paraContainer = document.createElement('div');
    let paraContainerClasses = [
        'block',
        'w-11/12',
        'mx-auto',
        'my-16',
        'lg:w-2/3',
        '2xl:w-1/2',
    ];
    paraContainerClasses.map((item) => {
        paraContainer.classList.add(item);
    });
    let privacyPageObject = {
        p1: `The website located at innocelf.com (the “Website”) is operated by
		INNOCELF LLC (hereinafter may be referred to as “us,” “we,” and “our”).
		INNOCELF LLC has created this privacy policy to demonstrate our
		commitment to the privacy of our visitors and customers. INNOCELF LLC
		is committed to respecting your privacy and recognizing your need for
		appropriate protection and management of personally identifiable
		information you share with us (the phrases “personally identifiable
		information” and “personal information” may mean any information by
		which you, individually, can be identified, such as your name, address,
		telephone number, etc.). The purpose of this privacy policy is to
		inform you when you visit our Website how we use such information.`,
        p2: `This Privacy Policy also governs the collection, use, transfer,
		and processing of your personal information. By using this Website, you
		consent to our Privacy Policy set out below. All terms not defined in
		this document have the meaning ascribed to in the Website Terms and
		Conditions of Use located at innocelf.com/terms-and-conditions.`,
        p3: `INNOCELF LLC is a United States Corporation subject to the laws of
		the United States. The United States may not offer a level of privacy
		protection as great as that offered in other jurisdictions. Since our
		servers are located in the United States, your data may be transferred
		to, stored, or processed in the United States. By using our Services,
		you understand and consent to the collection, storage, processing, and
		transfer of your data to our facilities in the United States and those
		third parties we share your data with as described in this Policy and
		our Terms and Conditions of Use.`,
        h4: 'A Special Note about Children',
        p4: `Children (under the age of 18) are not eligible to use the Website
		unsupervised, and we ask that children do not submit any personal
		information to us. If you are under the age of 18, you may only use
		this Website in conjunction with, and under the supervision of your
		parents or guardians.`,
        h5: 'Users Under 13 Years of Age',
        p5: `The Website is not directed to children under the age of 13. We do
		not knowingly collect information, including Personal Information, from
		children or other individuals who are not legally able to use our
		Website and Services. If we obtain actual knowledge that we have
		collected Personal Information from a child under the age of 13, we
		will promptly delete it, unless we are legally obligated to retain such
		data. Contact us if you believe that we have mistakenly or
		unintentionally collected information from a child under the age of 13,
		via our contact form or by writing to INNOCELF LLC at 48342 Carnegie
		Way, Macomb, Michigan - 48042. By using the Services, you are
		representing to us that you are not under the age of 13.`,
        h6: 'General',
        p6: `In general, you may visit the Website without telling us who you
		are or revealing any of your personal information. There are two
		primary ways INNOCELF LLC will collect your personal information:`,
        p7: `First, INNOCELF LLC may collect information submitted via the
		contact and virtual appointment forms, requesting or downloading one of
		our publications, or by subscribing to our news feed, including any
		personal information you submit. Whether or not you choose to provide
		personal information is entirely up to you.`,
        p8: `Second, INNOCELF LLC may track the domain address from which you
		visit the Website through cookies (see “Cookies” Section below),
		analyze this data for trends and statistics, and use the information
		for internal marketing purposes. INNOCELF LLC will never sell your
		information to third parties.`,
        p9: `The manner in which we will collect and use your information is set
        forth below.`,
        h7: 'Collection and Use of Personal Information',
        p10: `We will collect all the information that you supply to us through
		our contact and virtual appointment forms, including personal
		information and personal messages you submit. The collection of this
		information enables us to provide you with the assistance you have
		requested through the contact and virtual appointment forms. In
		furtherance of these objectives, INNOCELF LLC may collect the following
		personal information:`,
        p11: `Contact Information: If you submit your name, address, email
		address, or phone number on Contact or Intake Forms, then you are
		deemed to have given consent for us to use such information to contact
		you (“Contact Information”).`,
        p12: `Customer Information: We may record and retain records of your
		specific personal information, details of your legal situation, and
		messages submitted to us through the Contact and Intake Forms
		(“Customer Information”).`,
        p13: `Statistical Information: We may gather statistical information
		from website visitors and analyze this data for trends and statistics
		(“Statistical Information”).`,
        p14: `Collected Information: Contact Information, Customer Information,
		and Statistical Information, and any information we may collect from
		you through the use of cookies (see “Cookies” Section below), or from
		our affiliates or from other parties or through any other means, shall
		collectively be referred to as (“Collected Information”).`,
        h8: 'Data Integrity and Purpose',
        p15: `We only collect Personal Information that is relevant for
		providing the Services. We process Personal Information in a way that
		is compatible with providing the Services or as otherwise authorized by
		you. We take reasonable steps to ensure that Personal Information is
		reliable for its intended use, accurate, complete, and current.`,
        h9: 'Safe Harbor',
        p16: `INNOCELF LLC adheres to the U.S. safe harbor policy privacy
		principles of notice, choice, onward transfer, security, data
		integrity, access, and enforcement. If you have any questions regarding
		this policy, contact INNOCELF LLC through the Contact Form or write to
		us at INNOCELF LLC, 48342 Carnegie Way, Macomb, Michigan - 48042.`,
        h10: 'Cookies',
        p17: `The Website may use cookie technology to improve the quality of
		your experience. A cookie is a small file that contains information
		sent by a website that is saved on your hard disk by your computer's
		browser. Cookies store information that a website may need in order to
		personalize your experience and gather website statistical data. Any
		time you visit the Website to browse or to read or download
		information, cookies may collect and store the name of the domain and
		host from which you access the Internet (for example, msn.com,
		google.com, etc.); the Internet protocol (IP) address of the computer
		you are using; the browser software you use and your operating system;
		the date and time you access the Website; and the Internet address of
		the website from which you linked directly to the Website. We may use
		this information to measure the number of visitors to areas of the
		Website, and to help us make the Website more useful and interesting to
		our visitors. We may use cookies to gather statistical information
		about the Website such as Website visiting patterns to help target
		advertisements based on User interests. Some consumers may not know
		that cookies are being placed on their computers when they visit
		websites. If you want to know when this happens, or to prevent it from
		happening, you can set your browser to advise you when a website
		attempts to place a cookie on your computer.`,
        h11: 'Do We Share Your Information?',
        p18: `We may only share your personal information with third-party
		independent contractors for purposes of tracking information generated
		through the Website for marketing purposes. If we engage a third-party
		independent contractor, they will be obligated not to use or share your
		personal information for unauthorized purposes.`,
        p19: `We will never sell, rent, or lease your
        personal information to a third party.`,
        p20: `INNOCELF LLC may use your Collected Information in the following
		ways:`,
        p21: `Contact Information: We may use your Contact Information to
		provide information that you have requested on the Contact and Virtual
		Appointment Forms, send you a requested publication, or send you our
		blog post as published if you have subscribed to our feed.
		Specifically, we may use your email address and phone number to contact
		you.`,
        p22: `Customer Information: Any Customer Information that you disclose
		to us may be used to respond to your inquiries submitted to us on the
		Contact and Virtual Appointment Forms.`,
        p23: `Statistical Information: We may use Statistical Information to
		help diagnose problems with and maintain our computer servers, to
		manage our Website, and to enhance our Website and services based on
		the usage pattern data we receive. We may generate reports and analysis
		based on the Statistical Information for internal analysis, monitoring,
		and marketing decisions. We may provide Statistical Information to
		independent third parties for marketing purposes, but when we do so, we
		will not provide them with any personal information.`,
        h12: 'Other Disclosures',
        p24: `We may also disclose your personal information to comply with a
		court order, subpoena, search warrant, or other legal process; to
		comply with legal, regulatory, or administrative requirements of any
		governmental authorities; to protect and defend INNOCELF LLC its
		subsidiaries and affiliates, and their officers, directors, employees,
		attorneys, agents, contractors, and partners, in connection with any
		legal action, claim, or dispute; to enforce the Terms and Conditions of
		Use of the Website; to prevent imminent physical harm; and in the event
		that we find that your actions on the Website violate any laws.`,
        p25: `We reserve the right to transfer your personal information to a
		third party in the event of a transfer of all or substantially all of
		INNOCELF LLC assets, provided that the third party agrees to adhere to
		the terms of this privacy policy.`,
        h13: 'Opt Out',
        p26: `You may “Opt out” of having your personal information shared by
		providing us with written notice identifying which communications you
		choose not to receive by writing us at: 48342 Carnegie Way, Macomb,
		Michigan - 48042`,
        h14: 'Data Retention',
        p27: `We will retain your Personal Information for the period necessary
		to fulfill the purposes outlined in this Privacy Policy unless a longer
		retention period is required or allowed by law.`,
        h15: 'Third-Party Hosting',
        p28: `We may contract with third parties to maintain and host the
		Website. Any information you submit to us, including personal
		information, may be placed and stored on a computer server maintained
		by this third-party host.`,
        h16: 'Website Technologies',
        p29: `INNOCELF LLC does not provide the technologies used to build this
		Website, and therefore, neither recommends nor endorses the same. Any
		information regarding identified technologies, including their
		capabilities, limitations, and applications, should be sought directly
		from their manufacturers. INNOCELF LLC hereby disclaims any rights to
		trademarks, service marks, trade names, logos, copyrights, patents,
		domain names, or other intellectual property interests of third
		parties.`,
        h17: 'Links to Other Materials',
        p30: `The Website contains links to other websites, including but not
		limited to, Facebook, Twitter, LinkedIn, Instagram, and YouTube. These
		links and plug-ins are for your convenience. Websites linked to and
		from the Website are not necessarily under the control of INNOCELF LLC
		, and INNOCELF LLC shall have no responsibility or liability whatsoever
		for the content or privacy practices of any linked websites, or any
		link or linking program at any time. You should read and understand
		INNOCELF LLC policies with respect to such third-party links, as stated
		in the Terms and Conditions of the Website.`,
        h18: 'Security',
        p31: `The Website uses commercially reasonable security measures to
		protect the loss, misuse, and alteration of the information under our
		control; however no system is impenetrable.`,
        p32: `We use reasonable and appropriate physical, electronic, and
		administrative safeguards to protect personal data from loss, misuse
		and unauthorized access, disclosure, alteration and destruction, taking
		into account the nature of the Personal Information and risks involved
		in processing that information.`,
        h19: 'Privacy Rights Notice to California Residents',
        p33: `The State of California enacted the Shine the Light law
		(California Civil Code Section 1798.83) that permits users who are
		California residents to request certain information regarding the
		disclosure of certain “personal information” during the past year for
		marketing purposes. To make such a request, please contact us using our
		contact form or alternatively write to us at INNOCELF LLC , 48342
		Carnegie Way, Macomb, Michigan - 48042.`,
        h20: 'Effective Date and Changes',
        p34: `This privacy policy is effective as of January 01, 2022. INNOCELF
		LLC reserves the right to revise this Privacy Policy from time to time
		to reflect changes to our business, the Website or Services, or
		applicable laws. The revised Privacy Policy will be effective as of the
		published effective date.`,
        p35: `YOUR CONTINUED USE OF THE WEBSITE FOLLOWING OUR POSTING OF A
		CHANGE NOTICE WILL CONSTITUTE BINDING ACCEPTANCE OF THOSE CHANGES.`,
    };

    let subHead1 = new ComponentsTS.HeadingOrParagraph('h6', 'Innocelf, LLC')
        .result;
    let subHead2 = new ComponentsTS.HeadingOrParagraph(
        'h6',
        'Website Privacy Policy'
    ).result;
    let subHead3 = new ComponentsTS.HeadingOrParagraph(
        'h6',
        'Revised as of January 01, 2022'
    ).result;
    paraContainer.append(subHead1, subHead2, subHead3);

    Object.keys(privacyPageObject).map((item) => {
        let element = document.createElement('p');
        if (item.includes('h')) {
            element = __typicalHeading(privacyPageObject[item]);
        } else if (item.includes('p')) {
            element = __typicalParagraph(privacyPageObject[item]);
        }
        paraContainer.append(element);
    });

    let footer = new Footer().render().result;
    let app = document.getElementById('app');
    app.append(navbar, heading, paraContainer, footer);
}

/**
 * The function renders the Disclaimer Page /disclaimer
 */
export function renderDisclaimerPage() {
    // new PageHeadElements(STATE.disclaimer.meta, STATE.disclaimer.title);
    let navbar = new Navbar().render().result;
    let heading = createHeadingWithBlueBackground('Disclaimer');

    let paraContainer = document.createElement('div');
    paraContainer.classList.add(
        'block',
        'w-11/12',
        'mx-auto',
        'my-20',
        'lg:w-2/3',
        '2xl:w-1/2'
    );

    let privacyPageObject = {
        h1: 'Not Legal Advice',
        p1: `The information contained in this website is provided for
		informational purposes only, and should not be construed as legal
		advice, nor are they intended as a source of advertising or
		solicitation. The transmission and receipt of information contained on
		this Web site, in whole or in part, or communication with Innocelf, LLC
		via the Internet or email through this website does not constitute or
		create a client relationship between us and any recipient. You should
		not send us any confidential information in response to this webpage.
		Such responses will not create a client relationship, and whatever you
		disclose to us will not be privileged or confidential unless we have
		agreed and you have executed a written engagement agreement with
		Innocelf, LLC. The material on this website may not reflect the most
		current legal developments. We disclaim all liability in respect to
		actions taken or not taken based on any or all the contents of this
		site to the fullest extent permitted by law. Do not act or refrain from
		acting upon this information without seeking professional legal counsel
		in your own state. No past results serve in any way as a guarantee of
		future results.`,
        h2: 'Testimonials',
        p2: `Testimonials found on this website are actual client reviews of
		INNOCELF, LLC or team members. We appreciate our clients and their
		willingness to share their experiences. Please keep in mind that the
		success of any matter depends on the unique circumstances of each case:
		we cannot guarantee particular results for future clients based on
		successes we have achieved in past matters.`,
    };

    Object.keys(privacyPageObject).map((item) => {
        let element = document.createElement('p');
        if (item.includes('h')) {
            element = __typicalHeading(privacyPageObject[item]);
        } else if (item.includes('p')) {
            element = __typicalParagraph(privacyPageObject[item]);
        }
        paraContainer.append(element);
    });

    let footer = new Footer().render().result;
    let app = document.getElementById('app');
    app.append(navbar, heading, paraContainer, footer);
}

/**
 * The function renders the Privacy Policy Page /privacy-policy
 */
export function renderTermsOfUsePage() {
    // new PageHeadElements(
    //     STATE.termsAndConditions.meta,
    //     STATE.termsAndConditions.title
    // );
    let navbar = new Navbar().render().result;
    let heading = createHeadingWithBlueBackground('Terms of Use');

    let paraContainer = document.createElement('div');
    let paraContainerClasses = [
        'block',
        'w-11/12',
        'mx-auto',
        'my-16',
        'lg:w-2/3',
        '2xl:w-1/2',
    ];
    paraContainerClasses.map((item) => {
        paraContainer.classList.add(item);
    });
    let privacyPageObject = {
        p1: `Welcome to innocelf.com (the “Website”). Innocelf, LLC provides
		access to the Website to you subject to the following terms and
		conditions. In return for accessing the Website, you agree to be bound
		by these terms and conditions of use without limitation or
		qualification. This is a legally binding agreement between you as the
		user(s) of the Website (hereinafter may be referred to as “you”,
		“your”, “User”, or “Visitor”) and Innocelf, LLC (hereinafter may be
		referred to as “we,'' “our,” “Innocelf,” or “Innocelf.com”). If you do
		not intend to be legally bound by these terms and conditions of use, do
		not access or use the Website. Essentially, if you visit the Website,
		you accept these terms and conditions of use. Please read them
		carefully.`,
        h1: 'Geographic Scope',
        p2: `The Website may be viewed throughout the United States as well as
		internationally, and may contain references to services not available
		in all States of the United States or in all countries. References to a
		particular service does not imply that we intend to make such services
		available in such states or countries. No warranty or representation is
		given that a particular product or service will be available for all
		website visitors.`,
        h2: 'Service Descriptions',
        p3: `We attempt to be as accurate as possible in describing our company
		and the services we offer; however, we do not warrant that the service
		descriptions or other content of this Website is accurate, complete,
		reliable, current, or error-free.`,
        h3: 'Electronic Communications',
        p4: `When you contact us through the Website, or send an email to an
		address located on the Website, you are communicating with us
		electronically. You consent to receive a response from us
		electronically. We may communicate with you by email or by posting
		notices on the Website. For example, you acknowledge and agree that we
		may amend these terms and conditions at any time by posting the amended
		and restated terms on the Website. By continuing to use the Website,
		you agree that the amended Terms will apply to you.`,
        h4: 'General Use',
        p5: `If you use the Website, you are responsible for maintaining the
		confidentiality of your personal information, for restricting access to
		your computer, and you agree to accept responsibility for all
		activities that occur when accessing our Website via your computer. As
		a condition of your access to and use of the Website, you agree that
		you will comply with all applicable laws and regulations. You agree to
		use the Website solely for your own private and internal purposes. You
		agree that (a) you will not copy, reproduce, download, re-publish,
		sell, distribute or resell any information, text, images, graphics, or
		other information available on or through the Website (the “Website
		Content”), and (b) you will not copy, reproduce, download, compile or
		otherwise use any Website Content for the purposes of operating a
		business that competes with Innocelf, LLC, or otherwise commercially
		exploiting the Website Content. You agree further not to undertake any
		action to undermine the integrity of our computer systems or networks
		and/or attempt to gain unauthorized access to such computer systems or
		networks. The use of this website is at the discretion of Innocelf,
		LLC; and Innocelf, LLC may terminate your use of this website at any
		time.`,
        h5: 'Visitor Responsibility',
        p6: `You represent, warrant and agree that (a) you have full power and
		authority to accept these terms and conditions; (b) you use the Website
		for your own personal or business purposes only; (c) you are over the
		age of eighteen (18), and (d) all information that you provide through
		our Contact and Virtual Appointment Forms are accurate.`,
        p7: `You further warrant and agree that (a) you shall be solely
		responsible for obtaining all necessary third party licenses and
		permissions regarding any information you submit; (b) any information
		that you provide us does not infringe or violate any of the copyright,
		patent, trademark, trade name, trade secrets or any other personal or
		proprietary rights of any third party (“Third Party Rights”); (c) you
		have the right and authority to secure any services requested through
		our Contact Us or Virtual Appointment forms; and (d) you will indemnify
		Innocelf, LLC against any claim(s) resulting from content you supply.`,
        p8: `You further represent, warrant and agree that any information that
		you submit shall: (a) be true, accurate, complete and lawful; (b) not
		be false, misleading or deceptive; (c) not contain information that is
		defamatory, libelous, threatening or harassing, obscene, objectionable,
		offensive, sexually explicit or harmful; (d) not contain information
		that is discriminatory or promotes discrimination based on race, sex,
		religion, nationality, disability, sexual orientation or age; (e) not
		violate these terms and conditions; (f) not violate any applicable laws
		and regulations or promote any activities which may violate any
		applicable laws and regulations; and/or (g) not contain any link
		directly or indirectly to any other websites which includes any content
		that may violate these terms.`,
        p9: `By transmitting or posting any non-confidential information to
		Innocelf, LLC you grant Innocelf, LLC a non-exclusive, royalty-free,
		perpetual, irrevocable, and fully sub-licensable right to use such
		information for any purpose, including, but not limited to, its
		reproduction, modification, adaptation, publication, translation, use
		in derivative works, distribution, and display throughout the world in
		any media. You also grant Innocelf, LLC and sublicensees the right, at
		their sole discretion but without any obligation to do so, to use the
		name you submit in connection with such content. You further agree that
		the license granted herein includes the right to use or authorize use
		of any ideas, concepts, know-how or techniques contained in such
		information for any purpose whatsoever, including, but not limited to,
		developing, manufacturing and marketing products or services
		incorporating such information.`,
        p10: `You agree that neither Innocelf, LLC nor its licensees will be
		liable to you for any use of any information you submit. Innocelf, LLC
		has the right, but not the obligation, to monitor and edit or remove
		any content.`,
        p11: `You acknowledge and agree that you, the user, are solely
		responsible for any information you submit to Innocelf, LLC or this
		website and further agree, that Innocelf, LLC has no responsibility for
		the content of any such submissions, including their legality,
		reliability and appropriateness.`,
        h6: 'Cooperation with Law Enforcement or Legal Proceeding',
        p12: `We reserve the right to cooperate fully with governmental
		authorities, private investigators and/or injured third parties in the
		investigation of any suspected criminal or civil wrongdoing. Further
		Innocelf, LLC may disclose any communications or contact information
		provided to us, if requested by a government or law enforcement body,
		an injured third party, or as a result of a subpoena or other legal
		action. We shall not be liable for damage that results arising from
		such disclosure, and you agree not to bring any action or claim against
		us for such disclosure. You agree to indemnify Innocelf, LLC, our
		affiliates, directors, employees, agents and representatives and to
		hold them harmless from any and all damages, losses, claims and
		liabilities (including legal costs on a full indemnity basis) which may
		arise from your use of the Website or from your breach of these
		terms.`,
        h7: 'License and Website Access',
        p13: `We grant you a nonexclusive, non transferable, revocable limited
		right and license to access the Website and the material provided
		hereon. This license does not include any rights of resale or
		commercial use of the Website or its contents; any collection and use
		of any descriptions of services; any derivative use of the Website or
		its contents; any downloading or copying of information for the benefit
		of another company; or any use of data mining, robots, or similar data
		gathering and extraction tools. The Website may not be reproduced,
		duplicated, copied, sold, resold, visited, or otherwise exploited for
		any commercial purpose. Any unauthorized use terminates the permission
		or license granted by Innocelf, LLC.`,
        p14: `You are granted a limited, revocable, and nonexclusive right to
		create a hyperlink to the homepage of Innocelf, LLC so long as the link
		does not portray Innocelf, LLC or its services, in a false, misleading,
		derogatory, or otherwise offensive matter. You may not use any
		proprietary graphic, trade name, trademark, or service mark of
		Innocelf, LLC or any of its affiliates as part of the link without the
		express, written consent of Innocelf, LLC.`,
        h8: 'Links',
        p15: `These terms and conditions of use apply only to this Website, and
		not to the websites of any other person or entity. We may provide links
		to other websites or resources (such as, but not limited to, Facebook,
		Twitter, Instagram, You Tube, and LinkedIn). You acknowledge and agree
		that we are not responsible for the availability of such external
		websites or resources, and do not endorse (and are not responsible or
		liable for) any content, advertising, products, services, or other
		materials on or available from such other websites or resources. You
		further acknowledge and agree that, under no circumstances, will we be
		held responsible or liable, directly or indirectly, for any loss or
		damage that is caused or alleged to have been caused to you in
		connection with your use of, or reliance on, any content,
		advertisements, or other resources available from any other website
		(regardless of whether we directly or indirectly link to such content,
		advertisements, products, services, or other resources). You should
		direct any concerns with respect to any other websites to that
		website’s administrator.`,
        h9: 'Copyright',
        p16: `All content included on the Website, including, but not limited
		to, text, design, graphics, logos, button icons, images, and code, is
		the property of Innocelf, LLC and is protected by United States and
		international copyright laws. Nothing contained on the Website should
		be construed as granting, by implication, estoppel, or otherwise, any
		license or right to use any of the copyrighted works displayed or
		contained in the Website without our express, written consent.`,
        h10: 'Trademarks',
        p17: `Innocelf, LLC may own certain registered and unregistered
		trademarks in the United States or other countries, including but not
		limited to Innocelf, LLC and various stylized versions thereof.`,
        p18: `The registered and unregistered trademarks, service marks, trade
		names, graphics, logos, page headers, button icons, scripts, trade
		dress, or other indicia of trade origin of Innocelf, LLC or its
		affiliates may not be used in connection with any business, product, or
		service in any manner that is likely to cause confusion among
		customers, the trade, or the public, or in any manner that disparages
		or discredits Innocelf, LLC or any of its affiliates. All other
		trademarks, service marks, trade names, and logos not owned by
		Innocelf, LLC that appear on the Website are the property of their
		respective owners, who may or may not be affiliated with, connected to,
		or sponsored by Innocelf, LLC. Nothing contained on the Website should
		be construed as granting, by implication, estoppel or otherwise, any
		license or right to use any of the trademarks, service marks, trade
		names, graphics, logos, page headers, button icons, scripts, trade
		dress, or other indicia of trade origin of Innocelf, LLC displayed or
		contained in the Website without our express, written consent.`,
        h11: 'Patents',
        p19: `One or more patents may apply to the Website and the services
		accessible via the Website. Nothing contained on the Website should be
		construed as granting, by implication, estoppel or otherwise, any
		license or right to use any of the foregoing patents, licensed patents,
		or patentable inventions contained therein without our expressed
		written consent.`,
        h12: 'Copyright Complaints',
        p20: `We respect the intellectual property rights of others, and we ask
		our users to do the same. If you believe that your work has been copied
		in a way that constitutes copyright infringement, please provide the
		following information to Innocelf, LLC as specified below:`,
    };
    let privacyPageObject2 = {
        p21: `You may send any notices, including notices of copyright
		infringement under the Digital Millennium Copyright Act, to us at
		Innocelf, LLC, 48342 Carnegie Way, Macomb, Michigan -48042. Please note
		that this procedure is exclusively for notifying us that your
		copyrighted material may have been infringed. All intellectual property
		infringement claims shall be made under penalty of perjury.`,
        p22: `THIS POLICY IS INTENDED TO COMPLY FULLY WITH THE REQUIREMENTS OF
		THE ONLINE COPYRIGHT INFRINGEMENT LIABILITY LIMITATION ACT.`,
        h13: 'Disclaimer',
        p23: `THE INFORMATION ON THIS SITE IS PROVIDED ON AN "AS IS," "AS
		AVAILABLE" BASIS. YOU AGREE THAT USE OF THIS SITE IS AT YOUR SOLE RISK.
		INNOCELF LLC DISCLAIMS ALL WARRANTIES OF ANY KIND, INCLUDING BUT NOT
		LIMITED TO ANY EXPRESS WARRANTIES, STATUTORY WARRANTIES, AND ANY
		IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
		PURPOSE, AND NON-INFRINGEMENT. TO THE EXTENT YOUR JURISDICTION DOES NOT
		ALLOW LIMITATIONS ON WARRANTIES, THIS LIMITATION MAY NOT APPLY TO YOU.
		YOUR SOLE AND EXCLUSIVE REMEDY RELATING TO YOUR USE OF THE SITE SHALL
		BE TO DISCONTINUE USING THE SITE.`,
        h14: 'Limitation of Liability',
        p24: `UNDER NO CIRCUMSTANCES WILL SAGACITY LEGAL PLLC BE LIABLE OR
		RESPONSIBLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL
		(INCLUDING DAMAGES FROM LOSS OF BUSINESS, LOST PROFITS, LITIGATION, OR
		THE LIKE), SPECIAL, EXEMPLARY, PUNITIVE, OR OTHER DAMAGES, UNDER ANY
		LEGAL THEORY, ARISING OUT OF OR IN ANY WAY RELATING TO THE SITE, YOUR
		SITE USE, OR THE CONTENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
		DAMAGES. YOUR SOLE REMEDY FOR DISSATISFACTION WITH THE SITE AND/OR
		CONTENT IS TO CEASE ALL OF YOUR SITE USE.`,
        p25: `You may have additional rights under certain laws (including
		consumer laws) which do not allow the exclusion of implied warranties,
		or the exclusion or limitation of certain damages. If these laws apply
		to you, the exclusions or limitations in this Agreement that directly
		conflict with such laws may not apply to you.`,
        h15: 'Disclaimers and Warranties',
        p26: `The testimonials, reviews, comments, and client satisfaction
		stories herein provided on the Website reflect the real life
		experiences of individuals and businesses who used our products or
		services. However, individual results may vary.`,
        p27: `Please keep in mind that we cannot guarantee particular results
		for future clients based on successes and satisfaction of past
		clients.`,
        p28: `We do not claim, nor should the reader assume, that any
		individual experience recounted is typical or representative of what
		any other consumer might experience. Testimonials and client success
		stories are not necessarily representative of what anyone else using
		our services may experience.`,
        p29: `SOME JURISDICTIONS PROVIDE FOR CERTAIN WARRANTIES, LIKE THE
		IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
		AND NON-INFRINGEMENT. TO THE EXTENT PERMITTED BY LAW, WE EXCLUDE ALL
		WARRANTIES.`,
        h16: 'Content Disclaimer',
        p30: `The information contained in this website is provided for
		informational purposes only, and should not be construed as legal
		advice, nor are they intended as a source of advertising or
		solicitation. The material on this website may not reflect the most
		current legal developments. The content and interpretation of the law
		addressed herein is subject to revision. We disclaim all liability in
		respect to actions taken or not taken based on any or all the contents
		of this site to the fullest extent permitted by law. Do not act or
		refrain from acting upon this information without seeking professional
		legal counsel in your own state. No past results serve in any way as a
		guarantee of future results.`,
        h17: 'Governing Law',
        p31: `The laws of the State of Michigan shall govern any disputes
		arising out of or relating to this Website, or the services listed on
		the Website. By visiting the Website, you further agree that the laws
		of the State of Michigan, without regard to principles of conflict of
		laws, will govern these terms and conditions of use, and any dispute of
		any sort that might arise between you and INNOCELF, LLC.`,
        h18: 'Disputes',
        p32: `Any dispute relating in any way to your visit to the Website
		shall be submitted to confidential binding arbitration in Macomb
		County, Michigan, except that, to the extent you have in any manner
		violated or threatened to violate our intellectual property rights,
		INNOCELF, LLC may seek injunctive or other appropriate relief in any
		state or federal court in the State of Michigan, and you consent to the
		exclusive jurisdiction and venue in such courts. Arbitration under
		these terms and conditions of use shall be conducted under the rules
		then prevailing of the American Arbitration Association. The
		arbitrator’s award shall be binding and may be entered as a judgment in
		any court of competent jurisdiction. To the fullest extent permitted by
		applicable law, no arbitration under these terms and conditions of use
		shall be joined to an arbitration involving any other party subject to
		these terms and conditions of use, whether through class arbitration
		proceedings or otherwise.`,
        h19: 'Website Policies, Modification, and Severability',
        p33: `As noted above, you are encouraged and advised to review the
		terms and conditions of use and privacy policy posted on the Website.
		These policies govern your visit to the Website. By using the Website,
		you agree to be bound by and to abide by these policies, just as if you
		had signed an agreement. We reserve the right, in our sole discretion,
		to change, modify, add to, or remove portions of the Website, the terms
		and conditions of use and the privacy policy at any time. You should
		check these terms and conditions of use and privacy policy periodically
		for changes.`,
        p34: `By using the Website after we post any changes to the terms and
		conditions of use or the privacy policy, you agree to accept those
		changes, regardless of whether you have reviewed them. If you do not
		agree to these terms and conditions of use and the privacy policy, you
		should not use the Website.`,
        p35: `If any of these terms or conditions is deemed invalid, void, or
		for any reason unenforceable, that condition will be deemed severed and
		will not affect the validity and enforceability of any remaining
		condition. Headings are for reference purposes only and in no way
		define, limit, construe or describe the scope or extent of such
		section.`,
        p36: `If you do not comply with these terms and we do not take action
		immediately, this doesn’t mean that we are giving up any rights that we
		may have (such as taking action in the future).`,
        p37: `Our decision not to enforce any right or decision not to act with
		respect to any breach by you under the Terms will not constitute a
		waiver of that right nor a waiver of our right to act with respect to
		subsequent or similar breaches.`,
        p38: `We shall have the right to assign these terms. You may not
		assign, in whole or part, the terms to any person or entity. This
		constitutes the entire agreement between you and INNOCELF, LLC and
		governs your use of the Website, superseding any prior written or oral
		agreements in relation to the same subject matter herein.`,
    };

    let subHead1 = new HeadingOrParagraph('h6', 'Innocelf, LLC').result;
    let subHead2 = new HeadingOrParagraph(
        'h6',
        'Website Terms and Conditions of Use'
    ).result;
    let subHead3 = new HeadingOrParagraph(
        'h6',
        'Revised as of January 01, 2022'
    ).result;
    paraContainer.append(subHead1, subHead2, subHead3);

    Object.keys(privacyPageObject).map((item) => {
        let element = document.createElement('p');
        if (item.includes('h')) {
            element = __typicalHeading(privacyPageObject[item]);
        } else if (item.includes('p')) {
            element = __typicalParagraph(privacyPageObject[item]);
        }
        paraContainer.append(element);
    });
    //
    // Create a list
    let listItems = [
        `An electronic or physical signature of the person authorized to act on
        behalf of the owner of the copyright interest;`,
        `A description of the
        copyrighted work that you claim has been infringed upon;`,
        `A
        description of where the material that you claim is infringing is
        located on the Website;`,
        `Your address, telephone number, and e-mail
        address;`,
        `A statement that you have a good faith belief that the
        disputed use is not authorized by the copyright owner, its agent, and or
        the law; and`,
        `A statement by you, made under penalty of perjury, that
        the above information in your notice is accurate, and that you are the
        copyright owner or authorized to act on the copyright owner’s behalf.`,
    ];

    let ulElement = document.createElement('ul');
    let ulElementClasses = [
        'text-sm',
        'font-medium',
        'lato-regular',
        'list-disc',
        'list-outside',
        'mt-5',
        'ml-10',
        'sm:text-base',
        'lg:text-lg',
        'lg:ml-16',
        '2xl:text-lg',
    ];
    ulElementClasses.map((item) => {
        ulElement.classList.add(item);
        let subHead1 = new ComponentsTS.HeadingOrParagraph(
            'h6',
            'Not Legal Advice'
        ).result;
        paraContainer.append(subHead1);
    });
    listItems.map((item) => {
        let liElement = document.createElement('li');
        liElement.textContent = item;
        ulElement.append(liElement);
    });
    paraContainer.append(ulElement);

    Object.keys(privacyPageObject2).map((item) => {
        let element = document.createElement('p');
        if (item.includes('h')) {
            element = __typicalHeading(privacyPageObject2[item]);
        } else if (item.includes('p')) {
            element = __typicalParagraph(privacyPageObject2[item]);
        }
        paraContainer.append(element);
    });

    let footer = new Footer().render().result;
    let app = document.getElementById('app');
    app.append(navbar, heading, paraContainer, footer);
}
