import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { EmailSignatureConfig } from '../types';

interface EmailSignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    signatureDataUrl: string;
}

const EmailSignatureModal: React.FC<EmailSignatureModalProps> = ({ isOpen, onClose, signatureDataUrl }) => {
    const [config, setConfig] = useState<EmailSignatureConfig>({
        name: 'Alex Johnson',
        jobTitle: 'Product Manager',
        company: 'Acme Corp',
        phone: '+1 (555) 123-4567',
        email: 'alex@acmecorp.com',
        website: 'www.acmecorp.com'
    });
    
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    // Construct the HTML string
    // Note: Using base64 for image. Some email clients block it, but it's the only client-side way.
    const signatureHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
  <tr>
    <td style="padding-right: 20px; vertical-align: top;">
      <img src="${signatureDataUrl}" alt="Signature" width="120" style="display: block; max-width: 150px; height: auto;" />
    </td>
    <td style="border-left: 2px solid #e2e8f0; padding-left: 20px; vertical-align: top;">
      <div style="font-weight: bold; color: #1e293b; font-size: 16px;">${config.name}</div>
      <div style="color: #64748b; margin-bottom: 8px;">${config.jobTitle} | ${config.company}</div>
      
      <div style="font-size: 12px; color: #475569;">
        <div style="margin-bottom: 2px;">📞 <a href="tel:${config.phone}" style="color: #475569; text-decoration: none;">${config.phone}</a></div>
        <div style="margin-bottom: 2px;">✉️ <a href="mailto:${config.email}" style="color: #475569; text-decoration: none;">${config.email}</a></div>
        <div>🌐 <a href="https://${config.website}" style="color: #475569; text-decoration: none;">${config.website}</a></div>
      </div>
    </td>
  </tr>
</table>
`;

    const handleCopy = () => {
        // Copy HTML Code
        navigator.clipboard.writeText(signatureHtml).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleCopyVisual = () => {
        // Advanced: Select the preview div and copy contents (Works for pasting into Gmail visual editor)
        const node = document.getElementById('sig-preview');
        if (node) {
            const range = document.createRange();
            range.selectNode(node);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeAllRanges();
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl h-auto max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200 dark:border-slate-700">
                
                {/* Left: Configuration */}
                <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Email Signature</h3>
                        <button onClick={onClose} className="md:hidden p-2"><X size={20} /></button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                            <input name="name" value={config.name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title</label>
                                <input name="jobTitle" value={config.jobTitle} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company</label>
                                <input name="company" value={config.company} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                            <input name="phone" value={config.phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                            <input name="email" value={config.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Website</label>
                            <input name="website" value={config.website} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm" />
                        </div>
                    </div>
                </div>

                {/* Right: Preview & Action */}
                <div className="w-full md:w-1/2 flex flex-col bg-gray-50 dark:bg-slate-950">
                    <div className="flex justify-end p-4 hidden md:flex">
                         <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full text-slate-500"><X size={20} /></button>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-full overflow-x-auto">
                            {/* Visual Preview */}
                            <div id="sig-preview" dangerouslySetInnerHTML={{ __html: signatureHtml }} />
                        </div>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                        <div className="flex gap-3">
                            <button 
                                onClick={handleCopyVisual}
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? "Copied!" : "Copy for Gmail/Outlook"}
                            </button>
                        </div>
                        <p className="text-[10px] text-center mt-3 text-slate-400">
                            Tip: Click 'Copy', then simply Paste (Ctrl+V) into your email settings signature box.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailSignatureModal;
