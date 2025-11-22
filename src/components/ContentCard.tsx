// ...existing code...
import type { FC, JSX } from "react";
import { FileText, Image, Video, Share2 } from "lucide-react";
import type { Content } from "../pages/Types";

interface ContentProps {
  content: Content;
  onShare?: (id: string) => void;
}

const typeStyles: Record<string, { bg: string; border: string; icon: JSX.Element }> = {
  text: {
    bg: "bg-indigo-100",
    border: "border-indigo-300",
    icon: <FileText className="text-indigo-600" size={24} />,
  },
  image: {
    bg: "bg-emerald-100",
    border: "border-emerald-300",
    icon: <Image className="text-emerald-600" size={24} />,
  },
  video: {
    bg: "bg-rose-100",
    border: "border-rose-300",
    icon: <Video className="text-rose-600" size={24} />,
  },
};
// ...existing code...
const ContentCard: FC<ContentProps> = ({ content, onShare }) => {
  const style = typeStyles[content.type || "text"] ?? typeStyles.text;

  return (
    <div className={`p-4 rounded-lg shadow-md ${style.bg} ${style.border} border`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-slate-800">{content.title}</h2>
        {style.icon}
      </div>

      {content.link && (
        <a
          href={content.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline"
        >
          Open Link
        </a>
      )}

      {content.tags && content.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {content.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {content.sharedLink && (
        <div className="mt-3 p-2 bg-white/50 rounded border border-slate-300">
          <p className="text-xs text-slate-600 mb-1">Shared Link:</p>
          <a
            href={content.sharedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 underline break-all"
          >
            {content.sharedLink}
          </a>
        </div>
      )}

      {onShare && (
        <button
          onClick={() => onShare(content._id)}
          className="mt-3 w-full bg-blue-500 text-white px-3 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
          type="button"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      )}
    </div>
  );
};

export default ContentCard;
// ...existing code...