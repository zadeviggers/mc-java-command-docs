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

const hexParserRegex = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

const percentParserRegex =
  /^\[\s*((?:1|0)(?:.\d+)?)\s*,\s*((?:1|0)(?:.\d+)?)\s*,\s*((?:1|0)(?:.\d+)?)\s*\]$/;

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
  function onHexChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim().toLowerCase();
    if (value.length === 0) return;

    const match = value.match(hexParserRegex);

    if (!match) return;

    const [, ...hexValues] = match;

    const parsedRGBValues = hexValues
      .map((v) => parseInt(v, 16))
      .filter((n) => Number.isInteger(n));

    if (parsedRGBValues.length !== 3) return;

    setRGB(parsedRGBValues as RGBArray);
  }
  function onRGBPercentChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    if (value.length === 0) return;

    const match = value.match(percentParserRegex);

    if (!match) return;

    const [, ...percentValues] = match;

    const parsedRGBValues = percentValues
      .map((v) => Math.floor(Number(v) * 255))
      .filter((n) => Number.isInteger(n));

    if (parsedRGBValues.length !== 3) return;

    setRGB(parsedRGBValues as RGBArray);
  }
  function onPackedIntChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value.trim());
    if (!Number.isInteger(value)) return;

    const parsedR = (value >> 16) & 0xff;
    const parsedG = (value >> 8) & 0xff;
    const parsedB = value & 0xff;

    setRGB([parsedR, parsedG, parsedB]);
  }

  return (
    <details open={defaultOpen} className="flex flex-col flex-wrap">
      <summary className="text-red-50">Colour format converter</summary>
      <div className="flex flex-col gap-4 lg:flex-row lg:h-56">
        {/* Main stack */}
        <div
          className="flex-1 min-h-10 lg:hidden rounded-lg"
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
                  className="rounded-sm  bg-gray-600 text-white"
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
            <div className="flex rounded-sm overflow-hidden">
              <input
                className="block bg-gray-600 text-white"
                type="text"
                pattern="^#?[0-9a-fA-F]{6}$"
                id="RGB-hex-field"
                onFocus={makeHighlightElement("RGB-hex-field")}
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
                className="block bg-gray-600 text-white"
                type="text"
                pattern="\d+"
                id="RGB-packed-int-field"
                onFocus={makeHighlightElement("RGB-packed-int-field")}
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
                className="block bg-gray-600 text-white"
                type="text"
                pattern="^\[([0-9.],?){3}\]$"
                id="RGB-packed-array-field"
                onFocus={makeHighlightElement("RGB-packed-array-field")}
                value={RGBPercentArray}
                onChange={onRGBPercentChange}
              />
              <CopyButton message={RGBPercentArray} />
            </div>
          </label>
        </div>
        <div
          className="flex-1 min-h-10 rounded-lg"
          style={{ backgroundColor: `rgb(${RGB.join(", ")})` }}
        >
          {/* Main colour indicator */}
        </div>
      </div>
    </details>
  );
}
