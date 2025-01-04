let lists = [
	{
		type: '웹사이트',
		name: '하림지주',
		image: 'harim',
		link: 'https://harimholdings.com/kr/'
	},
	{
		type: '웹사이트',
		name: 'EBS Media',
		image: 'ebs',
		link: 'https://ebsmedia.kr/'
	},
	{
		type: '웹사이트',
		name: 'ZEUS',
		image: 'zeus',
		link: 'https://www.globalzeus.com/kr/'
	},
	{
		type: '웹사이트',
		name: 'OTO',
		image: 'oto',
		link: 'http://www.oto.kr/'	
	},
	{
		type: '웹사이트',
		name: 'Sharp Aviation K',
		image: 'sharp',
		link: 'https://www.sharp.co.kr/kr/index.asp'	
	},
	{
		type: '웹사이트',
		name: 'Basgenbio',
		image: 'basgen',
		link: 'https://basgenbio.com/kr/'	
	},
	{
		type: '웹사이트',
		name: 'AJ Energy',
		image: 'aj',
		link: 'https://www.ajenergy.co.kr/'	
	},
	{
		type: '웹사이트',
		name: 'LOGOS',
		image: 'logos',
		link: 'https://www.lawlogos.com/'	
	},
	{
		type: '웹사이트',
		name: 'Buil',
		image: 'buil',
		link: 'https://builsf.com/'	
	},
	{
		type: '웹사이트',
		name: '아리씨',
		image: 'recci',
		link: 'https://recci.co.kr/'	
	},
	{
		type: '웹사이트',
		name: '한강식품',
		image: 'hangang',
		link: 'https://hangangfood.com/'	
	},
	{
		type: '웹사이트',
		name: 'Clavis',
		image: 'clavis',
		link: 'https://www.claviscorp.com/kr/'	
	},
	{
		type: '웹사이트',
		name: 'NGeneBio',
		image: 'ngene',
		link: 'https://www.ngenebio.com/kr/'	
	},
	{
		type: '웹사이트',
		name: 'Kornic Automation',
		image: 'kornic',
		link: 'https://www.kornic.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: 'Sugentech',
		image: 'sugentech',
		link: 'http://sugentech-n.webmoa21.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: 'Illimis therapeutics',
		image: 'illimis',
		link: 'https://illimistx.com/kr/'	
	},
	{
		type: '웹사이트',
		name: 'Purium',
		image: 'purium',
		link: 'https://www.purium.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: '한국의료재단',
		image: 'komef',
		link: 'https://komef.org/'	
	},
	{
		type: '웹사이트',
		name: 'Bestinnovation',
		image: 'best',
		link: 'http://www.bestinnovation.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: '노원문화원',
		image: 'nwcc',
		link: 'https://www.nwcc.or.kr/'	
	},
	{
		type: '웹사이트',
		name: 'Myriad Life Sciences',
		image: 'myriad',
		link: 'https://www.myriadls.com/en/'	
	},
	{
		type: '웹사이트',
		name: '정인회계법인',
		image: 'jungin',
		link: 'http://jungincpa.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: '신백아동복지관',
		image: 'sbkid',
		link: 'https://www.sbkid.kr/'	
	},
	{
		type: '웹사이트',
		name: 'Kaltech',
		image: 'kaltech',
		link: 'https://kaltech.jp/jp/'	
	},
	{
		type: '웹사이트',
		name: '정광엔지니어링',
		image: 'jungkwang',
		link: 'http://www.jke.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: 'IS Tec',
		image: 'is',
		link: 'https://www.istec.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: 'Stemon',
		image: 'stemon',
		link: 'https://www.stemon.co.kr/en/'	
	},
	{
		type: '웹사이트',
		name: 'Stonebridge',
		image: 'stone',
		link: 'https://stonebridgecapital.co.kr/kr/'	
	},
	{
		type: '웹사이트',
		name: '세종광역정신건강복지센터',
		image: 'simplus',
		link: 'https://simplus.kr/indexNew.asp'	
	},
	{
		type: '웹사이트',
		name: '세종광역시자살예방센터',
		image: 'safety',
		link: 'https://safety.simplus.kr/index.asp'	
	},
	{
		type: '웹사이트',
		name: 'YSL Agency',
		image: 'ysl',
		link: 'http://yslagency.com/kr/'	
	},
	{
		type: '웹사이트',
		name: '해바라기센터',
		image: 'sunflower',
		link: 'https://sunflowercenter.or.kr/'	
	},
	{
		type: '웹사이트',
		name: '행복마루',
		image: 'hmaru',
		link: 'https://hmaru.co.kr/'	
	},
	{
		type: '웹사이트',
		name: '원 인터내셔널',
		image: 'wonitl',
		link: 'https://wonitl.com/'	
	},
	{
		type: '웹사이트',
		name: '제일타카',
		image: 'jitool',
		link: 'http://www.jitool.com/kr/'	
	},
	{
		type: '제안시안',
		name: 'Celltrion',
		image: 'celltrion',
		link: 'http://sian.webmoa21.co.kr/celltrion/b/index.html'
	},
	{
		type: '제안시안',
		name: '동아ST',
		image: 'dongast',
		link: 'http://sian.webmoa21.co.kr/dongast/a/index.html'
	},
	{
		type: '제안시안',
		name: '동아쏘시오홀딩스',
		image: 'dongasocio',
		link: 'http://sian.webmoa21.co.kr/donga/b/index.html'
	},
	{
		type: '제안시안',
		name: '한국카본',
		image: 'carbon',
		link: 'http://sian.webmoa21.co.kr/kcarbon/index.html'
	},
	{
		type: '제안시안',
		name: 'Neooto',
		image: 'neooto',
		link: 'http://sian.webmoa21.co.kr/neooto/b/'
	}
]