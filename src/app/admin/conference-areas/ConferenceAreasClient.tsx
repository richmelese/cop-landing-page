"use client";

import { useEffect, useState } from "react";
import { MapPinned, Pencil, Plus, Upload, X } from "lucide-react";
import {
  assetUrl,
  deleteSiteAsset,
  getConferenceZones,
  getSiteAsset,
  setSiteAsset,
  updateConferenceZone,
  uploadFile,
  type ConferenceZone,
  type ZoneItem,
} from "@/lib/api";
import { iconMap } from "@/lib/iconMap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ICON_NAMES = Object.keys(iconMap);
const ILLUSTRATION_KEY = "conference-areas-illustration";

type EditingZone = ConferenceZone & { items: ZoneItem[] };

export default function ConferenceAreasClient() {
  const [zones, setZones] = useState<ConferenceZone[]>([]);
  const [illustration, setIllustration] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<EditingZone | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingIllustration, setUploadingIllustration] = useState(false);

  const load = () => {
    Promise.all([getConferenceZones(), getSiteAsset(ILLUSTRATION_KEY).catch(() => null)])
      .then(([zoneData, asset]) => {
        setZones(zoneData);
        setIllustration(asset?.url ?? null);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load conference areas from the backend API.");
        setLoading(false);
      });
  };

  useEffect(load, []);

  const openEdit = (zone: ConferenceZone) => setEditing({ ...zone, items: zone.items.map((i) => ({ ...i })) });

  const updateItem = (index: number, field: keyof ZoneItem, value: string) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const items = prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setEditing((prev) => (prev ? { ...prev, items: [...prev.items, { icon: ICON_NAMES[0], text: "" }] } : prev));
  };

  const removeItem = (index: number) => {
    setEditing((prev) => (prev ? { ...prev, items: prev.items.filter((_, i) => i !== index) } : prev));
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await updateConferenceZone(editing.key, {
        name: editing.name,
        description: editing.description,
        note: editing.note,
        items: editing.items,
      });
      setEditing(null);
      load();
    } catch {
      setError("Could not save — check you're logged in.");
    } finally {
      setSaving(false);
    }
  };

  const uploadIllustration = async (file: File) => {
    setUploadingIllustration(true);
    try {
      const { url } = await uploadFile(file);
      await setSiteAsset(ILLUSTRATION_KEY, url);
      setIllustration(url);
    } catch {
      setError("Could not upload image — check you're logged in.");
    } finally {
      setUploadingIllustration(false);
    }
  };

  const removeIllustration = async () => {
    try {
      await deleteSiteAsset(ILLUSTRATION_KEY);
      setIllustration(null);
    } catch {
      setError("Could not remove image — check you're logged in.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cop-navy to-cop-green text-white">
          <MapPinned className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </span>
        <div>
          <h1 className="font-display text-[22px] font-bold text-cop-navy">Conference Areas</h1>
          <p className="text-[13px] text-cop-ink/60">The &quot;COP32 Areas&quot; section on the homepage (Blue Zone / Green Zone).</p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      <Card className="mt-5 border-cop-blue-soft/50 p-5">
        <h2 className="font-display text-[15px] font-semibold text-cop-navy">Illustration</h2>
        <p className="mt-1 text-[13px] text-cop-ink/60">
          Shown beside the zone cards. Falls back to a simple map graphic if no image is set.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-xl border border-cop-blue-soft/50 bg-cop-mist">
            {illustration ? (
              <img src={assetUrl(illustration)} alt="" className="h-full w-full object-cover" />
            ) : (
              <MapPinned className="h-6 w-6 text-cop-ink/30" />
            )}
          </span>
          <div>
            <label
              htmlFor="illustration-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cop-blue-soft/60 px-4 py-2 text-[13px] font-semibold text-cop-navy transition hover:bg-cop-mist"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploadingIllustration ? "Uploading…" : illustration ? "Replace image" : "Upload image"}
            </label>
            <input
              id="illustration-upload"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              disabled={uploadingIllustration}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) uploadIllustration(file);
              }}
            />
            {illustration && (
              <button
                type="button"
                onClick={removeIllustration}
                className="ml-2 text-[12.5px] font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {loading &&
          [0, 1].map((i) => <Card key={i} className="h-48 animate-pulse border-cop-blue-soft/50 bg-cop-mist/60" />)}
        {!loading &&
          zones.map((zone) => (
            <Card key={zone.key} className="border-cop-blue-soft/50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full ${zone.tone === "navy" ? "bg-cop-navy" : "bg-cop-green"}`}
                  />
                  <h3 className="font-display text-[16px] font-bold text-cop-navy">{zone.name}</h3>
                </div>
                <button
                  onClick={() => openEdit(zone)}
                  aria-label="Edit"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cop-navy text-white transition hover:bg-cop-navy-light"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-cop-ink/70">{zone.description}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-cop-ink/50 italic">{zone.note}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {zone.items.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-full bg-cop-mist px-2.5 py-1 text-[11.5px] font-medium text-cop-ink/70"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[85vh] max-w-[560px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {editing?.name}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="zone-name">Name</Label>
                <Input
                  id="zone-name"
                  className="mt-1"
                  value={editing.name}
                  onChange={(e) => setEditing((prev) => (prev ? { ...prev, name: e.target.value } : prev))}
                />
              </div>
              <div>
                <Label htmlFor="zone-description">Description</Label>
                <Textarea
                  id="zone-description"
                  className="mt-1"
                  rows={2}
                  value={editing.description}
                  onChange={(e) => setEditing((prev) => (prev ? { ...prev, description: e.target.value } : prev))}
                />
              </div>
              <div>
                <Label htmlFor="zone-note">Note</Label>
                <Textarea
                  id="zone-note"
                  className="mt-1"
                  rows={2}
                  value={editing.note}
                  onChange={(e) => setEditing((prev) => (prev ? { ...prev, note: e.target.value } : prev))}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>Within this zone</Label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1 text-[12.5px] font-semibold text-cop-green hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add item
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {editing.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Select value={item.icon} onValueChange={(v) => updateItem(i, "icon", v)}>
                        <SelectTrigger className="w-[130px] shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ICON_NAMES.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={item.text}
                        onChange={(e) => updateItem(i, "text", e.target.value)}
                        placeholder="Item text"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        aria-label="Remove item"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-cop-ink/40 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {editing.items.length === 0 && (
                    <p className="text-[12.5px] text-cop-ink/50">No items yet — add at least one.</p>
                  )}
                </div>
              </div>
            </div>
          )}
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
