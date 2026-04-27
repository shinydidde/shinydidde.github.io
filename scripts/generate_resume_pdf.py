from pathlib import Path


PAGE_W = 595.0
PAGE_H = 842.0
MARGIN = 30.0


RESUME = {
    "name": "Mrudula Didde",
    "headline": "Principal Frontend Engineer",
    "subheadline": "React, Next.js, TypeScript, Design Systems, Performance, Accessibility",
    "contact": [
        "mruduladidde@gmail.com",
        "mruduladidde.com",
        "linkedin.com/in/mruduladidde",
        "github.com/shinydidde",
        "Rajahmundry, India",
    ],
    "summary": (
        "Frontend engineering leader with 11+ years of experience building scalable web "
        "applications across product, platform, and growth-focused teams. Specializes in "
        "React, Next.js, Vue, TypeScript, design systems, SEO, accessibility, and "
        "performance optimization, with a track record of leading teams, modernizing "
        "frontends, and shipping measurable UX improvements."
    ),
    "highlights": [
        "11+ years in frontend engineering",
        "Led teams of up to 12 engineers",
        "Cut feature delivery time by about 50%",
        "Improved first-load performance by about 35%",
    ],
    "skills": {
        "Frontend": "React, Next.js, Vue.js, Nuxt, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS",
        "Architecture": "Design systems, Storybook, micro-frontends, component libraries, responsive UI, accessibility, SEO",
        "Data & APIs": "Node.js, Firebase, REST APIs, GraphQL, MongoDB, PostgreSQL, analytics instrumentation",
        "Quality & Ops": "Jest, Cypress, Lighthouse CI, Sentry, Docker, AWS, GitLab CI/CD, performance budgets",
    },
    "experience": [
        {
            "company": "Isavari",
            "title": "Principal Engineer",
            "dates": "Oct 2024 - Present",
            "bullets": [
                "Lead an 8-engineer cross-functional team delivering scalable React and Next.js applications and frontend strategy.",
                "Built a modular Storybook design system that reduced feature development time by about 50% and improved UI consistency.",
                "Drove TypeScript adoption, micro-frontend migration, and performance monitoring with Lighthouse CI and Sentry.",
            ],
        },
        {
            "company": "Localstack",
            "title": "Web Developer",
            "dates": "Jan 2021 - Mar 2024",
            "bullets": [
                "Shipped SEO-friendly Vue and Nuxt frontends with accessible, responsive user experiences for cloud developer tooling.",
                "Integrated REST and GraphQL APIs and improved first-load performance by about 35% through bundle and rendering optimizations.",
                "Built an internal npm component library and strengthened Jest, Cypress, and GitLab CI/CD practices.",
            ],
        },
        {
            "company": "Finnovation Tech Solutions Pvt Ltd",
            "title": "Technical Lead",
            "dates": "Dec 2019 - Sep 2021",
            "bullets": [
                "Led a 12-developer team across frontend, platform, and operations for large-scale product delivery.",
                "Owned production deployments, SEO crawlability, analytics implementation, and frontend reliability improvements.",
                "Delivered supporting platform integrations including Firebase authentication and Go-based APIs.",
            ],
        },
        {
            "company": "Finnovation Tech Solutions Pvt Ltd",
            "title": "Senior UX Engineer",
            "dates": "May 2018 - Nov 2019",
            "bullets": [
                "Built and maintained major KreditBee web properties from scratch and migrated legacy experiences to React.",
                "Owned internal dashboards, admin tooling, SEO improvements, analytics reporting, and conversion-focused UX work.",
            ],
        },
        {
            "company": "Earlier Experience",
            "title": "Software Engineer to Junior Software Engineer",
            "dates": "Aug 2014 - May 2018",
            "bullets": [
                "Delivered customer-facing products at Wandertrails and Witlab using Angular, React, Jade, jQuery, Bootstrap, and modern CSS.",
                "Built CRM and admin tooling, supported production deployments, and contributed to SEO, analytics, documentation, and mentoring.",
            ],
        },
    ],
    "education": [
        "MSc, Information Systems with Computing, Dublin Business School, 2024-2025, 74% First Class Honours",
        "BTech, Information Technology, Aditya Engineering College, 2010-2014, 70%",
    ],
}


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def rgb(r: int, g: int, b: int) -> str:
    return f"{r / 255:.3f} {g / 255:.3f} {b / 255:.3f}"


def estimate_width(text: str, size: float) -> float:
    width = 0.0
    for ch in text:
        if ch in "il.,' ":
            width += size * 0.24
        elif ch in "mwMW@#%&":
            width += size * 0.84
        elif ch.isupper():
            width += size * 0.66
        else:
            width += size * 0.54
    return width


def wrap_text(text: str, size: float, width: float):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        candidate = word if not line else f"{line} {word}"
        if estimate_width(candidate, size) <= width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


