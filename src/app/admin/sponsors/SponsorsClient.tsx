"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  createSponsorSlot,
  createSponsorTier,
  deleteSponsorSlot,
  deleteSponsorTier,
  getSponsorTiers,
  updateSponsorSlot,
  type SponsorSlot,
  type SponsorTier,
} from "@/lib/api";

export default function SponsorsClient() {
  const [tiers, setTiers] = useState<SponsorTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<{ tierName: string; slot: Partial<SponsorSlot> & { tierId: string } } | null>(
    null,
  );
  const [newTierName, setNewTierName] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    getSponsorTiers()
      .then((data) => {
        setTiers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load sponsor tiers from the backend API.");
        setLoading(false);
      });
  };

  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.slot.id) {
        await updateSponsorSlot(editing.slot.id, { category: editing.slot.category });
      } else {
        await createSponsorSlot(editing.slot.tierId, editing.slot.category ?? "");
      }
      setEditing(null);
      load();
    } catch {
      setError("Could not save — check you're logged in.");
    } finally {
      setSaving(false);
    }
  };

  const removeSlot = async (id: string) => {
    try {
      await deleteSponsorSlot(id);
      load();
    } catch {
      setError("Could not delete slot — check you're logged in.");
    }
  };

  const removeTier = async (id: string) => {
    try {
      await deleteSponsorTier(id);
      load();
    } catch {
      setError("Could not delete tier — check you're logged in.");
    }
  };

  const addTier = async () => {
    if (!newTierName.trim()) return;
    try {
      await createSponsorTier(newTierName.trim());
      setNewTierName("");
      load();
    } catch {
      setError("Could not add tier — check you're logged in.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-cop-navy">Sponsors</h1>
      <p className="mt-1 text-[14px] text-cop-ink/60">
        Sponsor tier categories shown on the &quot;Our Sponsors&quot; section of /partners/sponsorship.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      {loading && <p className="mt-6 text-[14px] text-cop-ink/50">Loading…</p>}

      {!loading && (
        <div className="mt-6 space-y-6">
          {tiers.map((tier) => (
            <div key={tier.id} className="rounded-2xl border border-cop-blue-soft/60 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[15px] font-bold tracking-wide text-cop-green uppercase">{tier.name}</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing({ tierName: tier.name, slot: { tierId: tier.id, category: "" } })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cop-navy px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-cop-navy-light"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Slot
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTier(tier.id)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tier.slots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between gap-2 rounded-xl border border-cop-blue-soft/60 p-4">
                    <div>
                      <p className="font-display text-[14px] font-semibold text-cop-navy">{slot.category}</p>
                      <p className="text-[12.5px] text-cop-ink/55 italic">{slot.status}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => setEditing({ tierName: tier.name, slot: { ...slot } })}
                        className="grid h-8 w-8 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-navy transition hover:bg-cop-mist"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeSlot(slot.id)}
                        className="grid h-8 w-8 place-items-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {tier.slots.length === 0 && <p className="text-[13.5px] text-cop-ink/45">No slots yet.</p>}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-dashed border-cop-blue-soft/60 p-6">
            <p className="text-[13px] font-medium text-cop-ink/60">Add a new tier</p>
            <div className="mt-2 flex gap-2">
              <input
                value={newTierName}
                onChange={(e) => setNewTierName(e.target.value)}
                placeholder="e.g. Supporting Partners"
                className="w-full max-w-[280px] rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] focus:border-cop-green focus:outline-none"
              />
              <button
                onClick={addTier}
                className="rounded-full bg-cop-green px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-cop-mint"
              >
                Add Tier
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[460px] rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[17px] font-semibold text-cop-navy">Sponsor Slot — {editing.tierName}</h2>
              <button onClick={() => setEditing(null)} className="text-cop-ink/50 hover:text-cop-ink">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-[13px] font-medium text-cop-ink/60">Category</span>
                <input
                  value={editing.slot.category ?? ""}
                  onChange={(e) => setEditing({ ...editing, slot: { ...editing.slot, category: e.target.value } })}
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
