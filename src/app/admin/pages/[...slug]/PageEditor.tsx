"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowUpRight, Building2, Check, Plus, Trash2 } from "lucide-react";
import type { DetailPageContent } from "@/content/detailPages";
import type { Section, VenueMapMarker, VenueMapMarkerColor } from "@/components/DetailBody";
import { assetUrl, getPage, updatePage, uploadFile } from "@/lib/api";

const venueMarkerPreviewColor: Record<VenueMapMarkerColor, string> = {
  blue: "#2a7fd4",
  green: "#2f9e62",
  purple: "#a855f7",
  amber: "#f59e0b",
  navy: "#0b2744",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-cop-ink/60">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-cop-blue-soft/60 px-3 py-2 text-[14px] text-cop-ink focus:border-cop-green focus:outline-none";

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

function TextArea({ value, onChange, rows = 2 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={inputClass} />;
}

function RowCard({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="relative rounded-xl border border-cop-blue-soft/60 bg-cop-mist/40 p-4">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove"
        className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full text-red-500 transition hover:bg-red-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
      <div className="grid gap-3 pr-8">{children}</div>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-cop-blue-soft/70 px-3.5 py-1.5 text-[12.5px] font-semibold text-cop-navy transition hover:bg-cop-mist"
    >
      <Plus className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function FieldGroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-bold tracking-[0.1em] text-cop-green uppercase">{children}</p>;
}

export default function PageEditor({ slug }: { slug: string }) {
  const [page, setPage] = useState<DetailPageContent | null>(null);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPage(slug)
      .then((data) => setPage(data as unknown as DetailPageContent))
      .catch(() => setLoadError(`Could not load "/${slug}" from the backend API.`));
  }, [slug]);

  if (loadError) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">
        <AlertCircle className="h-4 w-4" /> {loadError}
      </div>
    );
  }

  if (!page) {
    return <p className="text-[14px] text-cop-ink/60">Loading page…</p>;
  }

  const update = <K extends keyof DetailPageContent>(key: K, value: DetailPageContent[K]) => {
    setPage((p) => (p ? { ...p, [key]: value } : p));
    setSaved(false);
  };

  const updateSection = (i: number, patch: Partial<Section>) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      sections[i] = { ...sections[i], ...patch };
      return { ...p, sections };
    });
    setSaved(false);
  };

  // Generic helpers for array-valued fields on a section (facts, list, subsections, pillars, steps, faq, etc.)
  const updateArrayItem = (sIndex: number, key: keyof Section, itemIndex: number, patch: Record<string, unknown>) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const section = { ...sections[sIndex] } as Record<string, unknown>;
      const arr = [...((section[key as string] as Record<string, unknown>[]) ?? [])];
      arr[itemIndex] = { ...arr[itemIndex], ...patch };
      section[key as string] = arr;
      sections[sIndex] = section as Section;
      return { ...p, sections };
    });
    setSaved(false);
  };

  const addArrayItem = (sIndex: number, key: keyof Section, template: Record<string, unknown>) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const section = { ...sections[sIndex] } as Record<string, unknown>;
      section[key as string] = [...((section[key as string] as unknown[]) ?? []), template];
      sections[sIndex] = section as Section;
      return { ...p, sections };
    });
    setSaved(false);
  };

  const removeArrayItem = (sIndex: number, key: keyof Section, itemIndex: number) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const section = { ...sections[sIndex] } as Record<string, unknown>;
      section[key as string] = ((section[key as string] as unknown[]) ?? []).filter((_, idx) => idx !== itemIndex);
      sections[sIndex] = section as Section;
      return { ...p, sections };
    });
    setSaved(false);
  };

  const updateVenueMarker = (sIndex: number, markerIndex: number, patch: Partial<VenueMapMarker>) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const venueMap = sections[sIndex].venueMap;
      if (!venueMap) return p;
      const markers = [...venueMap.markers];
      markers[markerIndex] = { ...markers[markerIndex], ...patch };
      sections[sIndex] = { ...sections[sIndex], venueMap: { ...venueMap, markers } };
      return { ...p, sections };
    });
    setSaved(false);
  };

  const addVenueMarker = (sIndex: number, marker: VenueMapMarker) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const venueMap = sections[sIndex].venueMap;
      if (!venueMap) return p;
      sections[sIndex] = { ...sections[sIndex], venueMap: { ...venueMap, markers: [...venueMap.markers, marker] } };
      return { ...p, sections };
    });
    setSaved(false);
  };

  const removeVenueMarker = (sIndex: number, markerIndex: number) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const venueMap = sections[sIndex].venueMap;
      if (!venueMap) return p;
      sections[sIndex] = {
        ...sections[sIndex],
        venueMap: { ...venueMap, markers: venueMap.markers.filter((_, idx) => idx !== markerIndex) },
      };
      return { ...p, sections };
    });
    setSaved(false);
  };

  const updateBodyParagraph = (sIndex: number, pIndex: number, value: string) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      const body = [...(sections[sIndex].body ?? [])];
      body[pIndex] = value;
      sections[sIndex] = { ...sections[sIndex], body };
      return { ...p, sections };
    });
    setSaved(false);
  };

  const addBodyParagraph = (sIndex: number) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      sections[sIndex] = { ...sections[sIndex], body: [...(sections[sIndex].body ?? []), ""] };
      return { ...p, sections };
    });
  };

  const removeBodyParagraph = (sIndex: number, pIndex: number) => {
    setPage((p) => {
      if (!p) return p;
      const sections = [...p.sections];
      sections[sIndex] = { ...sections[sIndex], body: (sections[sIndex].body ?? []).filter((_, i) => i !== pIndex) };
      return { ...p, sections };
    });
    setSaved(false);
  };

  const save = async () => {
    if (!page) return;
    setSaving(true);
    setSaveError("");
    try {
      await updatePage(slug, page as unknown as Record<string, unknown>);
      setSaved(true);
    } catch {
      setSaveError("Could not save — check you're logged in and the backend API is reachable.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cop-ink/60 hover:text-cop-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Pages
          </Link>
          <h1 className="mt-2 font-display text-2xl font-bold text-cop-navy">{page.title}</h1>
          <p className="mt-1 font-mono text-[12.5px] text-cop-ink/50">/{slug}</p>
        </div>
        <div className="flex items-center gap-3">
          {saveError && <span className="text-[13px] font-semibold text-red-600">{saveError}</span>}
          {saved && !saveError && (
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cop-green">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-cop-green px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-cop-mint disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Page"}
          </button>
          <Link
            href={`/${slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-cop-blue-soft/60 bg-white px-4 py-2 text-[13px] font-semibold text-cop-ink/70 transition hover:bg-cop-mist"
          >
            View Live <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-cop-blue-soft/60 bg-white p-6">
        <h2 className="font-display text-[16px] font-semibold text-cop-navy">Basic Info</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Title">
            <TextInput value={page.title} onChange={(v) => update("title", v)} />
          </Field>
          <Field label="Eyebrow">
            <TextInput value={page.eyebrow} onChange={(v) => update("eyebrow", v)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Summary">
              <TextArea value={page.summary} onChange={(v) => update("summary", v)} />
            </Field>
          </div>
          <Field label="Hero Image">
            <select
              value={page.image ?? "night"}
              onChange={(e) => update("image", e.target.value as DetailPageContent["image"])}
              className={inputClass}
            >
              <option value="night">Addis Ababa — Night</option>
              <option value="sunset">Addis Ababa — Sunset</option>
              <option value="view">Addis Ababa — View</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {page.sections.map((section, i) => (
          <div key={i} className="rounded-2xl border border-cop-blue-soft/60 bg-white p-6">
            <h3 className="font-display text-[15px] font-semibold text-cop-navy">
              Section {i + 1}
              {section.heading ? `: ${section.heading}` : ""}
            </h3>

            <div className="mt-5 space-y-6">
              <Field label="Heading">
                <TextInput value={section.heading ?? ""} onChange={(v) => updateSection(i, { heading: v })} />
              </Field>

              {section.body && (
                <div>
                  <FieldGroupLabel>Body paragraphs</FieldGroupLabel>
                  <div className="mt-3 space-y-3">
                    {section.body.map((p, j) => (
                      <RowCard key={j} onRemove={() => removeBodyParagraph(i, j)}>
                        <TextArea rows={3} value={p} onChange={(v) => updateBodyParagraph(i, j, v)} />
                      </RowCard>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton label="Add paragraph" onClick={() => addBodyParagraph(i)} />
                  </div>
                </div>
              )}

              {section.facts && (
                <div>
                  <FieldGroupLabel>Facts</FieldGroupLabel>
                  <div className="mt-3 space-y-3">
                    {section.facts.map((f, j) => (
                      <RowCard key={j} onRemove={() => removeArrayItem(i, "facts", j)}>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field label="Label">
                            <TextInput value={f.label} onChange={(v) => updateArrayItem(i, "facts", j, { label: v })} />
                          </Field>
                          <Field label="Value">
                            <TextInput value={f.value} onChange={(v) => updateArrayItem(i, "facts", j, { value: v })} />
                          </Field>
                        </div>
                      </RowCard>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton label="Add fact" onClick={() => addArrayItem(i, "facts", { label: "", value: "" })} />
                  </div>
                </div>
              )}

              {(["subsections", "list", "pillars", "steps"] as const).map(
                (key) =>
                  section[key] && (
                    <div key={key}>
                      <FieldGroupLabel>{key}</FieldGroupLabel>
                      <div className="mt-3 space-y-3">
                        {(section[key] as { title: string; body: string }[]).map((item, j) => (
                          <RowCard key={j} onRemove={() => removeArrayItem(i, key, j)}>
                            <Field label="Title">
                              <TextInput value={item.title} onChange={(v) => updateArrayItem(i, key, j, { title: v })} />
                            </Field>
                            <Field label="Body">
                              <TextArea rows={2} value={item.body} onChange={(v) => updateArrayItem(i, key, j, { body: v })} />
                            </Field>
                          </RowCard>
                        ))}
                      </div>
                      <div className="mt-3">
                        <AddButton label={`Add ${key.slice(0, -1)}`} onClick={() => addArrayItem(i, key, { title: "", body: "" })} />
                      </div>
                    </div>
                  ),
              )}

              {section.targets && (
                <div>
                  <FieldGroupLabel>Targets</FieldGroupLabel>
                  <div className="mt-3 space-y-3">
                    {section.targets.map((t, j) => (
                      <RowCard key={j} onRemove={() => removeArrayItem(i, "targets", j)}>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <Field label="Value (optional)">
                            <TextInput value={t.value ?? ""} onChange={(v) => updateArrayItem(i, "targets", j, { value: v })} />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Title">
                              <TextInput value={t.title} onChange={(v) => updateArrayItem(i, "targets", j, { title: v })} />
                            </Field>
                          </div>
                          <div className="sm:col-span-3">
                            <Field label="Body">
                              <TextArea rows={2} value={t.body} onChange={(v) => updateArrayItem(i, "targets", j, { body: v })} />
                            </Field>
                          </div>
                        </div>
                      </RowCard>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton label="Add target" onClick={() => addArrayItem(i, "targets", { title: "", body: "" })} />
                  </div>
                </div>
              )}

              {section.faq && (
                <div>
                  <FieldGroupLabel>FAQ</FieldGroupLabel>
                  <div className="mt-3 space-y-3">
                    {section.faq.map((f, j) => (
                      <RowCard key={j} onRemove={() => removeArrayItem(i, "faq", j)}>
                        <Field label="Question">
                          <TextInput value={f.q} onChange={(v) => updateArrayItem(i, "faq", j, { q: v })} />
                        </Field>
                        <Field label="Answer">
                          <TextArea rows={2} value={f.a} onChange={(v) => updateArrayItem(i, "faq", j, { a: v })} />
                        </Field>
                      </RowCard>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton label="Add FAQ" onClick={() => addArrayItem(i, "faq", { q: "", a: "" })} />
                  </div>
                </div>
              )}

              {section.boardGroups && (
                <div>
                  <FieldGroupLabel>Board Groups</FieldGroupLabel>
                  <div className="mt-3 space-y-4">
                    {section.boardGroups.map((g, j) => (
                      <RowCard key={j} onRemove={() => removeArrayItem(i, "boardGroups", j)}>
                        <Field label="Group title">
                          <TextInput value={g.title} onChange={(v) => updateArrayItem(i, "boardGroups", j, { title: v })} />
                        </Field>
                        <Field label="Description">
                          <TextArea rows={2} value={g.description ?? ""} onChange={(v) => updateArrayItem(i, "boardGroups", j, { description: v })} />
                        </Field>
                        <FieldGroupLabel>Seats</FieldGroupLabel>
                        <div className="space-y-2">
                          {g.seats.map((seat, k) => (
                            <div key={k} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                              <Field label="Role">
                                <TextInput
                                  value={seat.role}
                                  onChange={(v) => {
                                    const seats = [...g.seats];
                                    seats[k] = { ...seats[k], role: v };
                                    updateArrayItem(i, "boardGroups", j, { seats });
                                  }}
                                />
                              </Field>
                              <Field label="Status">
                                <TextInput
                                  value={seat.status ?? ""}
                                  onChange={(v) => {
                                    const seats = [...g.seats];
                                    seats[k] = { ...seats[k], status: v };
                                    updateArrayItem(i, "boardGroups", j, { seats });
                                  }}
                                />
                              </Field>
                              <button
                                type="button"
                                onClick={() => {
                                  const seats = g.seats.filter((_, idx) => idx !== k);
                                  updateArrayItem(i, "boardGroups", j, { seats });
                                }}
                                className="grid h-9 w-9 place-items-center rounded-full text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                          <AddButton
                            label="Add seat"
                            onClick={() => updateArrayItem(i, "boardGroups", j, { seats: [...g.seats, { role: "", status: "To be announced" }] })}
                          />
                        </div>
                      </RowCard>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton
                      label="Add board group"
                      onClick={() => addArrayItem(i, "boardGroups", { title: "", description: "", seats: [] })}
                    />
                  </div>
                </div>
              )}

              {section.sponsorTiers && (
                <div>
                  <FieldGroupLabel>Sponsor Tiers — live preview</FieldGroupLabel>
                  <div className="mt-3 space-y-6">
                    {section.sponsorTiers.map((t, j) => (
                      <div key={j} className="relative rounded-2xl border border-dashed border-cop-blue-soft/70 p-4">
                        <button
                          type="button"
                          onClick={() => removeArrayItem(i, "sponsorTiers", j)}
                          aria-label="Remove tier"
                          className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <input
                          value={t.tier}
                          onChange={(e) => updateArrayItem(i, "sponsorTiers", j, { tier: e.target.value })}
                          className="w-full max-w-[320px] border-0 border-b border-dashed border-cop-blue-soft/70 bg-transparent font-display text-[12px] font-bold tracking-[0.18em] text-cop-green uppercase focus:border-cop-green focus:outline-none"
                        />
                        <div className="mt-2 border-t border-cop-blue-soft/50" />
                        <div className="mt-5 grid gap-5 pr-8 sm:grid-cols-2 lg:grid-cols-3">
                          {t.slots.map((slot, k) => (
                            <div key={k} className="relative rounded-2xl border border-cop-blue-soft/60 bg-white p-6 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const slots = t.slots.filter((_, idx) => idx !== k);
                                  updateArrayItem(i, "sponsorTiers", j, { slots });
                                }}
                                aria-label="Remove slot"
                                className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full text-red-400 transition hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                              <label
                                htmlFor={`slot-logo-${i}-${j}-${k}`}
                                className="group relative mx-auto grid h-12 w-12 cursor-pointer place-items-center overflow-hidden rounded-2xl bg-cop-mist text-cop-navy"
                                title={slot.logo ? "Replace logo" : "Upload logo"}
                              >
                                {slot.logo ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={assetUrl(slot.logo)} alt="" className="h-full w-full object-contain p-1" />
                                ) : (
                                  <Building2 className="h-6 w-6" />
                                )}
                                <span className="absolute inset-0 hidden place-items-center bg-black/50 text-[10px] font-semibold text-white group-hover:grid">
                                  {slot.logo ? "Replace" : "Upload"}
                                </span>
                                <input
                                  id={`slot-logo-${i}-${j}-${k}`}
                                  type="file"
                                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    e.target.value = "";
                                    if (!file) return;
                                    try {
                                      const { url } = await uploadFile(file);
                                      const slots = [...t.slots];
                                      slots[k] = { ...slots[k], logo: url };
                                      updateArrayItem(i, "sponsorTiers", j, { slots });
                                    } catch {
                                      setSaveError("Logo upload failed — check it's a PNG/JPEG/WEBP/SVG under 5MB and you're logged in.");
                                    }
                                  }}
                                />
                              </label>
                              {slot.logo && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const slots = [...t.slots];
                                    slots[k] = { ...slots[k], logo: undefined };
                                    updateArrayItem(i, "sponsorTiers", j, { slots });
                                  }}
                                  className="mx-auto mt-1 block text-[11px] font-semibold text-red-500 hover:underline"
                                >
                                  Remove logo
                                </button>
                              )}
                              <input
                                value={slot.category}
                                onChange={(e) => {
                                  const slots = [...t.slots];
                                  slots[k] = { ...slots[k], category: e.target.value };
                                  updateArrayItem(i, "sponsorTiers", j, { slots });
                                }}
                                className="mt-4 w-full border-0 border-b border-dashed border-cop-blue-soft/50 bg-transparent text-center font-display text-[15px] font-semibold text-cop-navy focus:border-cop-green focus:outline-none"
                              />
                              <p className="mt-1 text-[13px] text-cop-ink/55 italic">Partner slot open</p>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => updateArrayItem(i, "sponsorTiers", j, { slots: [...t.slots, { category: "New Partner Category" }] })}
                            className="grid min-h-[140px] place-items-center rounded-2xl border-2 border-dashed border-cop-blue-soft/60 text-cop-ink/40 transition hover:border-cop-green hover:text-cop-green"
                          >
                            <span className="flex flex-col items-center gap-1 text-[13px] font-semibold">
                              <Plus className="h-5 w-5" /> Add Slot
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton label="Add tier" onClick={() => addArrayItem(i, "sponsorTiers", { tier: "New Tier", slots: [] })} />
                  </div>
                </div>
              )}

              {section.venueMap && (
                <div>
                  <FieldGroupLabel>Venue Map — live preview</FieldGroupLabel>
                  <div className="mt-3 flex items-center gap-3">
                    <label
                      htmlFor={`venue-map-image-${i}`}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-dashed border-cop-blue-soft/70 px-3.5 py-1.5 text-[12.5px] font-semibold text-cop-navy transition hover:bg-cop-mist"
                    >
                      <Plus className="h-3.5 w-3.5" /> {section.venueMap.image ? "Replace map image" : "Upload map image"}
                    </label>
                    <input
                      id={`venue-map-image-${i}`}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file) return;
                        try {
                          const { url } = await uploadFile(file);
                          updateSection(i, { venueMap: { ...section.venueMap!, image: url } });
                        } catch {
                          setSaveError("Map image upload failed — check it's a PNG/JPEG/WEBP/SVG under 5MB and you're logged in.");
                        }
                      }}
                    />
                    {section.venueMap.image && (
                      <span className="truncate font-mono text-[12px] text-cop-ink/50">{section.venueMap.image}</span>
                    )}
                  </div>

                  <div className="relative mt-4 aspect-[3/2] w-full max-w-[640px] overflow-hidden rounded-2xl border border-cop-blue-soft/60 bg-cop-mist">
                    {section.venueMap.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={assetUrl(section.venueMap.image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    {section.venueMap.markers.map((marker, j) => (
                      <div
                        key={j}
                        className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-[12px] font-bold text-white shadow ring-2 ring-white"
                        style={{
                          left: `${marker.x}%`,
                          top: `${marker.y}%`,
                          backgroundColor: venueMarkerPreviewColor[marker.color],
                        }}
                        title={marker.label}
                      >
                        {marker.id}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3">
                    {section.venueMap.markers.map((marker, j) => (
                      <RowCard key={j} onRemove={() => removeVenueMarker(i, j)}>
                        <div className="grid gap-3 sm:grid-cols-5">
                          <Field label="Badge">
                            <TextInput
                              value={marker.id}
                              onChange={(v) => updateVenueMarker(i, j, { id: v })}
                            />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Label">
                              <TextInput
                                value={marker.label}
                                onChange={(v) => updateVenueMarker(i, j, { label: v })}
                              />
                            </Field>
                          </div>
                          <Field label="X % / Y %">
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={marker.x}
                                onChange={(e) => updateVenueMarker(i, j, { x: Number(e.target.value) })}
                                className={inputClass}
                              />
                              <input
                                type="number"
                                value={marker.y}
                                onChange={(e) => updateVenueMarker(i, j, { y: Number(e.target.value) })}
                                className={inputClass}
                              />
                            </div>
                          </Field>
                          <Field label="Color">
                            <select
                              value={marker.color}
                              onChange={(e) => updateVenueMarker(i, j, { color: e.target.value as VenueMapMarkerColor })}
                              className={inputClass}
                            >
                              <option value="blue">Blue</option>
                              <option value="green">Green</option>
                              <option value="purple">Purple</option>
                              <option value="amber">Amber</option>
                              <option value="navy">Navy</option>
                            </select>
                          </Field>
                        </div>
                      </RowCard>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton
                      label="Add marker"
                      onClick={() => addVenueMarker(i, { id: "A", label: "New Marker", x: 50, y: 50, color: "blue" })}
                    />
                  </div>
                </div>
              )}

              {section.sponsorCta && (
                <div>
                  <FieldGroupLabel>Sponsor CTA Card — live preview</FieldGroupLabel>
                  <div className="relative mt-3 overflow-hidden rounded-3xl bg-gradient-to-br from-cop-navy to-cop-navy-dark px-8 py-12 text-center md:px-12">
                    <svg
                      viewBox="0 0 800 300"
                      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                      preserveAspectRatio="xMidYMid slice"
                      aria-hidden
                    >
                      <path d="M-50 250 C 150 100, 250 350, 450 180 S 700 50, 850 220" stroke="#ffffff" strokeWidth="2" fill="none" />
                      <path d="M-50 100 C 150 250, 300 20, 500 150 S 750 280, 900 80" stroke="#43b97d" strokeWidth="2" fill="none" />
                      <circle cx="120" cy="60" r="60" fill="#ffffff" fillOpacity="0.06" />
                      <circle cx="680" cy="240" r="90" fill="#43b97d" fillOpacity="0.08" />
                    </svg>
                    <div className="relative">
                      <input
                        value={section.sponsorCta.title}
                        onChange={(e) => updateSection(i, { sponsorCta: { ...section.sponsorCta!, title: e.target.value } })}
                        className="w-full border-0 border-b border-dashed border-white/30 bg-transparent text-center font-display text-3xl font-bold text-white focus:border-white focus:outline-none md:text-4xl"
                      />
                      <textarea
                        value={section.sponsorCta.subtitle}
                        onChange={(e) => updateSection(i, { sponsorCta: { ...section.sponsorCta!, subtitle: e.target.value } })}
                        rows={1}
                        className="mx-auto mt-3 block w-full max-w-[480px] resize-none border-0 border-b border-dashed border-white/20 bg-transparent text-center text-[15px] text-white/80 focus:border-white/60 focus:outline-none"
                      />
                      <input
                        value={section.sponsorCta.buttonLabel}
                        onChange={(e) => updateSection(i, { sponsorCta: { ...section.sponsorCta!, buttonLabel: e.target.value } })}
                        className="mt-6 w-auto rounded-full bg-cop-mint px-7 py-3 text-center font-display text-[15px] font-bold text-cop-navy-dark shadow-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-3 max-w-[320px]">
                    <Field label="Button link">
                      <TextInput
                        value={section.sponsorCta.href}
                        onChange={(v) => updateSection(i, { sponsorCta: { ...section.sponsorCta!, href: v } })}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {section.cta && (
                <div>
                  <FieldGroupLabel>Call to Action</FieldGroupLabel>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Label">
                      <TextInput value={section.cta.label} onChange={(v) => updateSection(i, { cta: { ...section.cta!, label: v } })} />
                    </Field>
                    <Field label="Link">
                      <TextInput value={section.cta.href} onChange={(v) => updateSection(i, { cta: { ...section.cta!, href: v } })} />
                    </Field>
                  </div>
                </div>
              )}

              {typeof section.qr === "boolean" && (
                <label className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={section.qr}
                    onChange={(e) => updateSection(i, { qr: e.target.checked })}
                    className="h-4 w-4 accent-cop-green"
                  />
                  <span className="text-[13.5px] font-medium text-cop-ink/70">Show SuperApp QR code block</span>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
