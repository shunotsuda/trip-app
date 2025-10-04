/**
 * 数字を日本語表記に変換する関数
 * @param num 変換する数字
 * @returns フォーマットされた文字列
 */
export function formatJapaneseNumber(num: number): string {
	if (num < 10000) {
		// 1万未満はカンマ区切り
		return num.toLocaleString("ja-JP");
	}

	if (num < 100000000) {
		// 1億未満は万表記
		const man = num / 10000;
		if (man === Math.floor(man)) {
			// 整数の場合は小数点なし
			return `${man}万`;
		} else {
			// 小数の場合は小数点以下1桁まで
			return `${man.toFixed(1)}万`;
		}
	} else {
		// 1億以上は億表記
		const oku = num / 100000000;
		if (oku === Math.floor(oku)) {
			// 整数の場合は小数点なし
			return `${oku}億`;
		} else {
			// 小数の場合は小数点以下1桁まで
			return `${oku.toFixed(1)}億`;
		}
	}
}

// テスト用の例
// console.log(formatJapaneseNumber(1580)); // "1,580"
// console.log(formatJapaneseNumber(10000)); // "1万"
// console.log(formatJapaneseNumber(12000)); // "1.2万"
// console.log(formatJapaneseNumber(254000)); // "25.4万"
// console.log(formatJapaneseNumber(1280000)); // "128万"
// console.log(formatJapaneseNumber(15660)); // "1.6万"
// console.log(formatJapaneseNumber(120000000)); // "1.2億"
