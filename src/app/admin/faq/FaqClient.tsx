"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { createFaq, deleteFaq, getFaqPaged, updateFaq, type FaqEntry } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EmptyState from "@/components/admin/EmptyState";
import ListSkeleton from "@/components/admin/ListSkeleton";
import Pagination from "@/components/admin/Pagination";
import SearchInput from "@/components/admin/SearchInput";

const LIMIT = 8;

export default function FaqClient() {
  const [items, setItems] = useState<FaqEntry[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: LIMIT, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<FaqEntry> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    getFaqPaged({ page, limit: LIMIT, search: search || undefined })
      .then(({ items, meta }) => {
        setItems(items);
        setMeta(meta);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load FAQ entries from the backend API.");
        setLoading(false);
      });
  };

  useEffect(load, [page, search]);

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearch(value);
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
        await updateFaq(editing.id, { question: editing.question, answer: editing.answer });
      } else {
        await createFaq({ question: editing.question ?? "", answer: editing.answer ?? "" });
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
      await deleteFaq(id);
      load();
    } catch {
      setError("Could not delete — check you're logged in.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </span>
          <h1 className="font-display text-[22px] font-bold text-cop-navy">FAQ</h1>
        </div>
        <Button onClick={() => setEditing({ question: "", answer: "" })}>
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </div>

      <Card className="mt-5 flex flex-wrap items-center gap-3 border-cop-blue-soft/50 px-4 py-3">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search FAQ…" />
        <span className="ml-auto rounded-full bg-cop-mist px-3 py-1.5 font-display text-[12px] font-bold text-cop-navy">
          {meta.total} {meta.total === 1 ? "entry" : "entries"}
        </span>
      </Card>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 space-y-3">
        {loading && <ListSkeleton />}
        {!loading &&
          items.map((item) => (
            <Card key={item.id} className="group flex items-start justify-between gap-4 border-cop-blue-soft/50 p-5">
              <div>
                <h3 className="font-display text-[15.5px] font-semibold text-cop-navy">{item.question}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-cop-ink/70">{item.answer}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditing(item)}
                  aria-label="Edit"
                  className="grid h-9 w-9 place-items-center rounded-full bg-cop-navy text-white transition hover:bg-cop-navy-light"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(item.id)}
                  aria-label="Delete"
                  className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        {!loading && items.length === 0 && (
          <EmptyState icon={HelpCircle} message={search ? "No FAQ entries match your search." : "No FAQ entries yet."} />
        )}
      </div>

      {!loading && (
        <Pagination page={meta.page} totalPages={meta.totalPages} total={meta.total} limit={meta.limit} onPageChange={handlePageChange} />
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="faq-question">Question</Label>
              <Input
                id="faq-question"
                className="mt-1"
                value={editing?.question ?? ""}
                onChange={(e) => setEditing((prev) => (prev ? { ...prev, question: e.target.value } : prev))}
              />
            </div>
            <div>
              <Label htmlFor="faq-answer">Answer</Label>
              <Textarea
                id="faq-answer"
                className="mt-1"
                rows={4}
                value={editing?.answer ?? ""}
                onChange={(e) => setEditing((prev) => (prev ? { ...prev, answer: e.target.value } : prev))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
