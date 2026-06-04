'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Footer from '@/components/Footer';



interface BlogPost {
  id: string;
  title: string;
  category: 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS';
  publishedDate: string;
  author: string;
  content: string;
  coverUrl: string;
}

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      const mockDatabase: Record<string, BlogPost> = {
        'b001': {
          id: 'B001',
          title: 'The Future of Multi-Chain Decentralized Mobility Architecture',
          category: 'INSIGHTS',
          publishedDate: 'May 18, 2026',
          author: 'Admin Core',
          content: 'The systemic coordination of shared autonomous mobility systems demands structured transaction verification mechanisms processing across layer-1 architectures natively. By shifting traditional centralized data tracking points over to distributed state parameters, local infrastructure vectors achieve immutable status tracking without runtime friction points.\n\nFurthermore, utilizing highly specialized cryptographic authorization signatures allows moving nodes to secure spatial positioning logs directly before verification dispatch, guaranteeing transaction integrity down to specific geographic transit positions.',
          coverUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
        },
        'b002': {
          id: 'B002',
          title: 'Optimizing Fleet Allocation Parameters via Cryptographic Signatures',
          category: 'ENGINEERING',
          publishedDate: 'May 24, 2026',
          author: 'Kidus Tilahun',
          content: 'By establishing specialized cryptographic authorization paradigms, centralized controllers can securely decouple telemetry verification sequences from primary database structures. This allows micro-dispatch logic grids to update live telemetry markers locally on the vehicle, passing aggregated performance weights back to central index points over high-efficiency transmission routes.',
          coverUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
        },
        'b003': {
          id: 'B003',
          title: 'Strategic Fleet Integration of Digital Asset Payments and Ledger Settlement',
          category: 'ANNOUNCEMENTS',
          publishedDate: 'May 29, 2026',
          author: 'Operations Team',
          content: 'As public catalog modules scale globally, legacy cross-border card settlements introduce structural latency bottlenecks. Transitioning processing frameworks onto dynamic clearing tables driven by stable value cryptographic contracts resolves settling requirements down to seconds. This infrastructure release lays down foundational pathways supporting machine-to-machine wallet interactions and programmatic asset leasing sequences.',
          coverUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80'
        }
      };

      const foundArticle = mockDatabase[blogId.toLowerCase()];
      if (foundArticle) {
        setPost(foundArticle);
      } else {
        alert(`Content packet ${blogId} could not be resolved.`);
        router.push('/blog');
      }
      setIsLoading(false);
    }
  }, [blogId, router]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white text-[#262626] flex items-center justify-center font-mono text-[13px]">
        RESOLVING LEDGER PACKET DATA...
      </div>
    );
  }

  if (!post) return null;

  return (<>
    <div className="w-full min-h-screen bg-white text-[#262626] py-12 px-4 md:px-12 selection:bg-[#1c69d4]/20 animate-in fade-in duration-200">
      <div className="max-w-[820px] mx-auto">

        <button
          onClick={() => router.push('/blog')}
          style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px' }}
          className="text-[#6b6b6b] hover:text-[#262626] transition-colors uppercase bg-transparent border-none cursor-pointer mb-12 flex items-center gap-2"
        >
          ← Return to Editorial Streams
        </button>

        <article className="space-y-8">
          <div className="space-y-4">
            <span
              style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px' }}
              className="text-[#1c69d4] uppercase block"
            >
              {post.category}
            </span>
            <h1
              style={{ fontSize: '38px', fontWeight: 700, lineHeight: '1.15' }}
              className="text-[#262626] uppercase text-balance"
            >
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 pt-2 text-[#6b6b6b] text-[13px] font-light">
              <div>BY <span className="font-bold text-[#262626]">{post.author}</span></div>
              <div className="w-1 h-1 bg-[#cccccc]" />
              <div className="font-mono">{post.publishedDate}</div>
            </div>
          </div>

          <div className="w-full bg-[#fafafa] border border-[#e6e6e6] overflow-hidden rounded-none">
            <img
              src={post.coverUrl}
              alt={post.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>

          <div
            style={{ fontWeight: 300 }}
            className="text-[16px] leading-[1.8] text-[#3c3c3c] space-y-6 pt-4 text-justify first-letter:text-4xl first-letter:font-bold first-letter:text-[#262626]"
          >
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="border-t border-[#e6e6e6] mt-16 pt-8 flex items-center justify-between">
          <span className="font-mono text-[12px] text-[#6b6b6b]">DOCUMENT MATRIX ID: {post.id}</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[12px] font-bold uppercase tracking-wider bg-transparent border-none text-[#262626] hover:underline cursor-pointer"
          >
            Back To Top ▲
          </button>
        </div>

      </div>
    </div>
    <Footer />
  </>
  );
}