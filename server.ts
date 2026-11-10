import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'miraculous_db.json');

app.use(express.json());

// Initial seed data
const initialData = {
  settings: {
    siteTitle: 'ميراكولوس | البوابة الرسمية لعشاق الدعسوقة والقط الأسود',
    siteSubtitle: 'عالم الأبطال الخارقين في باريس، الحلقات، الأخبار الحصرية، والتفاعل المباشر',
    heroHeadline: 'استعد للتحول! عالم الدعسوقة والقط الأسود بين يديك',
    heroSubheadline: 'شاهد أحدث الحلقات بدقة عالية، تابع الأخبار الحصرية وتفاصيل الموسم السادس، وانضم لأقوى مجتمع عربي لمحبي ميراكولوس.',
    announcementBanner: '🚨 ترقبوا نزول تسريبات وأولى حلقات الموسم السادس قريباً حصرياً على الموقع!',
    showAnnouncement: true,
    contactEmail: 'contact@miraculous-fans.net',
    lastUpdatedBy: 'المالك الرئيسي',
    lastUpdatedAt: new Date().toISOString()
  },
  admins: [
    {
      id: 'admin-owner',
      name: 'مالك الموقع (الدعسوقة)',
      role: 'owner',
      accessCode: '123456',
      canManageAdmins: true,
      title: 'المالك والمؤسس الرسمي للموقع',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    },
    {
      id: 'admin-catnoir',
      name: 'أدريان (نائب الإشراف)',
      role: 'moderator',
      accessCode: 'cat777',
      canManageAdmins: true,
      title: 'نائب المالك ومشرف عام',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    },
    {
      id: 'admin-alya',
      name: 'آليا (صاحبة ليدي بلوغ)',
      role: 'moderator',
      accessCode: 'alya333',
      canManageAdmins: false,
      title: 'مشرفة قسم الأخبار والتقارير',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    }
  ],
  episodes: [
    {
      id: 'ep-s6-teaser',
      title: 'الحلقة الأولى من الموسم السادس (إعلان حصري)',
      season: 6,
      episodeNumber: 1,
      duration: '23 دقيقة',
      description: 'بداية حقبة جديدة بعد سقوط غابرييل أغريست! تظهر ليلى روسي (كريساليس) بقواها الشيطانية الجديدة، وتصميم خارق جديد لأبطالنا في ثانوية باريس المطورة.',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2025',
      featured: true,
      villain: 'كريساليس (Chrysalis)',
      likes: 1420
    },
    {
      id: 'ep-special-paris',
      title: 'حلقة خاصة: مغامرة باريس - شادي باغ وكلاو نوير',
      season: 0,
      episodeNumber: 1,
      duration: '50 دقيقة',
      description: 'أعظم فيلم خاص! ليدي باج وكات نوير يلتقيان بنسخهما الشريرة من البعد الموازي شادي باغ ومخلب الظلام في معركة مذهلة تنقذ العالمين.',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2024',
      featured: true,
      villain: 'البعد الموازي وشادي باغ',
      likes: 2850
    },
    {
      id: 'ep-s5-26',
      title: 'الموسم 5 - حلقة 26: إعادة التشكيل (النهاية الكبرى)',
      season: 5,
      episodeNumber: 26,
      duration: '24 دقيقة',
      description: 'المعركة الملحمية النهائية ضد مونارك. غابرييل يطلق أقصى أمنياته، ومارينت تضحي بكل ما تملك لإنقاذ باريس وحماية العالم من الدمار الشامل.',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2023',
      featured: true,
      villain: 'مونارك المطلق (Monarch)',
      likes: 3910
    },
    {
      id: 'ep-s5-01',
      title: 'الموسم 5 - حلقة 1: التطور (Evolution)',
      season: 5,
      episodeNumber: 1,
      duration: '22 دقيقة',
      description: 'مونارك يستولي على جميع الميراكولوس ويسافر عبر الزمن مستخدماً ميراكولوس الأرنب فلاف. مطاردة زمنية حابسة للأنفاس لإنقاذ الماضي والحاضر.',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2022',
      featured: false,
      villain: 'مونارك وسفر عبر الزمن',
      likes: 1890
    },
    {
      id: 'ep-s4-26',
      title: 'الموسم 4 - حلقة 26: الضربة المرتدة (Strike Back)',
      season: 4,
      episodeNumber: 26,
      duration: '23 دقيقة',
      description: 'الخيانة الكبرى! فيليكس يخدع ليدي باج ويسلم صندوق الميراكولوس لشادو موث مقابل ميراكولوس الطاووس. لحظة تاريخية قلبت موازين القوى.',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2022',
      featured: false,
      villain: 'سترايك باك وفيليكس',
      likes: 2430
    },
    {
      id: 'ep-s4-01',
      title: 'الموسم 4 - حلقة 1: الحقيقة (Truth)',
      season: 4,
      episodeNumber: 1,
      duration: '22 دقيقة',
      description: 'لوكا يتحول إلى وحش الحقيقة بعد حزنه، محاولاً معرفة سر مارينت الذي تخفيه عن الجميع بصفتها الحارسة الجديدة لصندوق الميراكولوس.',
      thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2021',
      featured: false,
      villain: 'وحش الحقيقة (Truth)',
      likes: 1340
    },
    {
      id: 'ep-s3-26',
      title: 'الموسم 3 - حلقة 26: ملكة المعجزات (Miracle Queen)',
      season: 3,
      episodeNumber: 26,
      duration: '23 دقيقة',
      description: 'المعلم فو يتنازل عن ولايته لمارينت لتصبح الحارسة الرسمية بعد أن كشفت كلوي هويات الأبطال. المعلم فو يفقد ذاكرته ويبدأ حياة جديدة.',
      thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2019',
      featured: false,
      villain: 'ملكة المعجزات وكلوي بورجوا',
      likes: 1780
    },
    {
      id: 'ep-s2-01',
      title: 'الموسم 2 - حلقة 1: المجمع (The Collector)',
      season: 2,
      episodeNumber: 1,
      duration: '22 دقيقة',
      description: 'غابرييل أغريست يأكومت نفسه ليصبح المجمع لإبعاد الشبهات عنه بعد أن كادت مارينت تكتشف أنه هو هوك موث المتخفي في قصر باريس.',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2017',
      featured: false,
      villain: 'ذا كولكتور (غابرييل)',
      likes: 2110
    },
    {
      id: 'ep-s1-01',
      title: 'الموسم 1 - حلقة 1: ستورمي ويذر (العاصفة الرعدية)',
      season: 1,
      episodeNumber: 1,
      duration: '21 دقيقة',
      description: 'أولى حلقات الكرتون الأيقونية! أورورا تتحول إلى ستورمي ويذر وتجمد برج إيفل وباريس بعد خسارتها مسابقة مذيعة الطقس.',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      releaseYear: '2015',
      featured: false,
      villain: 'ستورمي ويذر',
      likes: 3120
    }
  ],
  news: [
    {
      id: 'news-1',
      title: 'رسمياً: موعد إطلاق الموسم السادس من ميراكولوس والشخصيات الجديدة كلياً!',
      summary: 'أعلنت شركة Zagtoon واستوديو Method Animation عن تفاصيل رسومات الموسم السادس بتقنية Unreal Engine ثلاثية الأبعاد المذهلة وأزياء الأبطال المطورة.',
      content: 'في مؤتمر رسمي خاص بصناع ميراكولوس، كشف توماس أستروك وجيريمي زاج عن بداية إنتاج الموسم السادس الذي سيأخذ منحى ناضجاً ومثيراً بعد نهاية حقبة غابرييل أغريست. ستحظى مارينت وأدريان بتصاميم شعر وأزياء جديدة تتماشى مع مرحلتهم الدراسية الثانوية العليا، بينما ستظهر ليلى روسي باسمها الشرير الجديد كريسالي (Chrysalis) مستخدمة ميراكولوس الفراشة بطرق عبقرية وخبيثة لم يسبق لها مثيل.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      author: 'آليا سيزير',
      publishedAt: '2025-05-12T14:30:00Z',
      category: 'مواسم جديدة',
      tags: ['الموسم السادس', 'زاغتون', 'كريسالي', 'تسريبات']
    },
    {
      id: 'news-2',
      title: 'فيلم ميراكولوس الثاني: مغامرة لندن والبحث عن الكوامي الضائع',
      summary: 'الاستعداد لفيلم سينمائي عالمي ضخم يعرض في دور السينما العالمية والعربية مع أغاني ملحمية جديدة.',
      content: 'بعد النجاح الكاسح لفيلم ميراكولوس الغنائي الأول، تم تأكيد العمل على الجزء الثاني السينمائي بميزانية تفوق 80 مليون يورو. تدور الأحداث حول رحلة خاصة للندن لإنقاذ كوامي قديم يهدد استقرار قوى التوازن الكونية. تم تأكيد الدبلجة العربية الرسمية بأصوات الأبطال المحبوبين تزامناً مع العرض العالمي.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      author: 'أدريان أغريست',
      publishedAt: '2025-04-20T10:15:00Z',
      category: 'أفلام',
      tags: ['سينما', 'فيلم ميراكولوس', 'لندن', 'كوامي']
    },
    {
      id: 'news-3',
      title: 'أسرار ميراكولوس: جدول ترتيب أقوى 5 كوامي وقواهم المطلقة',
      summary: 'تحليل شامل لقوى تيكي (الخلق)، بلاغ (الدمار)، فلاف (التطور الزمني)، دوسو، ونورو وقدرات اندماج الميراكولوس.',
      content: 'لطالما كانت قلائد وخواتم الميراكولوس لغزاً أسطورياً يمتد لآلاف السنين. في هذا التقرير الحصري نستعرض القوة المطلقة عند دمج ميراكولوس الدعسوقة وميراكولوس القط الأسود معاً، والتي تمنح صاحبها أمنية واحدة تعيد كتابة واقع الكون مقابل ثمن مكافئ صارم في قوانين الطاقة.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      author: 'مالك الموقع',
      publishedAt: '2025-03-05T18:00:00Z',
      category: 'تسريبات',
      tags: ['كوامي', 'تيكي', 'بلاغ', 'الصندوق السحري']
    }
  ],
  socialLinks: [
    {
      id: 'soc-yt',
      platform: 'youtube',
      label: 'يوتيوب ميراكولوس العربي',
      url: 'https://www.youtube.com',
      handle: '@MiraculousArabicOfficial',
      description: 'الحلقات الكاملة، المقاطع الحصرية، وتريلرات المواسم والأفلام بالدبلجة الرسمية',
      followers: '+2.4M مشترك',
      color: 'from-red-600 to-rose-700',
      icon: 'Youtube'
    },
    {
      id: 'soc-ig',
      platform: 'instagram',
      label: 'إنستغرام ليدي باج',
      url: 'https://www.instagram.com',
      handle: '@miraculous.arab',
      description: 'أجمل الصور الحصرية، تصاميم الأبطال، وكواليس الرسامين والمؤدين الصوتيين',
      followers: '+850K متابع',
      color: 'from-pink-600 to-rose-600',
      icon: 'Instagram'
    },
    {
      id: 'soc-tg',
      platform: 'telegram',
      label: 'قناة التيلغرام الرسمية',
      url: 'https://t.me',
      handle: 't.me/MiraculousArabicNews',
      description: 'تحميل مباشر للحلقات بجودة 4K و1080p فور نزولها وبدون فواصل إعلانية',
      followers: '+310K عضو',
      color: 'from-sky-500 to-blue-600',
      icon: 'Send'
    },
    {
      id: 'soc-tt',
      platform: 'tiktok',
      label: 'تيك توك عشاق ميراكولوس',
      url: 'https://www.tiktok.com',
      handle: '@miraculous_edit_arabic',
      description: 'أقوى الإيديتات الحماسية والرياكشنات وأبرز اللقطات الكوميدية والملحمية',
      followers: '+1.8M متابع',
      color: 'from-rose-500 to-slate-900',
      icon: 'Video'
    },
    {
      id: 'soc-dc',
      platform: 'discord',
      label: 'سيرفر ديسكورد الأبطال',
      url: 'https://discord.com',
      handle: 'discord.gg/MiraculousHeroes',
      description: 'غرف صوتية للحديث عن النظريات، فعاليات كويز ميراكولوس، وألعاب ممتعة',
      followers: '+45K بطل',
      color: 'from-indigo-600 to-purple-700',
      icon: 'MessageSquare'
    },
    {
      id: 'soc-wa',
      platform: 'whatsapp',
      label: 'قناة الواتساب الفورية',
      url: 'https://whatsapp.com',
      handle: 'whatsapp.com/channel/Miraculous',
      description: 'إشعارات لحظية بأحدث الأخبار ومواعيد الحلقات على هاتفك مباشرة',
      followers: '+150K عضو',
      color: 'from-emerald-600 to-teal-700',
      icon: 'PhoneCall'
    }
  ]
};

