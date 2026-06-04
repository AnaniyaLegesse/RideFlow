'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blogData, setBlogData] = useState({
    title: '',
    category: 'INSIGHTS',
    status: 'Draft',
    content: '',
    coverImage: null as File | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, coverImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogData.title) return alert('An article title header parameter is required.');
    alert(`Journal asset "${blogData.title}" uploaded with feature illustration.`);
    router.push('/admin');
  };

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-8 pb-24 px-4 md:px-12">
      <div className="max-w-[768px] mx-auto">
        <button onClick={() => router.push('/admin')} className="text-admin-label text-brand-muted hover:text-brand-ink transition-colors uppercase bg-transparent border-none cursor-pointer mb-12">
          ← Cancel and Return to Dashboard
        </button>

        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-150">
          <h2 className="uppercase text-brand-ink text-2xl font-bold">Compose Brand Journal Article</h2>

          <div className="space-y-2">
            <label className="text-admin-label text-brand-muted uppercase block">Feature Banner Asset</label>
            <div className="border border-admin-border p-4 bg-admin-surface-muted relative text-center rounded-none">
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="Blog Feature" className="w-full max-h-[300px] object-cover border border-admin-border-strong" />
                  <button type="button" onClick={() => { setImagePreview(null); setBlogData({ ...blogData, coverImage: null }); }} className="mt-2 text-brand-danger font-bold text-xs uppercase bg-transparent border-none cursor-pointer hover:underline">Flush Image</button>
                </div>
              ) : (
                <div className="py-10 border border-dashed border-admin-border-strong bg-admin-surface">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <span className="text-brand-muted block font-light text-[13px]">Select high-definition feature banner asset</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
              <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Article Context Title</label>
              <input type="text" placeholder="e.g. Architectural Scalability of Electric Infrastructure Layers" value={blogData.title} onChange={e => setBlogData({...blogData, title: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Classification Group</label>
                <select value={blogData.category} onChange={e => setBlogData({...blogData, category: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[15px] cursor-pointer">
                  <option value="INSIGHTS">INSIGHTS MATRIX</option>
                  <option value="ENGINEERING">ENGINEERING OPERATIONS</option>
                  <option value="ANNOUNCEMENTS">CORPORATE ANNOUNCEMENTS</option>
                </select>
              </div>
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Release Context</label>
                <select value={blogData.status} onChange={e => setBlogData({...blogData, status: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[15px] cursor-pointer">
                  <option value="Draft">SAVE IMMUTABLE CONFIG DRAFT</option>
                  <option value="Published">DISPATCH IMMEDIATELY TO CORE CHANNELS</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-2">
              <label className="text-admin-label text-brand-muted uppercase">Editorial Content Space</label>
              <textarea rows={12} placeholder="Write copy parameters inside this layout frame..." value={blogData.content} onChange={e => setBlogData({...blogData, content: e.target.value})} className="w-full bg-admin-surface-muted text-brand-ink border border-admin-border p-4 focus:outline-none focus:border-brand-ink rounded-none resize-y text-[15px] leading-relaxed font-light" />
            </div>
          </div>

          <button type="submit" className="h-12 px-10 bg-brand-primary text-white uppercase rounded-none hover:bg-brand-primary-hover transition-colors border-none cursor-pointer text-sm font-bold tracking-wide">
            Publish Journal Asset
          </button>
        </form>
      </div>
    </div>
  );
}