"use client";

import { useEffect, useState } from "react";
import { Newspaper, Pencil, Plus, Trash2, X } from "lucide-react";
import { createNews, deleteNews, getNews, getNewsPaged, updateNews, type NewsPost } from "@/lib/api";
import EmptyState from "@/components/admin/EmptyState";
import FilterSelect from "@/components/admin/FilterSelect";
import ListSkeleton from "@/components/admin/ListSkeleton";
import Pagination from "@/components/admin/Pagination";
import SearchInput from "@/components/admin/SearchInput";

const empty = { category: "", date: "", title: "", excerpt: "" };
const LIMIT = 8;

export default function NewsClient() {
  const [items, setItems] = useState<NewsPost[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: LIMIT, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<NewsPost> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    getNewsPaged({ page, limit: LIMIT, search: search || undefined, category: category || undefined })
      .then(({ items, meta }) => {
        setItems(items);
        setMeta(meta);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load news posts from the backend API.");
        setLoading(false);
      });
  };

  useEffect(load, [page, search, category]);

  // Populates the category filter dropdown from every category in use, independent of
  // the current search/filter/page — otherwise the list of choices would shrink to match
  // whatever's already filtered in.
  useEffect(() => {
    getNews({ limit: 100 })
      .then((all) => setCategoryOptions([...new Set(all.map((n) => n.category))].sort()))
      .catch(() => setCategoryOptions([]));
  }, []);

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value: string) => {
    setLoading(true);
    setCategory(value);
    setPage(1);
  };

  const clearFilters = () => {
    setLoading(true);
    setSearch("");
    setCategory("");
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setLoading(true);
    setPage(p);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await updateNews(editing.id, editing);
      } else {
        await createNews({
          category: editing.category ?? "",
          date: editing.date ?? "",
          title: editing.title ?? "",
          excerpt: editing.excerpt ?? "",
        });
      }
      setEditing(null);
      load();
    } catch {
      setError("Could not save — check you're logged in.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteNews(id);
      load();
    } catch {
      setError("Could not delete — check you're logged in.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-cop-navy">News</h1>
          <p className="mt-1 text-[14px] text-cop-ink/60">Posts shown in the &quot;COP32 Updates&quot; homepage section and /news.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...empty })}
          className="inline-flex items-center gap-2 rounded-full bg-cop-green px-5 py-2.5 font-display text-[14px] font-semibold text-white transition hover:bg-cop-mint"
        >
          <Plus className="h-4 w-4" /> Add Post
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search news…" />
        <FilterSelect value={category} onChange={handleCategory} options={categoryOptions} placeholder="All categories" />
        {(search || category) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[13px] font-medium text-cop-ink/55 underline-offset-2 transition hover:text-cop-navy hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {loading && <ListSkeleton />}
        {!loading &&
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-cop-blue-soft/60 bg-white p-5"
            >
              <div>
                <span className="rounded-full bg-cop-mist px-2.5 py-0.5 text-[11.5px] font-semibold text-cop-green">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-[16px] font-semibold text-cop-navy">{item.title}</h3>
                <p className="mt-1 text-[13.5px] text-cop-ink/70">{item.excerpt}</p>
                <p className="mt-1 text-[12px] text-cop-ink/45">{item.date}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-navy transition hover:bg-cop-mist"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        {!loading && items.length === 0 && (
          <EmptyState
            icon={Newspaper}
            message={search || category ? "No news posts match your search/filter." : "No news posts yet."}
          />
        )}
      </div>

      {!loading && (
        <Pagination page={meta.page} totalPages={meta.totalPages} total={meta.total} limit={meta.limit} onPageChange={handlePageChange} />
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[520px] rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[17px] font-semibold text-cop-navy">
                {editing.id ? "Edit Post" : "Add Post"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-cop-ink/50 hover:text-cop-ink">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Category</span>
                <input
                  value={editing.category ?? ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Title</span>
                <input
                  value={editing.title ?? ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Excerpt</span>
                <textarea
                  value={editing.excerpt ?? ""}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Date Label</span>
                <input
                  value={editing.date ?? ""}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="rounded-full border border-cop-blue-soft/60 px-5 py-2 text-[14px] font-semibold text-cop-ink/70"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-full bg-cop-green px-5 py-2 text-[14px] font-semibold text-white transition hover:bg-cop-mint disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
