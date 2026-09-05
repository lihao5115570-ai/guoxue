from __future__ import annotations

import json
import re
from pathlib import Path

try:
    from pypdf import PdfReader
except Exception:  # pragma: no cover
    PdfReader = None

try:
    import pdfplumber
except Exception:  # pragma: no cover
    pdfplumber = None

try:
    from docx import Document
except Exception:  # pragma: no cover
    Document = None


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "十本经典四柱古籍"
OUTPUT = ROOT / "lib" / "content" / "sizhuClassics.ts"
MIN_CHAPTERS = 30
MAX_CHAPTERS = 80
TARGET_CHARS_PER_CHAPTER = 1800

BOOKS = [
    {
        "slug": "san-ming-tong-hui",
        "title": "三命通会",
        "author": "万民英",
        "dynasty": "明",
        "focus": "综合论命、神煞、格局、岁运与传统命例",
        "description": "四柱命理综合性典籍，内容覆盖广，适合作为命理资料库和专题索引。",
        "dir": SOURCE_ROOT / "三命通会",
        "file": SOURCE_ROOT / "三命通会" / "《三命通会》-明-万民英.txt",
    },
    {
        "slug": "wu-xing-jing-ji",
        "title": "五行精纪",
        "author": "廖中",
        "dynasty": "宋",
        "focus": "五行生克、纳音、神煞和早期命理结构",
        "description": "围绕五行、神煞、禄命法和早期术语系统展开的传统资料。",
        "dir": SOURCE_ROOT / "五行精纪",
        "file": SOURCE_ROOT / "五行精纪" / "五行精纪-宋-廖中.txt",
    },
    {
        "slug": "lan-tai-miao-xuan",
        "title": "兰台妙选",
        "author": "西窗老人",
        "dynasty": "明",
        "focus": "格局妙选、组合取象、特殊结构和诗诀式论命",
        "description": "以格局取象和组合判断见长，适合做特殊格局与命例导读。",
        "dir": SOURCE_ROOT / "兰台妙选",
        "file": SOURCE_ROOT / "兰台妙选" / "兰台妙选-明-西窗老人.txt",
    },
    {
        "slug": "qian-li-ming-gao",
        "title": "千里命稿",
        "author": "韦千里",
        "dynasty": "民国",
        "focus": "现代八字入门、十神基础、命例讲解和应用路径",
        "description": "近现代八字学习中常见的入门书，适合把术语转成用户能看懂的专题帖。",
        "dir": SOURCE_ROOT / "千里命稿",
        "file": SOURCE_ROOT / "千里命稿" / "千里命稿.txt .txt",
        "modern": True,
    },
    {
        "slug": "ming-li-tan-yuan",
        "title": "命理探源",
        "author": "袁树珊",
        "dynasty": "民国",
        "focus": "命理源流、基础概念、术数史和传统理论解释",
        "description": "偏重命理源流和基础理论，可作为百科型章节内容入口。",
        "dir": SOURCE_ROOT / "命理探源",
        "file": SOURCE_ROOT / "命理探源" / "袁树珊 - 命理探源.pdf",
        "modern": True,
    },
    {
        "slug": "zi-ping-zhen-quan",
        "title": "子平真诠",
        "author": "沈孝瞻",
        "dynasty": "清",
        "focus": "格局、月令、用神、成败救应和子平法核心框架",
        "description": "子平法格局体系的重要典籍，适合拆解月令取格和成败救应。",
        "dir": SOURCE_ROOT / "子平真诠",
        "file": SOURCE_ROOT / "子平真诠" / "子平真诠评注-清-沈孝瞻.txt",
    },
    {
        "slug": "yuan-hai-zi-ping",
        "title": "渊海子平",
        "author": "徐升",
        "dynasty": "宋",
        "focus": "子平法基础、诗诀、格局、神煞和早期命理资料汇编",
        "description": "子平命理重要资料汇编，适合承接八字术语、古法论命和格局搜索。",
        "dir": SOURCE_ROOT / "渊海子平",
        "file": SOURCE_ROOT / "渊海子平" / "渊海子平-宋-徐子平.txt",
    },
    {
        "slug": "di-tian-sui",
        "title": "滴天髓",
        "author": "刘基题注、任铁樵阐微",
        "dynasty": "明清",
        "focus": "气势、旺衰、清浊、流通、格局层次和命例辨析",
        "description": "强调命局气势与五行流通，是传统八字学习中影响很大的典籍。",
        "dir": SOURCE_ROOT / "滴天髓",
        "file": SOURCE_ROOT / "滴天髓" / "滴天髓原文（刘基注）.pdf",
    },
    {
        "slug": "shen-feng-tong-kao",
        "title": "神峰通考",
        "author": "张楠",
        "dynasty": "明",
        "focus": "病药说、格局、用神、命例和传统论命法则",
        "description": "命理古籍中的重要参考，适合围绕病药、格局和命例做章节化内容。",
        "dir": SOURCE_ROOT / "神锋通考",
        "file": SOURCE_ROOT / "神锋通考" / "神锋通考.pdf",
    },
    {
        "slug": "qiong-tong-bao-jian",
        "title": "穷通宝鉴",
        "author": "余春台",
        "dynasty": "清",
        "focus": "调候取用、月令寒暖、十干十二月和五行气候",
        "description": "以调候取用著称，适合按十干、月份、寒暖燥湿拆成专题帖。",
        "dir": SOURCE_ROOT / "穷通宝鉴",
        "file": SOURCE_ROOT / "穷通宝鉴" / "余春台 - 穷通宝鉴拦江网.pdf",
    },
]

