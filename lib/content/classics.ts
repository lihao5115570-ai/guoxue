export type ClassicItem = {
  slug: string;
  title: string;
  description: string;
  sections: Array<{ heading: string; body: string }>;
};

const classicNames = [
  ["di-tian-sui", "滴天髓", "传统命理典籍中影响很大的气势、旺衰、清浊与命例辨析资料。"],
  ["zi-ping-zhen-quan", "子平真诠", "子平法体系中常见的格局、月令、用神与成败救应参考。"],
  ["yuan-hai-zi-ping", "渊海子平", "子平命理的重要资料汇编，适合做术语、格局和诗诀索引。"],
  ["qian-li-ming-gao", "千里命稿", "近现代命理学习中常见的入门与案例材料。"],
  ["san-ming-tong-hui", "三命通会", "传统命理综合性典籍，内容覆盖五行、纳音、神煞、格局与岁运。"],
  ["wu-xing-jing-ji", "五行精纪", "围绕五行生克、纳音、神煞和禄命法进行归纳。"],
  ["lan-tai-miao-xuan", "兰台妙选", "以格局妙选、组合取象、纳音地支和诗诀式论命见长。"]
];

export const classicItems: ClassicItem[] = classicNames.map(([slug, title, description]) => ({
  slug,
  title,
  description,
  sections: [
    {
      heading: "内容简介",
      body: `${title}属于传统命理资料体系中的一个重要条目。本页用于整理该典籍或主题的基本介绍、学习价值和适合阅读的方向，后续可以继续补充原文、注释、译文和案例。`
    },
    {
      heading: "适合怎么读",
      body: `阅读${title}时，建议先理解天干地支、五行、十神、格局、旺衰、调候和通关等基础概念，再回到原典文本中看具体表达。这样更容易避免只记口诀、不理解结构。`
    },
    {
      heading: "与工具的关系",
      body: `本站工具会把传统术语转成更容易理解的结构化内容。典籍栏目主要用于承接搜索和学习需求，让用户可以从工具结果继续进入基础知识和传统文献。`
    }
  ]
}));

export function findClassic(slug: string) {
  return classicItems.find((item) => item.slug === slug);
}
