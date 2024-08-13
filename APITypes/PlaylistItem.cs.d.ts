export declare interface playlistItem {
	index: number;
	title: string;
	poster: string;
	fullStream: streamSource;
	highlightsOnlyStream: streamSource;
	highlights: segment[];
	segments: segment[];
	id: string;
}

