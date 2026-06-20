'use client';

interface HomePostStub {
  id: string;
  title: string;
  category: 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS';
  publishedDate: string;
  excerpt: string;
  coverUrl: string;
}

export default function HomeBlogSection() {
  const recentPosts: HomePostStub[] = [
    {
      id: 'B001',
      title: 'The Future of Multi-Chain Decentralized Mobility Architecture',
      category: 'INSIGHTS',
      publishedDate: 'May 18, 2026',
      excerpt: 'Exploring how localized on-chain protocols decouple telemetry verification structures to enable direct peer-to-peer fleet assignments.',
      coverUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'B002',
      title: 'Optimizing Fleet Allocation Parameters via Cryptographic Signatures',
      category: 'ENGINEERING',
      publishedDate: 'May 24, 2026',
      excerpt: 'An explicit operational look into optimizing multi-tenant dispatch queues through decentralized processing layers.',
      coverUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'B003',
      title: 'Strategic Fleet Integration of Digital Asset Payments and Ledger Settlement',
      category: 'ANNOUNCEMENTS',
      publishedDate: 'May 29, 2026',
      excerpt: 'Deploying robust multi-chain checkout features to enable instant programmatic vehicle leasing options through decentralized frameworks.',
      coverUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const featured = recentPosts[0];
  const supporting = recentPosts.slice(1);

  return (
    <section className="w-full bg-admin-surface text-brand-ink py-20 px-4 md:px-12 border-t border-admin-border">
      <div className="max-w-[1440px] mx-auto space-y-12">

        <div className="flex items-baseline justify-between border-b border-admin-border pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-[2px] text-brand-primary uppercase block">
              Intelligence Channels
            </span>
            <h2 className="text-[32px] font-bold uppercase text-brand-ink tracking-tight">
              The Ledger Journal
            </h2>
          </div>
          
          <a 
            href="/blog" 
            className="text-xs font-bold tracking-wide text-brand-ink hover:text-brand-primary transition-colors uppercase no-underline group shrink-0"
          >
            Explore Full Index <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {featured && (
            <a 
              href={`/blog/${featured.id.toLowerCase()}`}
              className="lg:col-span-7 flex flex-col justify-between border border-admin-border hover:border-admin-border-strong transition-colors group no-underline bg-admin-surface rounded-none overflow-hidden"
            >
              <div className="w-full bg-admin-surface-muted aspect-16/10 overflow-hidden border-b border-admin-border">
                <img 
                  src={featured.coverUrl} 
                  alt={featured.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wide text-brand-primary uppercase block">
                    {featured.category} — Latest Transmission
                  </span>
                  <h3 className="text-[22px] font-bold leading-tight text-brand-ink uppercase group-hover:text-brand-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-brand-muted line-clamp-2 pt-1">
                    {featured.excerpt}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-admin-border/20 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <span className="uppercase">Read Operational Analysis</span>
                  <span>{featured.publishedDate}</span>
                </div>
              </div>
            </a>
          )}

          <div className="lg:col-span-5 flex flex-col gap-6">
            {supporting.map((post) => (
              <a 
                key={post.id}
                href={`/blog/${post.id.toLowerCase()}`}
                className="flex flex-col sm:flex-row border border-admin-border hover:border-admin-border-strong transition-colors group no-underline bg-admin-surface h-full rounded-none overflow-hidden"
              >
                <div className="sm:w-40 bg-admin-surface-muted aspect-4/3 sm:aspect-auto sm:h-full overflow-hidden border-b sm:border-b-0 sm:border-r border-admin-border shrink-0">
                  <img 
                    src={post.coverUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                
                <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-wide text-brand-primary uppercase block">
                      {post.category}
                    </span>
                    <h4 className="text-[15px] font-bold leading-tight text-brand-ink uppercase line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-[13px] font-light text-brand-muted line-clamp-2 pt-0.5">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-admin-border/20 mt-3 flex items-center justify-between text-[11px] font-mono text-brand-subtle">
                    <span className="text-brand-ink uppercase font-bold tracking-tight text-[10px] group-hover:underline">Review Document</span>
                    <span>{post.publishedDate}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}