
export interface VoiceProfile {
  name: string;
  gender: 'male' | 'female';
  voiceType: string;
  category: string;
  categoryKey: 'doc' | 'ads' | 'cartoon' | 'podcast' | 'novels' | 'youtube' | 'drama' | 'edu' | 'corporate';
  description: string;
}

export interface DialectInfo {
  id: string;
  title: string;
  description: string;
  profiles: VoiceProfile[];
}

export interface VoiceField {
  id: string;
  title: string;
  description: string;
  color: string;
  glow: string;
}

export const CATEGORY_STYLES = {
  doc: { color: 'from-slate-600 to-black', icon: 'mic-documentary' },
  ads: { color: 'from-amber-400 to-orange-600', icon: 'mic-ads' },
  cartoon: { color: 'from-yellow-400 via-pink-500 to-purple-600', icon: 'mic-kids' },
  podcast: { color: 'from-blue-800 to-indigo-950', icon: 'mic-podcast' },
  novels: { color: 'from-purple-800 to-fuchsia-950', icon: 'mic-book' },
  youtube: { color: 'from-red-600 to-red-800', icon: 'mic-youtube' },
  drama: { color: 'from-rose-700 to-fuchsia-900', icon: 'mic-drama' },
  edu: { color: 'from-teal-500 to-cyan-600', icon: 'mic-edu' },
  corporate: { color: 'from-slate-500 to-slate-800', icon: 'mic-corp' }
};

