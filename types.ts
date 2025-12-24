
export enum VoiceName {
  Kore = 'Kore',
  Puck = 'Puck',
  Charon = 'Charon',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr'
}

export interface VoiceControls {
  temp: string;
  emotion: string;
  speed: string;
  depth: string;
  pitch: string;
  drama: string;
}

export interface VoiceSelection {
  dialect: string;
  type: string;
  field: string;
  controls: VoiceControls;
}

export interface GenerationHistory {
  id: string;
  text: string;
  selection: VoiceSelection;
  timestamp: number;
  audioBlobUrl: string;
}