// Ensure data folder and file exist
function getDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB, using initial data:', err);
    return initialData;
  }
}

function saveDb(data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// Helper to sanitize admins for public view (hides access codes from public)
function sanitizeData(data: any) {
  return {
    ...data,
    admins: data.admins.map((a: any) => ({
      id: a.id,
      name: a.name,
      role: a.role,
      canManageAdmins: !!a.canManageAdmins,
      title: a.title || (a.role === 'owner' ? 'المالك' : 'مشرف'),
      avatar: a.avatar,
      createdAt: a.createdAt
    }))
  };
}

// Helper to check user auth from header or body
function authenticate(req: express.Request, db: any) {
  const token = req.headers['x-admin-token'] as string;
  const code = (req.headers['x-access-code'] as string) || req.body?.accessCode;

  if (token) {
    const admin = db.admins.find((a: any) => a.id === token);
    if (admin) return admin;
  }
  if (code) {
    const admin = db.admins.find((a: any) => a.accessCode === code);
    if (admin) return admin;
  }
  return null;
}

// --- API ROUTES ---

// 1. Get full site state
app.get('/api/state', (req, res) => {
  const db = getDb();
  res.json({
    success: true,
    data: sanitizeData(db)
  });
});

// 2. Admin Login
app.post('/api/auth/login', (req, res) => {
  const { accessCode } = req.body;
  if (!accessCode) {
    return res.status(400).json({ success: false, message: 'رمز الدخول مطلوب' });
  }

  const db = getDb();
  const admin = db.admins.find((a: any) => a.accessCode === accessCode.trim());

  if (!admin) {
    return res.status(401).json({ success: false, message: 'رمز الدخول غير صحيح' });
  }

  res.json({
    success: true,
    message: `مرحباً بك يا ${admin.name}!`,
    admin: {
      id: admin.id,
      name: admin.name,
      role: admin.role,
      canManageAdmins: !!admin.canManageAdmins,
      title: admin.title,
      avatar: admin.avatar
    },
    token: admin.id
  });
});

// 3. Add Moderator (Owner OR Moderator with canManageAdmins === true)
app.post('/api/admins', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);

  if (!caller) {
    return res.status(401).json({ success: false, message: 'غير مصرح: يجب تسجيل الدخول كمشرف أو مالك' });
  }

  // Check if caller is owner OR moderator with canManageAdmins
  const canAdd = caller.role === 'owner' || (caller.role === 'moderator' && caller.canManageAdmins);
  if (!canAdd) {
    return res.status(403).json({ success: false, message: 'ليس لديك صلاحية إضافة مشرفين جدد' });
  }

  const { name, accessCode, title, canManageAdmins } = req.body;
  if (!name || !accessCode) {
    return res.status(400).json({ success: false, message: 'اسم المشرف ورمز الدخول مطلوبان' });
  }

  // Check unique access code
  const codeExists = db.admins.some((a: any) => a.accessCode === accessCode.trim());
  if (codeExists) {
    return res.status(400).json({ success: false, message: 'رمز الدخول هذا مستخدم بالفعل لمشرف آخر، اختر رمزاً مختلفاً' });
  }

  const newAdmin = {
    id: `admin-${Date.now()}`,
    name: name.trim(),
    role: 'moderator',
    accessCode: accessCode.trim(),
    canManageAdmins: !!canManageAdmins,
    title: title?.trim() || 'مشرف معتمد',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date().toISOString()
  };

  db.admins.push(newAdmin);
  db.settings.lastUpdatedBy = `${caller.name} (إضافة مشرف)`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({
    success: true,
    message: `تمت إضافة المشرف (${newAdmin.name}) بنجاح`,
    admin: {
      id: newAdmin.id,
      name: newAdmin.name,
      role: newAdmin.role,
      canManageAdmins: newAdmin.canManageAdmins,
      title: newAdmin.title
    },
    data: sanitizeData(db)
  });
});

