type Unit = { value: number; suffix: string };

const UNITS: Unit[] = [
  { value: 1_0000_0000_0000, suffix: "兆" }, // 1兆
  { value: 1_0000_0000,      suffix: "億" }, // 1億
  { value: 1_0000,           suffix: "万" }, // 1万
];

function trimTrailingZeros(s: string) {
  return s.replace(/(?:\.0+|(\.\d*?[1-9]))0+$/,"$1").replace(/\.$/, "");
}

/**
 * 数字を日本語表記に変換（万/億/兆）。デフォは小数1桁、不要な0は削除。
 * 例: 123 → "123" / 12000 → "1.2万" / 100000000 → "1億" / -34560000 → "-3456万"
 */
export function formatJapaneseNumber(
  num: number,
  opts: { fractionDigits?: number } = {}
): string {
  const { fractionDigits = 1 } = opts;

  // 非数/無限大のガード
  if (!Number.isFinite(num)) return "";

  const sign = num < 0 ? "-" : "";
  const abs = Math.abs(num);

  // 1万未満はそのまま（ロケール区切り）
  if (abs < 10_000) return sign + abs.toLocaleString("ja-JP");

  // 単位判定（兆→億→万）
  for (const u of UNITS) {
    if (abs >= u.value) {
      const v = abs / u.value;

      // 例: fractionDigits=1 → 12.3万 / 100.0万 → "100万"
      const rounded = v.toFixed(fractionDigits);
      const pretty = trimTrailingZeros(rounded);

      return sign + pretty + u.suffix;
    }
  }

  // ここには来ないが型安全のため
  return sign + abs.toLocaleString("ja-JP");
}
