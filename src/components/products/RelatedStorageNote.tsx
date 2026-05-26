import { CrossLinkCard } from "@/components/products/CrossLinkCard";

interface RelatedStorageNoteProps {
  copy: string;
  href: string;
  label: string;
}

/**
 * Backwards-compatible wrapper. Existing call sites pass copy/href/label;
 * we derive the target product handle from the href and delegate to the
 * inventory-aware CrossLinkCard so cross-links are never dead-ends.
 */
export const RelatedStorageNote = ({ copy, href, label }: RelatedStorageNoteProps) => {
  const handle = href.replace(/^\/products\//, "").split(/[/?#]/)[0];
  return <CrossLinkCard handle={handle} copy={copy} label={label} />;
};

export default RelatedStorageNote;
