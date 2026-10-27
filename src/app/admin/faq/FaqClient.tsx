"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { createFaq, deleteFaq, getFaq, updateFaq, type FaqEntry } from "@/lib/api";

export default function FaqClient() {
  const [items, setItems] = useState<FaqEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<FaqEntry> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    getFaq()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load FAQ entries from the backend API.");
        setLoading(false);
      });
  };

  useEffect(load, []);

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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-cop-navy">FAQ</h1>
          <p className="mt-1 text-[14px] text-cop-ink/60">Entries shown on the homepage FAQ section and /visitor/faq.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ question: "", answer: "" })}
          className="inline-flex items-center gap-2 rounded-full bg-cop-green px-5 py-2.5 font-display text-[14px] font-semibold text-white transition hover:bg-cop-mint"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {loading && <p className="text-[14px] text-cop-ink/50">Loading…</p>}
        {!loading &&
          items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl border border-cop-blue-soft/60 bg-white p-5">
              <div>
                <h3 className="font-display text-[15.5px] font-semibold text-cop-navy">{item.question}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-cop-ink/70">{item.answer}</p>
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
        {!loading && items.length === 0 && <p className="text-[14px] text-cop-ink/50">No FAQ entries yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[520px] rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[17px] font-semibold text-cop-navy">
                {editing.id ? "Edit FAQ" : "Add FAQ"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-cop-ink/50 hover:text-cop-ink">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Question</span>
                <input
                  value={editing.question ?? ""}
                  onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Answer</span>
                <textarea
                  value={editing.answer ?? ""}
                  onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
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
