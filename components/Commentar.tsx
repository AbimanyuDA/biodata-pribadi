"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { MessageCircle, UserCircle2, Loader2, Send, ImagePlus, X, Pin } from "lucide-react";

interface CommentData {
  id: string;
  content: string;
  user_name: string;
  profile_image?: string | null;
  is_pinned: boolean;
  created_at: string;
}

interface CommentProps {
  comment: CommentData;
  formatDate: (date: string) => string;
  isPinned?: boolean;
}

const CommentItem = memo(({ comment, formatDate, isPinned = false }: CommentProps) => (
  <div
    className="px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5"
    style={{
      background: isPinned
        ? "linear-gradient(to right, rgba(99,102,241,0.1), rgba(168,85,247,0.1))"
        : "var(--bg-secondary)",
      borderColor: isPinned ? "rgba(99,102,241,0.3)" : "var(--border)",
    }}
  >
    {isPinned && (
      <div className="flex items-center gap-2 mb-3 text-indigo-400">
        <Pin className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide">Pinned Comment</span>
      </div>
    )}
    <div className="flex items-start gap-3">
      {comment.profile_image ? (
        <img
          src={comment.profile_image}
          alt={`${comment.user_name}'s profile`}
          className={`w-10 h-10 rounded-full object-cover border-2 flex-shrink-0 ${
            isPinned ? "border-indigo-500/50" : "border-indigo-500/30"
          }`}
          loading="lazy"
        />
      ) : (
        <div className={`p-2 rounded-full text-indigo-400 group-hover:bg-indigo-500/30 transition-colors ${
          isPinned ? "bg-indigo-500/30" : "bg-indigo-500/20"
        }`}>
          <UserCircle2 className="w-5 h-5" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="font-medium truncate" style={{ color: isPinned ? "#a5b4fc" : "var(--text-primary)" }}>
              {comment.user_name}
            </h4>
            {isPinned && (
              <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full flex-shrink-0">
                Admin
              </span>
            )}
          </div>
          <span className="text-xs whitespace-nowrap self-start sm:self-center" style={{ color: "var(--text-muted)" }}>
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-sm break-words leading-relaxed relative bottom-2" style={{ color: "var(--text-secondary)" }}>
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));
CommentItem.displayName = "CommentItem";

interface CommentFormProps {
  onSubmit: (data: { newComment: string; userName: string; imageBase64: string | null }) => void;
  isSubmitting: boolean;
}

const CommentForm = memo(({ onSubmit, isSubmitting }: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      if (e.target) e.target.value = "";
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      if (e.target) e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;
    onSubmit({ newComment, userName, imageBase64 });
    setNewComment("");
    setUserName("");
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [newComment, userName, imageBase64, onSubmit]);

  const inputStyle = {
    backgroundColor: "var(--bg-secondary)",
    borderWidth: 1,
    borderStyle: "solid" as const,
    borderColor: "var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          maxLength={50}
          placeholder="Enter your name"
          className="w-full p-2.5 rounded-xl placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm"
          style={inputStyle}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          ref={textareaRef}
          value={newComment}
          maxLength={200}
          onChange={handleTextareaChange}
          placeholder="Write your message here..."
          className="w-full p-3 rounded-xl placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none min-h-[90px] text-sm"
          style={inputStyle}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Profile Photo{" "}
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>(optional, max 2MB)</span>
        </label>
        <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          {imagePreview ? (
            <div className="flex items-center gap-3">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/50"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageBase64(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          ) : (
            <div className="w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 text-xs"
              >
                <ImagePlus className="w-4 h-4" />
                <span>Choose Photo</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full h-11 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
});
CommentForm.displayName = "CommentForm";

const PINNED_FALLBACK: CommentData = {
  id: "pinned-default",
  user_name: "Abimanyu Danendra",
  content: "Welcome to my portfolio! Please leave a comment or feedback about my projects.",
  is_pinned: true,
  created_at: new Date().toISOString(),
};

export default function Commentar() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [pinnedComment, setPinnedComment] = useState<CommentData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch("/api/comments");
      if (!res.ok) throw new Error("API error");
      const data: CommentData[] = await res.json();
      const pinned = data.find((c) => c.is_pinned) ?? null;
      const regular = data.filter((c) => !c.is_pinned);
      setPinnedComment(pinned ?? PINNED_FALLBACK);
      setComments(regular);
    } catch {
      // Fallback: show default pinned only
      setPinnedComment(PINNED_FALLBACK);
      setComments([]);
    }
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCommentSubmit = useCallback(async ({
    newComment,
    userName,
    imageBase64,
  }: {
    newComment: string;
    userName: string;
    imageBase64: string | null;
  }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          user_name: userName,
          profile_image: imageBase64 ?? null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post comment");
      }
      await loadComments();
    } catch (err: any) {
      setError(err.message || "Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [loadComments]);

  const formatDate = useCallback((timestamp: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }, []);

  const totalComments = comments.length + (pinnedComment ? 1 : 0);

  return (
    <div
      className="w-full rounded-2xl shadow-xl overflow-hidden border"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Comments <span className="text-indigo-400">({totalComments})</span>
          </h3>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        <div className="space-y-4 max-h-[300px] overflow-y-auto overflow-x-hidden pr-1">
          {pinnedComment && (
            <CommentItem comment={pinnedComment} formatDate={formatDate} isPinned={true} />
          )}

          {comments.length === 0 ? (
            !pinnedComment && (
              <div className="text-center py-8">
                <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No comments yet. Start the conversation!
                </p>
              </div>
            )
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} formatDate={formatDate} isPinned={false} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
