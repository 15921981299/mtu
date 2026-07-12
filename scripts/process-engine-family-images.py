from __future__ import annotations

import argparse
import shutil
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, UnidentifiedImageError


SOURCE_DIR = Path("public/images/engine-family-parts")
PREVIEW_DIR = Path("exports/image-processing-preview")
BACKUP_ROOT = Path("exports")
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
CROP_RATIO = 176 / 816


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
        Path("C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def add_site_mark(image: Image.Image) -> Image.Image:
    canvas = image.convert("RGBA")
    width, height = canvas.size
    draw = ImageDraw.Draw(canvas, "RGBA")

    scale = min(width, height)
    padding = max(10, round(scale * 0.027))
    gap = max(4, round(scale * 0.012))
    radius = max(8, round(scale * 0.024))
    title_font = load_font(max(15, round(width * 0.035)), bold=True)
    domain_font = load_font(max(10, round(width * 0.021)), bold=False)

    title = "Diesel Part Source"
    domain = "dieselpartsource.com"
    title_w, title_h = text_size(draw, title, title_font)
    domain_w, domain_h = text_size(draw, domain, domain_font)

    box_w = max(title_w, domain_w) + padding * 2 + gap
    box_h = title_h + domain_h + gap + padding * 2
    x2 = width - padding
    y2 = height - padding
    x1 = max(padding, x2 - box_w)
    y1 = max(padding, y2 - box_h)

    draw.rounded_rectangle(
        (x1, y1, x2, y2),
        radius=radius,
        fill=(255, 255, 255, 194),
        outline=(26, 92, 184, 130),
        width=max(1, round(scale * 0.004)),
    )
    accent_w = max(3, round(scale * 0.009))
    draw.rounded_rectangle(
        (x1 + padding, y1 + padding, x1 + padding + accent_w, y2 - padding),
        radius=accent_w,
        fill=(25, 92, 184, 210),
    )

    text_x = x1 + padding + accent_w + gap
    draw.text((text_x, y1 + padding), title, font=title_font, fill=(18, 32, 50, 230))
    draw.text(
        (text_x, y1 + padding + title_h + gap),
        domain,
        font=domain_font,
        fill=(25, 92, 184, 218),
    )
    return canvas


def part_label_from_path(path: Path) -> str:
    return path.stem.replace("-", " ").title()


def make_placeholder(path: Path, size: tuple[int, int] = (640, 468)) -> Image.Image:
    image = Image.new("RGBA", size, (246, 248, 251, 255))
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = image.size
    title_font = load_font(28, bold=True)
    body_font = load_font(17, bold=False)
    label = part_label_from_path(path)
    title = "Diesel Engine Part"
    body = label[:64]
    title_w, title_h = text_size(draw, title, title_font)
    body_w, body_h = text_size(draw, body, body_font)
    draw.rounded_rectangle(
        (28, 28, width - 28, height - 28),
        radius=18,
        fill=(255, 255, 255, 255),
        outline=(204, 213, 225, 255),
        width=2,
    )
    draw.text(((width - title_w) / 2, height * 0.38), title, font=title_font, fill=(18, 32, 50, 230))
    draw.text(((width - body_w) / 2, height * 0.38 + title_h + 14), body, font=body_font, fill=(71, 85, 105, 230))
    return image


def crop_left_strip(image: Image.Image) -> Image.Image:
    crop_x = round(image.width * CROP_RATIO)
    crop_x = max(1, min(crop_x, round(image.width * 0.28), image.width - 1))
    return image.crop((crop_x, 0, image.width, image.height))


def save_image(image: Image.Image, path: Path) -> None:
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        image.convert("RGB").save(path, quality=90, optimize=True, progressive=True)
    elif suffix == ".webp":
        image.save(path, quality=88, method=6)
    elif suffix == ".png":
        image.save(path, optimize=True)
    else:
        raise ValueError(f"Unsupported extension: {path.suffix}")


def transform_image(input_path: Path, output_path: Path) -> tuple[int, int, int, int]:
    try:
        with Image.open(input_path) as original:
            original.load()
            source_size = original.size
            cropped = crop_left_strip(original)
            marked = add_site_mark(cropped)
    except UnidentifiedImageError:
        marked = add_site_mark(make_placeholder(input_path))
        source_size = (816, 468)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = output_path.with_name(f"{output_path.stem}.tmp{output_path.suffix}")
    save_image(marked, temp_path)
    temp_path.replace(output_path)
    return source_size[0], source_size[1], marked.width, marked.height


def collect_images() -> list[Path]:
    return sorted(
        path
        for path in SOURCE_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )


def run_preview(limit: int) -> None:
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    for existing in PREVIEW_DIR.glob("*"):
        if existing.is_file():
            existing.unlink()
    for path in collect_images()[:limit]:
        output = PREVIEW_DIR / path.with_suffix(".jpg").name
        before_w, before_h, after_w, after_h = transform_image(path, output)
        print(f"preview {path.name}: {before_w}x{before_h} -> {after_w}x{after_h}")
    print(f"preview_dir={PREVIEW_DIR.resolve()}")


def image_needs_processing(path: Path) -> bool:
    try:
        with Image.open(path) as image:
            image.load()
            return image.width > 700
    except Exception:
        try:
            return path.read_text(encoding="utf-8", errors="ignore").lstrip().startswith("<svg")
        except Exception:
            return False


def run_batch(resume: bool = False) -> None:
    images = collect_images()
    if resume:
        images = [path for path in images if image_needs_processing(path)]
    backup_dir = BACKUP_ROOT / f"engine-family-parts-original-backup-{datetime.now():%Y%m%d-%H%M%S}"
    processed = 0

    for path in images:
        backup_path = backup_dir / path.name
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, backup_path)
        before_w, before_h, after_w, after_h = transform_image(path, path)
        processed += 1
        if processed <= 8 or processed % 100 == 0:
            print(f"processed {processed}/{len(images)} {path.name}: {before_w}x{before_h} -> {after_w}x{after_h}")

    print(f"processed_total={processed}")
    print(f"backup_dir={backup_dir.resolve()}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Crop engine-family part images and add Diesel Part Source site mark.")
    parser.add_argument("--preview", type=int, default=0, help="Create preview images instead of modifying originals.")
    parser.add_argument("--resume", action="store_true", help="Skip images that already look cropped.")
    args = parser.parse_args()

    if args.preview:
        run_preview(args.preview)
    else:
        run_batch(resume=args.resume)


if __name__ == "__main__":
    main()
