from __future__ import annotations

import argparse
import shutil
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps, UnidentifiedImageError


SOURCE_DIR = Path("public/images/engine-family-parts")
EXPORT_ROOT = Path("exports")
PREVIEW_DIR = EXPORT_ROOT / "image-processing-preview-v2"
MASTER_SOURCE_DIR = EXPORT_ROOT / "engine-family-parts-master-sources"
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
OUTPUT_SIZE = (640, 468)
FOOTER_HEIGHT = 78


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


def fit_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: int) -> str:
    if text_size(draw, text, font)[0] <= max_width:
        return text
    suffix = "..."
    trimmed = text
    while trimmed and text_size(draw, trimmed + suffix, font)[0] > max_width:
        trimmed = trimmed[:-1]
    return (trimmed.rstrip() + suffix) if trimmed else suffix


def part_label_from_path(path: Path) -> str:
    return " ".join(word.upper() if any(char.isdigit() for char in word) else word.title() for word in path.stem.split("-"))


def has_competitor_side_strip(image: Image.Image) -> bool:
    width, height = image.size
    if width < 500 or height < 250 or width / height < 1.55:
        return False

    sample = image.convert("RGB").resize((80, 48), Image.Resampling.BILINEAR)
    left_width = 17
    blue_pixels = 0
    saturated_pixels = 0
    left_sample = sample.crop((0, 0, left_width, 48))
    pixels = left_sample.load()
    for y in range(left_sample.height):
        for x in range(left_sample.width):
            red, green, blue = pixels[x, y]
            if blue > red + 25 and blue > green + 12:
                blue_pixels += 1
            if max(red, green, blue) - min(red, green, blue) > 45:
                saturated_pixels += 1
    total = left_width * 48
    return blue_pixels / total > 0.38 and saturated_pixels / total > 0.42


def remove_side_strip(image: Image.Image) -> Image.Image:
    if not has_competitor_side_strip(image):
        return image
    crop_x = max(1, min(round(image.width * 176 / 816), round(image.width * 0.28)))
    return image.crop((crop_x, 0, image.width, image.height))


