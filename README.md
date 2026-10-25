# AlgoAcademy — C++ видео хичээл ба бодлогын сан

C++ хэлийг сурагчдад анхан шатнаас өрсөлдөөнт программчлал хүртэл заах, **бүртгэлгүй, үнэгүй** вэбсайт.

- 10 видео хичээл (YouTube embed, татах боломжгүй)
- 72 бодлого — сэдэв, түвшингээр шүүх, хайх, санамсаргүй бодлого
- Ахиц (бодсон бодлого, үзсэн хичээл) хэрэглэгчийн төхөөрөмж дээр хадгалагдана — нэвтрэх шаардлагагүй
- Сургалтын зам (4 шат)
- Бүрэн responsive (утас, таблет, компьютер)

**Технологи:** Next.js 14 (App Router, JavaScript), React 18, Material UI 5, MUI Icons, Framer Motion.

---

## Ажиллуулах

Node.js **18.18** буюу түүнээс дээш хувилбар хэрэгтэй.

```bash
npm i
npm run dev
```

Дараа нь хөтөч дээр http://localhost:3000 нээнэ.

Production build:

```bash
npm run build
npm start
```

---

## Видео хичээлийн холбоос солих

`src/data/lessons.js` файлд хичээл бүрийн `youtubeUrl` талбарт YouTube холбоосоо тавина:

```js
youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
```

`youtu.be/...`, `/embed/...`, `/shorts/...` эсвэл зөвхөн ID — аль нь ч ажиллана.
Хоосон үлдээвэл "Видео удахгүй нэмэгдэнэ" гэсэн загвар харагдана.

> Зөвлөгөө: Бичлэгээ YouTube дээр **Unlisted** болгож байршуулбал зөвхөн энэ сайтаар л үзэгдэнэ.

Хичээлийн нэр, тайлбар, үргэлжлэх хугацаа, код жишээ, "сурах зүйлс"-ийг мөн эндээс засна.

---

## Бодлого нэмэх / засах

`src/data/problems.js` файлын массивын төгсгөлд шинэ объект нэмнэ:

```js
{
  id: 73,
  title: 'Шинэ бодлого',
  level: 'easy',            // 'easy' | 'medium' | 'hard'
  topics: ['loop'],         // src/data/topics.js доторх түлхүүрүүд
  lesson: 4,                // холбогдох хичээлийн id
  statement: ['Гараас n тоо орно.', '... гэж хэвлэ.'],
  input: 'Нэг бүхэл тоо `n` орно.',
  output: 'Хариуг хэвлэ.',
  constraints: ['1 ≤ n ≤ 100'],
  examples: [{ input: '5', output: '120', note: 'заавал биш' }],
  hint: 'Заавал биш',
},
```

Текстэд `` `код` `` гэж backtick ашиглавал код хэлбэрээр харагдана.
Шинэ бодлого нэмэхэд хуудас автоматаар үүснэ (`/problems/73`).

Шинэ сэдэв нэмэх бол `src/data/topics.js`-д нэр, өнгөтэй нь нэмнэ.

---

## Брэнд, өнгө солих

| Юу | Хаана |
| --- | --- |
| Сайтын нэр, лого бичиг, тайлбар, сошиал холбоос | `src/config/site.js` |
| Өнгө, фонт, бөөрөнхийлөлт | `src/theme/theme.js` |
| Сургалтын замын шатууд | `src/data/roadmap.js` |
| Favicon | `public/favicon.svg` |

---

## Бүтэц

```
src/
  app/                 Хуудаснууд (App Router)
    page.js            Нүүр
    lessons/           Видео хичээлүүд + [id]
    problems/          Бодлогын сан + [id]
    roadmap/           Сургалтын зам
  components/
    layout/            Header, Footer, Logo
    home/              Нүүр хуудасны хэсгүүд
    lessons/           VideoPlayer, LessonCard, LessonView
    problems/          ProblemsExplorer, ProblemView
    common/            CodeBlock, Chips, RichText, Reveal, PageHero
  data/                lessons, problems, topics, roadmap
  hooks/useLocalSet.js Бүртгэлгүй ахиц хадгалах
  lib/                 data helpers, youtube helper
  theme/theme.js       MUI theme (цэнхэр-цагаан)
```

---

## Байршуулах (deploy)

Хамгийн амар нь [Vercel](https://vercel.com): GitHub руу push хийгээд Vercel дээр import хийхэд л болно.
Бүх хуудас статик байдлаар үүсдэг тул ямар ч Node.js хостинг дээр `npm run build && npm start` ажиллана.