// 4. Update Moderator (Toggle canManageAdmins or title)
app.put('/api/admins/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);

  if (!caller) {
    return res.status(401).json({ success: false, message: 'غير مصرح' });
  }

  const canEdit = caller.role === 'owner' || (caller.role === 'moderator' && caller.canManageAdmins);
  if (!canEdit) {
    return res.status(403).json({ success: false, message: 'ليس لديك صلاحية تعديل رتب المشرفين' });
  }

  const target = db.admins.find((a: any) => a.id === id);
  if (!target) {
    return res.status(404).json({ success: false, message: 'المشرف غير موجود' });
  }

  if (target.role === 'owner' && caller.role !== 'owner') {
    return res.status(403).json({ success: false, message: 'لا يمكن تعديل بيانات المالك إلا بواسطة المالك نفسه' });
  }

  const { name, title, canManageAdmins, accessCode } = req.body;
  if (name) target.name = name.trim();
  if (title) target.title = title.trim();
  if (typeof canManageAdmins === 'boolean') target.canManageAdmins = canManageAdmins;
  if (accessCode && accessCode.trim()) target.accessCode = accessCode.trim();

  db.settings.lastUpdatedBy = `${caller.name} (تعديل صلاحيات مشرف)`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({
    success: true,
    message: `تم تحديث بيانات المشرف (${target.name}) بنجاح`,
    data: sanitizeData(db)
  });
});

