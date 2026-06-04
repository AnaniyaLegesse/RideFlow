'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  category: 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS';
  publishedDate: string;
  author: string;
  status: 'Published' | 'Draft';
  content?: string;
  coverUrl?: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      const mockDatabase: Record<string, BlogPost> = {
        B001: {
          id: 'B001',
          title: 'The Future of Multi-Chain Decentralized Mobility Architecture',
          category: 'INSIGHTS',
          publishedDate: '2026-05-18',
          author: 'Admin Core',
          status: 'Published',
          content: 'The systemic coordination of shared autonomous mobility systems...',
          coverUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        },
        B002: {
          id: 'B002',
          title: 'Optimizing Fleet Allocation Parameters via Cryptographic Signatures',
          category: 'ENGINEERING',
          publishedDate: '2026-05-24',
          author: 'Kidus Tilahun',
          status: 'Draft',
          content: 'By establishing specialized cryptographic authorization paradigms...',
        },
      };

      const foundArticle = mockDatabase[blogId.toUpperCase()];
      if (foundArticle) {
        setBlogData(foundArticle);
        if (foundArticle.coverUrl) setImagePreview(foundArticle.coverUrl);
      } else {
        alert(`Journal file referencing matrix ${blogId} was not found.`);
        router.push('/admin');
      }
      setIsLoading(false);
    }
  }, [blogId, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Journal file update deployed successfully for: ${blogData?.id}`);
    router.push('/admin');
  };

  if (isLoading || !blogData) {
    return <div className="p-12 text-center text-brand-muted">Syncing Local Nodes...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-8 pb-24 px-4 md:px-12">
      <div className="max-w-[768px] mx-auto">
        <button
          onClick={() => router.push('/admin')}
          className="text-admin-label text-brand-muted hover:text-brand-ink transition-colors uppercase bg-transparent border-none cursor-pointer mb-12"
          style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px' }}
        >
          ← Abort Composition Changes
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-baseline space-x-3 border-b border-admin-border pb-4">
            <h2 className="uppercase text-brand-ink text-2xl font-bold">Modify Ledger Journal Entry</h2>
            <span className="font-mono text-sm text-brand-muted font-bold">[{blogData.id}]</span>
          </div>

          <div className="space-y-2">
            <label className="text-admin-label text-brand-muted uppercase block">Modify Post Banner Canvas</label>
            <div className="border border-admin-border p-4 bg-admin-surface-muted space-y-4 rounded-none">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Current Feature Cover"
                  className="w-full max-h-[200px] object-cover border border-admin-border-strong"
                />
              )}
              <div className="relative inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <button
                  type="button"
                  className="h-10 px-4 bg-admin-surface border border-brand-ink text-brand-ink uppercase rounded-none pointer-events-none text-xs font-bold"
                >
                  Replace Image File
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
              <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">
                Article Context Title
              </label>
              <input
                type="text"
                value={blogData.title}
                onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">
                  Classification Group
                </label>
                <select
                  value={blogData.category}
                  onChange={(e) =>
                    setBlogData({ ...blogData, category: e.target.value as any })
                  }
                  className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[15px] font-bold cursor-pointer"
                >
                  <option value="INSIGHTS">INSIGHTS MATRIX</option>
                  <option value="ENGINEERING">ENGINEERING OPERATIONS</option>
                  <option value="ANNOUNCEMENTS">CORPORATE ANNOUNCEMENTS</option>
                </select>
              </div>
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">
                  Release Context Target
                </label>
                <select
                  value={blogData.status}
                  onChange={(e) =>
                    setBlogData({ ...blogData, status: e.target.value as any })
                  }
                  className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[15px] font-bold cursor-pointer"
                >
                  <option value="Draft">SAVE IMMUTABLE CONFIG DRAFT</option>
                  <option value="Published">DISPATCH IMMEDIATELY TO LIVE PRODUCTION CHANNELS</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-2">
              <label className="text-admin-label text-brand-muted uppercase">Editorial Content Payload Space</label>
              <textarea
                rows={12}
                value={blogData.content || ''}
                onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                className="w-full bg-admin-surface-muted text-brand-ink border border-admin-border p-4 focus:outline-none focus:border-brand-ink rounded-none resize-y text-[15px] leading-relaxed font-light"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-12 px-10 bg-brand-primary text-white uppercase rounded-none hover:bg-brand-primary-hover transition-colors border-none cursor-pointer text-sm font-bold tracking-wide"
          >
            Deploy Updated Content Token
          </button>
        </form>
      </div>
    </div>
  );
}