FALLBACK_TOPICS = [
    "入门提要", "天干取象", "地支取象", "五行生克", "月令提纲", "日主强弱", "十神总论", "正官论法", "七杀论法", "正财论法",
    "偏财论法", "正印论法", "偏印论法", "食神论法", "伤官论法", "比肩论法", "劫财论法", "格局判断", "用神喜忌", "调候寒暖",
    "通关制化", "神煞参考", "刑冲合害", "大运看法", "流年看法", "事业职业", "财运经营", "婚姻感情", "身心习惯", "案例读法",
]


def slugify(text: str) -> str:
    mapping = {
        "入门提要": "ru-men-ti-yao", "天干取象": "tian-gan", "地支取象": "di-zhi", "五行生克": "wu-xing-sheng-ke",
        "月令提纲": "yue-ling", "日主强弱": "ri-zhu", "十神总论": "shi-shen-zong-lun", "正官论法": "zheng-guan",
        "七杀论法": "qi-sha", "正财论法": "zheng-cai", "偏财论法": "pian-cai", "正印论法": "zheng-yin",
        "偏印论法": "pian-yin", "食神论法": "shi-shen", "伤官论法": "shang-guan", "比肩论法": "bi-jian",
        "劫财论法": "jie-cai", "格局判断": "ge-ju", "用神喜忌": "yong-shen", "调候寒暖": "tiao-hou",
        "通关制化": "tong-guan", "神煞参考": "shen-sha", "刑冲合害": "xing-chong-he-hai", "大运看法": "da-yun",
        "流年看法": "liu-nian", "事业职业": "shi-ye", "财运经营": "cai-yun", "婚姻感情": "hun-yin",
        "身心习惯": "jian-kang", "案例读法": "an-li-yue-du",
    }
    return mapping.get(text, re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "chapter")


def clean_line(line: str) -> str:
    line = re.sub(r"\s+", " ", line.replace("\u3000", " ")).strip()
    line = line.strip("·•")
    return line


def read_text(path: Path) -> str:
    if path.suffix.lower() == ".txt":
        data = path.read_bytes()
        for enc in ("gb18030", "utf-8", "big5"):
            try:
                return data.decode(enc)
            except UnicodeDecodeError:
                continue
        return data.decode("gb18030", errors="ignore")
    if path.suffix.lower() == ".pdf" and PdfReader:
        try:
            reader = PdfReader(str(path))
            pages = []
            for page in reader.pages[:120]:
                text = page.extract_text() or ""
                if text.strip():
                    pages.append(text)
                if sum(len(p) for p in pages) > 180000:
                    break
            return "\n".join(pages)
        except Exception:
            pass
    if path.suffix.lower() == ".pdf" and pdfplumber:
        try:
            pages = []
            with pdfplumber.open(str(path)) as pdf:
                for page in pdf.pages[:120]:
                    text = page.extract_text() or ""
                    if text.strip():
                        pages.append(text)
                    if sum(len(p) for p in pages) > 180000:
                        break
            return "\n".join(pages)
        except Exception:
            return ""
    if path.suffix.lower() == ".docx" and Document:
        try:
            document = Document(str(path))
            return "\n".join(p.text for p in document.paragraphs if p.text.strip())
        except Exception:
            return ""
    return ""


