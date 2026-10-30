"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, Upload, User, X } from "lucide-react";
import {
  assetUrl,
  createLeader,
  deleteLeader,
  getLeaders,
  getLeadersPaged,
  updateLeader,
  uploadFile,
  type Leader,
  type LeaderColor,
  type LeaderDisplayAs,
} from "@/lib/api";
import EmptyState from "@/components/admin/EmptyState";
import FilterSelect from "@/components/admin/FilterSelect";
import ListSkeleton from "@/components/admin/ListSkeleton";
import Pagination from "@/components/admin/Pagination";
import SearchInput from "@/components/admin/SearchInput";

const colorSwatch: Record<LeaderColor, string> = {
  navy: "bg-gradient-to-br from-cop-navy to-cop-blue",
  green: "bg-gradient-to-br from-cop-green to-cop-mint",
  blue: "bg-gradient-to-br from-cop-blue to-cop-green",
};

const LIMIT = 8;

export default function LeadersClient() {
  const [items, setItems] = useState<Leader[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: LIMIT, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("");
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<Leader> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    getLeadersPaged({
      page,
      limit: LIMIT,
      search: search || undefined,
      tag: tag || undefined,
      color: (color || undefined) as LeaderColor | undefined,
    })
      .then(({ items, meta }) => {
        setItems(items);
        setMeta(meta);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load leaders from the backend API.");
        setLoading(false);
      });
  };

  useEffect(load, [page, search, tag, color]);

  // Populates the tag filter dropdown from every tag in use, independent of the
  // current search/filter/page.
  useEffect(() => {
    getLeaders({ limit: 100 })
      .then((all) => setTagOptions([...new Set(all.map((l) => l.tag))].sort()))
      .catch(() => setTagOptions([]));
  }, []);

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearch(value);
    setPage(1);
  };

  const handleTag = (value: string) => {
    setLoading(true);
    setTag(value);
    setPage(1);
  };

  const handleColor = (value: string) => {
    setLoading(true);
    setColor(value);
    setPage(1);
  };

  const clearFilters = () => {
    setLoading(true);
    setSearch("");
    setTag("");
    setColor("");
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
      const data = {
        tag: editing.tag ?? "",
        name: editing.name ?? "",
        role: editing.role ?? "",
        quote: editing.quote ?? "",
        color: (editing.color ?? "navy") as LeaderColor,
        displayAs: (editing.displayAs ?? "leader") as LeaderDisplayAs,
        image: editing.image ?? undefined,
      };
      if (editing.id) {
        await updateLeader(editing.id, data);
      } else {
        await createLeader(data);
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
      await deleteLeader(id);
      load();
    } catch {
      setError("Could not delete — check you're logged in.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-cop-navy">Leaders</h1>
          <p className="mt-1 text-[14px] text-cop-ink/60">
            Quote carousel shown on the homepage &quot;COP32 Leaders&quot; section.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ tag: "", name: "", role: "", quote: "", color: "navy", displayAs: "leader" })}
          className="inline-flex items-center gap-2 rounded-full bg-cop-green px-5 py-2.5 font-display text-[14px] font-semibold text-white transition hover:bg-cop-mint"
        >
          <Plus className="h-4 w-4" /> Add Leader
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search leaders…" />
        <FilterSelect value={tag} onChange={handleTag} options={tagOptions} placeholder="All tags" />
        <FilterSelect value={color} onChange={handleColor} options={["navy", "green", "blue"]} placeholder="All colors" />
        {(search || tag || color) && (
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
              <div className="flex gap-4">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl text-white ${colorSwatch[item.color] ?? colorSwatch.navy}`}
                >
                  {item.image ? (
                    <img src={assetUrl(item.image)} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </span>
                <div>
                  <span className="inline-block rounded-full bg-cop-mist px-2.5 py-0.5 text-[11px] font-semibold text-cop-navy">
                    {item.tag}
                  </span>
                  {item.displayAs === "pm" && (
                    <span className="ml-1.5 inline-block rounded-full bg-cop-green/10 px-2.5 py-0.5 text-[11px] font-semibold text-cop-green">
                      PM · Hero Quote
                    </span>
                  )}
                  <h3 className="mt-1.5 font-display text-[15.5px] font-semibold text-cop-navy">{item.name}</h3>
                  <p className="text-[13px] text-cop-ink/55">{item.role}</p>
                  <p className="mt-1.5 max-w-[640px] text-[13.5px] leading-relaxed text-cop-ink/70">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditing(item)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-navy transition hover:bg-cop-mist"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
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
            icon={User}
            message={search || tag || color ? "No leaders match your search/filter." : "No leaders yet."}
          />
        )}
      </div>

      {!loading && (
        <Pagination page={meta.page} totalPages={meta.totalPages} total={meta.total} limit={meta.limit} onPageChange={handlePageChange} />
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[560px] rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[17px] font-semibold text-cop-navy">
                {editing.id ? "Edit Leader" : "Add Leader"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-cop-ink/50 hover:text-cop-ink">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-4">
                <span
                  className={`relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl text-white ${
                    colorSwatch[(editing.color as LeaderColor) ?? "navy"] ?? colorSwatch.navy
                  }`}
                >
                  {editing.image ? (
                    <img src={assetUrl(editing.image)} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-6 w-6" strokeWidth={1.5} />
                  )}
                </span>
                <div>
                  <label
                    htmlFor="leader-photo"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cop-blue-soft/60 px-4 py-2 text-[13px] font-semibold text-cop-navy transition hover:bg-cop-mist"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {uploading ? "Uploading…" : editing.image ? "Replace photo" : "Upload photo"}
                  </label>
                  <input
                    id="leader-photo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      setUploading(true);
                      try {
                        const { url } = await uploadFile(file);
                        setEditing((prev) => (prev ? { ...prev, image: url } : prev));
                      } catch {
                        setError("Could not upload image — check you're logged in.");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                  {editing.image && (
                    <button
                      type="button"
                      onClick={() => setEditing((prev) => (prev ? { ...prev, image: undefined } : prev))}
                      className="ml-2 text-[12.5px] font-medium text-red-600 hover:underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[13px] font-medium text-cop-ink/60">Tag (badge)</span>
                  <input
                    value={editing.tag ?? ""}
                    onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                    placeholder="e.g. Government"
                    className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[13px] font-medium text-cop-ink/60">Color</span>
                  <select
                    value={editing.color ?? "navy"}
                    onChange={(e) => setEditing({ ...editing, color: e.target.value as LeaderColor })}
                    className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                  >
                    <option value="navy">Navy → Blue</option>
                    <option value="green">Green → Mint</option>
                    <option value="blue">Blue → Green</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Display As</span>
                <select
                  value={editing.displayAs ?? "leader"}
                  onChange={(e) => setEditing({ ...editing, displayAs: e.target.value as LeaderDisplayAs })}
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                >
                  <option value="leader">Leader — shown in the "COP32 Leaders" carousel</option>
                  <option value="pm">PM — shown in the homepage hero Leader Quote section</option>
                </select>
                {editing.displayAs === "pm" && (
                  <p className="mt-1 text-[12px] text-cop-ink/50">
                    Only one leader should be set to PM at a time — it replaces the hero quote on the homepage.
                  </p>
                )}
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Name / Title</span>
                <input
                  value={editing.name ?? ""}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="e.g. Minister of Planning and Development"
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Role / Organisation</span>
                <input
                  value={editing.role ?? ""}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  placeholder="e.g. Federal Democratic Republic of Ethiopia"
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Quote</span>
                <textarea
                  value={editing.quote ?? ""}
                  onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
                  rows={4}
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
