import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PETS, PET_IMAGE, PET_PRODUCTS } from '@/lib/data';

export const metadata = {
  title: 'Pet Care Library — Cat, Dog, Gecko, Guinea Pig, Bird & Bunny Guides | Georgiekins',
  description:
    'Free pet care guides organized by animal — cats, dogs, geckos, guinea pigs, birds, and bunnies. Written by the Georgiekins crew.',
};

export default function LibraryHub() {
  return (
    <div className="bg-blue">
      <div className="max-w-[1050px] mx-auto px-5 py-14">
        <div className="text-center mb-10">
          <h1 className="font-fredoka font-bold text-cocoa text-4xl mb-3">Pet Care Library</h1>
          <p className="text-navy-soft font-medium max-w-xl mx-auto">
            Bite-sized, genuinely useful guides from the whole Georgiekins crew — organized by pet.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(PETS).map(([key, info]) => {
            const gender = PET_PRODUCTS.find((p) => p.key === key)?.gender;
            const border = gender === 'female' ? 'border-line-pink' : 'border-line-blue';
            return (
              <Link
                key={key}
                href={`/library/${key}`}
                className={`relative bg-cream border-[2.5px] border-dashed ${border} rounded-brand block text-center p-6 hover:-translate-y-1 hover:shadow-md transition`}
              >
                <ChevronRight className="absolute top-3 right-3 w-4 h-4 text-navy-soft/50" strokeWidth={2.5} />
                <Image
                  src={`/images/${PET_IMAGE[key]}`}
                  alt=""
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain mx-auto mb-2"
                />
                <b className="font-fredoka text-cocoa">
                  {info.emoji} {info.label}
                </b>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