class PdfCanvas:
    def __init__(self):
        self.ops = []

    def rect(self, x, y, w, h, fill=None, stroke=None, line_width=1):
        self.ops.append("q")
        self.ops.append(f"{line_width} w")
        if fill:
            self.ops.append(f"{rgb(*fill)} rg")
        if stroke:
            self.ops.append(f"{rgb(*stroke)} RG")
        mode = "B" if fill and stroke else "f" if fill else "S"
        self.ops.append(f"{x:.2f} {PAGE_H - y - h:.2f} {w:.2f} {h:.2f} re {mode}")
        self.ops.append("Q")

    def circle(self, x, y, r, fill=None, stroke=None, line_width=1):
        k = 0.5522847498
        self.ops.append("q")
        self.ops.append(f"{line_width} w")
        if fill:
            self.ops.append(f"{rgb(*fill)} rg")
        if stroke:
            self.ops.append(f"{rgb(*stroke)} RG")
        x0, y0 = x - r, PAGE_H - y
        self.ops.append(f"{x + r:.2f} {y0:.2f} m")
        self.ops.append(f"{x + r:.2f} {y0 + k*r:.2f} {x + k*r:.2f} {y0 + r:.2f} {x:.2f} {y0 + r:.2f} c")
        self.ops.append(f"{x - k*r:.2f} {y0 + r:.2f} {x - r:.2f} {y0 + k*r:.2f} {x - r:.2f} {y0:.2f} c")
        self.ops.append(f"{x - r:.2f} {y0 - k*r:.2f} {x - k*r:.2f} {y0 - r:.2f} {x:.2f} {y0 - r:.2f} c")
        self.ops.append(f"{x + k*r:.2f} {y0 - r:.2f} {x + r:.2f} {y0 - k*r:.2f} {x + r:.2f} {y0:.2f} c")
        mode = "B" if fill and stroke else "f" if fill else "S"
        self.ops.append(mode)
        self.ops.append("Q")

    def line(self, x1, y1, x2, y2, color, width=1):
        self.ops.append("q")
        self.ops.append(f"{width} w")
        self.ops.append(f"{rgb(*color)} RG")
        self.ops.append(f"{x1:.2f} {PAGE_H - y1:.2f} m {x2:.2f} {PAGE_H - y2:.2f} l S")
        self.ops.append("Q")

    def text(self, x, y, text, font="F1", size=10, color=(15, 23, 42)):
        self.ops.append("BT")
        self.ops.append(f"/{font} {size:.2f} Tf")
        self.ops.append(f"{rgb(*color)} rg")
        self.ops.append(f"1 0 0 1 {x:.2f} {PAGE_H - y:.2f} Tm")
        self.ops.append(f"({esc(text)}) Tj")
        self.ops.append("ET")

    def text_right(self, right_x, y, text, font="F1", size=10, color=(15, 23, 42)):
        width = estimate_width(text, size)
        self.text(right_x - width, y, text, font=font, size=size, color=color)

    def paragraph(self, x, y, text, width, size=10, leading=13, color=(51, 65, 85), font="F1"):
        lines = wrap_text(text, size, width)
        for i, line in enumerate(lines):
            self.text(x, y + i * leading, line, font=font, size=size, color=color)
        return y + len(lines) * leading

    def bullet_list(self, x, y, items, width, size=9.2, leading=11.5, color=(51, 65, 85)):
        cursor = y
        bullet_indent = 10
        for item in items:
            wrapped = wrap_text(item, size, width - bullet_indent)
            for idx, line in enumerate(wrapped):
                prefix = "-" if idx == 0 else " "
                self.text(x, cursor, prefix, size=size, color=color)
                self.text(x + bullet_indent, cursor, line, size=size, color=color)
                cursor += leading
            cursor += 2
        return cursor