def all_source_files(book: dict) -> list[Path]:
    directory = book.get("dir", book["file"].parent)
    files = [p for p in Path(directory).iterdir() if p.is_file() and p.suffix.lower() in {".txt", ".pdf", ".doc", ".docx"}]
    preferred = book["file"]
    files.sort(key=lambda p: (0 if p == preferred else 1, p.suffix.lower() not in {".txt", ".docx"}, p.name))
    return files


def collect_book_texts(book: dict) -> tuple[str, list[str], list[str]]:
    chunks = []
    source_files = []
    extracted_files = []
    for path in all_source_files(book):
        source_files.append(str(path.relative_to(ROOT)).replace("\\", "/"))
        text = read_text(path)
        text = text.strip()
        if text:
            extracted_files.append(str(path.relative_to(ROOT)).replace("\\", "/"))
            chunks.append(f"\n\n【资料来源：{path.name}】\n{text}")
    return "\n".join(chunks), source_files, extracted_files


def is_heading(line: str) -> bool:
    if not line or len(line) > 34:
        return False
    if re.search(r"[。；，,：:]{2,}", line):
        return False
    if line.startswith(("http", "www", "“易讯网”")):
        return False
    return bool(
        re.search(r"^(第[一二三四五六七八九十百〇零0-9]+[卷章节篇]|卷[一二三四五六七八九十0-9]+|[一二三四五六七八九十]+[．、.]|论|序|目录|甲|乙|丙|丁|戊|己|庚|辛|壬|癸)", line)
        or (len(line) <= 12 and re.search(r"[命干支神煞财官印食伤格局用调候旺衰纳音]", line))
    )


def split_sections(text: str) -> list[dict[str, list[str] | str]]:
    lines = [clean_line(x) for x in text.splitlines()]
    lines = [x for x in lines if len(x) >= 2 and not re.match(r"^[\\-_=]+$", x)]
    sections: list[dict[str, list[str] | str]] = []
    current_title = ""
    current_body: list[str] = []
    for line in lines:
        if is_heading(line) and current_body:
            sections.append({"title": current_title or line, "body": current_body})
            current_title = line
            current_body = []
        elif is_heading(line) and not current_title:
            current_title = line
        else:
            current_body.append(line)
    if current_body:
        sections.append({"title": current_title or "正文", "body": current_body})
    sections = [s for s in sections if len("".join(s["body"])) > 80]
    return sections


