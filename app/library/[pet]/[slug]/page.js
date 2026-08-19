import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { PETS, PET_IMAGE, PET_PRODUCTS, getPetArticles, getArticle } from '@/lib/data';

export function generateStaticParams() {
  return Object.keys(PETS).flatMap((pet) =>
    getPetArticles(pet).map((a) => ({ pet, slug: a.slug }))
  );
}

export function generateMetadata({ params }) {
  const info = PETS[params.pet];
  const article = getArticle(params.pet, params.slug);
  if (!info || !article) return {};
  return {
    title: `${article.title} | Georgiekins ${info.label}`,
    description: article.desc,
    openGraph: {
      title: article.title,
      description: article.desc,
      type: 'article',
    },
  };
}

export default function ArticlePage({ params }) {
  const info = PETS[params.pet];
  if (!info) notFound();
  const article = getArticle(params.pet, params.slug);
  if (!article) notFound();

  const related = getPetArticles(params.pet).filter((a) => a.slug !== article.slug).slice(0, 3);
  const gender = PET_PRODUCTS.find((p) => p.key === params.pet)?.gender;
  const border = gender === 'female' ? 'border-line-pink' : 'border-line-blue';

  return (
    <div className="bg-blue">
      <div className="max-w-[760px] mx-auto px-5 py-14">
        <p className="text-sm text-navy-soft font-semibold mb-4">
          <Link href="/library" className="hover:text-coral-deep">Pet Care Library</Link>
          {' / '}
          <Link href={`/library/${params.pet}`} className="hover:text-coral-deep">{info.label}</Link>
        </p>

        <div className={`bg-cream border-[2.5px] border-dashed ${border} rounded-[28px] p-7 sm:p-9`}>
          <span className="inline-block font-fredoka font-semibold text-xs text-coral-deep bg-blush rounded-full px-4 py-1.5 mb-4">
            {info.emoji} {info.label}
          </span>
          <h1 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl leading-tight mb-2">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-navy-soft font-semibold mb-8">
            <Image src={`/images/${PET_IMAGE[params.pet]}`} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
            Hosted by {info.host} 🐾
          </div>

          <article className="text-navy text-[1.05rem] font-medium leading-relaxed">
            {article.list ? (
              <ol className="flex flex-col gap-4 list-decimal ml-5">
                {article.list.map((item) => (
                  <li key={item.h} className="pl-1">
                    <b className="font-fredoka text-cocoa font-semibold">{item.h}</b> {item.d}
                  </li>
                ))}
              </ol>
            ) : (
              article.paras.map((p, i) => <p key={i} className="mb-5">{p}</p>)
            )}
          </article>

          <div className="bg-blue border-2 border-dashed border-line-blue rounded-2xl px-5 py-4 text-sm text-navy-soft font-semibold mt-8">
            🩺 This article is educational, not veterinary advice. Always consult a licensed veterinarian about your pet&apos;s health.
          </div>
        </div>

        <div className="mt-9">
          <h2 className="font-fredoka text-cocoa text-xl mb-4">More {info.label} guides</h2>
          <div className="flex flex-col gap-3 mb-9">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/library/${params.pet}/${r.slug}`}
                className={`group flex items-center gap-3 bg-cream border-2 border-dashed ${border} rounded-xl px-4 py-3.5 font-fredoka font-semibold text-cocoa text-sm hover:-translate-y-0.5 hover:shadow-md transition`}
              >
                <span className="flex-1">{r.title}</span>
                <ChevronRight className="w-4 h-4 text-coral-deep flex-shrink-0 transition group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-blush rounded-3xl p-7 text-center">
          <p className="font-fredoka text-cocoa font-semibold mb-3">Want a printable version to fill in at home?</p>
          <Link
            href={`/#shop`}
            className="inline-block font-fredoka font-semibold rounded-full px-6 py-2.5 text-white bg-coral shadow-[0_4px_0_#EE7295]"
          >
            Browse the {info.label} Kit 🐾
          </Link>
        </div>
      </div>
    </div>
  );
}