// 5. Delete Moderator
app.delete('/api/admins/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);

  if (!caller) {
    return res.status(401).json({ success: false, message: 'غير مصرح' });
  }

  const canDelete = caller.role === 'owner' || (caller.role === 'moderator' && caller.canManageAdmins);
  if (!canDelete) {
    return res.status(403).json({ success: false, message: 'ليس لديك صلاحية حذف المشرفين' });
  }

  const targetIndex = db.admins.findIndex((a: any) => a.id === id);
  if (targetIndex === -1) {
    return res.status(404).json({ success: false, message: 'المشرف غير موجود' });
  }

  if (db.admins[targetIndex].role === 'owner') {
    return res.status(400).json({ success: false, message: 'لا يمكن حذف المالك! يمكنك تحويل الملكية أولاً' });
  }

  const removedName = db.admins[targetIndex].name;
  db.admins.splice(targetIndex, 1);
  db.settings.lastUpdatedBy = `${caller.name} (حذف مشرف)`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({
    success: true,
    message: `تم إعفاء وحذف المشرف (${removedName}) بنجاح`,
    data: sanitizeData(db)
  });
});

// 6. Transfer Ownership (تحويل ملكية الموقع)
app.post('/api/transfer-ownership', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);

  if (!caller || caller.role !== 'owner') {
    return res.status(403).json({
      success: false,
      message: 'عذراً، عملية تحويل ملكية الموقع محصورة فقط بالمالك الحالي للموقع!'
    });
  }

  const { targetAdminId, newOwnerName, newOwnerCode, retainModeratorStatus } = req.body;

  let newOwnerAdmin: any = null;

  if (targetAdminId) {
    newOwnerAdmin = db.admins.find((a: any) => a.id === targetAdminId);
    if (!newOwnerAdmin) {
      return res.status(404).json({ success: false, message: 'المشرف المستهدف غير موجود' });
    }
  } else if (newOwnerName && newOwnerCode) {
    newOwnerAdmin = {
      id: `admin-${Date.now()}`,
      name: newOwnerName.trim(),
      role: 'owner',
      accessCode: newOwnerCode.trim(),
      canManageAdmins: true,
      title: 'المالك والمؤسس الجديد',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };
    db.admins.push(newOwnerAdmin);
  } else {
    return res.status(400).json({ success: false, message: 'يرجى اختيار مشرف حالي أو إدخال بيانات المالك الجديد' });
  }

  // Update old owner: becomes moderator with canManageAdmins
  caller.role = 'moderator';
  caller.title = 'المالك السابق ومستشار الإشراف';
  caller.canManageAdmins = retainModeratorStatus !== false;

  // Set new owner
  newOwnerAdmin.role = 'owner';
  newOwnerAdmin.title = 'المالك الرسمي للموقع';
  newOwnerAdmin.canManageAdmins = true;

  db.settings.lastUpdatedBy = `تحويل الملكية من ${caller.name} إلى ${newOwnerAdmin.name}`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({
    success: true,
    message: `🎉 تهانينا! تم نقل الملكية الكاملة للموقع إلى (${newOwnerAdmin.name}) بنجاح تام!`,
    newOwner: {
      id: newOwnerAdmin.id,
      name: newOwnerAdmin.name,
      role: newOwnerAdmin.role
    },
    data: sanitizeData(db)
  });
});