def expand_or_trim_sections(sections: list[dict[str, list[str] | str]], book: dict) -> list[dict[str, list[str] | str]]:
    expanded: list[dict[str, list[str] | str]] = []
    for section in sections:
        body = list(section["body"])
        if len("".join(body)) > 2600 and len(body) > 8:
            total_chars = len("".join(body))
            chunk_count = max(2, min(8, (total_chars // TARGET_CHARS_PER_CHAPTER) + 1))
            chunk_size = max(4, len(body) // chunk_count)
            for i in range(0, len(body), chunk_size):
                chunk = body[i:i + chunk_size]
                if len("".join(chunk)) > 120:
                    title = str(section["title"])
                    suffix = "" if i == 0 else f"续读{len(expanded) + 1}"
                    expanded.append({"title": f"{title}{suffix}", "body": chunk})
        else:
            expanded.append(section)
    if len(expanded) >= MIN_CHAPTERS:
        return expanded[:MAX_CHAPTERS]

    used = {str(s["title"]) for s in expanded}
    for topic in FALLBACK_TOPICS:
        if len(expanded) >= MIN_CHAPTERS:
            break
        if topic in used:
            continue
        expanded.append({
            "title": topic,
            "body": [
                f"本篇围绕《{book['title']}》的“{topic}”展开。原始资料中可直接抽取的章节数量不足最低发布量，因此本站用原创导读补足这一主题帖，后续可继续追加原文校勘和命例。",
                f"阅读《{book['title']}》时，要把“{topic}”放在{book['focus']}这一整体脉络中理解。命理古籍常用简短句式表达复杂关系，不能只摘一句就下定论。",
                "实读时可按三个顺序展开：先看术语本义，再看它在原局中的位置，最后看大运流年如何触发或缓和。这样文章既能承接搜索，也能让普通用户看懂。",
            ],
        })
    return expanded[:MAX_CHAPTERS]


def build_chapter(book: dict, section: dict, idx: int) -> dict:
    raw_title = clean_line(str(section["title"])) or FALLBACK_TOPICS[idx]
    raw_title = re.sub(r"^[一二三四五六七八九十]+[．、.]\s*", "", raw_title)
    if len(raw_title) > 24:
        raw_title = raw_title[:24]
    title = f"第{idx + 1:02d}篇：{raw_title}"
    body = [clean_line(x) for x in section["body"] if clean_line(x)]
    if book.get("modern"):
        body = body[:12]
    else:
        body = body[:24]
    keywords = [book["title"], raw_title, "八字古籍", "四柱命理", "命理典籍"]
    return {
        "bookSlug": book["slug"],
        "chapterSlug": f"{idx + 1:02d}-{slugify(FALLBACK_TOPICS[idx] if idx < len(FALLBACK_TOPICS) else raw_title)}",
        "bookTitle": book["title"],
        "index": idx + 1,
        "title": title,
        "description": f"《{book['title']}》{raw_title}章节导读，整理原文要点、白话说明和阅读重点。",
        "keywords": keywords,
        "sourceFile": str(book["file"].relative_to(ROOT)).replace("\\", "/"),
        "body": body,
        "guide": [
            f"本篇内容依据本地《{book['title']}》资料整理，主题为“{raw_title}”。页面先保留章节正文或摘录，再补充现代读者更容易理解的导读。",
            f"《{book['title']}》的重点在于{book['focus']}。阅读本篇时，不宜把单一句子当作绝对结论，而要看它和天干地支、月令、十神、格局、用神、大运流年的关系。",
            "如果用于学习，可以先读正文，再看阅读重点；如果用于SEO内容承接，本篇可继续扩展术语解释、表格、命例和相关工具入口。",
        ],
        "keyPoints": [
            f"“{raw_title}”需要放回《{book['title']}》全书体系中理解。",
            "古籍中的吉凶词、富贵词只作传统文化解释，不写绝对化判断。",
            "本篇已经挂在对应书籍类目下，适合与八字排盘、五行、格局、用神等页面互链。",
        ],
    }


def main() -> None:
    books = []
    for book in BOOKS:
        text, source_files, extracted_files = collect_book_texts(book)
        if not extracted_files:
            print(f"{book['title']}: files={len(source_files)} extracted=0 skipped=no-readable-text")
            continue
        sections = split_sections(text)
        sections = expand_or_trim_sections(sections, book)
        chapters = [build_chapter(book, section, idx) for idx, section in enumerate(sections[:MAX_CHAPTERS])]
        item = {
            "slug": book["slug"],
            "title": book["title"],
            "author": book["author"],
            "dynasty": book["dynasty"],
            "description": book["description"],
            "sourceFile": str(book["file"].relative_to(ROOT)).replace("\\", "/"),
            "sourceFiles": source_files,
            "extractedFiles": extracted_files,
            "focus": book["focus"],
            "chapters": chapters,
        }
        books.append(item)
        print(f"{book['title']}: files={len(source_files)} extracted={len(extracted_files)} text={len(text)} sections={len(sections)} chapters={len(chapters)}")

    content = """export type SizhuClassicChapter = {
  bookSlug: string;
  chapterSlug: string;
  bookTitle: string;
  index: number;
  title: string;
  description: string;
  keywords: string[];
  body: string[];
  guide: string[];
  keyPoints: string[];
  sourceFile: string;
};

export type SizhuClassicBook = {
  slug: string;
  title: string;
  author: string;
  dynasty: string;
  description: string;
  sourceFile: string;
  sourceFiles: string[];
  extractedFiles: string[];
  focus: string;
  chapters: SizhuClassicChapter[];
};

export const sizhuClassicBooks: SizhuClassicBook[] = """
    content += json.dumps(books, ensure_ascii=False, indent=2)
    content += """;

export const sizhuClassicChapters = sizhuClassicBooks.flatMap((book) => book.chapters);

export function findSizhuBook(slug: string) {
  return sizhuClassicBooks.find((book) => book.slug === slug);
}

export function findSizhuChapter(bookSlug: string, chapterSlug: string) {
  return sizhuClassicChapters.find((chapter) => chapter.bookSlug === bookSlug && chapter.chapterSlug === chapterSlug);
}
"""
    OUTPUT.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
