"""Assemble 30s vertical ad from 5 frames (6s each)."""
from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image

FRAMES_DIR = Path(__file__).resolve().parents[1] / "public" / "videos"
OUTPUT = FRAMES_DIR / "jidr-ad-30s.mp4"
FRAME_NAMES = [f"frame-{i:02d}.png" for i in range(1, 6)]
SECONDS_PER_FRAME = 6
FPS = 30
SIZE = (1080, 1920)
BG = (255, 249, 242)


def fit_frame(path: Path) -> np.ndarray:
    img = Image.open(path).convert("RGB")
    img.thumbnail(SIZE, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", SIZE, BG)
    canvas.paste(img, ((SIZE[0] - img.width) // 2, (SIZE[1] - img.height) // 2))
    return np.asarray(canvas)


def main() -> None:
    clips: list[np.ndarray] = []
    for name in FRAME_NAMES:
        frame = fit_frame(FRAMES_DIR / name)
        clips.extend([frame] * (SECONDS_PER_FRAME * FPS))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    imageio.mimsave(
        OUTPUT,
        clips,
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        quality=8,
    )
    print(f"Wrote {OUTPUT} ({len(clips) / FPS:.0f}s)")


if __name__ == "__main__":
    main()
