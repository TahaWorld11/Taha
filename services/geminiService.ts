
import { GoogleGenAI, Modality } from "@google/genai";

// Audio Decoding Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Convert AudioBuffer to WAV Blob
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const outBuffer = new ArrayBuffer(length);
  const view = new DataView(outBuffer);
  const channels = [];
  let i;
  let sample;
  let offset = 0;
  let pos = 0;

  function setUint16(data: number) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    view.setUint32(pos, data, true);
    pos += 4;
  }

  setUint32(0x46464952);                         // "RIFF"
  setUint32(length - 8);                         // file length - 8
  setUint32(0x45564157);                         // "WAVE"

  setUint32(0x20746d66);                         // "fmt " chunk
  setUint32(16);                                 // length = 16
  setUint16(1);                                  // PCM
  setUint16(numOfChan);
  setUint32(buffer.sampleRate);
  setUint32(buffer.sampleRate * 2 * numOfChan);
  setUint16(numOfChan * 2);
  setUint16(16);

  setUint32(0x61746164);                         // "data"
  setUint32(length - pos - 4);

  for (i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (pos < length) {
    for (i = 0; i < numOfChan; i++) {
      sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (sample < 0 ? sample * 0x8000 : sample * 0x7FFF);
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([outBuffer], { type: "audio/wav" });
}

export class SavioStudioService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  async preprocessText(text: string, options: { dialect: string, field: string, personality: string, controls: any }): Promise<string> {
    const prompt = `
أنت خبير معالجة نصوص. مهمتك هي إعادة صياغة النص العربي التالي ليناسب الأداء الصوتي المحترف.

المعايير المطلوبة:
1. اللهجة: ${options.dialect}. (حول المفردات وبنية الجملة لتناسب اللهجة).
2. المجال: ${options.field}. (إعلان: قصير قوي، وثائقي: رسمي رصين، أطفال: خيالي بسيط، رواية: أدبي ممتد).
3. الشخصية: ${options.personality}.
4. الترقيم والتنغيم: أضف علامات وقف (،) وفواصل (—) وسكتات تنفس (...) لتحسين الإيقاع.
5. الطول: قسم الجمل الطويلة إلى عبارات قصيرة طبيعية للنطق.

النص المراد معالجته:
"${text}"

أخرج النص المعالج فقط بالعربية دون أي شرح إضافي.
    `;

    try {
      const result = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
      });
      return result.text || text;
    } catch (error) {
      console.error("Preprocessing Error:", error);
      return text;
    }
  }

  async generateVoiceOver(text: string, voiceName: string, performanceNote: string): Promise<string> {
    const studioDirective = `

يجب عليك محاكاة أداء صوتي عربي فائق الجودة بناءً على المعايير التالية بدقة متناهية:

${performanceNote}

القواعد الإلزامية للأداء:
1. الالتزام الكامل بمخارج الحروف والنغمة الخاصة باللهجة المختارة.
2. تقمص شخصية المؤدي الصوتي المذكور وروحه الإبداعية.
3. تعديل سرعة وطبقة وعمق الصوت بناءً على إعدادات التحكم بدقة.
4. الالتزام بعلامات الوقف والسكتات المكتوبة في النص (...) و (—).
5. يمنع منعاً باتاً استخدام أي نبرة أو كلمات إنجليزية، الأداء يجب أن يكون عربياً خالصاً.

النص المطلوب تسجيله هو:
"${text}"
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: studioDirective }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("لم يتمكن الاستوديو من الحصول على ملف الصوت.");

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const decodedBytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
      
      const wavBlob = audioBufferToWav(audioBuffer);
      return URL.createObjectURL(wavBlob);
    } catch (error) {
      console.error("Studio Generation Error:", error);
      throw error;
    }
  }
}

export const savioService = new SavioStudioService();
