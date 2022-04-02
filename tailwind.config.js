module.exports = {
	purge: {
		enabled: true,
		content: [
			'./innocelf/innoservices/static/innoservices/js/*.js',
			'./innocelf/innoservices/static/innoservices/js/ComponentClasses/*.js',
			'./innocelf/innoservices/templates/innoservices/*.html',
			'./innocelf/ClientAdmin/static/ClientAdmin/js/*.js',
			'./innocelf/ClientAdmin/templates/ClientAdmin/*.html',
		],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				innoblack: '#0d161e',
				// innoblack: "#0f0f0f",
			},
			transitionDuration: {
				1200: '1200ms',
				1500: '1500ms',
				2000: '2000ms',
			},
			backgroundImage: {
				'homepage-graphic': "url('/static/innoservices/img/homepage_graphic.svg')",
				'polkadot-graphic': "url('/static/innoservices/img/firstPage/firstPageDottedBackgroundWhiteBackground.svg')",
			},
			height: {
				'full-120': '120%',
				'full-150': '150%',
			},
			width: {
				'3/10': '30%',
				'92p': '92px',
				'125p': '125px'
			},
			lineHeight: {
				12: '4rem',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			backgroundOpacity: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			borderColor: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			borderOpacity: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			boxShadow: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			opacity: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			outline: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			ringColor: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			ringOffsetColor: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			ringOffsetWidth: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			ringOpacity: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			ringWidth: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			textColor: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
			textOpacity: ['active', 'group-focus', 'disabled', 'visited', 'checked'],
		},
	},
	plugins: [],
};
