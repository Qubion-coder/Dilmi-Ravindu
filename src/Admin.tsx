import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const handleGenerate = () => {
    const url = new URL(window.location.origin);
    if (prefix) url.searchParams.set('prefix', prefix);
    if (guestName) url.searchParams.set('name', guestName);
    
    const link = url.toString();
    setGeneratedLink(link);
    
    const message = `Dear ${prefix} ${guestName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Ravindu & Dilmi`;
    
    setGeneratedMessage(message);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy text');
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-y-auto bg-stone-50 p-4 md:p-8 font-montserrat">
      <div className="w-full max-w-2xl mx-auto mt-4 md:mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-xl mb-12">
        <h1 className="text-3xl md:text-4xl font-playball text-stone-800 mb-8 text-center drop-shadow-sm">Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Prefix</label>
              <select 
                value={prefix} 
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full border-b-2 border-stone-200 px-2 py-3 bg-transparent focus:outline-none focus:border-stone-400 transition-colors font-medium text-stone-700"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
                <option value="">No Prefix</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Guest Name</label>
              <input 
                type="text" 
                value={guestName} 
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full border-b-2 border-stone-200 px-2 py-3 bg-transparent focus:outline-none focus:border-stone-400 transition-colors font-medium text-stone-700"
              />
            </div>
          </div>
          
          <button 
            onClick={handleGenerate}
            className="w-full bg-stone-800 text-white font-bold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-stone-900 transition-colors mt-4 text-sm"
          >
            Generate Link
          </button>
          
          {generatedLink && (
            <div className="mt-10 space-y-8 border-t border-stone-100 pt-8 animate-[fadeIn_0.5s_ease-out]">
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Generated Link</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    readOnly 
                    value={generatedLink} 
                    className="flex-1 border border-stone-200 rounded-lg px-4 py-3 bg-stone-50 text-stone-600 text-sm focus:outline-none"
                  />
                  <button 
                    onClick={() => copyToClipboard(generatedLink)}
                    className="bg-stone-200 text-stone-700 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-stone-300 transition-colors whitespace-nowrap"
                  >
                    Copy Link Only
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Message Template</label>
                <div className="relative">
                  <textarea 
                    readOnly 
                    value={generatedMessage}
                    rows={12}
                    className="w-full border border-stone-200 rounded-lg px-6 py-5 bg-stone-50 text-stone-600 whitespace-pre-wrap text-sm focus:outline-none leading-relaxed"
                  />
                  <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(generatedMessage)}
                  className="w-full mt-4 bg-stone-200 text-stone-800 font-bold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-stone-300 transition-colors text-xs"
                >
                  Copy Full Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