def normalize_photo(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image).convert("RGB")
    image = remove_side_strip(image)
    image = ImageEnhance.Contrast(image).enhance(1.025)
    image = ImageEnhance.Color(image).enhance(0.97)
    image = ImageEnhance.Sharpness(image).enhance(1.08)

    canvas = Image.new("RGB", OUTPUT_SIZE, (242, 245, 248))
    fitted = ImageOps.contain(image, OUTPUT_SIZE, Image.Resampling.LANCZOS)
    x = (OUTPUT_SIZE[0] - fitted.width) // 2
    y = (OUTPUT_SIZE[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    return canvas


def add_catalog_branding(image: Image.Image, source_path: Path) -> Image.Image:
    canvas = image.convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    width, height = canvas.size
    navy = (13, 31, 50, 246)
    blue = (19, 101, 190, 255)

    # A restrained corner label makes the photo attributable without obscuring the part.
    draw.rounded_rectangle((16, 16, 257, 50), radius=4, fill=navy)
    draw.rectangle((16, 16, 22, 50), fill=blue)
    brand_font = load_font(15, bold=True)
    draw.text((32, 24), "DIESEL PART SOURCE", font=brand_font, fill=(255, 255, 255, 255))

    footer_y = height - FOOTER_HEIGHT
    draw.rectangle((0, footer_y, width, height), fill=(255, 255, 255, 247))
    draw.rectangle((0, footer_y, width, footer_y + 4), fill=blue)
    draw.rectangle((0, height - 5, width, height), fill=navy)

    label_font = load_font(18, bold=True)
    meta_font = load_font(12, bold=False)
    domain_font = load_font(14, bold=True)
    label = fit_text(draw, part_label_from_path(source_path), label_font, 430)
    draw.text((18, footer_y + 16), label, font=label_font, fill=(18, 32, 50, 255))
    draw.text((18, footer_y + 45), "Verified part-number sourcing reference", font=meta_font, fill=(78, 92, 111, 255))

    domain = "dieselpartsource.com"
    domain_w, _ = text_size(draw, domain, domain_font)
    draw.text((width - domain_w - 18, footer_y + 27), domain, font=domain_font, fill=blue)
    return canvas


def make_placeholder(path: Path) -> Image.Image:
    image = Image.new("RGB", OUTPUT_SIZE, (242, 245, 248))
    draw = ImageDraw.Draw(image)
    title_font = load_font(26, bold=True)
    body_font = load_font(16)
    title = "Diesel Engine Part"
    body = fit_text(draw, part_label_from_path(path), body_font, 520)
    title_w, title_h = text_size(draw, title, title_font)
    body_w, _ = text_size(draw, body, body_font)
    draw.text(((OUTPUT_SIZE[0] - title_w) / 2, 170), title, font=title_font, fill=(18, 32, 50))
    draw.text(((OUTPUT_SIZE[0] - body_w) / 2, 170 + title_h + 14), body, font=body_font, fill=(71, 85, 105))
    return image


def save_image(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        image.convert("RGB").save(path, quality=90, optimize=True, progressive=True)
    elif suffix == ".webp":
        image.convert("RGB").save(path, quality=88, method=6)
    elif suffix == ".png":
        image.save(path, optimize=True)
    else:
        raise ValueError(f"Unsupported extension: {path.suffix}")


def image_area(path: Path) -> int:
    try:
        with Image.open(path) as image:
            return image.width * image.height
    except Exception:
        return 0


def historical_candidates(filename: str) -> list[Path]:
    candidates = [directory / filename for directory in EXPORT_ROOT.glob("engine-family-parts-original-backup-*")]
    return [path for path in candidates if path.is_file()]


def select_master_source(current_path: Path) -> Path:
    master_path = MASTER_SOURCE_DIR / current_path.name
    if master_path.is_file():
        return master_path

    candidates = historical_candidates(current_path.name) + [current_path]
    selected = max(candidates, key=image_area)
    MASTER_SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(selected, master_path)
    return master_path


def transform_image(input_path: Path, output_path: Path) -> tuple[int, int, bool]:
    try:
        with Image.open(input_path) as original:
            original.load()
            source_size = original.size
            removed_strip = has_competitor_side_strip(ImageOps.exif_transpose(original).convert("RGB"))
            normalized = normalize_photo(original)
    except (UnidentifiedImageError, OSError):
        source_size = (0, 0)
        removed_strip = False
        normalized = make_placeholder(input_path)

    branded = add_catalog_branding(normalized, output_path)
    temp_path = output_path.with_name(f"{output_path.stem}.tmp{output_path.suffix}")
    save_image(branded, temp_path)
    temp_path.replace(output_path)
    return source_size[0], source_size[1], removed_strip


def collect_images() -> list[Path]:
    return sorted(
        path
        for path in SOURCE_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )


def preview_selection(images: list[Path], limit: int) -> list[Path]:
    if len(images) <= limit:
        return images
    selected = [images[round(index * (len(images) - 1) / (limit - 1))] for index in range(limit)]
    unusual = [path for path in images if image_area(path) != OUTPUT_SIZE[0] * OUTPUT_SIZE[1]]
    if unusual:
        selected[-1] = unusual[-1]
    return selected


def run_preview(limit: int) -> None:
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    images = collect_images()
    for path in preview_selection(images, limit):
        master = select_master_source(path)
        output = PREVIEW_DIR / path.name
        before_w, before_h, removed_strip = transform_image(master, output)
        print(f"preview {path.name}: {before_w}x{before_h}, strip_removed={removed_strip}")
    print(f"preview_dir={PREVIEW_DIR.resolve()}")


def run_batch() -> None:
    images = collect_images()
    backup_dir = EXPORT_ROOT / f"engine-family-parts-pre-brand-refresh-{datetime.now():%Y%m%d-%H%M%S}"
    backup_dir.mkdir(parents=True, exist_ok=True)
    processed = 0
    strips_removed = 0

    for path in images:
        shutil.copy2(path, backup_dir / path.name)
        master = select_master_source(path)
        before_w, before_h, removed_strip = transform_image(master, path)
        processed += 1
        strips_removed += int(removed_strip)
        if processed <= 8 or processed % 100 == 0:
            print(
                f"processed {processed}/{len(images)} {path.name}: "
                f"source={before_w}x{before_h}, strip_removed={removed_strip}"
            )

    print(f"processed_total={processed}")
    print(f"source_strips_removed={strips_removed}")
    print(f"master_source_dir={MASTER_SOURCE_DIR.resolve()}")
    print(f"backup_dir={backup_dir.resolve()}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create Diesel Part Source branded catalog images.")
    parser.add_argument("--preview", type=int, default=0, help="Create representative previews without changing site images.")
    args = parser.parse_args()

    if args.preview:
        run_preview(max(2, args.preview))
    else:
        run_batch()


if __name__ == "__main__":
    main()
