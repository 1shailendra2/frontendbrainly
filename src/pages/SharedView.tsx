// src/pages/SharedView.tsx
import { Navbar } from "../components/Navbar";
import { AnimatedWrapper } from "../components/AnimatedWrapper";
import { Button } from "../components/ui/button";
import { useContent } from "../components/useContent";
import { shareContent, unshareContent } from "../api/share";

export default function SharedView() {
  const { content, setContent, loading } = useContent();

  async function toggleShare(contentId: string, share: boolean) {
    if (share) {
      const link = await shareContent(contentId);
      setContent(prev =>
        prev.map(item =>
          item._id === contentId
            ? { ...item, sharedLink: `${window.location.origin}/link/${link.hash}` }
            : item
        )
      );
    } else {
      await unshareContent(contentId);
      setContent(prev =>
        prev.map(item =>
          item._id === contentId ? { ...item, sharedLink: undefined } : item
        )
      );
    }
  }

  return (
    <>
      <Navbar />
      <AnimatedWrapper>
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
          <h1 className="text-2xl font-bold">Your Shared Content</h1>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : content.length === 0 ? (
            <p className="text-muted-foreground">No content yet.</p>
          ) : (
            content.map(item => (
              <div key={item._id} className="border p-4 rounded-md bg-muted space-y-2">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.description}</p>

                {item.sharedLink ? (
                  <div className="flex items-center gap-4">
                    <a
                      href={item.sharedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      View Shared Link
                    </a>
                    <Button variant="destructive" onClick={() => toggleShare(item._id, false)}>
                      Unshare
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => toggleShare(item._id, true)}>Share</Button>
                )}
              </div>
            ))
          )}
        </div>
      </AnimatedWrapper>
    </>
  );
}