export const DIALECTS: DialectInfo[] = [
  {
    id: 'egyptian',
    title: 'اللهجة المصرية',
    description: 'صوت خفيف الظل، سريع الوتيرة، مثالي للإعلانات والدراما والكوميديا.',
    profiles: [
      { name: 'يوسف', gender: 'male', voiceType: 'بالغ', category: 'وثائقي قوي', categoryKey: 'doc', description: 'صوت رجولي عميق يناسب الأفلام الوثائقية والروايات التاريخية بنبرة حاكمة مؤثرة.' },
      { name: 'مالك', gender: 'male', voiceType: 'بالغ', category: 'إعلاني سريع', categoryKey: 'ads', description: 'صوت سريع وجذاب مخصص لصناعة الإعلانات والمؤثرات التسويقية بأسلوب مرحّب لامع.' },
      { name: 'رامي', gender: 'male', voiceType: 'بالغ', category: 'بودكاست هادئ', categoryKey: 'podcast', description: 'صوت محايد وواضح مناسب للبودكاست العربي والمحتوى الهادئ المباشر.' },
      { name: 'سيف', gender: 'male', voiceType: 'بالغ', category: 'درامي عاطفي', categoryKey: 'drama', description: 'نبرة عميقة مشحونة بالإحساس، مثالية للمشاهد المؤثرة والدراما الإذاعية.' },
      { name: 'زيد', gender: 'male', voiceType: 'بالغ', category: 'روايات درامية', categoryKey: 'novels', description: 'صوت مصري ذكوري عميق ومليء بالحيوية يناسب الروايات الدرامية الطويلة والإلقاء المؤثر.' },
      { name: 'لوجين', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية مرِحة', categoryKey: 'cartoon', description: 'صوت مصري أنثوي مرتفع النبرة مليء بالضحك والطاقة، مناسب للشخصيات الكوميدية والرسوم المتحركة للأطفال.' },
      { name: 'نورا', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية خيالية', categoryKey: 'cartoon', description: 'صوت مصري ناعم بأسلوب ساحر وخيالي، مثالي للقصص السحرية ومحتوى الأنيمي والقصص الصوتية الخيالية.' },
      { name: 'جمانة', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية شريرة', categoryKey: 'cartoon', description: 'صوت مصري أنثوي درامي منخفض النبرة ببراعة تمثيلية، مناسب لتقديم شخصية الشريرة والمحتوى الكوميدي الأسود.' },
      { name: 'فارس', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني كوميدي', categoryKey: 'cartoon', description: 'صوت مصري ذكوري سريع ومُبالغ بنبرة مرحة ساخرة، مناسب لمحتوى الرسوم الكوميدية والشخصيات الخفيفة.' },
      { name: 'زيدان', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني بطل', categoryKey: 'cartoon', description: 'صوت مصري رجولي شبابي ذو نبرة بطولية وواثقة، مناسب لشخصيات الأبطال الكارتونية والمحتوى التشويقي.' },
      { name: 'مؤمن', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني شرير', categoryKey: 'cartoon', description: 'صوت مصري ذكوري منخفض بمؤثرات درامية، مناسب لتقديم شخصية الخصم الشرير في القصص المصورة والكارتون.' },
      { name: 'مريم', gender: 'female', voiceType: 'بالغ', category: 'صوت قصصي', categoryKey: 'novels', description: 'صوت ناعم ودافئ باللهجة المصرية، مناسب لسرد الحكايات والقصص الخيالية بنبرة هادئة ممتعة.' },
      { name: 'ليلى', gender: 'female', voiceType: 'بالغ', category: 'إعلان وتسويق', categoryKey: 'ads', description: 'لهجة مصرية أنثوية واضحة ونشيطة، مناسبة للإعلانات التجارية السريعة والفواصل الترويجية.' },
      { name: 'سما', gender: 'female', voiceType: 'بالغ', category: 'بودكاست ومحتوى اجتماعي', categoryKey: 'podcast', description: 'صوت مصري أنثوي طبيعي ومحايد، مناسب للبودكاست والمحتوى الاجتماعي.' }
    ]
  },
  {
    id: 'saudi',
    title: 'اللهجة السعودية',
    description: 'رصين، فخم، يعكس الهوية السعودية بوضوح واتزان عالي.',
    profiles: [
      { name: 'ناصر', gender: 'male', voiceType: 'بالغ', category: 'وثائقي رسمي', categoryKey: 'doc', description: 'صوت سعودي ذكوري عميق ورسمي يناسب الأفلام الوثائقية والتقارير الجادة.' },
      { name: 'راكان', gender: 'male', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت سعودي شبابي سريع ومؤثر مناسب للإعلانات والمحتوى الترويجي.' },
      { name: 'عبد العزيز', gender: 'male', voiceType: 'بالغ', category: 'بودكاست هادئ', categoryKey: 'podcast', description: 'نبرة سعودية واضحة وطبيعية مناسبة للحوارات والبودكاست الصوتي.' },
      { name: 'فهد', gender: 'male', voiceType: 'بالغ', category: 'روايات درامية', categoryKey: 'novels', description: 'صوت سعودي مليء بالعاطفة مناسب للروايات الطويلة والسرد القصصي.' },
      { name: 'محسن', gender: 'male', voiceType: 'بالغ', category: 'صوت شركات', categoryKey: 'corporate', description: 'صوت رسمي قوي مناسب للتقديم المؤسسي والعروض المهنية.' },
      { name: 'الجوهرة', gender: 'female', voiceType: 'بالغ', category: 'وثائقي أنثوي', categoryKey: 'doc', description: 'نبرة رسمية قوية، مناسبة للروايات والقصص الوثائقية.' },
      { name: 'أفنان', gender: 'female', voiceType: 'بالغ', category: 'إعلان وتسويق', categoryKey: 'ads', description: 'صوت سعودي أنثوي سريع وجذاب للإعلانات والفواصل الدعائية.' },
      { name: 'منى', gender: 'female', voiceType: 'بالغ', category: 'بودكاست اجتماعي', categoryKey: 'podcast', description: 'صوت هادئ وطبيعي مناسب للمحتوى الاجتماعي والحوارات الصوتية.' },
      { name: 'هيا', gender: 'female', voiceType: 'بالغ', category: 'روايات صوتية', categoryKey: 'novels', description: 'صوت غني بالإحساس والأداء مناسب للروايات والقصص الطويلة.' },
      { name: 'بدور', gender: 'female', voiceType: 'بالغ', category: 'تعليم وشروحات', categoryKey: 'edu', description: 'صوت واضح ومفهوم مناسب للدروس التعليمية والشروحات.' },
      { name: 'لولو', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية مرحة أنثى', categoryKey: 'cartoon', description: 'صوت سعودي خفيف مناسب للمحتوى الكوميدي الكارتوني.' },
      { name: 'فواز', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني ساخر ذكر', categoryKey: 'cartoon', description: 'صوت سعودي مرح مناسب للشخصيات الفكاهية والأنيمي.' }
    ]
  },
  {
    id: 'levantine',
    title: 'اللهجة الشامية',
    description: 'صوت عذب، موسيقي، رائع للروايات والقصص الرومانسية والدراما.',
    profiles: [
      { name: 'ربيع', gender: 'male', voiceType: 'بالغ', category: 'وثائقي درامي', categoryKey: 'doc', description: 'صوت ذكوري شامي عميق ومؤثر يناسب الوثائقيات الروايات التاريخية بنبرة درامية قوية.' },
      { name: 'جاد', gender: 'male', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت شبابي سريع وروّاق باللهجة الشامية مناسب للإعلانات والفواصل الدعائية.' },
      { name: 'يوسف شامي', gender: 'male', voiceType: 'بالغ', category: 'بودكاست', categoryKey: 'podcast', description: 'صوت هادئ ومباشر مناسب للمحتوى الحواري الشامي والبودكاست التعليمي.' },
      { name: 'ميلاد', gender: 'male', voiceType: 'بالغ', category: 'روايات', categoryKey: 'novels', description: 'صوت شامي ناعم ورنان مناسب للقصص والروايات الطويلة مع تفاصيل أداء دقيقة.' },
      { name: 'لين', gender: 'female', voiceType: 'بالغ', category: 'قصص رومانسية', categoryKey: 'novels', description: 'صوت نسائي شامي دافئ مناسب للروايات الرومانسية والمشاهد الوجدانية.' },
      { name: 'رهف', gender: 'female', voiceType: 'بالغ', category: 'إعلانات', categoryKey: 'ads', description: 'نبرة تجارية واضحة باللهجة الشامية مناسبة للإعلانات والفيديوهات السريعة.' },
      { name: 'نور', gender: 'female', voiceType: 'بالغ', category: 'بودكاست', categoryKey: 'podcast', description: 'صوت هاديء باللهجة الشامية مناسب للحوارات والمحتوى الاجتماعي.' },
      { name: 'بيبو', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني فكاهي ذكوري', categoryKey: 'cartoon', description: 'صوت مرح ومتحرك باللهجة الشامية مناسب لشخصيات الرسوم المتحركة الكوميدية.' },
      { name: 'ليليا', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية لطيفة أنثى', categoryKey: 'cartoon', description: 'صوت أنثوي شامي خيالي مناسب للقصص الصوتية الكارتونية والأنمي.' }
    ]
  },
  {
    id: 'iraqi',
    title: 'اللهجة العراقية',
    description: 'عميق، شجي، يحمل قوة التعبير والأصالة الرافدينية العريقة.',
    profiles: [
      { name: 'علي', gender: 'male', voiceType: 'بالغ', category: 'قصص شعبية', categoryKey: 'drama', description: 'صوت ذكوري عراقي عاطفي غني بالتعبير الشعبي، مناسب للروايات التراثية والمحتوى الدرامي.' },
      { name: 'مهند', gender: 'male', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت عراقي شبابي سريع ومؤثر يناسب الإعلانات والمحتوى التسويقية.' },
      { name: 'حيدر', gender: 'male', voiceType: 'بالغ', category: 'بودكاست واقعي', categoryKey: 'podcast', description: 'نبرة عراقية هادئة ومباشرة مناسبة للبودكاست والنقاش الاجتماعي.' },
      { name: 'سمر', gender: 'female', voiceType: 'بالغ', category: 'قصص شعبية', categoryKey: 'drama', description: 'صوت أنثوي عراقي مليء بالأصالة والروح العربية، مناسب للقصص الحوارات الإنسانية.' },
      { name: 'زهراء', gender: 'female', voiceType: 'بالغ', category: 'بودكاست', categoryKey: 'podcast', description: 'صوت واضح وطبيعي باللهجة العراقية مناسب للمحتوى التثقيفي والحوار الودي.' },
      { name: 'ميمو', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني فكاهي', categoryKey: 'cartoon', description: 'صوت مضحك وسريع باللهجة العراقية مناسب لشخصيات الرسوم المتحركة الكوميدية.' },
      { name: 'لولي', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتوني خيالي', categoryKey: 'cartoon', description: 'صوت لطيف وخيالي باللهجة العراقية مناسب للقصص الصوتية الكارتونية.' }
    ]
  },
  {
    id: 'algerian',
    title: 'اللهجة الجزائرية',
    description: 'لهجة غنية، تمزج بين القوة والنعومة، مثالية للوصول لجمهور المغرب العربي بوضوح.',
    profiles: [
      { name: 'أنور', gender: 'male', voiceType: 'بالغ', category: 'محتوى وثائقي', categoryKey: 'doc', description: 'صوت ذكوري جزائري عميق بنبرة هادئة، مناسب للأفلام الوثائقية والمحتوى التاريخي.' },
      { name: 'قيس', gender: 'male', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت جزائري شبابي سريع ومؤثر، مناسب للإعلانات والمحتوى التسويقي.' },
      { name: 'حكيم', gender: 'male', voiceType: 'بالغ', category: 'بودكاست ثقافي', categoryKey: 'podcast', description: 'صوت واضح وطبيعي باللهجة الجزائرية مناسب للحوار الثقافي والبودكاست.' },
      { name: 'عايدة', gender: 'female', voiceType: 'بالغ', category: 'روايات', categoryKey: 'novels', description: 'صوت أنثوي جزائري دافئ مناسب للقصص والروايات الصوتية الطويلة.' },
      { name: 'هاجر', gender: 'female', voiceType: 'بالغ', category: 'إعلان وتسويق', categoryKey: 'ads', description: 'نبرة أنثوية نشيطة باللهجة الجزائرية مناسبة للإعلانات والفيديوهات القصيرة.' },
      { name: 'ميمو جزائري', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني ذكوري', categoryKey: 'cartoon', description: 'صوت مضحك سريع باللهجة الجزائرية مناسب للشخصيات الفكاهية الكارتونية.' },
      { name: 'سليا', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية أنثى', categoryKey: 'cartoon', description: 'صوت أنثوي لطيف مناسب للقصص الكارتونية والأنيمي.' }
    ]
  },
  {
    id: 'moroccan',
    title: 'اللهجة المغربية',
    description: 'إيقاع مميز، غني بالتفاصيل، للوصول لجمهور المغرب العربي بذكاء.',
    profiles: [
      { name: 'المهدي', gender: 'male', voiceType: 'بالغ', category: 'تقديم معلوماتي', categoryKey: 'edu', description: 'صوت ذكوري مغربي متوازن غني بالوضوح، مناسب للفيديوهات التثقيفية والشرح.' },
      { name: 'طارق', gender: 'male', voiceType: 'بالغ', category: 'روايات صوتية', categoryKey: 'novels', description: 'صوت مغربي دافئ مناسب للروايات والكتب الصوتية بنبرة قصصية جذابة.' },
      { name: 'أمين', gender: 'male', voiceType: 'بالغ', category: 'محتوى اجتماعي', categoryKey: 'podcast', description: 'صوت طبيعي خفيف باللهجة المغربية مناسب للمحتوى الاجتماعي والبودكاست اليومي.' },
      { name: 'سارة مغربية', gender: 'female', voiceType: 'بالغ', category: 'بودكاست مريح', categoryKey: 'podcast', description: 'صوت أنثوي مغربي هادىء وواضح، مناسب للبودكاست والمحتوى الهادئ.' },
      { name: 'ريم', gender: 'female', voiceType: 'بالغ', category: 'إعلان سريع', categoryKey: 'ads', description: 'صوت أنثوي تجاري باللهجة المغربية مناسب للإعلانات والمحتوى السريع المقنع.' },
      { name: 'ميمون', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني ذكوري', categoryKey: 'cartoon', description: 'صوت مضحك وخفيف باللهجة المغربية مناسب لشخصيات الرسوم المتحركة.' },
      { name: 'ليمة', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية أنثى', categoryKey: 'cartoon', description: 'صوت لطيف وخيالي باللهجة المغربية مناسب للقصص الصوتية الهادئة للأطفال.' }
    ]
  },
  {
    id: 'tunisian',
    title: 'اللهجة التونسية',
    description: 'لبق، منفتح، مثالي للمحتوى الثقافي والاجتماعي المعاصر.',
    profiles: [
      { name: 'كريم', gender: 'male', voiceType: 'بالغ', category: 'محتوى ثقافي', categoryKey: 'doc', description: 'صوت ذكوري تونسي متوازن مناسب للمحتوى التاريخي والثقافي والروايات الوثائقية.' },
      { name: 'نادر', gender: 'male', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت تونسي شبابي سريع ونشط مناسب للإعلانات التجارية والحملات الترويجية.' },
      { name: 'حسام', gender: 'male', voiceType: 'بالغ', category: 'بودكاست اجتماعي', categoryKey: 'podcast', description: 'نبرة تونسية هادئة وطبيعية مناسبة للبودكاست والحوار الاجتماعي اليومي.' },
      { name: 'ليلى تونسية', gender: 'female', voiceType: 'بالغ', category: 'قصص درامية', categoryKey: 'novels', description: 'صوت أنثوي تونسي عميق مناسب للروايات الطويلة والمحتوى الأدبي.' },
      { name: 'يسرى', gender: 'female', voiceType: 'بالغ', category: 'إعلان وتسويق', categoryKey: 'ads', description: 'صوت أنثوي سريع وجذاب باللهجة التونسية مناسب للإعلانات والفيديوهات القصيرة.' },
      { name: 'ميمي', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتوني أنثى', categoryKey: 'cartoon', description: 'صوت تونسي خفيف مناسب للشخصيات الأنثوية الكارتونية والرسوم المتحركة.' },
      { name: 'بولينو', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني ذكوري', categoryKey: 'cartoon', description: 'صوت تونسي فكاهي مناسب للمحتوى المضحك والأنيمي العربي.' }
    ]
  },
  {
    id: 'khaleeji',
    title: 'خليجية',
    description: 'أداء هادئ وواثق، يعكس الفخامة والأصالة الخليجية في أبهى صورها.',
    profiles: [
      { name: 'جاسم', gender: 'male', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت خليجي ذكوري سريع ومقنع مناسب للإعلانات والفيديوهات الدعائية.' },
      { name: 'راشد', gender: 'male', voiceType: 'بالغ', category: 'وثائقي عاطفي', categoryKey: 'doc', description: 'صوت خليجي عميق مناسب للروايات والقصص التاريخية والمحتوى الوثائقي.' },
      { name: 'فهد خليجي', gender: 'male', voiceType: 'بالغ', category: 'بودكاست اجتماعي', categoryKey: 'podcast', description: 'نبرة خليجية واقعية مناسبة للبودكاست والحوار الاجتماعي.' },
      { name: 'مي خليجية', gender: 'female', voiceType: 'بالغ', category: 'قصص صوتية', categoryKey: 'novels', description: 'صوت خليجي أنثوي ناعم مناسب للروايات القصيرة والقصص الحقيقية.' },
      { name: 'لمياء', gender: 'female', voiceType: 'بالغ', category: 'إعلان تجاري', categoryKey: 'ads', description: 'صوت خليجي سريع ولامع مناسب للإعلانات والمحتوى التسويقي السريع.' },
      { name: 'ميمي خليجية', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتوني أنثى', categoryKey: 'cartoon', description: 'صوت خفيف باللهجة الخليجية مناسب للشخصيات الكارتونية المرحة.' },
      { name: 'لولان', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كارتوني ذكوري', categoryKey: 'cartoon', description: 'صوت مضحك ومتحرك باللهجة الخليجية مناسب للأنمي والمحتوى الفكاهي.' }
    ]
  },
  {
    id: 'fusha',
    title: 'فصحى',
    description: 'لغة الضاد، معايير النطق السليم، للوثائقيات والتعليم والكتب الصوتية العالمية.',
    profiles: [
      // Standard Arabic Males (Adult)
      { name: 'طارق', gender: 'male', voiceType: 'بالغ', category: 'روايات', categoryKey: 'novels', description: 'صوت عربي فصيح ثابت وواضح مناسب للكتب والروايات الصوتية الطويلة.' },
      { name: 'سامر', gender: 'male', voiceType: 'بالغ', category: 'وثائقي تاريخي', categoryKey: 'doc', description: 'صوت فصيح عميق مناسب للأفلام الوثائقية والمحتوى التاريخي والوطني.' },
      { name: 'نديم', gender: 'male', voiceType: 'بالغ', category: 'تقديم رسمي', categoryKey: 'corporate', description: 'صوت فصيح إعلامي مناسب لنشرات الأخبار والعروض الرسمية.' },
      { name: 'زياد', gender: 'male', voiceType: 'بالغ', category: 'إعلاني فصيح', categoryKey: 'ads', description: 'صوت عربي فصيح سريع ومقنع مناسب للإعلانات والعروض التجارية وإعلانات الخدمات والتنبيهات الصوتية.' },
      { name: 'حسام', gender: 'male', voiceType: 'بالغ', category: 'بودكاست هادئ', categoryKey: 'podcast', description: 'صوت فصيح بسيط وهادئ بأسلوب محادثة سلس، مناسب للبودكاست العربي والحوار التفسيري والنقاش الاجتماعي.' },

      // Standard Arabic Females (Adult)
      { name: 'سلمى', gender: 'female', voiceType: 'بالغ', category: 'تعليم ودروس', categoryKey: 'edu', description: 'صوت أنثوي فصيح واضح مناسب للشرح والتدريس والسرد الأكاديمي.' },
      { name: 'جود', gender: 'female', voiceType: 'بالغ', category: 'قصص أدبية', categoryKey: 'novels', description: 'صوت فصيح ناعم مناسب للروايات والقصص الطويلة والإلقاء الأدبي.' },

      // Standard Arabic Cartoon
      { name: 'صوت أنيمي ذكوري فصيح', gender: 'male', voiceType: 'شخصية كارتونية', category: 'كرتوني', categoryKey: 'cartoon', description: 'صوت فكاهي مرتفع بالفصحى مناسب لعروض الكرتون والأنيمي.' },
      { name: 'صوت أنيمي أنثوي فصيح', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كرتوني', categoryKey: 'cartoon', description: 'صوت مرح مناسب للشخصيات الكارتونية والخيالية بالفصحى.' },

      // Standard Arabic Elderly (Legacy/Full Identity)
      { name: 'عبد الرحمن', gender: 'male', voiceType: 'كبار السن', category: 'وثائقي تاريخي', categoryKey: 'doc', description: 'صوت ذكوري عربي هادئ وعميق بنبرة خبرة ووقار، مناسب للوثائقيات التاريخية.' },
      { name: 'حسان', gender: 'male', voiceType: 'كبار السن', category: 'حكيم سردي', categoryKey: 'podcast', description: 'صوت هادىء يشبه حكمة الشيوخ، يناسب القصص الفلسفية والنصائح.' },
      { name: 'فاروق', gender: 'male', voiceType: 'كبار السن', category: 'مذيع إذاعي مخضرم', categoryKey: 'corporate', description: 'نبرة إذاعية قديمة مع عمق صوتي واضح، مناسب للبرامج الإذاعية الكلاسيكية.' },
      { name: 'صلاح', gender: 'male', voiceType: 'كبار السن', category: 'راوي روايات أدبية', categoryKey: 'novels', description: 'صوت ثقيل ورنان، مناسب للكتب الصوتية بنبرة تأملية مريحة.' },
      { name: 'عدنان', gender: 'male', voiceType: 'كبار السن', category: 'صوت درامي تمثيلي', categoryKey: 'drama', description: 'صوت كبير السن مليء بالعاطفة، مناسب للمشاهد الدرامية والمحتوى المؤثر.' },
      { name: 'خديجة', gender: 'female', voiceType: 'كبار السن', category: 'صوت أم حنونة', categoryKey: 'drama', description: 'نبرة عربية دافئة تشبه صوت أم كبيرة السن، مناسبة للقصص العائلية.' },
      { name: 'عائشة', gender: 'female', voiceType: 'كبار السن', category: 'روايات أدبية', categoryKey: 'novels', description: 'صوت عربي رزين ذو شخصية قوية، مناسب للروايات النسائية.' },
      { name: 'شريفة', gender: 'female', voiceType: 'كبار السن', category: 'صوت تراثي ثقافي', categoryKey: 'doc', description: 'صوت أنثوي كبير السن بإحساس شعبي تراثي، مناسب للحكايات القديمة.' },
      { name: 'نجلاء', gender: 'female', voiceType: 'كبار السن', category: 'بودكاست الحكمة', categoryKey: 'podcast', description: 'صوت صريح وواضح مليء بالخبرة، مناسب للمحتوى الفكري والنصيحة.' },
      { name: 'رجاء', gender: 'female', voiceType: 'كبار السن', category: 'صوت درامي تمثيلي', categoryKey: 'drama', description: 'نبرة أنثوية قوية مع مساحات إحساس واضحة، مناسبة للدراما.' }
    ]
  }
];

export const VOICE_TYPES = [
  'بالغ', 'كبار السن', 'شخصية كارتونية'
];

export const VOICE_FIELDS: VoiceField[] = [
  { id: 'ads', title: 'مجال الإعلانات التجارية', description: 'صوت سريع ومباشر مليء بالطاقة، مخصّص للمحتوى الترويجي والإعلانات.', color: 'from-orange-500 to-red-500', glow: 'shadow-orange-500/20' },
  { id: 'doc', title: 'مجال الوثائقيات والأفلام', description: 'صوت عميق ورسمي مناسب للروايات الوثائقية والسرد التاريخي.', color: 'from-blue-700 to-indigo-900', glow: 'shadow-blue-500/20' },
  { id: 'cartoon_stories', title: 'مجال الرسوم والمغامرات', description: 'نبرة لطيفة وهادئة مليئة بالخيال لاستهداف القصص التعليمية والترفيهية.', color: 'from-green-400 to-yellow-500', glow: 'shadow-green-500/20' },
  { id: 'podcast', title: 'مجال البودكاست الصوتي', description: 'أسلوب طبيعي متوازن للمحتوى الحواري والحديث الودي.', color: 'from-purple-500 to-pink-600', glow: 'shadow-purple-500/20' },
  { id: 'novels', title: 'مجال الروايات والكتب الصوتية', description: 'أداء سلس طويل المدى، غني بالتعبير والعمق الأدبي.', color: 'from-amber-600 to-amber-900', glow: 'shadow-amber-500/20' },
  { id: 'youtube', title: 'مجال فيديوهات اليوتيوب', description: 'صوت شبابي متحمس مناسب للمحتوى العام والترفيهي.', color: 'from-red-600 to-red-800', glow: 'shadow-red-600/20' },
  { id: 'corporate', title: 'مجال محتوى الشركات والتعريف المؤسسي', description: 'صوت رسمي واضح مناسب للعروض والتقديمات المهنية.', color: 'from-slate-600 to-slate-800', glow: 'shadow-slate-500/20' },
  { id: 'edu', title: 'مجال التعليم والدروس', description: 'إلقاء واضح ومباشر ومفهوم مناسب للشروحات.', color: 'from-teal-500 to-cyan-600', glow: 'shadow-teal-500/20' },
  { id: 'drama', title: 'مجال الدراما والمشاهد التمثيلية', description: 'صوت مليء بالعاطفة، ينقل إحساس التوتر والفرح والحزن.', color: 'from-rose-700 to-fuchsia-900', glow: 'shadow-rose-500/20' }
];

export const STUDIO_CONTROLS = {
  temp: {
    title: 'درجة حرارة الصوت',
    options: [
      { label: 'دافئ', desc: 'صوت دافئ مُشبع بنبرة إنسانية وعمق إحساس.' },
      { label: 'متوازن', desc: 'صوت متوازن ومباشر وموضوعي.' },
      { label: 'حاد', desc: 'صوت حاد محايد قليل العاطفة.' }
    ]
  },
  emotion: {
    title: 'مستوى الانفعال',
    options: [
      { label: 'هادئ', desc: 'إلقاء سلس هادئ مناسب للمحتوى الهادئ.' },
      { label: 'متوسط', desc: 'توازن بين الحماس والهدوء.' },
      { label: 'قوي', desc: 'نبرة مؤثرة مليئة بالحيوية للطاقة الإعلانية.' },
      { label: 'شديد', desc: 'أداء قوي جدًا مناسب للمقاطع الدرامية القصوى.' }
    ]
  },
  speed: {
    title: 'سرعة الإلقاء',
    options: [
      { label: 'بطيئة', desc: 'لتقديم روايات وقصص طويلة بتركيز.' },
      { label: 'متوسطة', desc: 'عامة ومتوازنة لمعظم المحتوى.' },
      { label: 'سريعة', desc: 'للإعلانات والنصوص التسويقية.' }
    ]
  },
  depth: {
    title: 'عمق النبرة',
    options: [
      { label: 'خفيفة', desc: 'نبرة طفولية أو مرحة.' },
      { label: 'متوسطة', desc: 'طبيعية متوازنة.' },
      { label: 'عميقة', desc: 'صوت وثائقي وحكائي قوي.' }
    ]
  },
  pitch: {
    title: 'طبقة الصوت',
    options: [
      { label: 'عالية', desc: 'نبرة مرتفعة تناسب القصص الكرتونية أو الأصوات الشبابية.' },
      { label: 'متوسطة', desc: 'نبرة طبيعية.' },
      { label: 'منخفضة', desc: 'صوت رجولي أو درامي عميق.' }
    ]
  },
  drama: {
    title: 'شدة التأثير الدرامي',
    options: [
      { label: 'خفيف', desc: 'مناسب للمحتوى الواقعي.' },
      { label: 'متوسط', desc: 'مناسب للسرد والأدب.' },
      { label: 'قوي', desc: 'مناسب للوثائقيات والإعلانات الملحمية.' }
    ]
  }
};

export const getBaseVoiceForType = (type: string, gender: string) => {
  if (gender === 'female' || gender === 'أنثى') return 'Kore';
  if (type === 'كبار السن') return 'Charon';
  if (type === 'شخصية كارتونية') return 'Kore';
  return 'Fenrir';
};