// 7. Episodes Management (Add, Update, Delete)
app.post('/api/episodes', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const { title, season, episodeNumber, duration, description, thumbnail, videoUrl, villain } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'عنوان الحلقة مطلوب' });

  const newEp = {
    id: `ep-${Date.now()}`,
    title: title.trim(),
    season: Number(season) || 1,
    episodeNumber: Number(episodeNumber) || 1,
    duration: duration?.trim() || '22 دقيقة',
    description: description?.trim() || '',
    thumbnail: thumbnail?.trim() || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    videoUrl: videoUrl?.trim() || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    releaseYear: new Date().getFullYear().toString(),
    villain: villain?.trim() || 'شرير جديد',
    likes: 0
  };

  db.episodes.unshift(newEp);
  db.settings.lastUpdatedBy = `${caller.name} (إضافة حلقة: ${newEp.title})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تمت إضافة الحلقة بنجاح!', data: sanitizeData(db) });
});

app.put('/api/episodes/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const ep = db.episodes.find((e: any) => e.id === id);
  if (!ep) return res.status(404).json({ success: false, message: 'الحلقة غير موجودة' });

  Object.assign(ep, req.body);
  db.settings.lastUpdatedBy = `${caller.name} (تعديل حلقة: ${ep.title})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم تحديث الحلقة بنجاح!', data: sanitizeData(db) });
});

