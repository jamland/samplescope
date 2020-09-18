/* eslint-disable camelcase */
type SampleId = number;
type SampleName = string;
type SampleAuthor = string;

export interface SearchTextRequest {
  query: string;
  duration?: [number, number];
  // filter: any
  // sort: any
  // group_by_pack: 1 or 0
  abortController: AbortController;
}

export interface SearchTextResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<SamplePreview>;
}

export type SampleList = Array<SamplePreview>;

export interface SamplePreview {
  id: SampleId;
  license: string;
  name: SampleName;
  username: SampleAuthor;
  tags?: Array<string>;
}

export interface SampleInstance {
  // number	The sound’s unique identifier.
  id: SampleId;

  // The URI for this sound on the Freesound website.
  url: string;

  // The name user gave to the sound.
  name: SampleName;

  // An array of tags the user gave to the sound.
  tags: Array<string>;

  // The description the user gave to the sound.
  description: string;

  // Latitude and longitude of the geotag separated by spaces (e.g. “41.0082325664 28.9731252193”, only for sounds that have been geotagged).
  geotag: string;

  // The date when the sound was uploaded (e.g. “2014-04-16T20:07:11.145”).
  created: Date;

  // The license under which the sound is available to you.
  license: string;

  // The type of sound (wav, aif, aiff, mp3, m4a or flac).
  type: SampleFileType;

  // The number of channels.
  channels: number;

  // The size of the file in bytes.
  filesize: number;

  // The bit rate of the sound in kbps.
  bitrate: number;

  // The bit depth of the sound.
  bitdepth: number;

  // The duration of the sound in seconds.
  duration: number;

  // The samplerate of the sound.
  samplerate: number;

  // The username of the uploader of the sound.
  username: SampleAuthor;

  // If the sound is part of a pack, this URI points to that pack’s API resource.
  pack: string;

  // The URI for retrieving the original sound.
  download: string;

  // The URI for bookmarking the sound.
  bookmark: string;

  // Dictionary containing the URIs for mp3 and ogg versions of the sound. The dictionary includes the fields preview-hq-mp3 and preview-lq-mp3 (for ~128kbps quality and ~64kbps quality mp3 respectively), and preview-hq-ogg and preview-lq-ogg (for ~192kbps quality and ~80kbps quality ogg respectively). API authentication is required for retrieving sound previews (Token or OAuth2).
  previews: SamplePreviews;

  // Dictionary including the URIs for spectrogram and waveform visualizations of the sound. The dinctionary includes the fields waveform_l and waveform_m (for large and medium waveform images respectively), and spectral_l and spectral_m (for large and medium spectrogram images respectively).
  images: SampleImages;

  // The number of times the sound was downloaded.
  num_downloads: number;

  // The average rating of the sound.
  avg_rating: number;

  // The number of times the sound was rated.
  num_ratings: number;

  // The URI for rating the sound.
  rate: string;

  // The URI of a paginated list of the comments of the sound.
  comments: string;

  // The number of comments.
  num_comments: number;

  // The URI to comment the sound.
  comment: string;

  // URI pointing to the similarity resource (to get a list of similar sounds).
  similar_sounds: string;

  // Dictionary containing requested descriptors information according to the descriptors request parameter (see below). This field will be null if no descriptors were specified (or invalid descriptor names specified) or if the analysis data for the sound is not available.
  analysis: object | string;

  // URI pointing to the complete analysis results of the sound (see Analysis Descriptor Documentation).
  analysis_stats: string;

  // The URI for retrieving a JSON file with analysis information for each frame of the sound (see Analysis Descriptor Documentation).
  analysis_frames: string;

  // Dictionary containing the results of the AudioCommons analysis for the given sound.
  ac_analysis: acAnalysisDetails;

  pack_name: string;
}

type SampleImages = {
  spectral_bw_l: string;
  spectral_bw_m: string;
  spectral_l: string;
  spectral_m: string;
  waveform_bw_l: string;
  waveform_bw_m: string;
  waveform_l: string;
  waveform_m: string;
};

type SamplePreviews = {
  'preview-hq-mp3': string;
  'preview-hq-ogg': string;
  'preview-lq-mp3': string;
  'preview-lq-ogg': string;
};

type SampleFileType = 'wav' | 'aif' | 'aiff' | 'mp3' | 'm4a' | 'flac';

type acAnalysisDetails = {
  ac_boominess: number;
  ac_brightness: number;
  ac_depth: number;
  ac_dynamic_range: number;
  ac_hardness: number;
  ac_log_attack_time: number;
  ac_loop: boolean;
  ac_loudness: number;
  ac_note_confidence: number;
  ac_note_frequency: number;
  ac_note_midi: number;
  ac_note_name: string;
  ac_reverb: boolean;
  ac_roughness: number;
  ac_sharpness: number;
  ac_single_event: boolean;
  ac_tempo: number;
  ac_tempo_confidence: number;
  ac_temporal_centroid: number;
  ac_tonality: string;
  ac_tonality_confidence: number;
  ac_warmth: number;
};
