/**
 * 画像の著作権情報管理
 */

export interface CopyrightInfo {
	filename: string;
	author: string;
	source: string;
	url: string;
	displayText: string;
}

export const copyrightData: CopyrightInfo[] = [
	{
		filename: "disney_tokyo_land.jpg",
		author: "Disney",
		source: "Freepik",
		url: "https://jp.freepik.com/free-disney-template/mikkitominimausunoharentaintekato_138518127.htm",
		displayText: "Disney/Freepik",
	},
	{
		filename: "okinawa1.jpg",
		author: "mrsiraphol",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/quiet-sea-with-idyllic-island_974751.htm",
		displayText: "mrsiraphol/Freepik",
	},
	{
		filename: "kyoto1.jpg",
		author: "jannoon028",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/beautiful-architecture-kiyomizu-dera-temple-kyoto-japan_1009433.htm",
		displayText: "jannoon028/Freepik",
	},
	{
		filename: "hokkaido1.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/landscape-ropeways-surrounded-by-hills-forests-covered-snow-blue-sky_15914750.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "fuji1.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/mount-fuji-with-cherry-blossoms-spring-landscape_15914748.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "fuji2.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/mount-fuji-sunrise-landscape-japan_15914754.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "fuji3.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/mount-fuji-winter-snow-landscape_15914755.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "fuji4.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/mount-fuji-autumn-leaves-landscape_15914756.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "hiroshima1.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/landscape-memorial-peace-park-hiroshima-japan_15914749.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "nagano1.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/landscape-shirakawa-go-historic-village-japan_15914751.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "teien1.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/landscape-traditional-japanese-garden-zen-garden_15914752.htm",
		displayText: "wirestock/Freepik",
	},
	{
		filename: "ramen1.jpg",
		author: "wirestock",
		source: "Freepik",
		url: "https://jp.freepik.com/free-photo/landscape-ramen-bowl-japanese-cuisine_15914753.htm",
		displayText: "wirestock/Freepik",
	},
	// 新しい画像を追加する際はここに追記
];

/**
 * ファイル名から著作権情報を取得
 */
export const getCopyrightInfo = (filename: string): CopyrightInfo | null => {
	return copyrightData.find((item) => filename.includes(item.filename)) || null;
};
