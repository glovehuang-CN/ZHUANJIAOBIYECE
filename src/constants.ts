import { Heart, Shield, Award, Users, Camera, Map, GraduationCap, BookOpen, Layers, Image as ImageIcon, ChevronRight, Star, Info, Mic, Share2, Download, X } from 'lucide-react';

export const BRAND_DATA = {
  name: "转角网",
  slogan: "以匠心致初心，用影像传承文化",
  intro: "2011年，转角网以'让每一个孩子的成长都被温柔以待'的初心创立，开创了中国毕业纪念册时代。15年来，我们始终坚守'原创、专业、品质'三大核心价值，成长为中国校园影像文化的引领者。",
  philosophy: [
    {
      title: "坚守原创设计",
      desc: "每年推出全新主题系列产品，拥有自主知识产权和设计专利，不跟风、不抄袭、不复制。",
      icon: Heart
    },
    {
      title: "坚守专业主义",
      desc: "所有签约摄影师均经过系统培训和严格考核；设计团队由顶尖艺术院校毕业的资深设计师组成。",
      icon: Camera
    },
    {
      title: "坚守品质至上",
      desc: "采用进口顶级原材料和国际一流印刷设备，建立严格的品质管控体系，确保每一本纪念册都能传世珍藏。",
      icon: Shield
    }
  ],
  mission: "不仅是商业，更是文化传承。转角网不仅是一个商业品牌，更是中国校园影像文化的传承者和推动者。我们相信，每一本纪念册都承载着一个时代的记忆，每一张照片都镌刻着一段成长的故事。",
  honors: [
    "中国人像摄影学会校园影像专业委员会 副会长单位",
    "广东省摄影行业协会 副会长单位",
    "2025年度 中国儿童摄影行业标杆企业",
    "中国人像摄影学会授牌 中国职业人像摄影师孵化基地"
  ],
  envPhotos: [
    "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/1.webp",
    "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2.webp",
    "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/3.webp",
    "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/4.webp",
    "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/5.webp"
  ]
};

