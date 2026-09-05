"use client";

import { FormEvent, useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("五行缺火是什么意思");
  const [saved, setSaved] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug: "wuxing-que-huo", description: "五行缺火的基础理解", category: "五行", content: "草稿内容", status: "draft" })
    });
    const data = await response.json();
    setSaved(data.article.id);
  }

  return (
    <section className="section">
      <div className="page-shell grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="soft-panel p-5">
          <h1 className="text-3xl font-semibold">后台管理</h1>
          <div className="mt-6 grid gap-2 text-sm text-[#77736B]"><span>文章列表</span><span>新增文章</span><span>草稿</span><span>发布</span><span>分类</span></div>
        </aside>
        <form onSubmit={submit} className="soft-panel grid gap-4 p-6">
          <h2 className="text-2xl font-semibold">新增文章</h2>
          <label className="field"><span>标题</span><input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
          <label className="field"><span>Slug</span><input defaultValue="wuxing-que-huo" /></label>
          <label className="field"><span>SEO Description</span><input defaultValue="五行缺火是什么意思，如何结合八字结构理解。" /></label>
          <label className="field"><span>内容</span><textarea defaultValue="这里是文章正文草稿。" /></label>
          <button className="gold-button">保存草稿</button>
          {saved && <p className="text-sm text-[#77736B]">已保存：{saved}</p>}
        </form>
      </div>
    </section>
  );
}