app.delete('/api/episodes/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const idx = db.episodes.findIndex((e: any) => e.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'الحلقة غير موجودة' });

  const title = db.episodes[idx].title;
  db.episodes.splice(idx, 1);
  db.settings.lastUpdatedBy = `${caller.name} (حذف حلقة: ${title})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم حذف الحلقة بنجاح!', data: sanitizeData(db) });
});

// Like episode (public interaction)
app.post('/api/episodes/:id/like', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const ep = db.episodes.find((e: any) => e.id === id);
  if (ep) {
    ep.likes = (ep.likes || 0) + 1;
    saveDb(db);
  }
  res.json({ success: true, likes: ep?.likes || 0 });
});

// 8. News Management (Add, Update, Delete)
app.post('/api/news', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const { title, summary, content, image, category, tags } = req.body;
  if (!title || !content) return res.status(400).json({ success: false, message: 'عنوان الخبر ومحتواه مطلوبان' });

  const newArticle = {
    id: `news-${Date.now()}`,
    title: title.trim(),
    summary: summary?.trim() || content.slice(0, 120) + '...',
    content: content.trim(),
    image: image?.trim() || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    author: caller.name,
    publishedAt: new Date().toISOString(),
    category: category || 'أخبار رسمية',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : ['ميراكولوس'])
  };

  db.news.unshift(newArticle);
  db.settings.lastUpdatedBy = `${caller.name} (نشر خبر: ${newArticle.title})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم نشر الخبر بنجاح!', data: sanitizeData(db) });
});