export const PRODUCTS = [
  {
    id: "12-5",
    category: "12寸毕业纪念册系列·含摄影服务",
    name: "经典永恒·套餐",
    price: 278,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E7%BB%8F%E5%85%B8%E6%B0%B8%E6%81%92.webp",
    content: [
      "①《经典永恒》主题毕业纪念册*1本",
      "②创意毕业照拍摄：4小时/一场"
    ],
    params: {
      size: "10*12寸",
      pages: "48P（面）",
      binding: "蝴蝶对裱装帧覆膜",
      material: "意大利小牛皮",
      photos: "120张",
      team: "2名摄影师",
      totalPhotos: "500张",
      time: "4小时"
    }
  },
  {
    id: "12-6",
    category: "12寸毕业纪念册系列·含摄影服务",
    name: "纵横四海·套餐",
    price: 328,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E7%BA%B5%E6%A8%AA%E5%9B%9B%E6%B5%B7.webp",
    content: [
      "①《纵横四海》主题毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③创意毕业照拍摄：4小时/一场"
    ],
    params: {
      size: "10*12寸",
      pages: "80P（面）",
      binding: "蝴蝶对裱装帧覆膜",
      material: "意大利小牛皮",
      photos: "260张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "700张",
      time: "4小时",
      mv: "3-5分钟"
    }
  },
  {
    id: "15-1",
    category: "15寸毕业纪念册系列·含摄影服务",
    name: "国色东方·套餐",
    price: 328,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E5%9B%BD%E8%89%B2%E4%B8%9C%E6%96%B9.webp",
    content: [
      "①《国色东方》主题毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：资深级"
    ],
    params: {
      size: "12*15寸",
      pages: "80P（面）",
      binding: "蝴蝶对裱装帧覆膜",
      material: "硬壳精装钻石淋膜",
      photos: "280张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "600张",
      time: "4小时",
      mv: "3-5分钟"
    }
  },
  {
    id: "12-3",
    category: "12寸毕业纪念册系列·含摄影服务",
    name: "成长之旅·烫金款·套餐",
    price: 368,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E6%88%90%E9%95%BF%E4%B9%8B%E6%97%85%C2%B7%E7%83%AB%E9%87%91%E6%AC%BE.webp",
    content: [
      "①《成长之旅》主题烫金款毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "10*12寸",
      pages: "80P（面）",
      binding: "蝴蝶对裱装帧覆膜",
      material: "甄选精品绸布",
      photos: "260张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "600张",
      time: "4小时",
      mv: "3-5分钟"
    }
  },
  {
    id: "12-4",
    category: "12寸毕业纪念册系列·含摄影服务",
    name: "时间序章·套餐",
    price: 398,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E6%97%B6%E9%97%B4%E5%BA%8F%E7%AB%A0.webp",
    content: [
      "①《时间序章》主题毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "10*12寸",
      pages: "100P（面）",
      binding: "胶装锁线双工艺",
      craft: "古铜烙印+烫金压痕",
      material: "爱尔兰小羊皮精装",
      photos: "300张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "700张",
      time: "4小时",
      mv: "5分钟"
    }
  },
  {
    id: "15-2",
    category: "15寸毕业纪念册系列·含摄影服务",
    name: "成长之旅·刺绣款·套餐",
    price: 398,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E6%88%90%E9%95%BF%E4%B9%8B%E6%97%85%C2%B7%E5%88%BA%E7%BB%A3%E6%AC%BE.webp",
    content: [
      "①《成长之旅》主题刺绣款毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "12*15寸",
      pages: "80P（面）",
      binding: "臻原再生纸对裱",
      craft: "3D刺绣+高端烫金双工艺水晶亚克力专属头像",
      material: "甄选精品绸布",
      photos: "280张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "600张",
      time: "4小时",
      mv: "5分钟"
    }
  },
  {
    id: "15-5",
    category: "15寸毕业纪念册系列·含摄影服务",
    name: "成长之旅·锁线款·套餐",
    price: 398,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E6%88%90%E9%95%BF%E4%B9%8B%E6%97%85%C2%B7%E7%83%AB%E9%87%91%E6%AC%BE.webp",
    content: [
      "①《成长之旅》主题锁线款毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "12*15寸",
      pages: "100P（面）",
      binding: "蝴蝶对裱装帧覆膜",
      craft: "烫金工艺",
      material: "甄选精品绸布",
      photos: "300张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "700张",
      time: "4小时",
      mv: "5分钟"
    }
  },
  {
    id: "12-1",
    category: "12寸毕业纪念册系列·含摄影服务",
    name: "青春赞歌·套餐",
    price: 428,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E9%9D%92%E6%98%A5%E8%B5%9E%E6%AD%8C.webp",
    content: [
      "①《青春赞歌》主题毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "10*12寸",
      pages: "92P（面）",
      binding: "精装再生纸锁线",
      craft: "极压浮雕+鎏金烫印",
      material: "甄选超纤绒布",
      photos: "300张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "700张",
      time: "4小时",
      mv: "5分钟"
    }
  },
  {
    id: "15-4",
    category: "15寸毕业纪念册系列·含摄影服务",
    name: "素年锦时·套餐",
    price: 428,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E7%B4%A0%E5%B9%B4%E9%94%A6%E6%97%B6.webp",
    content: [
      "①《素年锦时》主题毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "12*15寸",
      pages: "100P（面）",
      binding: "臻原再生纸锁线",
      craft: "铜牌刻字+立体烫金",
      material: "甄选精品绸布",
      photos: "320张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "700张",
      time: "4小时",
      mv: "5分钟"
    }
  },
  {
    id: "15-3",
    category: "15寸毕业纪念册系列·含摄影服务",
    name: "魔法学院·套餐",
    price: 468,
    image: "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E9%AD%94%E6%B3%95%E5%AD%A6%E9%99%A2.webp",
    content: [
      "①《魔法学院》主题毕业纪念册*1本",
      "②毕业MV短视频*1部",
      "③photocare三折叠照片摆台*1个",
      "④创意毕业照拍摄：4小时/一场",
      "⑤摄影师级别：总监级"
    ],
    params: {
      size: "12*15寸",
      pages: "128P（面）",
      binding: "胶装锁线双工艺",
      craft: "烫金压痕工艺个性复古铜牌",
      material: "爱尔兰小羊皮",
      photos: "380张",
      team: "2名摄影师+1名录像师",
      totalPhotos: "700张",
      time: "4小时",
      mv: "5分钟"
    }
  }
];

export const SAMPLES = [
  { 
    title: "转角原创样片展示", 
    images: [
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%870.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%871.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%872.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%873.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%874.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%875.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%876.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%877.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%878.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%879.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%8710.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%8711.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%8712.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%8713.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%8714.webp",
      "https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/2026%E8%BD%AC%E8%A7%92%E7%B2%BE%E9%80%89%E6%A0%B7%E7%89%8715.webp"
    ] 
  }
];
