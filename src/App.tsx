/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Book, 
  Layers, 
  Image as ImageIcon, 
  ChevronRight, 
  Mic, 
  Share2, 
  X, 
  Award, 
  Check,
  Download,
  ArrowLeft,
  Search,
  Info
} from 'lucide-react';
import { BRAND_DATA, PRODUCTS, SAMPLES } from './constants';
import html2canvas from 'html2canvas';

type Tab = 'home' | 'products' | 'compare' | 'samples';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [compareList, setCompareList] = useState<typeof PRODUCTS>([]);
  const [isListening, setIsListening] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExportingCompare, setIsExportingCompare] = useState(false);
  const [exportedImage, setExportedImage] = useState<string | null>(null);
  const [exportedCompareImage, setExportedCompareImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const compareExportRef = useRef<HTMLDivElement>(null);

  const getProxyUrl = (url: string) => {
    // Since user enabled CORS on Aliyun OSS, we can use direct URLs.
    // We add a simple version param to avoid cached responses that might lack CORS headers.
    if (!url || !url.startsWith('http')) return url;
    return `${url}${url.includes('?') ? '&' : '?'}v=oss-cors`;
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  // Prevent context menu to protect images, but allow it for exported results
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only if it's the exported long-press image
      if ((e.target as HTMLElement).classList.contains('saveable')) return;
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Splash Screen Logic
  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showSplash]);

  const handleExport = async () => {
    // Deprecated for direct button click, now automatic
  };

  const handleExportCompare = async () => {
    // Deprecated for direct button click, now automatic
  };

  const generateExport = async (type: 'single' | 'compare') => {
    const target = type === 'single' ? exportRef.current : compareExportRef.current;
    if (!target) return;
    
    try {
      setIsGenerating(true);
      // Wait for font/image rendering stabilizer
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const canvas = await html2canvas(target, {
        useCORS: true,
        allowTaint: false,
        scale: 3,
        logging: false,
        backgroundColor: '#ffffff',
        width: target.scrollWidth,
        height: target.scrollHeight,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0
      });
      
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      if (type === 'single') setExportedImage(dataUrl);
      else setExportedCompareImage(dataUrl);
      setIsGenerating(false);
    } catch (err) {
      console.error('Generation failed', err);
      showToast('生成失败，请重试', 'error');
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (showExportModal && selectedProduct) {
      generateExport('single');
    } else {
      setExportedImage(null);
    }
  }, [showExportModal]);

  useEffect(() => {
    if (isExportingCompare && compareList.length > 0) {
      generateExport('compare');
    } else {
      setExportedCompareImage(null);
    }
  }, [isExportingCompare]);

  const toggleCompare = (product: typeof PRODUCTS[0]) => {
    setCompareList(prev => {
      const isExist = prev.find(p => p.id === product.id);
      if (isExist) {
        const newList = prev.filter(p => p.id !== product.id);
        showToast(`已移除，当前对比 ${newList.length}/3 款`);
        return newList;
      }
      if (prev.length >= 3) {
        showToast('一次最多对比3款产品', 'error');
        return prev;
      }
      const newList = [...prev, product];
      showToast(`已添加 ${newList.length}/3 款`);
      return newList;
    });
  };

  const startVoiceRecognition = () => {
    showToast('语音功能开发中，敬请期待');
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden relative shadow-2xl pb-[env(safe-area-inset-bottom)]">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-[200] bg-white w-full max-w-[430px] mx-auto overflow-hidden pointer-events-auto"
          >
            <img 
              src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E5%BC%80%E5%B1%8F%E5%9B%BE%E7%89%87.webp")} 
              className="w-full h-full object-cover shadow-2xl" 
              alt="Splash Image" 
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-24 left-1/2 z-[100] px-4 py-2 rounded-full text-white text-sm font-bold shadow-xl flex items-center gap-2 whitespace-nowrap ${
              toast.type === 'error' ? 'bg-red-500' : 'bg-slate-800/90'
            }`}
          >
            {toast.type === 'success' && <Check size={16} />}
            {toast.type === 'error' && <Info size={16} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-primary text-white px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-4 flex justify-between items-center shrink-0 shadow-lg z-40">
        <div className="flex items-center gap-2">
          <img 
            src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E8%BD%AC%E8%A7%92%E7%99%BD%E8%89%B2%E9%80%8F%E6%98%8E%E5%BA%95LOGO.png")} 
            className="h-8 w-auto object-contain" 
            alt="Logo" 
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <h1 className="font-bold text-lg tracking-tight">转角网毕业纪念册</h1>
        </div>
        <button 
          onClick={startVoiceRecognition}
          className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`}
        >
          <Mic size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 space-y-6"
            >
              {/* Hero */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E8%BD%AC%E8%A7%92%E6%AF%95%E4%B8%9A%E5%86%8Capp-%E9%A6%96%E9%A1%B501.webp")} 
                        className="w-full h-full object-cover" 
                        alt="Hero" 
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer" 
                      />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <p className="text-white/80 text-xs font-medium uppercase tracking-widest">{BRAND_DATA.slogan}</p>
                  <h2 className="text-white text-2xl font-bold">让成长被温柔以待</h2>
                </div>
              </div>

              {/* Intro */}
              <section className="space-y-3">
                <h3 className="text-primary font-bold flex items-center gap-2">
                  <Info size={18} /> 品牌简介
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed indent-8">
                  {BRAND_DATA.intro}
                </p>
              </section>

              {/* Philosophy */}
              <section className="grid grid-cols-1 gap-4">
                {BRAND_DATA.philosophy.map((item, idx) => (
                  <div key={idx} className="bg-accent p-4 rounded-xl flex gap-4 items-start border border-primary/10">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Honors */}
              <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-primary font-bold flex items-center gap-2 mb-3">
                  <Award size={18} /> 荣誉展示
                </h3>
                <ul className="space-y-2">
                  {BRAND_DATA.honors.map((honor, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                      {honor}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Environment */}
              <section className="space-y-3">
                <h3 className="text-primary font-bold flex items-center gap-2">
                  <ImageIcon size={18} /> 公司环境
                </h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {BRAND_DATA.envPhotos.map((photo, idx) => (
                    <img 
                      key={idx} 
                      src={getProxyUrl(photo)} 
                      className="h-32 w-48 object-cover rounded-lg shrink-0 shadow-md" 
                      alt="Env" 
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer" 
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div 
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              <div className="space-y-8">
                {['12寸毕业纪念册系列·含摄影服务', '15寸毕业纪念册系列·含摄影服务'].map(cat => (
                  <div key={cat} className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 border-l-4 border-primary pl-3">{cat}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {PRODUCTS.filter(p => p.category === cat).map(product => (
                        <div 
                          key={product.id} 
                          className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 active:scale-95 transition-transform"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <div className="aspect-[3/4] relative">
                            <img 
                              src={getProxyUrl(product.image)} 
                              className="w-full h-full object-cover" 
                              alt={product.name} 
                              crossOrigin="anonymous"
                              referrerPolicy="no-referrer" 
                            />
                            <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                              查看详情
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-slate-800 text-sm truncate">{product.name}</h4>
                            <div className="flex justify-between items-end mt-1">
                              <p className="text-price font-bold text-sm">¥{product.price}</p>
                              <p className="text-slate-400 text-[9px]">{product.params.material}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'compare' && (
            <motion.div 
              key="compare"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">参数对比</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">已选 {compareList.length}/3</span>
                  {compareList.length > 0 && (
                    <button 
                      onClick={() => setIsExportingCompare(true)}
                      className="flex items-center gap-1 text-primary text-xs font-bold bg-accent px-2 py-1 rounded-lg border border-primary/20"
                    >
                      <Download size={14} />
                      生成对比表
                    </button>
                  )}
                </div>
              </div>

              {compareList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <Layers size={48} className="opacity-20" />
                  <p className="text-sm">请在产品列表中选择产品进行对比</p>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    去选择
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto no-scrollbar border rounded-xl">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="p-3 text-left border-b border-r sticky left-0 bg-slate-50 z-10 w-24">参数</th>
                        {compareList.map(p => (
                          <th key={p.id} className="p-3 text-center border-b min-w-[100px]">
                            <div className="relative">
                              <button 
                                onClick={() => toggleCompare(p)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                              >
                                <X size={12} />
                              </button>
                              <img 
                                src={getProxyUrl(p.image)} 
                                className="w-12 h-16 object-cover mx-auto rounded shadow-sm mb-2" 
                                alt={p.name} 
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer" 
                              />
                              <div className="font-bold truncate">{p.name}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { key: 'size', label: '外观尺寸' },
                        { key: 'pages', label: '纪念册页数' },
                        { key: 'binding', label: '装帧方式' },
                        { key: 'craft', label: '核心工艺' },
                        { key: 'material', label: '封面材质' },
                        { key: 'photos', label: '入册相片' },
                        { key: 'totalPhotos', label: '拍摄照片' },
                        { key: 'team', label: '摄影团队' },
                        { key: 'time', label: '拍摄时长' },
                        { key: 'mv', label: '毕业MV' },
                        { key: 'content', label: '套餐内容' },
                      ].map(row => (
                        <tr key={row.key} className="border-b last:border-0">
                          <td className="p-3 font-medium text-slate-500 border-r sticky left-0 bg-white z-10">{row.label}</td>
                          {compareList.map(p => (
                            <td key={p.id} className="p-3 text-center text-slate-700">
                              {row.key === 'content' ? (
                                <div className="text-[10px] text-left space-y-1 min-w-[120px]">
                                  {p.content ? (p.content as string[]).map((item, i) => (
                                    <div key={i} className="leading-tight">• {item}</div>
                                  )) : '/'}
                                </div>
                              ) : (
                                (p.params as any)[row.key] || '/'
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="bg-primary/5">
                        <td className="p-3 font-bold text-price border-r sticky left-0 bg-primary/5 z-10">标零售价</td>
                        {compareList.map(p => (
                          <td key={p.id} className="p-3 text-center font-bold text-price">
                            ¥{p.price}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'samples' && (
            <motion.div 
              key="samples"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-8"
            >
              {SAMPLES.map(sample => (
                <div key={sample.title} className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    {sample.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {sample.images.map((img, idx) => (
                      <div key={idx} className="overflow-hidden shadow-lg">
                        <img 
                          src={getProxyUrl(img)} 
                          className="w-full h-auto object-cover" 
                          alt={sample.title} 
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-100 flex justify-around items-center p-2 pb-[calc(8px+env(safe-area-inset-bottom))] z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {[
          { id: 'home', icon: Home, label: '品牌' },
          { id: 'products', icon: Book, label: '产品' },
          { id: 'compare', icon: Layers, label: '对比' },
          { id: 'samples', icon: ImageIcon, label: '样片' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`}
          >
            <tab.icon size={20} className={activeTab === tab.id ? 'scale-110 transition-transform' : ''} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex flex-col w-full max-w-[430px] mx-auto"
          >
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-t-3xl mt-12 relative pb-[env(safe-area-inset-bottom)]">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-black/20 text-white p-2 rounded-full backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="space-y-0">
                <img 
                  src={getProxyUrl(selectedProduct.image)} 
                  className="w-full aspect-[3/4] object-cover" 
                  alt={selectedProduct.name} 
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer" 
                />
                
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{selectedProduct.name}</h2>
                      <p className="text-price font-bold text-xl mt-1">¥{selectedProduct.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleCompare(selectedProduct)}
                        className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-all ${compareList.find(p => p.id === selectedProduct.id) ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-slate-200'}`}
                      >
                        <Layers size={18} />
                        <span className="text-[10px] font-bold mt-1">对比</span>
                      </button>
                      <button 
                        onClick={() => setShowExportModal(true)}
                        className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-accent text-primary border border-primary/20"
                      >
                        <Share2 size={18} />
                        <span className="text-[10px] font-bold mt-1">分享</span>
                      </button>
                    </div>
                  </div>

                  {selectedProduct.content && (
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Award size={16} className="text-primary" />
                        套餐内容
                      </h3>
                      <div className="space-y-2">
                        {(selectedProduct.content as string[]).map((item, idx) => (
                          <p key={idx} className="text-xs text-slate-600 leading-relaxed">{item}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.params).map(([key, value]) => {
                      const labels: Record<string, string> = {
                        size: '尺寸',
                        pages: '页数',
                        binding: '装帧',
                        craft: '工艺',
                        material: '材质',
                        photos: '入册',
                        time: '时长',
                        mv: 'MV',
                        team: '团队',
                        totalPhotos: '拍摄'
                      };
                      return (
                        <div key={key} className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{labels[key] || key}</p>
                          <p className="text-xs font-bold text-slate-700 mt-0.5">{value as string}</p>
                        </div>
                      );
                    })}
                  </div>


                  <div className="pt-8 pb-4 flex justify-center">
                    <img 
                      src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E6%AF%95%E4%B8%9A%E7%85%A7-%E9%80%89%E8%BD%AC%E8%A7%92slogan.png")} 
                      className="h-[21px] w-auto object-contain opacity-80" 
                      alt="Slogan" 
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Export Modal */}
      <AnimatePresence>
        {isExportingCompare && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsExportingCompare(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold">对比表预览</h3>
                <button onClick={() => setIsExportingCompare(false)} className="p-2"><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-slate-100 relative">
                {isGenerating && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm font-bold text-primary">正在绘制对比表...</p>
                  </div>
                )}
                
                <div className="relative min-h-[400px]">
                  {exportedCompareImage && (
                    <img 
                      src={exportedCompareImage} 
                      className="absolute inset-0 w-full h-full object-top z-20 saveable cursor-pointer" 
                      alt="Long press to save"
                    />
                  )}
                  <div ref={compareExportRef} className={`bg-white p-6 rounded-xl shadow-sm space-y-6 ${exportedCompareImage ? 'opacity-0 select-none pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: '#e2e8f0' }}>
                    <img 
                      src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E8%BD%AC%E8%A7%92%E8%93%9D%E8%89%B2%E9%80%8F%E6%98%8E%E5%BA%95LOGO.png")} 
                      className="h-8 w-auto object-contain" 
                      alt="Logo" 
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h2 className="font-bold text-lg" style={{ color: '#1e293b' }}>转角网毕业纪念册</h2>
                      <p className="text-[10px]" style={{ color: 'var(--legacy-slate-400)' }}>产品参数对比表</p>
                    </div>
                  </div>

                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr style={{ backgroundColor: 'var(--legacy-slate-50)' }}>
                        <th className="p-2 text-left border w-20" style={{ borderColor: '#e2e8f0' }}>参数</th>
                        {compareList.map(p => (
                          <th key={p.id} className="p-2 text-center border" style={{ borderColor: '#e2e8f0' }}>
                            <img 
                              src={getProxyUrl(p.image)} 
                              className="w-12 h-16 object-cover mx-auto rounded shadow-sm mb-1" 
                              alt={p.name} 
                              crossOrigin="anonymous"
                              referrerPolicy="no-referrer"
                            />
                            <div className="font-bold text-[10px] leading-tight" style={{ color: '#1e293b' }}>{p.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { key: 'size', label: '外观尺寸' },
                        { key: 'pages', label: '纪念册页数' },
                        { key: 'binding', label: '装帧方式' },
                        { key: 'craft', label: '核心工艺' },
                        { key: 'material', label: '封面材质' },
                        { key: 'photos', label: '入册相片' },
                        { key: 'totalPhotos', label: '拍摄照片' },
                        { key: 'team', label: '摄影团队' },
                        { key: 'time', label: '拍摄时长' },
                        { key: 'mv', label: '毕业MV' },
                        { key: 'content', label: '套餐内容' },
                      ].map(row => {
                        // Helper to extract numeric value for comparison
                        const getNumericValue = (val: any) => {
                          if (!val || typeof val !== 'string') return 0;
                          // Handle size like "10*12寸" -> 120
                          if (row.key === 'size') {
                            const match = val.match(/(\d+)\*(\d+)/);
                            return match ? parseInt(match[1]) * parseInt(match[2]) : 0;
                          }
                          // Handle others like "80P" or "300张"
                          const match = val.match(/(\d+)/);
                          return match ? parseInt(match[1]) : 0;
                        };

                        const values = compareList.map(p => (p.params as any)[row.key]);
                        const numericValues = values.map(getNumericValue);
                        const maxValue = Math.max(...numericValues);
                        const shouldHighlight = ['size', 'pages', 'photos', 'totalPhotos'].includes(row.key);

                        return (
                          <tr key={row.key}>
                            <td className="p-2 font-medium border" style={{ color: 'var(--legacy-slate-500)', borderColor: '#e2e8f0' }}>{row.label}</td>
                            {compareList.map((p, idx) => {
                              const val = (p.params as any)[row.key];
                              const isBest = shouldHighlight && maxValue > 0 && numericValues[idx] === maxValue;
                              
                              return (
                                <td key={p.id} className="p-2 text-center border" 
                                    style={{ 
                                      borderColor: '#e2e8f0', 
                                      color: isBest ? '#0052D9' : 'var(--legacy-slate-700)',
                                      fontWeight: isBest ? 'bold' : 'normal',
                                      backgroundColor: isBest ? 'var(--legacy-primary-alpha)' : 'transparent'
                                    }}>
                                  {row.key === 'content' ? (
                                    <div className="text-[9px] text-left space-y-0.5">
                                      {p.content ? (p.content as string[]).map((item, i) => (
                                        <div key={i} className="leading-tight">• {item}</div>
                                      )) : '/'}
                                    </div>
                                  ) : (
                                    val || '/'
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      <tr style={{ backgroundColor: 'var(--legacy-primary-alpha)' }}>
                        <td className="p-2 font-bold border" style={{ color: '#FF6B00', borderColor: '#e2e8f0' }}>标零售价</td>
                        {compareList.map(p => (
                          <td key={p.id} className="p-2 text-center font-bold border" style={{ color: '#FF6B00', borderColor: '#e2e8f0' }}>
                            ¥{p.price}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  <div className="pt-4 flex justify-between items-end border-t" style={{ borderColor: '#e2e8f0' }}>
                    <div className="space-y-1">
                      <p className="text-[10px]" style={{ color: '#94a3b8' }}>扫码了解更多产品详情</p>
                      <div className="w-12 h-12 bg-white rounded overflow-hidden flex items-center justify-center shadow-sm" style={{ border: '1px solid #f1f5f9' }}>
                        <img 
                          src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E5%AE%A2%E6%9C%8D%E4%BA%8C%E7%BB%B4%E7%A0%81.webp")} 
                          className="w-full h-full object-cover" 
                          alt="QR Code" 
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <img 
                      src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E6%AF%95%E4%B8%9A%E7%85%A7-%E9%80%89%E8%BD%AC%E8%A7%92slogan.png")} 
                      className="h-[21px] w-auto object-contain" 
                      alt="Slogan" 
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t">
                <div className="w-full py-4 text-center">
                   <div className="flex flex-col items-center gap-2 text-primary">
                     <div className="bg-primary/10 p-3 rounded-full">
                       <Download size={24} className="animate-bounce" />
                     </div>
                     <p className="font-bold text-base">请长按上方图片保存至相册</p>
                     <p className="text-xs text-slate-400">已生成高清图片，长按呼出系统菜单</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showExportModal && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-6 w-full max-w-[430px] mx-auto"
          >
            <div className="w-full max-h-full flex flex-col gap-4">
              <div className="flex justify-between items-center text-white">
                <h3 className="font-bold">生成分享长图</h3>
                <button onClick={() => setShowExportModal(false)}><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto rounded-xl shadow-2xl no-scrollbar bg-white p-0 relative">
                {isGenerating && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="font-bold text-primary">正在生成单品分享图...</p>
                  </div>
                )}
                
                <div className="relative min-h-[400px]">
                  {exportedImage && (
                    <img 
                      src={exportedImage} 
                      className="absolute inset-0 w-full h-full object-top z-20 saveable cursor-pointer" 
                      alt="Long press to save"
                    />
                  )}
                  <div className={`bg-white p-0 m-0 ${exportedImage ? 'opacity-0 select-none pointer-events-none' : 'opacity-100'}`} ref={exportRef}>
                    <div className="relative">
                    <img 
                      src={getProxyUrl(selectedProduct.image)} 
                      className="w-full" 
                      alt="Export" 
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ color: '#ffffff', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                      <h2 className="text-2xl font-bold" style={{ color: '#ffffff' }}>{selectedProduct.name}</h2>
                      <p className="text-sm opacity-80" style={{ color: '#ffffff' }}>{selectedProduct.category}</p>
                    </div>
                  </div>
                    <div className="p-6 space-y-6">
                      {selectedProduct.content && (
                        <div className="space-y-3">
                          <h3 className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--legacy-slate-400)' }}>套餐内容</h3>
                          <div className="space-y-1.5">
                            {(selectedProduct.content as string[]).map((item, idx) => (
                              <div key={idx} className="flex gap-2 items-start">
                                <div className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#0052D9' }} />
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--legacy-slate-600)' }}>{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t pt-6" style={{ borderColor: '#e2e8f0' }}>
                      {Object.entries(selectedProduct.params).map(([key, val]) => {
                        const labels: Record<string, string> = {
                          size: '尺寸',
                          pages: '页数',
                          binding: '装帧',
                          craft: '工艺',
                          material: '材质',
                          photos: '入册',
                          time: '时长',
                          mv: 'MV',
                          team: '团队',
                          totalPhotos: '拍摄'
                        };
                        return (
                          <div key={key}>
                            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--legacy-slate-400)' }}>{labels[key] || key}</p>
                            <p className="text-sm font-bold" style={{ color: 'var(--legacy-slate-800)' }}>{val as string}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t pt-6 flex justify-between items-end" style={{ borderColor: '#e2e8f0' }}>
                      <div className="space-y-4">
                        <img 
                          src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E8%BD%AC%E8%A7%92%E8%93%9D%E8%89%B2%E9%80%8F%E6%98%8E%E5%BA%95LOGO.png")} 
                          className="h-8 w-auto object-contain" 
                          alt="Logo" 
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-2xl" style={{ color: '#FF6B00' }}>¥{selectedProduct.price}</p>
                          <p className="text-[10px] mt-1" style={{ color: 'var(--legacy-slate-400)' }}>扫描二维码了解更多详情</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 bg-white rounded-lg ml-auto flex items-center justify-center overflow-hidden shadow-sm" style={{ border: '1px solid #f1f5f9' }}>
                          <img 
                            src={getProxyUrl("https://zhuanjiao-jiniance.oss-cn-shenzhen.aliyuncs.com/%E5%AE%A2%E6%9C%8D%E4%BA%8C%E7%BB%B4%E7%A0%81.webp")} 
                            className="w-full h-full object-cover" 
                            alt="QR Code" 
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-[10px] font-bold mt-2" style={{ color: '#0052D9' }}>转角网客服</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white py-6 px-4 rounded-xl border-t mt-auto">
                <div className="flex flex-col items-center gap-3 text-primary">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Download size={28} className="animate-bounce" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg mb-1">请长按上方图片保存至相册</p>
                    <p className="text-sm text-slate-400">长按图片即可呼出手机「保存图片」菜单</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
