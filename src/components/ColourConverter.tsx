import { useState, useMemo, type ChangeEvent } from "react";
import { CopyButton } from "./CopyButton";

type RGBArray = [number, number, number];
interface ColourConverterProps {
  defaultColour?: RGBArray;
  defaultOpen?: boolean;
}

function makeHighlightElement(id: string) {
  return () => {
    (document.getElementById(id)! as HTMLInputElement).select();
  };
}

export function ColourConverter({
  defaultColour = [255, 0, 0],
  defaultOpen = true,
}: ColourConverterProps) {
  const [RGB, setRGB] = useState<RGBArray>(defaultColour);

  const packedInteger = useMemo(
    () => (RGB[0] << 16) | (RGB[1] << 8) | RGB[2],
    [RGB]
  );

  const RGBPercents = useMemo<RGBArray>(
    () => RGB.map((c) => c / 255) as RGBArray,
    [RGB]
  );

  const RGBPercentArray = useMemo(
    () => `[${RGBPercents.map((p) => p.toFixed(3)).join(", ")}]`,
    [RGBPercents]
  );

  const hexCode = useMemo<string>(
    () =>
      `#${RGB.map((c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }).join("")}`,
    [RGB]
  );

  function makeOnRGBChange(channel: "Red" | "Green" | "Blue") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (channel === "Red") {
        setRGB((old) => [value, old[1], old[2]]);
      } else if (channel === "Green") {
        setRGB((old) => [old[0], value, old[2]]);
      } else {
        // Blue
        setRGB((old) => [old[0], old[1], value]);
      }
    };
  }
  function onHexChange() {}
  function onRGBPercentChange() {}
  function onPackedIntChange() {}

  return (
    <details open={defaultOpen} className="flex flex-col flex-wrap">
      <summary className="text-red-50">Colour converter</summary>
      <div className="flex flex-col gap-4 md:flex-row md:h-56">
        {/* Main stack */}
        <div
          className="flex-1 md:hidden"
          style={{ backgroundColor: `rgb(${RGB.join(", ")})` }}
        >
          {/* Secondary Colour indicator for mobile */}
        </div>
        <div className="flex-2 flex flex-col">
          {/* RGB Controls */}
          {(["Red", "Green", "Blue"] as const).map((c, i) => (
            <label
              htmlFor={`RGB-${c}-field`}
              key={c}
              style={{ accentColor: c }}
            >
              {c}
              <div className="flex gap-2">
                <input
                  type="range"
                  min={0}
                  max={255}
                  id={`RGB-${c}-slider`}
                  value={RGB[i]}
                  onChange={makeOnRGBChange(c)}
                />
                <input
                  className="rounded-sm overflow-hidden"
                  type="number"
                  min={0}
                  max={255}
                  id={`RGB-${c}-field`}
                  value={RGB[i]}
                  onChange={makeOnRGBChange(c)}
                />
              </div>
            </label>
          ))}
        </div>
        <div className="flex-2 flex flex-col">
          {/* Text-based Controls */}
          <label htmlFor="RGB-hex-field">
            Hex code
            <div className="flex">
              <input
                className="block rounded-sm overflow-hidden"
                type="text"
                pattern="^#[0-9a-fA-F]{6}$"
                id="RGB-hex-field"
                onClick={makeHighlightElement("RGB-hex-field")}
                value={hexCode}
                onChange={onHexChange}
              />
              <CopyButton message={hexCode} />
            </div>
          </label>
          <label htmlFor="RGB-int-field">
            Packed integer
            <div className="flex rounded-sm overflow-hidden">
              <input
                className="block"
                type="text"
                pattern="\d+"
                id="RGB-packed-int-field"
                onClick={makeHighlightElement("RGB-packed-int-field")}
                value={packedInteger}
                onChange={onPackedIntChange}
              />
              <CopyButton message={packedInteger + ""} />
            </div>
          </label>
          <label htmlFor="RGB-array-field">
            RGB percent array
            <div className="flex rounded-sm overflow-hidden">
              <input
                className="block"
                type="text"
                pattern="^\[\s*((?:1|0)(?:.\d+)?)\s*,\s*((?:1|0)(?:.\d+)?)\s*,\s*((?:1|0)(?:.\d+)?)\s*\]$"
                id="RGB-packed-array-field"
                onClick={makeHighlightElement("RGB-packed-array-field")}
                value={RGBPercentArray}
                onChange={onRGBPercentChange}
              />
              <CopyButton message={RGBPercentArray} />
            </div>
          </label>
        </div>
        <div
          className="flex-1"
          style={{ backgroundColor: `rgb(${RGB.join(", ")})` }}
        ></div>
      </div>
    </details>
  );
}