def build_pdf(output_path: Path):
    c = PdfCanvas()

    navy = (15, 23, 42)
    slate = (71, 85, 105)
    mid = (100, 116, 139)
    line = (226, 232, 240)
    soft = (248, 250, 252)
    accent = (30, 41, 59)
    accent_soft = (226, 232, 240)
    accent_fill = (241, 245, 249)

    def draw_section_label(x: float, y: float, width: float, label: str):
        band_top = y - 13
        band_h = 22
        c.rect(x, band_top, width, band_h, fill=accent_fill)
        c.text(x + 10, band_top + 15, label, font="F2", size=10, color=accent)

    header_line_y = 14
    name_y = 50
    headline_y = 82
    subheadline_y = 102
    divider_y = 130
    contact_y = 146
    section_top = 202

    sidebar_x = MARGIN
    sidebar_y = 168
    sidebar_w = 194
    sidebar_h = 648
    sidebar_inner_x = sidebar_x + 14
    sidebar_inner_w = sidebar_w - 28
    main_x = sidebar_x + sidebar_w + 18
    main_w = PAGE_W - MARGIN - main_x

    c.rect(0, 0, PAGE_W, PAGE_H, fill=(255, 255, 255))
    c.rect(0, 0, PAGE_W, 144, fill=(250, 251, 253))
    c.rect(MARGIN, header_line_y, PAGE_W - (MARGIN * 2), 2.5, fill=navy)
    c.rect(sidebar_x, sidebar_y, sidebar_w, sidebar_h, fill=soft, stroke=line)
    c.rect(sidebar_x, sidebar_y, 6, sidebar_h, fill=(203, 213, 225))

    c.text(MARGIN, name_y, RESUME["name"], font="F2", size=22, color=navy)
    c.text(MARGIN, headline_y, RESUME["headline"], font="F2", size=10.5, color=accent)
    c.paragraph(MARGIN, subheadline_y, RESUME["subheadline"], PAGE_W - (MARGIN * 2), size=9.3, leading=10.8, color=slate)
    c.line(MARGIN, divider_y, PAGE_W - MARGIN, divider_y, color=line, width=1)
    c.paragraph(MARGIN, contact_y, " | ".join(RESUME["contact"]), PAGE_W - (MARGIN * 2), size=8.2, leading=10.0, color=mid)

    y = section_top
    draw_section_label(sidebar_inner_x, y, sidebar_inner_w, "SUMMARY")
    y += 28
    y = c.paragraph(sidebar_inner_x, y, RESUME["summary"], sidebar_inner_w, size=8.5, leading=11.1, color=slate)

    y += 22
    draw_section_label(sidebar_inner_x, y, sidebar_inner_w, "HIGHLIGHTS")
    y += 28
    y = c.bullet_list(sidebar_inner_x, y, RESUME["highlights"], sidebar_inner_w, size=8.7, leading=10.7, color=slate)

    y += 12
    draw_section_label(sidebar_inner_x, y, sidebar_inner_w, "CORE SKILLS")
    y += 28
    for label, skills in RESUME["skills"].items():
        c.text(sidebar_inner_x, y, label, font="F2", size=8.7, color=navy)
        y += 12
        y = c.paragraph(sidebar_inner_x, y, skills, sidebar_inner_w, size=8.45, leading=10.3, color=slate)
        y += 9

    y += 5
    draw_section_label(sidebar_inner_x, y, sidebar_inner_w, "EDUCATION")
    y += 28
    for edu in RESUME["education"]:
        y = c.paragraph(sidebar_inner_x, y, edu, sidebar_inner_w, size=8.55, leading=10.4, color=slate)
        y += 9

    y = section_top
    draw_section_label(main_x, y, main_w, "EXPERIENCE")
    y += 28

    for role in RESUME["experience"]:
        date_width = 86
        company_width = main_w - date_width - 10
        company_lines = wrap_text(role["company"], 11.0, company_width)
        for idx, line_text in enumerate(company_lines):
            c.text(main_x, y + idx * 12.5, line_text, font="F2", size=11.0, color=navy)
        c.text_right(PAGE_W - MARGIN, y, role["dates"], size=8.4, color=mid)
        y += len(company_lines) * 12.5 + 2
        c.text(main_x, y, role["title"], font="F2", size=8.9, color=slate)
        y += 14
        y = c.bullet_list(main_x, y, role["bullets"], main_w, size=8.9, leading=11.2, color=slate)
        y += 7
        c.line(main_x, y, PAGE_W - MARGIN, y, color=accent_soft, width=0.8)
        y += 13

    footer_y = y + 18
    chip_x = main_x
    chip_gap = 8
    chips = ["Frontend architecture", "Design systems", "Performance", "Accessibility"]
    for chip in chips:
        chip_w = estimate_width(chip, 8.2) + 20
        if chip_x + chip_w > PAGE_W - MARGIN:
            break
        c.rect(chip_x, footer_y - 11, chip_w, 16, fill=accent_fill, stroke=line, line_width=0.6)
        c.text(chip_x + 10, footer_y, chip, size=8.2, color=mid)
        chip_x += chip_w + chip_gap

    stream = "\n".join(c.ops).encode("latin-1", errors="replace")

    objects = []

    def add_object(data: bytes) -> int:
        objects.append(data)
        return len(objects)

    font1 = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    font2 = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    contents = add_object(b"<< /Length %d >>\nstream\n%s\nendstream" % (len(stream), stream))
    page = add_object(
        f"<< /Type /Page /Parent 5 0 R /MediaBox [0 0 {PAGE_W:.0f} {PAGE_H:.0f}] "
        f"/Contents {contents} 0 R /Resources << /Font << /F1 {font1} 0 R /F2 {font2} 0 R >> >> >>".encode()
    )
    pages = add_object(f"<< /Type /Pages /Kids [{page} 0 R] /Count 1 >>".encode())
    catalog = add_object(f"<< /Type /Catalog /Pages {pages} 0 R >>".encode())

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for idx, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{idx} 0 obj\n".encode())
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_start = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode())
    pdf.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        pdf.extend(f"{off:010d} 00000 n \n".encode())
    pdf.extend(
        f"trailer\n<< /Size {len(objects) + 1} /Root {catalog} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode()
    )

    output_path.write_bytes(pdf)


if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[1]
    output = project_root / "public" / "resume.pdf"
    output.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(output)
    print(f"Wrote {output}")
