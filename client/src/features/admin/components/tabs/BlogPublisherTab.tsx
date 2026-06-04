'use client';

import { Button } from '@/components/ui/Button';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { BlogPublisherTable } from '@/features/admin/components/BlogPublisherTable';
import type { BlogPost } from '@/features/admin/types';

interface BlogPublisherTabProps {
  blogs: BlogPost[];
  editingBlogId: string | null;
  blogEditForm: BlogPost | null;
  onBlogEditFormChange: (form: BlogPost) => void;
  onSaveBlog: () => void;
  onCancelBlog: () => void;
  onPurgeBlog: (id: string) => void;
  onCreateBlog: () => void;
  onEditBlogRoute: (id: string) => void;
}

export const BlogPublisherTab = ({
  blogs,
  editingBlogId,
  blogEditForm,
  onBlogEditFormChange,
  onSaveBlog,
  onCancelBlog,
  onPurgeBlog,
  onCreateBlog,
  onEditBlogRoute,
}: BlogPublisherTabProps) => (
  <div className="animate-in fade-in duration-150 space-y-6">
    <AdminSectionHeader
      title="EDITORIAL LEDGER"
      action={<Button variant="primary" label="+ Create Blog Post" onClick={onCreateBlog} />}
    />

    <BlogPublisherTable
      blogs={blogs}
      editingBlogId={editingBlogId}
      blogEditForm={blogEditForm}
      onEditFormChange={onBlogEditFormChange}
      onSave={onSaveBlog}
      onCancel={onCancelBlog}
      onPurge={onPurgeBlog}
      onNavigateEdit={(id) => onEditBlogRoute(id)}
    />
  </div>
);
