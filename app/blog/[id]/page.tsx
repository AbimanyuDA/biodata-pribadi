"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { blogPosts } from "../../../utils/blogData";
import { useLanguage } from "../../../components/LanguageProvider";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const postId = params.id as string;
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#030014] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 text-white rounded-xl font-semibold transition-transform"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-[#030014] text-white relative">
      {/* Background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#090620]/60 border border-white/10 backdrop-blur-xl p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-2xl relative">
          <div className="mb-10 text-center">
            <div className="inline-flex gap-2 mb-6 justify-center flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {post.title[lang]}
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              A story by Abimanyu Danendra Andarfebano • {post.date}
            </p>
          </div>

          <div className="w-full text-gray-300 leading-relaxed space-y-6 text-justify">
            {post.content}
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
            <button 
              onClick={() => router.push("/#blog")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] text-white shadow-lg rounded-xl font-bold transition-transform flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Stories
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
