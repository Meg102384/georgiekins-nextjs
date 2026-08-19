import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { PETS, PET_IMAGE, PET_PRODUCTS, getPetArticles } from '@/lib/data';

export function generateStaticParams() {
  return Object.keys(PETS).map((pet) => ({ pet }));
}

export function generateMetadata({ params }) {
  const info = PETS[params.pet];
  if (!info) return {};
  const articles = getPetArticles(params.pet);
  return {
    title: `${info.label} Guides — Georgiekins Pet Care Library`,
    description: `${info.label} articles from Georgiekins: ${articles.slice(0, 3).map((a) => a.title).join(', ')}, and more.`,
  };
}

function teaserFor(a) {
  if (a.list) return `${a.list.length} quick steps to get started right`;
  return a.paras[0].split(' ').slice(0, 20).join(' ') + '…';
}

export default function PetLibraryPage({ params }) {
  const info = PETS[params.pet];
  if (!info) notFound();
  const articles = getPetArticles(params.pet);
  const gender = PET_PRODUCTS.find((p) => p.key === params.pet)?.gender;
  const border = gender === 'female' ? 'border-line-pink' : 'border-line-blue';

  return (
    <div className="bg-blue">
      <div className="max-w-[760px] mx-auto px-5 py-14">
        <p className="text-sm text-navy-soft font-semibold mb-6">
          <Link href="/library" className="hover:text-coral-deep">
            Pet Care Library
          </Link>{' '}
          / {info.label}
        </p>
        <div className="text-center mb-10">
          <Image
            src={`/images/${PET_IMAGE[params.pet]}`}
            alt={info.host}
            width={88}
            height={88}
            className="w-[88px] h-[88px] object-contain mx-auto mb-2"
          />
          <h1 className="font-fredoka font-bold text-cocoa text-3xl mb-1">
            {info.emoji} {info.label}
          </h1>
          <p className="text-navy-soft font-semibold">
            {articles.length} guides, hosted by {info.host}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/library/${params.pet}/${a.slug}`}
              className={`group flex items-center gap-4 bg-cream border-[2.5px] border-dashed ${border} rounded-2xl px-6 py-5 hover:-translate-y-1 hover:shadow-md transition`}
            >
              <div className="flex-1 min-w-0">
                <b className="block font-fredoka text-cocoa text-lg mb-1">{a.title}</b>
                <span className="text-sm text-navy-soft font-semibold">{teaserFor(a)}</span>
              </div>
              <ChevronRight
                className="w-5 h-5 text-coral-deep flex-shrink-0 transition group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
