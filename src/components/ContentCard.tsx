import type { FC } from "react";
import { FileText, Image, Video } from "lucide-react";
import type {Content} from "../pages/Types";
interface ContentProps {
  content: Content;
}

const typeStyles = {
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

const ContentCard: FC<ContentProps> = ({ content }) => {
  const style = typeStyles[content.type || "text"];

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
    </div>
  );
};

export default ContentCard;
