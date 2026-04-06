# KriptoUstası - Crypto-Ticker & Converter Tool

KriptoUstası real vaxt kriptovalyuta qiymətlərini göstərən, sadə və sürətli çevirmə (converter) imkanı verən tək səhifəlik Next.js tətbiqidir. Layihə çoxdilli quruluşdadır (`az`, `en`, `ru`) və default dil `az` olaraq konfiqurasiya olunub.

## Layihə Haqqında

Bu layihənin məqsədi istifadəçiyə bir səhifədə:
- trend coinləri izləmək,
- coin üzrə axtarış etmək,
- məbləği anlıq valyutalara çevirmək,
- mobil və desktop cihazlarda rahat, responsiv UX təqdim etməkdir.

## Texnologiyalar

- `Next.js 16` (App Router)
- `React`
- `TypeScript`
- `Tailwind CSS`
- `shadcn/ui`
- `CryptoCompare API`
- `Axios`

## Texniki tələblər və kodlar

### 1) API ilə iş (real-time qiymətlər)
- Market/trending data və qiymətlər `CryptoCompare` endpoint-lərindən alınır.
- `lib/api.ts` üzərindən mərkəzləşdirilmiş request idarəetməsi var.
- API açarı `Authorization: Apikey <token>` header-i ilə ötürülür.

### 2) Dinamik kalkulyator
- İstifadəçi məbləğ daxil etdikdə nəticə dərhal hesablanır.
- Formula: `amount * selectedCoinPriceUsd * selectedFiatRate`.

### 3) Axtarış/filtr
- Cədvəl üzrə coin adı və ya simvolu ilə sürətli axtarış mövcuddur.
- Axtarış inputu ayrılmış table/search section daxilində işləyir.

### 4) Performans
- Re-render probleminin qarşısını almaq üçün memoization tətbiq olunub (`memo`, `useMemo`, `useCallback`).
- Axtarış üçün `useDeferredValue` istifadə olunur.
- Data yenilənməsi polling + debounce ilə idarə olunur.
- Parallel fetch (`Promise.all`) ilə cavab vaxtı optimallaşdırılıb.

### 5) Styling və UI keyfiyyəti
- UI `Tailwind CSS` ilə səliqəli və modul şəkildə yazılıb.
- Dark theme default-dur; theme toggle navbar-a inteqrasiya olunub.
- Layout və section-lar mobil/desktop üçün responsivdir.


### API error handling
- API çağırışlarında xəta halları idarə olunur və UI freeze qarşısı alınır.
- Network/response problemlərində tətbiqin əsas axını qorunur.

### Kod strukturu (logic/UI ayrımı)
- Route faylları (`app/[lang]/page.tsx`, `app/[lang]/about/page.tsx`) data fetch edir.
- UI hissələri `app-pages/<route>/...` altında yerləşir.
- Bölmələr `sections`, təkrar istifadə olunan hissələr `components` daxilindədir.
- Type-lar ayrıca `types/` və `types/api/` altında saxlanılır.

### Asinxron əməliyyatlar
- `async/await`, `Promise.all`, debounced refresh və lifecycle-safe update yanaşması tətbiq edilib.

### Dizayn və responsivlik
- Bütün əsas hissələr column yönümlü, oxunaqlı və modern kripto-dashboard stilinə uyğunlaşdırılıb.
- Navbar, hero, converter və table hissələri mobil-first prinsiplə işləyir.

## SEO və i18n

- Dilə görə metadata (`generateMetadata`) konfiqurasiya edilib.
- `sitemap.xml` və `robots.txt` dinamik file convention ilə yaradılıb.
- Seo üçün optimallaşdırılıb
- URL strukturu locale əsaslıdır: `/{lang}/...` (məs: `/az/about`).

## Qovluq Strukturu (qısa)

```bash
app/
  [lang]/
    page.tsx
    about/page.tsx
    layout.tsx
    dictionaries/*.json
  robots.ts
  sitemap.ts

app-pages/
  home/
    index.tsx
    sections/
    components/
  about/
    index.tsx
    sections/

lib/
  api.ts
  cryptoCompare.ts
  seo.ts

types/
  home.ts
  about.ts
  api/
```

## Environment Variables

`.env` faylında aşağıdakı dəyişənlər olmalıdır:

```env
NEXT_PUBLIC_API_KEY=your_api_key_here
```



## Local Run

```bash
npm install
npm run dev
```

Browser:
- `http://localhost:3000` -> avtomatik locale redirect
- `http://localhost:3000/az`
- `http://localhost:3000/en`
- `http://localhost:3000/ru`

## Build və yoxlama

```bash
npm run lint
npm run build
```

Qeyd: Bəzi mühitlərdə `next/font` üçün Google Fonts şəbəkə məhdudiyyəti build prosesinə təsir edə bilər.