app.put('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const article = db.news.find((n: any) => n.id === id);
  if (!article) return res.status(404).json({ success: false, message: 'الخبر غير موجود' });

  Object.assign(article, req.body);
  db.settings.lastUpdatedBy = `${caller.name} (تعديل خبر: ${article.title})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم تحديث الخبر بنجاح!', data: sanitizeData(db) });
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const idx = db.news.findIndex((n: any) => n.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'الخبر غير موجود' });

  const title = db.news[idx].title;
  db.news.splice(idx, 1);
  db.settings.lastUpdatedBy = `${caller.name} (حذف خبر: ${title})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم حذف الخبر بنجاح!', data: sanitizeData(db) });
});

// 9. Social Links & Site Settings
app.put('/api/social-links', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const { socialLinks } = req.body;
  if (Array.isArray(socialLinks)) {
    db.socialLinks = socialLinks;
    db.settings.lastUpdatedBy = `${caller.name} (تحديث منصات التواصل)`;
    db.settings.lastUpdatedAt = new Date().toISOString();
    saveDb(db);
  }

  res.json({ success: true, message: 'تم حفظ وتحديث قنوات التواصل بنجاح!', data: sanitizeData(db) });
});

app.post('/api/social-links', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const { platform, label, url, handle, description, followers, color, icon } = req.body;
  const newLink = {
    id: `soc-${Date.now()}`,
    platform: platform || 'youtube',
    label: label?.trim() || 'حساب جديد',
    url: url?.trim() || 'https://',
    handle: handle?.trim() || '@handle',
    description: description?.trim() || 'وصف الحساب الرسمي...',
    followers: followers?.trim() || '+10K متابع',
    color: color || 'from-rose-600 to-red-700',
    icon: icon || 'Share2'
  };

  db.socialLinks.push(newLink);
  db.settings.lastUpdatedBy = `${caller.name} (إضافة حساب: ${newLink.label})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تمت إضافة الحساب بنجاح!', data: sanitizeData(db) });
});

app.delete('/api/social-links/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  const idx = db.socialLinks.findIndex((s: any) => s.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'الحساب غير موجود' });

  const label = db.socialLinks[idx].label;
  db.socialLinks.splice(idx, 1);
  db.settings.lastUpdatedBy = `${caller.name} (حذف حساب: ${label})`;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم مسح الحساب بنجاح!', data: sanitizeData(db) });
});

app.put('/api/settings', (req, res) => {
  const db = getDb();
  const caller = authenticate(req, db);
  if (!caller) return res.status(401).json({ success: false, message: 'يجب تسجيل الدخول كمشرف' });

  Object.assign(db.settings, req.body);
  db.settings.lastUpdatedBy = caller.name;
  db.settings.lastUpdatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, message: 'تم حفظ إعدادات الموقع بنجاح!', data: sanitizeData(db) });
});

// Setup Vite middlewares in development or static serve in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Miraculous Ladybug Portal server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
